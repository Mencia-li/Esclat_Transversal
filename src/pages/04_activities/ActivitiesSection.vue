<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { RouterLink } from "vue-router"
import { artistConcertSlots, artists, festivalDays } from "@/data/festival"

const tabItems = [
  { id: "experiencia", label: "EXPERIENCIA" },
  { id: "horarios", label: "HORARIOS" },
] as const

type TabId = (typeof tabItems)[number]["id"]
const activityTabStorageKey = "esclat:activities-tab"

const tabPanels: Record<TabId, string> = {
  experiencia: "actividades-panel-experiencia",
  horarios: "actividades-panel-horarios",
}

function isTabId(value: string | null): value is TabId {
  return tabItems.some((tab) => tab.id === value)
}

function getInitialActiveTab(): TabId {
  if (typeof window === "undefined") {
    return "experiencia"
  }

  const storedTab = window.localStorage.getItem(activityTabStorageKey)

  return isTabId(storedTab) ? storedTab : "experiencia"
}

const activeTab = ref<TabId>(getInitialActiveTab())

watch(activeTab, (tab) => {
  window.localStorage.setItem(activityTabStorageKey, tab)
})

const scheduleDays = festivalDays.map((day) => ({
  id: day.id,
  label: `${day.weekday} ${day.date.split("/")[0]}`,
}))
const activeScheduleDay = ref(scheduleDays[0]?.id ?? "23-10")

type ScheduleRow = {
  id: string
  label: string
  sublabel: string
  heightClass?: string
}

type ScheduleBlock = {
  id: string
  rowId: ScheduleRow["id"]
  title: string
  meta?: string
  start: number
  end: number
  level?: number
  tone?: "soft" | "strong"
}

type ScheduleLayoutBlock = ScheduleBlock & {
  layoutLevel: number
}

type ScheduleConfig = {
  rows: ScheduleRow[]
  blocks: ScheduleBlock[]
  start: number
  end: number
  notes: string[]
}

const activityScheduleRows: ScheduleRow[] = [
  { id: "expos", label: "Sala de Exposiciones", sublabel: "Nave 1, planta baja" },
  { id: "proyecciones", label: "Sala Proyecciones", sublabel: "Nave 1" },
  { id: "patios", label: "Patios y Pasillos", sublabel: "Entre Nave 1 y Nave 3" },
  { id: "patio-1", label: "Patio 1", sublabel: "Zona exterior habilitada", heightClass: "min-h-28" },
  { id: "hall", label: "Hall - La Polivalent", sublabel: "La Polivalent" },
  { id: "sala-factoria", label: "Sala Factoria", sublabel: "Nave 1, 1a planta" },
  { id: "sala-visual", label: "Sala Visual Room", sublabel: "Nave 1, 1a planta" },
  { id: "todos", label: "Todos los espacios", sublabel: "Actividad colectiva" },
  { id: "la-polivalent", label: "La Polivalent", sublabel: "Nave 1, planta baja" },
  { id: "escenario-principal", label: "Escenario principal", sublabel: "Nave 3" },
]

const sundayScheduleRows: ScheduleRow[] = [
  { id: "acceso", label: "Acceso general", sublabel: "Las Naves" },
  { id: "sala-factoria", label: "Sala Factoria", sublabel: "Nave 1, 1a planta" },
  { id: "sala-visual", label: "Sala Visual Room", sublabel: "Nave 1, 1a planta" },
  { id: "la-polivalent", label: "La Polivalent", sublabel: "Nave 1, planta baja" },
  { id: "expos", label: "Sala de Exposiciones", sublabel: "Nave 1, planta baja" },
  { id: "proyecciones", label: "Sala Proyecciones", sublabel: "Nave 1" },
  { id: "hall", label: "Hall - La Polivalent", sublabel: "La Polivalent" },
  { id: "patio-1", label: "Patio 1", sublabel: "Zona exterior habilitada", heightClass: "min-h-28" },
  { id: "patio-2", label: "Patio 2", sublabel: "Espacio exterior abierto" },
  { id: "todos", label: "Todos los espacios", sublabel: "Actividad colectiva" },
  { id: "patios", label: "Patios y Pasillos", sublabel: "Cierre" },
  { id: "escenario-principal", label: "Escenario principal", sublabel: "Nave 3" },
]

