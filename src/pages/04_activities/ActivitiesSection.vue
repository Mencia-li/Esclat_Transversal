<script setup lang="ts">
import { ref } from "vue"
import { RouterLink } from "vue-router"
import { festivalDays, festivalInfo } from "@/data/festival"

const tabItems = [
  { id: "experiencia", label: "Experiencia." },
  { id: "horarios", label: "Horarios." },
] as const

type TabId = (typeof tabItems)[number]["id"]

const tabPanels: Record<TabId, string> = {
  experiencia: "actividades-panel-experiencia",
  horarios: "actividades-panel-horarios",
}

const activeTab = ref<TabId>("experiencia")

const scheduleDays = festivalDays.map((day) => ({ id: day.id, label: day.date }))
const activeScheduleDay = ref(scheduleDays[0]?.id ?? "23-10")

const timeSlots = Array.from({ length: 9 }, (_, index) => 16 + index)
const scheduleStart = timeSlots[0] ?? 16
const scheduleEnd = timeSlots[timeSlots.length - 1] ?? 24
const scheduleSpan = scheduleEnd - scheduleStart

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

const scheduleRows: ScheduleRow[] = [
  { id: "sala-factoria", label: "Sala Factoria", sublabel: "Talleres A" },
  { id: "sala-visual", label: "Sala Visual Room", sublabel: "Talleres B" },
  { id: "nave-3", label: "Nave 3 - Auditorio", sublabel: "Conciertos" },
  { id: "la-polivalent", label: "La Polivalent", sublabel: "Charlas" },
  { id: "expos", label: "Sala de Expos.", sublabel: "Exposiciones" },
  { id: "podcast", label: "Sala Podcast", sublabel: "Entrevistas" },
  { id: "proyecciones", label: "Sala Proyecciones", sublabel: "Documentales" },
  { id: "hall", label: "Hall - La Polivalent", sublabel: "Instalacion" },
  { id: "patio-1", label: "Patio 1", sublabel: "Talleres de Instrumento", heightClass: "min-h-24" },
  { id: "patios", label: "Patios y Pasillos", sublabel: "Stands & Merch" },
]

const scheduleBlocks: ScheduleBlock[] = [
  { id: "taller-1", rowId: "sala-factoria", title: "Produccion musical", meta: "16:15", start: 16.25, end: 17.0 },
  { id: "taller-2", rowId: "sala-factoria", title: "Produccion musical", meta: "17:25", start: 17.4, end: 18.1 },
  { id: "sonido-1", rowId: "sala-visual", title: "Sonido e identidad", meta: "16:25", start: 16.4, end: 17.1 },
  { id: "sonido-2", rowId: "sala-visual", title: "Sonido e identidad", meta: "17:35", start: 17.6, end: 18.3 },
  { id: "artista-1", rowId: "nave-3", title: "Artista 1", meta: "20:00", start: 20.0, end: 20.8 },
  { id: "artista-2", rowId: "nave-3", title: "Artista 2", meta: "20:45", start: 20.75, end: 21.6 },
  { id: "artista-3", rowId: "nave-3", title: "Artista 3", meta: "21:30", start: 21.5, end: 22.3 },
  { id: "artista-main", rowId: "nave-3", title: "Artista Main", meta: "22:15", start: 22.25, end: 24.0 },
  {
    id: "charla",
    rowId: "la-polivalent",
    title: "Que es la musica alternativa hoy?",
    meta: "18:30",
    start: 18.5,
    end: 19.4,
  },
  {
    id: "expo",
    rowId: "expos",
    title: "Nombre de la exposicion",
    meta: "Exposicion de fotografia 16:00 - 19:30",
    start: 16.0,
    end: 19.5,
  },
  {
    id: "podcast",
    rowId: "podcast",
    title: "Entrevistas grabadas con artistas",
    meta: "16:00 - 19:00",
    start: 16.0,
    end: 19.0,
  },
  { id: "doc-1", rowId: "proyecciones", title: "Nombre documental", meta: "16:00 - 17:45", start: 16.0, end: 17.75 },
  {
    id: "doc-2",
    rowId: "proyecciones",
    title: "Nombre documental",
    meta: "Documental/Pelicula 18:00 - 20:00",
    start: 18.0,
    end: 20.0,
  },
  {
    id: "instalacion",
    rowId: "hall",
    title: "El cuarto de escucha",
    meta: "Instalacion 16:00 - 20:00",
    start: 16.0,
    end: 20.0,
  },
  { id: "patio-a", rowId: "patio-1", title: "Taller C", meta: "16:00", start: 16.0, end: 16.5, level: 0, tone: "soft" },
  { id: "patio-b", rowId: "patio-1", title: "Taller D", meta: "16:35", start: 16.6, end: 17.1, level: 1, tone: "soft" },
  { id: "patio-c", rowId: "patio-1", title: "Taller C", meta: "17:10", start: 17.1, end: 17.6, level: 0, tone: "soft" },
  { id: "patio-d", rowId: "patio-1", title: "Taller D", meta: "17:45", start: 17.75, end: 18.25, level: 1, tone: "soft" },
  { id: "patio-e", rowId: "patio-1", title: "Taller C", meta: "18:20", start: 18.35, end: 18.85, level: 0, tone: "soft" },
  { id: "patio-f", rowId: "patio-1", title: "Taller D", meta: "18:55", start: 18.95, end: 19.45, level: 1, tone: "soft" },
  {
    id: "stands",
    rowId: "patios",
    title: "Stands & Merch",
    meta: "Comida, bebida y merchandising · 16:00 - 00:00",
    start: 16.0,
    end: 24.0,
    tone: "soft",
  },
]

