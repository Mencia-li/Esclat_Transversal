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
              ESCLAT es un festival de música, pensament i creativitat en Las Naves de Valencia. Durante tres días combina conciertos, talleres, exposiciones, cine y charlas.
            </p>
            <p>
              Su nombre significa estallido: una forma de hablar de todo eso que crece por dentro y a veces cuesta poner en palabras.
            </p>
            <p>
              Salud mental, estándares de belleza e industria del entretenimiento atraviesan el programa. La música abre la puerta emocional; los talleres y conversaciones ayudan a cruzarla.
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
          Un espacio industrial reconvertido en centro de creación que lleva años siendo escenario de
          proyectos culturales en Valencia. Grande sin ser frío, con patios exteriores, salas de distintos
          tamaños y una acústica que funciona igual para un concierto que para una conversación en círculo.
        </p>
        <p class="mt-5 max-w-4xl text-sm leading-relaxed text-foreground/90 sm:text-base">
          ESCLAT ocupa tres días sus naves, pasillos y patios.
        </p>
      </div>

      <div class="border-b border-foreground bg-background px-6 py-6 sm:px-8 lg:px-10">
        <div class="grid gap-6 lg:grid-cols-2 lg:items-start">
          <article class="border border-foreground bg-background lg:mt-[2.375rem]" aria-live="polite">
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
              alt="Mapa de Las Naves 1 y 2, planta baja"
              class="h-auto w-full select-none"
              draggable="false"
            />

            <svg
              class="absolute inset-0 h-full w-full"
              viewBox="0 0 3508 2481"
              role="group"
              aria-label="Mapa interactivo de Las Naves 1 y 2, planta baja"
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
            <article class="border border-foreground bg-background lg:mt-[2.3rem]" aria-live="polite">
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
                alt="Mapa de Las Naves 1 y 2, planta superior"
                class="h-auto w-full select-none"
                draggable="false"
              />

              <svg
                class="absolute inset-0 h-full w-full"
                viewBox="0 0 1600 1131"
                role="group"
                aria-label="Mapa interactivo de Las Naves 1 y 2, planta superior"
              >
                <defs v-if="hoveredLevelTwoMapZoneShapes.length">
                  <mask id="map-level-two-dim-mask" maskUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="1600" height="1131" fill="white" />
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
                  width="1600"
                  height="1131"
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

        <div class="mt-6 border-t border-black pt-6">
          <div class="grid gap-6 lg:grid-cols-2 lg:items-start">
            <article class="border border-foreground bg-background lg:mt-[2.1rem]" aria-live="polite">
              <div class="border-b border-foreground px-4 py-3 sm:px-6">
                <h3 class="text-2xl font-semibold uppercase leading-tight text-foreground sm:text-3xl">
                  {{ selectedNaveThreeMapZone.name }}
                </h3>
              </div>
              <div class="p-4 sm:p-6">
                <p class="inline-flex bg-blue_ice px-3 py-2 text-sm font-semibold uppercase text-foreground">
                  {{ selectedNaveThreeMapZone.id }} · {{ selectedNaveThreeMapZone.location }}
                </p>
                <p class="mt-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {{ selectedNaveThreeMapZone.description }}
                </p>
              </div>
            </article>

            <div class="relative w-full overflow-hidden">
              <img
                src="/img/spaces/nave3.png"
                alt="Mapa de Nave 3"
                class="h-auto w-full select-none"
                draggable="false"
              />

              <svg
                class="absolute inset-0 h-full w-full"
                viewBox="0 0 1600 963"
                role="group"
                aria-label="Mapa interactivo de Nave 3"
              >
                <defs v-if="hoveredNaveThreeMapZoneShapes.length">
                  <mask id="map-nave-three-dim-mask" maskUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="1600" height="963" fill="white" />
                    <path
                      v-for="(shape, shapeIndex) in hoveredNaveThreeMapZoneShapes"
                      :key="`nave-three-mask-${shapeIndex}`"
                      :d="shape.d"
                      fill="black"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    />
                  </mask>
                </defs>

                <rect
                  v-if="hoveredNaveThreeMapZoneShapes.length"
                  class="map-dim-overlay"
                  x="0"
                  y="0"
                  width="1600"
                  height="963"
                  mask="url(#map-nave-three-dim-mask)"
                />

                <g
                  v-for="zone in naveThreeMapHotspots"
                  :key="zone.id"
                  class="map-hotspot"
                  :class="{ 'is-active': isNaveThreeMapZoneActive(zone.id) }"
                  role="button"
                  tabindex="0"
                  :aria-label="`${zone.id} ${zone.name}: ${zone.activity}`"
                  @click="selectNaveThreeMapZone(zone.id)"
                  @mouseenter="hoveredNaveThreeMapZoneId = zone.id"
                  @mouseleave="hoveredNaveThreeMapZoneId = null"
                  @focusin="hoveredNaveThreeMapZoneId = zone.id"
                  @focusout="hoveredNaveThreeMapZoneId = null"
                  @keydown.enter.prevent="selectNaveThreeMapZone(zone.id)"
                  @keydown.space.prevent="selectNaveThreeMapZone(zone.id)"
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
                  <p class="text-xs font-semibold uppercase text-muted-foreground">GRATUITO · PLAZA LIMITADA</p>
                  <p class="mt-4 text-sm leading-relaxed text-foreground/90">Talleres temáticos y talleres de instrumento. Plazas limitadas. Inscripción abierta una semana antes del festival a través de esta web.</p>
                </div>
              </article>
            </div>

            <div class="mt-10 grid gap-6 lg:grid-cols-2">
              <article class="grid gap-4 border border-foreground bg-background p-4 sm:grid-cols-[5rem_1fr] sm:gap-5 sm:p-5">
                <div class="flex h-16 w-16 items-center justify-center border border-foreground bg-blue_ice text-foreground text-2xl font-semibold sm:h-20 sm:w-20 sm:text-3xl">1.</div>
                <div class="space-y-2">
                  <h3 class="text-base font-semibold uppercase text-foreground sm:text-lg">Consulta el programa</h3>
                  <p class="text-sm leading-relaxed text-muted-foreground">Revisa qué pasa cada día: viernes, sábado y domingo tienen temática, talleres y charla propios. Elige lo que más te interesa.</p>
                </div>
              </article>

              <article class="grid gap-4 border border-foreground bg-background p-4 sm:grid-cols-[5rem_1fr] sm:gap-5 sm:p-5">
                <div class="flex h-16 w-16 items-center justify-center border border-foreground bg-blue_ice text-foreground text-2xl font-semibold sm:h-20 sm:w-20 sm:text-3xl">2.</div>
                <div class="space-y-2">
                  <h3 class="text-base font-semibold uppercase text-foreground sm:text-lg">Inscríbete a los talleres que quieras</h3>
                  <p class="text-sm leading-relaxed text-muted-foreground">Revisa qué pasa cada día: viernes, sábado y domingo tienen temática, talleres y charla propios. Elige lo que más te interesa.</p>
                </div>
              </article>

              <article class="grid gap-4 border border-foreground bg-background p-4 sm:grid-cols-[5rem_1fr] sm:gap-5 sm:p-5">
                <div class="flex h-16 w-16 items-center justify-center border border-foreground bg-blue_ice text-foreground text-2xl font-semibold sm:h-20 sm:w-20 sm:text-3xl">3.</div>
                <div class="space-y-2">
                  <h3 class="text-base font-semibold uppercase text-foreground sm:text-lg">Llega a Las Naves</h3>
                  <p class="text-sm leading-relaxed text-muted-foreground">El festival abre a las 16:00 h cada día. No hay control de entrada: accede directamente al espacio y muévete con libertad entre actividades.</p>
                </div>
              </article>

              <article class="grid gap-4 border border-foreground bg-background p-4 sm:grid-cols-[5rem_1fr] sm:gap-5 sm:p-5">
                <div class="flex h-16 w-16 items-center justify-center border border-foreground bg-blue_ice text-foreground text-2xl font-semibold sm:h-20 sm:w-20 sm:text-3xl">4.</div>
                <div class="space-y-2">
                  <h3 class="text-base font-semibold uppercase text-foreground sm:text-lg">Participa a tu ritmo</h3>
                  <p class="text-sm leading-relaxed text-muted-foreground">Puedes asistir un día, dos o los tres. Entrar y salir cuantas veces quieras. No hay orden obligatorio ni recorrido fijo.</p>
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