function timeToDecimal(time: string) {
  const match = time.match(/^(\d{1,2}):(\d{2})$/)

  if (!match) {
    return Number.MAX_SAFE_INTEGER
  }

  const hours = Number(match[1])
  const minutes = Number(match[2])

  return hours + minutes / 60
}

function concertScheduleBlocks(date: string, prefix: string): ScheduleBlock[] {
  const dayArtists = artists
    .filter((artist) => artist.date === date && !artist.isPlaceholder)
    .sort((firstArtist, secondArtist) => timeToDecimal(firstArtist.time) - timeToDecimal(secondArtist.time))

  return dayArtists.map((artist) => {
    const slot = artistConcertSlots[artist.id]
    const start = timeToDecimal(slot?.start ?? artist.time)
    const rawEnd = timeToDecimal(slot?.end ?? artist.time)
    const end = rawEnd <= start ? rawEnd + 24 : rawEnd

    return {
      id: `${prefix}-concierto-${artist.id}`,
      rowId: "escenario-principal",
      title: `Concierto - ${artist.name}`,
      meta: slot ? `${slot.start}-${slot.end}` : artist.time,
      start,
      end,
      tone: "strong",
    }
  })
}

const fridayScheduleBlocks: ScheduleBlock[] = [
  { id: "viernes-expo", rowId: "expos", title: "Exposición fotográfica - Backstage: la otra cara", meta: "16:00-20:00", start: 16.0, end: 20.0 },
  { id: "viernes-eighth-grade", rowId: "proyecciones", title: "Proyección - Eighth Grade (2018)", meta: "16:00-17:45", start: 16.0, end: 17.75 },
  { id: "viernes-amy", rowId: "proyecciones", title: "Proyección - Amy (2015)", meta: "18:00-20:00", start: 18.0, end: 20.0 },
  { id: "viernes-stands", rowId: "patios", title: "Stands, comida y merch del festival", meta: "16:00-20:00", start: 16.0, end: 20.0 },
  { id: "viernes-caja-bombo", rowId: "patio-1", title: "Caja y bombo - el ritmo que ya tienes", meta: "16:00-18:00", start: 16.0, end: 18.0, level: 0 },
  { id: "viernes-djembe", rowId: "patio-1", title: "Djembe colectivo - un ritmo entre todos", meta: "16:00-18:00", start: 16.0, end: 18.0, level: 1 },
  { id: "viernes-escucha", rowId: "hall", title: "El cuarto de escucha", meta: "16:00-20:00", start: 16.0, end: 20.0 },
  { id: "viernes-taller-a-1", rowId: "sala-factoria", title: "Taller A - Produce tu estado de ánimo", meta: "16:15-16:55", start: 16.25, end: 16.92 },
  { id: "viernes-taller-a-2", rowId: "sala-factoria", title: "Taller A - Produce tu estado de ánimo", meta: "17:25-18:05", start: 17.42, end: 18.08 },
  { id: "viernes-taller-b-1", rowId: "sala-visual", title: "Taller B - Lo que mi canción favorita dice de mí", meta: "16:25-17:05", start: 16.42, end: 17.08 },
  { id: "viernes-taller-b-2", rowId: "sala-visual", title: "Taller B - Lo que mi canción favorita dice de mí", meta: "17:35-18:15", start: 17.58, end: 18.25 },
  { id: "viernes-pausa", rowId: "todos", title: "Pausa libre", meta: "18:15-18:30", start: 18.25, end: 18.5 },
  { id: "viernes-charla", rowId: "la-polivalent", title: "Cómo suena la ansiedad", meta: "18:30-19:30", start: 18.5, end: 19.5 },
  { id: "viernes-cierre", rowId: "patios", title: "Cierre de actividades", meta: "19:30-20:00", start: 19.5, end: 20.0 },
  ...concertScheduleBlocks("23/10", "viernes"),
]

