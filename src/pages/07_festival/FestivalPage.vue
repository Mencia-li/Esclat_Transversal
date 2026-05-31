<template>
  <section class="border-b border-foreground bg-background">
    <div class="mx-auto w-full max-w-368 border-x border-foreground">
      <div class="grid border-b border-foreground lg:grid-cols-[1fr_1.15fr]">
        <div class="relative min-h-64 overflow-hidden border-b border-foreground bg-background lg:min-h-80 lg:border-b-0 lg:border-r">
          <div class="relative z-10 flex h-full items-center justify-center p-8">
            <img
              src="/img/logos/esclat/png/72/vertical-black.png"
              alt="Logo de Esclat"
              class="w-28 sm:w-36 lg:w-44"
            />
          </div>
        </div>

        <div class="bg-blue_ice p-6 sm:p-8 lg:p-10">
          <p class="text-sm font-semibold uppercase text-foreground">Festival.</p>
          <div class="mt-4 space-y-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur.
            </p>
          </div>
        </div>
      </div>

      <div class="border-b border-foreground px-6 py-8 sm:px-8 lg:px-10">
        <p class="text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
          Este festival nace de una necesidad: hablar de lo que cuesta articular en voz alta.
        </p>
      </div>

      <div class="border-b border-foreground bg-turquesa px-6 py-6 sm:px-8 lg:px-10">
        <p class="text-3xl font-normal leading-none text-foreground sm:text-4xl lg:text-5xl">Las Naves.</p>
      </div>

      <div class="border-b border-foreground bg-background px-6 py-8 sm:px-8 lg:px-10">
        <p class="max-w-4xl text-sm leading-relaxed text-foreground/90 sm:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>

      <div class="border-b border-foreground bg-background px-6 py-6 sm:px-8 lg:px-10">
        <div class="grid gap-6 lg:grid-cols-2 lg:items-start">
          <article class="border border-foreground bg-background" aria-live="polite">
            <div class="border-b border-foreground px-4 py-3 sm:px-6">
              <h3 class="text-2xl font-semibold uppercase leading-tight text-foreground sm:text-3xl">
                {{ selectedMapZone.name }}
              </h3>
            </div>
            <div class="p-4 sm:p-6">
              <p class="inline-flex bg-blue_ice px-3 py-2 text-sm font-semibold uppercase text-foreground">
                {{ selectedMapZone.id }} · {{ selectedMapZone.location }}
              </p>
              <p class="mt-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
                {{ selectedMapZone.description }}
              </p>
            </div>
          </article>

          <div class="relative w-full overflow-hidden">
            <img
              src="/img/spaces/naves-1-y2-nivel-1.png"
              alt="Mapa de Las Naves 1 y 2, nivel 1"
              class="h-auto w-full select-none"
              draggable="false"
            />

            <svg
              class="absolute inset-0 h-full w-full"
              viewBox="0 0 3508 2481"
              role="group"
              aria-label="Mapa interactivo de Las Naves 1 y 2, nivel 1"
            >
              <defs v-if="hoveredMapZoneShapes.length">
                <mask id="map-level-one-dim-mask" maskUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="3508" height="2481" fill="white" />
                  <path
                    v-for="(shape, shapeIndex) in hoveredMapZoneShapes"
                    :key="`mask-${shapeIndex}`"
                    :d="shape.d"
                    fill="black"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  />
                </mask>
              </defs>

              <rect
                v-if="hoveredMapZoneShapes.length"
                class="map-dim-overlay"
                x="0"
                y="0"
                width="3508"
                height="2481"
                mask="url(#map-level-one-dim-mask)"
              />

              <g
                v-for="zone in mapHotspots"
                :key="zone.id"
                class="map-hotspot"
                :class="{ 'is-active': isMapZoneActive(zone.id) }"
                role="button"
                tabindex="0"
                :aria-label="`${zone.id} ${zone.name}: ${zone.activity}`"
                @click="selectMapZone(zone.id)"
                @mouseenter="hoveredMapZoneId = zone.id"
                @mouseleave="hoveredMapZoneId = null"
                @focusin="hoveredMapZoneId = zone.id"
                @focusout="hoveredMapZoneId = null"
                @keydown.enter.prevent="selectMapZone(zone.id)"
                @keydown.space.prevent="selectMapZone(zone.id)"
              >
                <path
                  v-for="(shape, shapeIndex) in zone.shapes"
                  :key="`${zone.id}-${shapeIndex}`"
                  :d="shape.d"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                />
              </g>
            </svg>
          </div>
        </div>

        <div class="mt-6 border-t border-black pt-6">
          <div class="grid gap-6 lg:grid-cols-2 lg:items-start">
            <article class="border border-foreground bg-background" aria-live="polite">
              <div class="border-b border-foreground px-4 py-3 sm:px-6">
                <h3 class="text-2xl font-semibold uppercase leading-tight text-foreground sm:text-3xl">
                  {{ selectedLevelTwoMapZone.name }}
                </h3>
              </div>
              <div class="p-4 sm:p-6">
                <p class="inline-flex bg-blue_ice px-3 py-2 text-sm font-semibold uppercase text-foreground">
                  {{ selectedLevelTwoMapZone.id }} · {{ selectedLevelTwoMapZone.location }}
                </p>
                <p class="mt-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {{ selectedLevelTwoMapZone.description }}
                </p>
              </div>
            </article>

            <div class="relative w-full overflow-hidden">
              <img
                src="/img/spaces/naves-1-y2-nivel-2.png"
                alt="Mapa de Las Naves 1 y 2, nivel 2"
                class="h-auto w-full select-none"
                draggable="false"
              />

              <svg
                class="absolute inset-0 h-full w-full"
                viewBox="0 0 3509 2481"
                role="group"
                aria-label="Mapa interactivo de Las Naves 1 y 2, nivel 2"
              >
                <defs v-if="hoveredLevelTwoMapZoneShapes.length">
                  <mask id="map-level-two-dim-mask" maskUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="3509" height="2481" fill="white" />
                    <path
                      v-for="(shape, shapeIndex) in hoveredLevelTwoMapZoneShapes"
                      :key="`level-two-mask-${shapeIndex}`"
                      :d="shape.d"
                      fill="black"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    />
                  </mask>
                </defs>

                <rect
                  v-if="hoveredLevelTwoMapZoneShapes.length"
                  class="map-dim-overlay"
                  x="0"
                  y="0"
                  width="3509"
                  height="2481"
                  mask="url(#map-level-two-dim-mask)"
                />

                <g
                  v-for="zone in levelTwoMapHotspots"
                  :key="zone.id"
                  class="map-hotspot"
                  :class="{ 'is-active': isLevelTwoMapZoneActive(zone.id) }"
                  role="button"
                  tabindex="0"
                  :aria-label="`${zone.id} ${zone.name}: ${zone.activity}`"
                  @click="selectLevelTwoMapZone(zone.id)"
                  @mouseenter="hoveredLevelTwoMapZoneId = zone.id"
                  @mouseleave="hoveredLevelTwoMapZoneId = null"
                  @focusin="hoveredLevelTwoMapZoneId = zone.id"
                  @focusout="hoveredLevelTwoMapZoneId = null"
                  @keydown.enter.prevent="selectLevelTwoMapZone(zone.id)"
                  @keydown.space.prevent="selectLevelTwoMapZone(zone.id)"
                >
                  <path
                    v-for="(shape, shapeIndex) in zone.shapes"
                    :key="`${zone.id}-${shapeIndex}`"
                    :d="shape.d"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Acceso -->
      <section class="border-b border-foreground bg-background">
        <div class="mx-auto w-full max-w-368">
          <div class="border-b border-foreground bg-turquesa">
            <div class="px-6 py-4 sm:px-8 lg:px-10">
              <h2 class="text-3xl font-normal leading-none text-foreground sm:text-4xl lg:text-5xl">Acceso.</h2>
            </div>
          </div>

          <div class="px-6 py-8 sm:px-8 lg:px-10">
            <div class="grid gap-6 lg:grid-cols-2">
              <article class="rounded-md border border-foreground bg-background shadow-sm">
                <div class="bg-blue_ice px-6 py-4 border-b border-foreground">
                  <h3 class="text-lg font-semibold uppercase text-foreground">LIBRE ACCESO</h3>
                </div>
                <div class="p-6">
                  <p class="text-xs font-semibold uppercase text-muted-foreground">GRATUITO · SIN RESERVA</p>
                  <p class="mt-4 text-sm leading-relaxed text-foreground/90">Conciertos, exposiciones fotográficas, proyecciones de cine, el cuarto de escucha, la zona de stands y los espacios comunes. Ven cuando quieras, hasta completar aforo.</p>
                </div>
              </article>

              <article class="rounded-md border border-foreground bg-background shadow-sm">
                <div class="bg-blue_ice px-6 py-4 border-b border-foreground">
                  <h3 class="text-lg font-semibold uppercase text-foreground">CON INSCRIPCIÓN</h3>
                </div>
                <div class="p-6">
                  <p class="text-xs font-semibold uppercase text-muted-foreground">GRATUITO · PLAZAS LIMITADAS</p>
                  <p class="mt-4 text-sm leading-relaxed text-foreground/90">Talleres temáticos y talleres de instrumento. Plazas limitadas; la inscripción se abrirá una semana antes del festival a través de esta web.</p>
                </div>
              </article>
            </div>

            <div class="mt-10 grid gap-6 lg:grid-cols-2">
              <article class="grid gap-4 border border-foreground bg-background p-4 sm:grid-cols-[5rem_1fr] sm:gap-5 sm:p-5">
                <div class="flex h-16 w-16 items-center justify-center border border-foreground bg-blue_ice text-foreground text-2xl font-semibold sm:h-20 sm:w-20 sm:text-3xl">1.</div>
                <div class="space-y-2">
                  <h3 class="text-base font-semibold uppercase text-foreground sm:text-lg">Consulta el programa</h3>
                  <p class="text-sm leading-relaxed text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget est vel lacus feugiat varius.</p>
                </div>
              </article>

              <article class="grid gap-4 border border-foreground bg-background p-4 sm:grid-cols-[5rem_1fr] sm:gap-5 sm:p-5">
                <div class="flex h-16 w-16 items-center justify-center border border-foreground bg-blue_ice text-foreground text-2xl font-semibold sm:h-20 sm:w-20 sm:text-3xl">2.</div>
                <div class="space-y-2">
                  <h3 class="text-base font-semibold uppercase text-foreground sm:text-lg">Inscríbete a los talleres</h3>
                  <p class="text-sm leading-relaxed text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti, donec nec mauris non mi facilisis facilisis.</p>
                </div>
              </article>

              <article class="grid gap-4 border border-foreground bg-background p-4 sm:grid-cols-[5rem_1fr] sm:gap-5 sm:p-5">
                <div class="flex h-16 w-16 items-center justify-center border border-foreground bg-blue_ice text-foreground text-2xl font-semibold sm:h-20 sm:w-20 sm:text-3xl">3.</div>
                <div class="space-y-2">
                  <h3 class="text-base font-semibold uppercase text-foreground sm:text-lg">Llega a Las Naves</h3>
                  <p class="text-sm leading-relaxed text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae sem ac urna faucibus posuere.</p>
                </div>
              </article>

              <article class="grid gap-4 border border-foreground bg-background p-4 sm:grid-cols-[5rem_1fr] sm:gap-5 sm:p-5">
                <div class="flex h-16 w-16 items-center justify-center border border-foreground bg-blue_ice text-foreground text-2xl font-semibold sm:h-20 sm:w-20 sm:text-3xl">4.</div>
                <div class="space-y-2">
                  <h3 class="text-base font-semibold uppercase text-foreground sm:text-lg">Participa a tu ritmo</h3>
                  <p class="text-sm leading-relaxed text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu lacus sed urna interdum finibus.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- Normas (replicando FAQ) -->
      <section class="mt-6 border-y border-foreground bg-background sm:mt-8 lg:mt-10">
        <div data-reveal class="border-b border-foreground bg-turquesa px-5 py-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-normal leading-none text-foreground sm:text-4xl lg:text-5xl">Normas.</h2>
        </div>

        <Accordion
          type="single"
          collapsible
          default-value="seguro"
          data-reveal
          style="--reveal-delay: 120ms"
          class="border-t border-foreground"
        >
          <AccordionItem v-for="rule in safetyRules" :key="rule.id" :value="rule.id" class="border-foreground">
            <AccordionTrigger
              class="min-h-14 items-center gap-3 rounded-none px-5 py-0 text-foreground transition-colors hover:bg-grey hover:text-foreground data-[state=open]:bg-background data-[state=open]:hover:bg-background sm:min-h-16 sm:gap-4 sm:px-6 lg:px-8 [&_svg]:mt-0 [&_svg]:text-foreground"
            >
              <span class="text-left text-base font-normal leading-tight sm:text-lg lg:text-xl">
                {{ rule.title }}
              </span>
            </AccordionTrigger>
            <AccordionContent class="px-5 pb-5 text-base leading-relaxed text-foreground/80 sm:px-6 sm:text-lg lg:px-8 lg:pb-6 lg:text-xl lg:leading-relaxed">
              {{ rule.summary }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { safetyRules } from "@/data/festival"

type MapShape = {
  d: string
}

type MapZone = {
  id: string
  name: string
  activity: string
  location: string
  description: string
  shapes: MapShape[]
}

const mapZones: MapZone[] = [
  {
    id: "01",
    name: "La Polivalent",
    activity: "Charlas",
    location: "Nave 1, planta baja",
    description: "Charlas y conversaciones del festival en La Polivalent.",
    shapes: [
      {
        d: "M2288 633L3329 636L3329 1949L2988 1952L2982 1512L2722 1512L2722 1776L2288 1776Z",
      },
    ],
  },
  {
    id: "02",
    name: "Hall La Polivalent",
    activity: "Sala de espera",
    location: "Nave 1, planta baja",
    description: "Zona de paso y espera antes de entrar a La Polivalent.",
    shapes: [{ d: "M2285 1776L2285 2036L2722 2036L2722 2281L2982 2278L2982 1770Z" }],
  },
  {
    id: "03",
    name: "Factoria",
    activity: "Talleres",
    location: "Nave 3",
    description: "Espacio reservado para talleres.",
    shapes: [],
  },
  {
    id: "04",
    name: "Visual Room",
    activity: "Talleres",
    location: "Nave 3",
    description: "Espacio reservado para talleres visuales.",
    shapes: [],
  },
  {
    id: "05",
    name: "Sala de exposiciones",
    activity: "Fotografías y álbumes",
    location: "Nave 2, planta baja",
    description: "Exposición de fotografías y álbumes.",
    shapes: [{ d: "M1318 637L1318 1160L1585 1164L1585 1777L1932 1774L1929 635Z" }],
  },
  {
    id: "06",
    name: "Patio 1",
    activity: "Merch",
    location: "Naves 1 y 2, planta baja",
    description: "Stands de venta de merch.",
    shapes: [{ d: "M1935 199H2285V2283H1935Z" }],
  },
  {
    id: "07",
    name: "Patio 2",
    activity: "Comida",
    location: "Nave 2, planta baja",
    description: "Stands de venta de comida.",
    shapes: [{ d: "M180 197H871V2279H180Z" }],
  },
  {
    id: "08",
    name: "Sala de cine",
    activity: "Películas",
    location: "Nave 2, planta baja",
    description: "Sala dedicada a las proyecciones de películas.",
    shapes: [{ d: "M1493 1946H1930V2281H1493Z" }],
  },
  {
    id: "09",
    name: "Sala de podcast",
    activity: "Entrevistas",
    location: "Nave 1, planta baja",
    description: "Espacio para podcasts y entrevistas.",
    shapes: [{ d: "M2288 2037H2722V2279H2288Z" }],
  },
  {
    id: "INFO",
    name: "Información",
    activity: "Ventanilla",
    location: "Nave 2, planta baja",
    description: "Punto de información en ventanilla para resolver dudas del festival.",
    shapes: [{ d: "M875 1944H1231V2282H875Z" }],
  },
  {
    id: "CAFÉ",
    name: "Cafetería",
    activity: "Cafetería",
    location: "Nave 2, planta baja",
    description: "Zona de cafetería.",
    shapes: [{ d: "M878 632H1231V1775H878Z" }],
  },
  {
    id: "WC",
    name: "Servicios",
    activity: "Baños",
    location: "Naves 1 y 2, planta baja",
    description: "Servicios disponibles en ambas naves.",
    shapes: [
      { d: "M1317 1163H1580V1509H1317Z" },
      { d: "M2987 1951H3325V2283H2987Z" },
    ],
  },
  {
    id: "ESC",
    name: "Escaleras",
    activity: "Conexión vertical",
    location: "Naves 1 y 2, planta baja",
    description: "Accesos por escalera hacia otros niveles del espacio.",
    shapes: [
      { d: "M1318 1512H1585V1773H1318Z" },
      { d: "M2722 1514H2982V1768H2722Z" },
      { d: "M1316 197H1583V464H1316Z" },
      { d: "M2722 198H2982V458H2722Z" },
    ],
  },
]

const levelTwoMapZones: MapZone[] = [
  {
    id: "03",
    name: "Factoria",
    activity: "Talleres",
    location: "Naves 1 y 2, nivel 2",
    description: "Espacio reservado para talleres.",
    shapes: [{ d: "M1695 1155H2042V1775H1695Z" }],
  },
  {
    id: "04",
    name: "Visual Room",
    activity: "Talleres",
    location: "Naves 1 y 2, nivel 2",
    description: "Espacio reservado para talleres visuales.",
    shapes: [{ d: "M1695 636H2042V1154H1695Z" }],
  },
  {
    id: "WC",
    name: "Servicios",
    activity: "Baños",
    location: "Naves 1 y 2, nivel 2",
    description: "Servicios disponibles en el nivel 2.",
    shapes: [
      { d: "M737 1156H994V1509H737Z" },
      { d: "M2144 637H2401V1062H2144Z" },
    ],
  },
  {
    id: "ESC",
    name: "Escaleras",
    activity: "Conexión vertical",
    location: "Naves 1 y 2, nivel 2",
    description: "Accesos por escalera hacia otros niveles del espacio.",
    shapes: [
      { d: "M737 1508H997V1775H737Z" },
      { d: "M2140 1512H2400V1773H2140Z" },
      { d: "M2138 207H2401V452H2138Z" },
    ],
  },
]

const mapHotspots = mapZones.filter((zone) => zone.shapes.length > 0)
const levelTwoMapHotspots = levelTwoMapZones.filter((zone) => zone.shapes.length > 0)
const defaultMapZone = mapZones[0] as MapZone
const defaultLevelTwoMapZone = levelTwoMapZones[0] as MapZone
const selectedMapZoneId = ref("01")
const selectedLevelTwoMapZoneId = ref("03")
const hoveredMapZoneId = ref<string | null>(null)
const hoveredLevelTwoMapZoneId = ref<string | null>(null)

const selectedMapZone = computed<MapZone>(
  () => mapZones.find((zone) => zone.id === selectedMapZoneId.value) ?? defaultMapZone,
)

const selectedLevelTwoMapZone = computed<MapZone>(
  () => levelTwoMapZones.find((zone) => zone.id === selectedLevelTwoMapZoneId.value) ?? defaultLevelTwoMapZone,
)

const hoveredMapZoneShapes = computed(
  () => mapHotspots.find((zone) => zone.id === hoveredMapZoneId.value)?.shapes ?? [],
)

const hoveredLevelTwoMapZoneShapes = computed(
  () => levelTwoMapHotspots.find((zone) => zone.id === hoveredLevelTwoMapZoneId.value)?.shapes ?? [],
)

function selectMapZone(zoneId: string) {
  selectedMapZoneId.value = zoneId
}

function selectLevelTwoMapZone(zoneId: string) {
  selectedLevelTwoMapZoneId.value = zoneId
}

function isMapZoneActive(zoneId: string) {
  return hoveredMapZoneId.value === zoneId
}

function isLevelTwoMapZoneActive(zoneId: string) {
  return hoveredLevelTwoMapZoneId.value === zoneId
}
</script>

<style scoped>
.map-hotspot {
  --map-hotspot-stroke-width: 0;
  --map-hotspot-active-stroke-width: 4;

  cursor: pointer;
  outline: none;
}

.map-dim-overlay {
  fill: rgb(255 255 255 / 68%);
  pointer-events: none;
  transition: opacity 160ms ease;
}

.map-hotspot path {
  fill: transparent;
  stroke: transparent;
  stroke-width: var(--map-hotspot-stroke-width);
  pointer-events: all;
  shape-rendering: geometricPrecision;
  transition:
    fill 160ms ease,
    stroke 160ms ease,
    stroke-width 160ms ease;
  vector-effect: non-scaling-stroke;
}

.map-hotspot.is-active path,
.map-hotspot:focus-visible path {
  fill: rgb(42 217 221 / 14%);
  stroke: #000;
  stroke-width: 3;
}
</style>