const factoriaDescription =
  "Los talleres más participativos del programa: producción musical, creación de personajes y maquillaje sonoro. Dos sesiones por taller cada día."
const visualRoomDescription =
  "Espacio para talleres más íntimos y reflexivos. También alberga la instalación interactiva del domingo sobre algoritmos."
const exposicionesDescription =
  "Cada día acoge una exposición fotográfica diferente vinculada al tema de la jornada. Acceso libre durante todo el horario del festival."
const servicesDescription = "Servicios disponibles durante todo el horario del festival."
const stairsDescription = "Accesos por escalera entre plantas del recinto."
const liftsDescription = "Ascensores disponibles para moverse entre plantas del recinto."

const mapZones: MapZone[] = [
  {
    id: "01",
    name: "La Polivalent",
    activity: "Charlas",
    location: "Nave 1, planta baja",
    description:
      "El espacio principal del festival. Aquí tienen lugar las charlas y conversaciones de cada día, con capacidad para 80 personas y formato abierto al debate.",
    shapes: [
      {
        d: "M2288 633L3329 636L3329 1949L2988 1952L2982 1512L2722 1512L2722 1776L2288 1776Z",
      },
    ],
  },
  {
    id: "02",
    name: "El cuarto de escucha",
    activity: "Instalación",
    location: "Hall La Polivalent",
    description:
      "Una instalación permanente los tres días: entras solo, escuchas cinco minutos y dejas una palabra en el mural. El mural crece durante todo el festival.",
    shapes: [{ d: "M2285 1776L2285 2036L2722 2036L2722 2281L2982 2278L2982 1770Z" }],
  },
  {
    id: "03",
    name: "Sala Factoria",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: factoriaDescription,
    shapes: [],
  },
  {
    id: "04",
    name: "Sala Visual Room",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: visualRoomDescription,
    shapes: [],
  },
  {
    id: "05",
    name: "Sala de exposiciones",
    activity: "Fotografías y álbumes",
    location: "Nave 1, planta baja",
    description: exposicionesDescription,
    shapes: [{ d: "M1318 637L1318 1160L1585 1164L1585 1777L1932 1774L1929 635Z" }],
  },
  {
    id: "06",
    name: "Patios exteriores",
    activity: "Talleres de instrumento",
    location: "Patio 1 y Patio 2",
    description:
      "Los talleres de instrumento en rotación continua ocurren aquí: batería, djembé, ukelele, flauta, percusión latina y teclado. El domingo acoge también la batucada de cierre.",
    shapes: [{ d: "M1935 199H2285V2283H1935Z" }],
  },
  {
    id: "07",
    name: "Patios exteriores",
    activity: "Talleres de instrumento",
    location: "Patio 1 y Patio 2",
    description:
      "Los talleres de instrumento en rotación continua ocurren aquí: batería, djembé, ukelele, flauta, percusión latina y teclado. El domingo acoge también la batucada de cierre.",
    shapes: [{ d: "M180 197H871V2279H180Z" }],
  },
  {
    id: "08",
    name: "Sala de proyecciones",
    activity: "Películas",
    location: "Nave 1, planta baja",
    description:
      "Dos proyecciones por día — documentales y ficción — con debate opcional al terminar. Aforo limitado a 40 personas.",
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
    description: servicesDescription,
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
    description: stairsDescription,
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
    name: "Sala Factoria",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: factoriaDescription,
    shapes: [{ d: "M1041 517H1198V798H1041Z" }],
  },
  {
    id: "04",
    name: "Sala Visual Room",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: visualRoomDescription,
    shapes: [{ d: "M1041 281H1198V516H1041Z" }],
  },
  {
    id: "WC",
    name: "Servicios",
    activity: "Baños",
    location: "Naves 1 y 2, planta superior",
    description: servicesDescription,
    shapes: [
      { d: "M604 517H722V678H604Z" },
      { d: "M1244 281H1362V475H1244Z" },
    ],
  },
  {
    id: "ESC",
    name: "Escaleras",
    activity: "Conexión vertical",
    location: "Naves 1 y 2, planta superior",
    description: stairsDescription,
    shapes: [
      { d: "M604 679H721V798H604Z" },
      { d: "M1245 680H1363V799H1245Z" },
      { d: "M1241 85H1362V198H1241Z" },
    ],
  },
]