const saturdayScheduleBlocks: ScheduleBlock[] = [
  { id: "sabado-expo", rowId: "expos", title: "Exposición fotográfica - Cuerpos sin filtro", meta: "16:00-20:00", start: 16.0, end: 20.0 },
  { id: "sabado-miss-americana", rowId: "proyecciones", title: "Proyección - Miss Americana (2020)", meta: "16:00-17:30", start: 16.0, end: 17.5 },
  { id: "sabado-frida", rowId: "proyecciones", title: "Proyección - Frida (2002)", meta: "17:45-20:00", start: 17.75, end: 20.0 },
  { id: "sabado-ukulele", rowId: "patio-1", title: "Ukulele - tres acordes y una canción", meta: "16:00-18:00", start: 16.0, end: 18.0, level: 0 },
  { id: "sabado-flauta", rowId: "patio-1", title: "Flauta: el instrumento que todos tocaron mal y ahora suena bien", meta: "16:00-18:00", start: 16.0, end: 18.0, level: 1 },
  { id: "sabado-escucha", rowId: "hall", title: "El cuarto de escucha (continúa desde el día 1)", meta: "16:00-20:00", start: 16.0, end: 20.0 },
  { id: "sabado-taller-a-1", rowId: "sala-factoria", title: "Taller A - Pinta caras", meta: "16:15-16:55", start: 16.25, end: 16.92 },
  { id: "sabado-taller-a-2", rowId: "sala-factoria", title: "Taller A - Pinta caras", meta: "17:25-18:05", start: 17.42, end: 18.08 },
  { id: "sabado-taller-b-1", rowId: "sala-visual", title: "Taller B - Crea tu portada de álbum", meta: "16:25-17:05", start: 16.42, end: 17.08 },
  { id: "sabado-taller-b-2", rowId: "sala-visual", title: "Taller B - Crea tu portada de álbum", meta: "17:35-18:15", start: 17.58, end: 18.25 },
  { id: "sabado-pausa", rowId: "todos", title: "Pausa libre", meta: "18:15-18:30", start: 18.25, end: 18.5 },
  { id: "sabado-charla", rowId: "la-polivalent", title: "La imagen del artista en la industria musical", meta: "18:30-19:30", start: 18.5, end: 19.5 },
  { id: "sabado-bingo", rowId: "sala-factoria", title: "El bingo de los mandatos", meta: "18:30-19:00", start: 18.5, end: 19.0 },
  { id: "sabado-cierre", rowId: "patios", title: "Cierre de actividades", meta: "19:30-20:00", start: 19.5, end: 20.0 },
  ...concertScheduleBlocks("24/10", "sabado"),
]