function blocksForRow(rowId: ScheduleRow["id"]) {
  return scheduleBlocks.filter((block) => block.rowId === rowId)
}

function blockStyle(block: ScheduleBlock) {
  const safeStart = Math.max(block.start, scheduleStart)
  const safeEnd = Math.min(block.end, scheduleEnd)
  const left = ((safeStart - scheduleStart) / scheduleSpan) * 100
  const width = ((safeEnd - safeStart) / scheduleSpan) * 100
  const top = 0.5 + (block.level ?? 0) * 1.35

  return {
    left: `${left}%`,
    width: `${width}%`,
    top: `${top}rem`,
  }
}

function formatHour(hour: number) {
  const normalized = hour === 24 ? 0 : hour
  return `${String(normalized).padStart(2, "0")}:00`
}

const activityBlocks = [
  {
    id: "talleres",
    title: "Talleres.",
    summary:
      "Producción musical, collage, maquillaje, movimiento y creación de objetos para transformar los temas del festival en práctica.",
    className: "bg-background text-foreground",
    to: undefined,
  },
  {
    id: "charlas",
    title: "Charlas.",
    summary:
      "Conversaciones en La Polivalent con formato abierto, preguntas del público y enfoque accesible.",
    className: "bg-[#A9FCE6] text-foreground",
    to: undefined,
  },
  {
    id: "exposiciones",
    title: "Exposiciones.",
    summary:
      "Tres exposiciones fotográficas sobre salud mental, cuerpo, fama, privacidad e industria musical.",
    className: "bg-[#A9FCE6] text-foreground",
    to: undefined,
  },
  {
    id: "stands-merch",
    title: "Tienda.",
    summary:
      "Food trucks, bebidas, merchandising oficial y espacios comunes abiertos durante todo el horario del festival.",
    className: "bg-background text-foreground",
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
          'flex min-h-16 items-center px-5 py-4 text-left text-3xl font-normal leading-none transition-colors sm:min-h-20 sm:px-6 sm:text-4xl lg:px-8 lg:text-5xl',
          index === 0 ? 'border-r border-foreground' : '',
          activeTab === tab.id
            ? 'bg-[#A9FCE6] text-foreground'
            : 'bg-background text-foreground',
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
      class="grid grid-cols-2"
    >
      <component
        :is="block.to ? RouterLink : 'article'"
        v-for="block in activityBlocks"
        :key="block.id"
        :to="block.to"
        :class="[
          'block min-h-44 border-b border-foreground p-4 outline-none transition odd:border-r [&:nth-last-child(-n+2)]:border-b-0 sm:min-h-52 sm:p-6 lg:min-h-60 lg:p-8',
          block.to ? 'hover:brightness-95 focus-visible:ring-2 focus-visible:ring-ring' : '',
          block.className,
        ]"
      >
        <h3 class="text-xl font-normal leading-none sm:text-2xl lg:text-3xl">{{ block.title }}</h3>
        <p class="mt-5 max-w-2xl text-xs leading-relaxed sm:mt-8 sm:text-sm lg:text-base">
          {{ block.summary }}
        </p>
      </component>
    </div>

    <div
      v-else
      :id="tabPanels.horarios"
      role="tabpanel"
      :aria-labelledby="'actividades-tab-horarios'"
      data-reveal
      class="grid"
    >
      <div class="grid border-b border-foreground">
        <div class="grid grid-cols-[12rem_repeat(3,minmax(0,1fr))] border-b border-foreground">
          <div class="border-r border-foreground" />
          <button
            v-for="(day, index) in scheduleDays"
            :key="day.id"
            type="button"
            :class="[
              'px-4 py-3 text-center text-sm font-medium uppercase tracking-wide transition-colors',
              index < scheduleDays.length - 1 ? 'border-r border-foreground' : '',
              activeScheduleDay === day.id
                ? 'bg-[#A9FCE6] text-foreground'
                : 'bg-background text-foreground hover:bg-[#A9FCE6]',
            ]"
            @click="activeScheduleDay = day.id"
          >
            {{ day.label }}
          </button>
        </div>

        <div class="grid grid-cols-[12rem_repeat(8,minmax(0,1fr))] border-b border-foreground text-[0.65rem] uppercase tracking-widest">
          <div class="border-r border-foreground px-4 py-2 text-left">{{ festivalInfo.hours }}</div>
          <div
            v-for="(slot, index) in timeSlots.slice(0, -1)"
            :key="slot"
            :class="[
              'py-2 text-center',
              index < timeSlots.length - 2 ? 'border-r border-foreground' : '',
            ]"
          >
            {{ formatHour(slot) }}
          </div>
        </div>

        <div v-for="row in scheduleRows" :key="row.id" class="grid grid-cols-[12rem_minmax(0,1fr)] border-b border-foreground last:border-b-0">
          <div class="flex flex-col justify-center gap-1 border-r border-foreground px-4 py-4 text-left">
            <span class="text-xs font-semibold uppercase tracking-wide">{{ row.label }}</span>
            <span class="text-[0.65rem] uppercase tracking-wide text-foreground/70">{{ row.sublabel }}</span>
          </div>

          <div :class="['relative w-full', row.heightClass ?? 'min-h-16']">
            <div class="absolute inset-0 grid grid-cols-8">
              <div v-for="index in 8" :key="index" :class="['border-r border-foreground/60', index === 8 ? 'border-r-0' : '']" />
            </div>

            <div
              v-for="block in blocksForRow(row.id)"
              :key="block.id"
              :style="blockStyle(block)"
              :class="[
                'absolute rounded-sm border border-foreground px-2 py-1 text-[0.6rem] leading-tight sm:text-[0.65rem]',
                block.tone === 'soft' ? 'bg-[#A9FCE6]/70' : 'bg-[#A9FCE6]',
              ]"
            >
              <p class="font-medium uppercase tracking-wide">{{ block.title }}</p>
              <p v-if="block.meta" class="mt-1 text-[0.55rem] uppercase tracking-wide text-foreground/70">{{ block.meta }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-2 px-5 py-4 text-[0.6rem] uppercase tracking-wide text-foreground/70 sm:px-6 lg:px-8">
        <p>*Talleres de instrumento: 16:00 - 19:50. Taller C: caja y bombo. Taller D: djembes colectivo. Rotacion cada 35-40 minutos.</p>
        <p>*Patios y pasillos: comida, bebida y merchandising habilitado de manera permanente.</p>
      </div>
    </div>
  </section>
</template>