const naveThreeMapZones: MapZone[] = [
  {
    id: "01",
    name: "La Polivalent",
    activity: "Charlas",
    location: "Nave 1, planta baja",
    description:
      "El espacio principal del festival. Aquí tienen lugar las charlas y conversaciones de cada día, con capacidad para 80 personas y formato abierto al debate.",
    shapes: [{ d: "M280 787A20 20 0 1 0 240 787A20 20 0 1 0 280 787Z" }],
  },
  {
    id: "02",
    name: "El cuarto de escucha",
    activity: "Instalación",
    location: "Hall La Polivalent",
    description:
      "Una instalación permanente los tres días: entras solo, escuchas cinco minutos y dejas una palabra en el mural. El mural crece durante todo el festival.",
    shapes: [
      { d: "M309 802H392V886H309Z" },
      { d: "M431 803H513V886H431Z" },
    ],
  },
  {
    id: "03",
    name: "Sala Factoria",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: factoriaDescription,
    shapes: [
      { d: "M99 300H253V622H99Z" },
      { d: "M303 301H454V621H303Z" },
    ],
  },
  {
    id: "04",
    name: "Sala Visual Room",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: visualRoomDescription,
    shapes: [
      { d: "M573 303H608V612H573Z" },
      { d: "M611 621H965V655H611Z" },
      { d: "M965 305H1001V617H965Z" },
    ],
  },
  {
    id: "05",
    name: "Sala de exposiciones",
    activity: "Fotografías y álbumes",
    location: "Nave 1, planta baja",
    description: exposicionesDescription,
    shapes: [
      { d: "M1084 303H1122V658H1084Z" },
      { d: "M1476 304H1511V658H1476Z" },
    ],
  },
  {
    id: "WC",
    name: "Servicios",
    activity: "Baños",
    location: "Nave 3",
    description: servicesDescription,
    shapes: [
      { d: "M136 822H221V885H136Z" },
      { d: "M1159 823H1243V888H1159Z" },
    ],
  },
  {
    id: "ESC",
    name: "Escaleras",
    activity: "Conexión vertical",
    location: "Nave 3",
    description: stairsDescription,
    shapes: [
      { d: "M135 694H252V743H135Z" },
      { d: "M303 694H416V743H303Z" },
      { d: "M644 698H762V748H644Z" },
      { d: "M812 697H927V748H812Z" },
      { d: "M1153 697H1268V747H1153Z" },
      { d: "M1324 697H1438V747H1324Z" },
    ],
  },
  {
    id: "ASC",
    name: "Ascensores",
    activity: "Conexión vertical",
    location: "Nave 3",
    description: liftsDescription,
    shapes: [
      { d: "M39 796H136V885H39Z" },
      { d: "M548 798H647V888H548Z" },
      { d: "M1059 797H1157V888H1059Z" },
    ],
  },
]