const sundayScheduleBlocks: ScheduleBlock[] = [
  { id: "domingo-apertura", rowId: "acceso", title: "Apertura y llegada libre", meta: "16:00", start: 16.0, end: 16.5 },
  {
    id: "domingo-expo",
    rowId: "expos",
    title: "Exposición fotográfica - Lo que no sale en la foto",
    meta: "16:00-20:00",
    start: 16.0,
    end: 20.0,
  },
  {
    id: "domingo-proyeccion-1",
    rowId: "proyecciones",
    title: "Proyección - Shut Up and Sing (2006)",
    meta: "16:00-17:35",
    start: 16.0,
    end: 17.58,
  },
  {
    id: "domingo-proyeccion-2",
    rowId: "proyecciones",
    title: "Proyección - The Last Dance: episodios seleccionados (2020)",
    meta: "17:50-18:40",
    start: 17.83,
    end: 18.67,
  },
  {
    id: "domingo-hit-descarte",
    rowId: "patio-2",
    title: "Hit o descarte - rondas abiertas",
    meta: "16:00-18:30",
    start: 16.0,
    end: 18.5,
  },
  {
    id: "domingo-caja-claves",
    rowId: "patio-1",
    title: "Caja china y claves - groove con lo mínimo",
    meta: "16:00-18:00",
    start: 16.0,
    end: 18.0,
    level: 0,
  },
  {
    id: "domingo-teclado",
    rowId: "patio-1",
    title: "Teclado - toca de oído, sin permiso",
    meta: "16:00-18:00",
    start: 16.0,
    end: 18.0,
    level: 1,
  },
  {
    id: "domingo-escucha",
    rowId: "hall",
    title: "El cuarto de escucha - cierre del mural",
    meta: "16:00-20:00",
    start: 16.0,
    end: 20.0,
  },
  {
    id: "domingo-taller-a-1",
    rowId: "sala-factoria",
    title: "Taller A - Pinta tu camiseta",
    meta: "16:15-17:15",
    start: 16.25,
    end: 17.25,
  },
  {
    id: "domingo-taller-a-2",
    rowId: "sala-factoria",
    title: "Taller A - Pinta tu camiseta",
    meta: "17:15-18:15",
    start: 17.25,
    end: 18.25,
  },
  {
    id: "domingo-taller-b-1",
    rowId: "sala-visual",
    title: "Taller B - El cuerpo escucha",
    meta: "16:15-17:05",
    start: 16.25,
    end: 17.08,
  },
  {
    id: "domingo-taller-b-2",
    rowId: "sala-visual",
    title: "Taller B - El cuerpo escucha",
    meta: "17:15-18:05",
    start: 17.25,
    end: 18.08,
  },
  {
    id: "domingo-respiro",
    rowId: "todos",
    title: "Último respiro del festival",
    meta: "18:15-18:45",
    start: 18.25,
    end: 18.75,
  },
  {
    id: "domingo-charla",
    rowId: "la-polivalent",
    title: "Ser famoso cuesta más de lo que cobras",
    meta: "18:30-19:30",
    start: 18.5,
    end: 19.5,
  },
  {
    id: "domingo-batucada",
    rowId: "patio-2",
    title: "Batucada colectiva",
    meta: "19:00-19:30",
    start: 19.0,
    end: 19.5,
  },
  {
    id: "domingo-cierre",
    rowId: "patios",
    title: "Cierre del programa de actividades",
    meta: "19:30-20:00",
    start: 19.5,
    end: 20.0,
  },
  ...concertScheduleBlocks("25/10", "domingo"),
]

const defaultScheduleConfig: ScheduleConfig = {
  rows: activityScheduleRows,
  blocks: fridayScheduleBlocks,
  start: 15.75,
  end: 24.25,
  notes: [],
}

const scheduleConfigs: Record<string, ScheduleConfig> = {
  default: defaultScheduleConfig,
  "23-10": {
    rows: activityScheduleRows,
    blocks: fridayScheduleBlocks,
    start: 15.75,
    end: 24.25,
    notes: [],
  },
  "24-10": {
    rows: activityScheduleRows,
    blocks: saturdayScheduleBlocks,
    start: 15.75,
    end: 24.25,
    notes: [],
  },
  "25-10": {
    rows: sundayScheduleRows,
    blocks: sundayScheduleBlocks,
    start: 15.75,
    end: 24.25,
    notes: [],
  },
}

