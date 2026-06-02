<script setup lang="ts">
import { computed, ref } from "vue"
import type { FestivalMapConfig, FestivalMapZone } from "./festivalMaps"

const props = defineProps<{
  map: FestivalMapConfig
}>()

const selectedZoneId = ref(props.map.defaultZoneId)
const hoveredZoneId = ref<string | null>(null)

const emptyZone: FestivalMapZone = {
  id: "",
  name: "Espacio",
  activity: "",
  location: "",
  description: "",
  shapes: [],
}

const maskId = computed(() => `map-${props.map.id}-dim-mask`)
const hotspots = computed(() => props.map.zones.filter((zone) => zone.shapes.length > 0))
const selectedZone = computed<FestivalMapZone>(
  () => props.map.zones.find((zone) => zone.id === selectedZoneId.value) ?? props.map.zones[0] ?? emptyZone,
)
const hoveredZoneShapes = computed(
  () => hotspots.value.find((zone) => zone.id === hoveredZoneId.value)?.shapes ?? [],
)

// El texto queda seleccionado al hacer click; el resaltado del plano solo responde a hover/focus.
function selectZone(zoneId: string) {
  selectedZoneId.value = zoneId
}

function isZoneHovered(zoneId: string) {
  return hoveredZoneId.value === zoneId
}
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-2 lg:items-start">
    <article
      class="festival-map-info border border-foreground bg-background"
      :style="{ '--map-info-offset': map.infoOffset }"
      aria-live="polite"
    >
      <div class="border-b border-foreground px-4 py-3 sm:px-6">
        <h3 class="text-2xl font-semibold uppercase leading-tight text-foreground sm:text-3xl">
          {{ selectedZone.name }}
        </h3>
      </div>
      <div class="p-4 sm:p-6">
        <p class="inline-flex bg-blue_ice px-3 py-2 text-sm font-semibold uppercase text-foreground">
          {{ selectedZone.id }} · {{ selectedZone.location }}
        </p>
        <p class="mt-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
          {{ selectedZone.description }}
        </p>
      </div>
    </article>

    <div class="relative w-full overflow-hidden">
      <img
        :src="map.image"
        :alt="map.alt"
        class="h-auto w-full select-none"
        draggable="false"
      />

      <svg
        class="absolute inset-0 h-full w-full"
        :viewBox="map.viewBox"
        role="group"
        :aria-label="map.ariaLabel"
      >
        <defs v-if="hoveredZoneShapes.length">
          <mask :id="maskId" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" :width="map.width" :height="map.height" fill="white" />
            <path
              v-for="(shape, shapeIndex) in hoveredZoneShapes"
              :key="`mask-${shapeIndex}`"
              :d="shape.d"
              fill="black"
              fill-rule="evenodd"
              clip-rule="evenodd"
            />
          </mask>
        </defs>

        <rect
          v-if="hoveredZoneShapes.length"
          class="map-dim-overlay"
          x="0"
          y="0"
          :width="map.width"
          :height="map.height"
          :mask="`url(#${maskId})`"
        />

        <g
          v-for="zone in hotspots"
          :key="zone.id"
          class="map-hotspot"
          :class="{ 'is-active': isZoneHovered(zone.id) }"
          role="button"
          tabindex="0"
          :aria-label="`${zone.id} ${zone.name}: ${zone.activity}`"
          @click="selectZone(zone.id)"
          @mouseenter="hoveredZoneId = zone.id"
          @mouseleave="hoveredZoneId = null"
          @focusin="hoveredZoneId = zone.id"
          @focusout="hoveredZoneId = null"
          @keydown.enter.prevent="selectZone(zone.id)"
          @keydown.space.prevent="selectZone(zone.id)"
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
</template>

<style scoped>
.festival-map-info {
  margin-top: 0;
}

.map-hotspot {
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
  stroke-width: 0;
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

@media (min-width: 1024px) {
  .festival-map-info {
    margin-top: var(--map-info-offset);
  }
}
</style>