const mapHotspots = mapZones.filter((zone) => zone.shapes.length > 0)
const levelTwoMapHotspots = levelTwoMapZones.filter((zone) => zone.shapes.length > 0)
const naveThreeMapHotspots = naveThreeMapZones.filter((zone) => zone.shapes.length > 0)
const defaultMapZone = mapZones[0] as MapZone
const defaultLevelTwoMapZone = levelTwoMapZones[0] as MapZone
const defaultNaveThreeMapZone = naveThreeMapZones[0] as MapZone
const selectedMapZoneId = ref("01")
const selectedLevelTwoMapZoneId = ref("03")
const selectedNaveThreeMapZoneId = ref("01")
const hoveredMapZoneId = ref<string | null>(null)
const hoveredLevelTwoMapZoneId = ref<string | null>(null)
const hoveredNaveThreeMapZoneId = ref<string | null>(null)

const selectedMapZone = computed<MapZone>(
  () => mapZones.find((zone) => zone.id === selectedMapZoneId.value) ?? defaultMapZone,
)

const selectedLevelTwoMapZone = computed<MapZone>(
  () => levelTwoMapZones.find((zone) => zone.id === selectedLevelTwoMapZoneId.value) ?? defaultLevelTwoMapZone,
)

const selectedNaveThreeMapZone = computed<MapZone>(
  () => naveThreeMapZones.find((zone) => zone.id === selectedNaveThreeMapZoneId.value) ?? defaultNaveThreeMapZone,
)

const hoveredMapZoneShapes = computed(
  () => mapHotspots.find((zone) => zone.id === hoveredMapZoneId.value)?.shapes ?? [],
)

const hoveredLevelTwoMapZoneShapes = computed(
  () => levelTwoMapHotspots.find((zone) => zone.id === hoveredLevelTwoMapZoneId.value)?.shapes ?? [],
)

const hoveredNaveThreeMapZoneShapes = computed(
  () => naveThreeMapHotspots.find((zone) => zone.id === hoveredNaveThreeMapZoneId.value)?.shapes ?? [],
)

function selectMapZone(zoneId: string) {
  selectedMapZoneId.value = zoneId
}

function selectLevelTwoMapZone(zoneId: string) {
  selectedLevelTwoMapZoneId.value = zoneId
}

function selectNaveThreeMapZone(zoneId: string) {
  selectedNaveThreeMapZoneId.value = zoneId
}

function isMapZoneActive(zoneId: string) {
  return hoveredMapZoneId.value === zoneId
}

function isLevelTwoMapZoneActive(zoneId: string) {
  return hoveredLevelTwoMapZoneId.value === zoneId
}

function isNaveThreeMapZoneActive(zoneId: string) {
  return hoveredNaveThreeMapZoneId.value === zoneId
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