const activeScheduleConfig = computed<ScheduleConfig>(() => scheduleConfigs[activeScheduleDay.value] ?? defaultScheduleConfig)
const activeScheduleRows = computed(() => activeScheduleConfig.value.rows)
const scheduleStart = computed(() => activeScheduleConfig.value.start)
const scheduleEnd = computed(() => activeScheduleConfig.value.end)
const scheduleSpan = computed(() => scheduleEnd.value - scheduleStart.value)
const scheduleQuarterSlotCount = computed(() => Math.round(scheduleSpan.value * 4))
const timelineHeaderSlots = computed(() =>
  Array.from(
    { length: scheduleQuarterSlotCount.value },
    (_, index) => scheduleStart.value + index * 0.25,
  ),
)
const scheduleLocationColumnWidth = "clamp(6.75rem, 30vw, 12rem)"
const scheduleVisibleQuarterSlotCount = 12
const scheduleQuarterColumnWidth = computed(() => `max(2.75rem, calc((100vw - ${scheduleLocationColumnWidth}) / ${scheduleVisibleQuarterSlotCount}))`)
const scheduleTableStyle = computed(() => ({
  width: `calc(${scheduleLocationColumnWidth} + ${Array.from(
    { length: scheduleQuarterSlotCount.value },
    () => scheduleQuarterColumnWidth.value,
  ).join(" + ")})`,
}))
const scheduleDayGridStyle = computed(() => ({
  gridTemplateColumns: `${scheduleLocationColumnWidth} repeat(${scheduleDays.length}, minmax(0, 1fr))`,
}))
const scheduleGridStyle = computed(() => ({
  gridTemplateColumns: `${scheduleLocationColumnWidth} repeat(${scheduleQuarterSlotCount.value}, ${scheduleQuarterColumnWidth.value})`,
}))
const scheduleRowGridStyle = computed(() => ({
  gridTemplateColumns: `${scheduleLocationColumnWidth} minmax(0, 1fr)`,
}))
const scheduleTimelineStyle = computed(() => ({
  gridTemplateColumns: `repeat(${scheduleQuarterSlotCount.value}, ${scheduleQuarterColumnWidth.value})`,
}))
const stackedBlockMinHeightRem = 2.75
const stackedBlockGapRem = 3

function blocksForRow(rowId: ScheduleRow["id"]): ScheduleLayoutBlock[] {
  const levelEnds: number[] = []

  // Si dos bloques se solapan en la misma fila, los apilamos en niveles verticales.
  return activeScheduleConfig.value.blocks
    .filter((block) => block.rowId === rowId)
    .sort((a, b) => a.start - b.start || a.end - b.end)
    .map((block) => {
      const preferredLevel = block.level
      const availableLevel = levelEnds.findIndex((end) => end <= block.start)
      const layoutLevel = preferredLevel ?? (availableLevel >= 0 ? availableLevel : levelEnds.length)

      levelEnds[layoutLevel] = Math.max(levelEnds[layoutLevel] ?? Number.NEGATIVE_INFINITY, block.end)

      return {
        ...block,
        layoutLevel,
      }
    })
}

function rowStyle(row: ScheduleRow) {
  const maxLevel = blocksForRow(row.id).reduce((level, block) => Math.max(level, block.layoutLevel), 0)
  const baseMinHeight = row.heightClass === "min-h-28" ? 6.25 : 3.5
  const stackedMinHeight = 1 + stackedBlockMinHeightRem + maxLevel * stackedBlockGapRem

  return {
    minHeight: `${Math.max(baseMinHeight, stackedMinHeight)}rem`,
  }
}

function blockStyle(block: ScheduleLayoutBlock) {
  // Posicionamiento proporcional dentro de la línea temporal horizontal.
  const safeStart = Math.max(block.start, scheduleStart.value)
  const safeEnd = Math.min(block.end, scheduleEnd.value)
  const left = ((safeStart - scheduleStart.value) / scheduleSpan.value) * 100
  const width = ((safeEnd - safeStart) / scheduleSpan.value) * 100
  const top = 0.5 + block.layoutLevel * stackedBlockGapRem

  return {
    left: `${left}%`,
    width: `${width}%`,
    top: `${top}rem`,
    minHeight: `${stackedBlockMinHeightRem}rem`,
  }
}

function formatHour(hour: number) {
  const normalized = hour >= 24 ? hour - 24 : hour
  const totalMinutes = Math.round(normalized * 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}

const activityBlocks = [
  {
    id: "talleres",
    title: "TALLERES",
    space: "Sala Factoría y Sala Visual Room · Nave 1, 1a planta",
    summary: "Talleres participativos del programa: producción musical, creación de personajes y maquillaje sonoro, con dos sesiones por taller cada día.",
    className: "bg-background text-foreground",
    to: { path: "/talleres" },
  },
  {
    id: "charlas",
    title: "CHARLAS",
    space: "La Polivalent · Nave 1, planta baja",
    summary: "Charlas y conversaciones diarias en formato abierto al debate.",
    className: "bg-blue_ice text-foreground",
    to: { path: "/charlas" },
  },
  {
    id: "exposiciones",
    title: "EXPOSICIONES",
    space: "Sala de Exposiciones · Nave 1, planta baja",
    summary: "Cada día acoge una exposición fotográfica vinculada al tema de la jornada. Acceso libre durante todo el horario del festival.",
    className: "bg-background text-foreground md:bg-blue_ice",
    to: { path: "/exposiciones" },
  },
  {
    id: "stands-merch",
    title: "TIENDA",
    space: "Patios y pasillos · entre Nave 1 y Nave 3",
    summary: "Food trucks, bebidas y merchandising oficial de Esclat. Punto de encuentro para descansar y socializar durante todo el festival.",
    className: "bg-blue_ice text-foreground md:bg-background",
    to: { path: "/tienda" },
  },
] as const
</script>

<template>
  <section class="border-b border-foreground bg-background">
    <div data-reveal role="tablist" class="grid grid-cols-2 border-b border-foreground">
      <button
        v-for="(tab, index) in tabItems"
        :key="tab.id"
        :id="`actividades-tab-${tab.id}`"
        type="button"
        role="tab"
        :aria-controls="tabPanels[tab.id]"
        :aria-selected="activeTab === tab.id"
        :tabindex="activeTab === tab.id ? 0 : -1"
        :class="[
          'esclat-section-tab',
          index === 0 ? 'border-r border-foreground' : '',
          activeTab === tab.id
            ? 'bg-turquesa text-foreground'
            : 'bg-background text-foreground hover:bg-grey',
        ]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div
      v-if="activeTab === 'experiencia'"
      :id="tabPanels.experiencia"
      role="tabpanel"
      :aria-labelledby="'actividades-tab-experiencia'"
      data-reveal
      class="grid grid-cols-1 md:grid-cols-2"
    >
      <article
        v-for="(block, index) in activityBlocks"
        :key="block.id"
        :class="[
          'flex min-h-36 flex-col border-b border-foreground p-3 sm:min-h-52 sm:p-6 lg:min-h-60 lg:p-8',
          index % 2 === 0 ? 'md:border-r' : '',
          index >= activityBlocks.length - 2 ? 'md:border-b-0' : '',
          index === activityBlocks.length - 1 ? 'border-b-0' : '',
          block.className,
        ]"
      >
        <h3 class="text-lg font-semibold leading-tight tracking-tight sm:text-2xl lg:text-3xl">{{ block.title }}</h3>
        <p class="mt-3 text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-foreground/75 sm:mt-5 sm:text-xs sm:tracking-[0.2em] lg:text-sm">
          {{ block.space }}
        </p>
        <p class="mt-3 max-w-3xl text-[0.82rem] leading-relaxed text-foreground/90 sm:mt-4 sm:text-base lg:text-lg">
          {{ block.summary }}
        </p>

        <div class="mt-auto flex justify-end pt-4 sm:pt-6">
          <RouterLink
            v-if="block.to"
            :to="block.to"
            class="inline-flex min-h-9 items-center border border-foreground bg-background px-4 text-xs font-normal uppercase leading-none text-foreground transition-colors hover:bg-grey sm:min-h-10 sm:px-5 sm:text-base"
          >
            VER MÁS &gt;
          </RouterLink>
          <button
            v-else
            type="button"
            class="inline-flex min-h-9 items-center border border-foreground bg-background px-4 text-xs font-normal uppercase leading-none text-foreground transition-colors hover:bg-grey sm:min-h-10 sm:px-5 sm:text-base"
          >
            VER MÁS &gt;
          </button>
        </div>
      </article>
    </div>

    <div
      v-else
      :id="tabPanels.horarios"
      role="tabpanel"
      :aria-labelledby="'actividades-tab-horarios'"
      data-reveal
      class="grid bg-background"
    >
      <div class="grid grid-cols-3 border-b border-grey md:hidden">
        <button
          v-for="(day, index) in scheduleDays"
          :key="day.id"
          type="button"
          :class="[
            'min-h-14 px-3 py-3 text-center text-sm font-medium leading-tight transition-colors',
            index < scheduleDays.length - 1 ? 'border-r border-grey' : '',
            activeScheduleDay === day.id
              ? 'bg-blue_ice text-foreground'
              : 'bg-background text-foreground hover:bg-grey',
          ]"
          @click="activeScheduleDay = day.id"
        >
          {{ day.label }}
        </button>
      </div>

      <div class="hidden border-b border-grey md:grid" :style="scheduleDayGridStyle">
        <div class="border-r border-grey" />
        <button
          v-for="(day, index) in scheduleDays"
          :key="day.id"
          type="button"
          :class="[
            'px-4 py-3 text-center text-sm font-medium tracking-wide transition-colors',
            index < scheduleDays.length - 1 ? 'border-r border-grey' : '',
            activeScheduleDay === day.id
              ? 'bg-blue_ice text-foreground'
              : 'bg-background text-foreground hover:bg-grey',
          ]"
          @click="activeScheduleDay = day.id"
        >
          {{ day.label }}
        </button>
      </div>

      <div class="overflow-x-auto border-b border-grey">
        <div class="grid min-w-full border-b border-grey" :style="scheduleTableStyle">
          <div
            class="grid border-b border-grey text-[0.6rem] uppercase tracking-widest text-foreground/70 sm:text-[0.65rem]"
            :style="scheduleGridStyle"
          >
            <div class="sticky left-0 z-30 border-r border-grey bg-background px-2 py-1.5 text-left sm:px-4 sm:py-2" />
            <div
              v-for="(slot, index) in timelineHeaderSlots"
              :key="slot"
              :class="[
                'py-1.5 text-center sm:py-2',
                index < timelineHeaderSlots.length - 1 ? 'border-r border-grey/70' : '',
              ]"
            >
              {{ formatHour(slot) }}
            </div>
          </div>

          <div v-for="row in activeScheduleRows" :key="row.id" class="grid border-b border-grey last:border-b-0" :style="scheduleRowGridStyle">
            <div class="sticky left-0 z-20 flex flex-col justify-center gap-1 border-r border-grey bg-background px-2 py-2.5 text-left sm:px-4 sm:py-4">
              <span class="break-words text-[0.66rem] font-semibold uppercase leading-tight tracking-normal text-black sm:whitespace-nowrap sm:text-sm">{{ row.label }}</span>
              <span class="break-words text-[0.48rem] font-medium uppercase leading-tight tracking-wide text-foreground/50 sm:whitespace-nowrap sm:text-[0.68rem]">{{ row.sublabel }}</span>
            </div>

            <div :class="['relative w-full bg-background', row.heightClass ?? 'min-h-16']" :style="rowStyle(row)">
              <div class="absolute inset-0 grid" :style="scheduleTimelineStyle">
                <div v-for="index in scheduleQuarterSlotCount" :key="index" :class="['border-r border-grey/70', index === scheduleQuarterSlotCount ? 'border-r-0' : '']" />
              </div>

              <div
                v-for="block in blocksForRow(row.id)"
                :key="block.id"
                :style="blockStyle(block)"
                class="absolute min-w-20 rounded-sm border border-grey border-l-4 border-l-turquesa bg-white px-1.5 py-1 text-[0.58rem] leading-tight sm:min-w-28 sm:px-2 sm:text-[1rem]"
              >
                <p class="font-medium text-black">{{ block.title }}</p>
                <p v-if="block.meta" class="mt-0.5 text-[0.54rem] font-semibold text-turquesa sm:mt-1 sm:text-[0.8rem]">{{ block.meta }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="activeScheduleConfig.notes.length"
        class="grid gap-2 px-5 py-4 text-[0.6rem] uppercase tracking-wide text-foreground/70 sm:px-6 lg:px-8"
      >
        <p v-for="note in activeScheduleConfig.notes" :key="note">{{ note }}</p>
      </div>
    </div>
  </section>
</template>
