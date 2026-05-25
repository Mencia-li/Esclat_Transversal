<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { RouterLink } from "vue-router"
import type { Artist } from "@/data/festival"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { artistDetails, artistsCarouselItems } from "@/data/festival"

const tabItems = [
  { id: "artistas", label: "Artistas." },
  { id: "cartel", label: "Cartel." },
] as const

type TabId = (typeof tabItems)[number]["id"]

const activeTab = ref<TabId>("artistas")

const visibleCount = ref<6 | 8 | 10>(6)
const carouselRepeatCount = 3
const sourceColumnCount = Math.ceil(artistsCarouselItems.length / 2)

let mediumQuery: MediaQueryList | undefined
let largeQuery: MediaQueryList | undefined
let extraLargeQuery: MediaQueryList | undefined

const carouselOptions = {
  align: "start",
  loop: true,
  slidesToScroll: 1,
  startIndex: sourceColumnCount,
} as const

type CarouselArtist = Artist & {
  image?: string
}

type ArtistColumn = {
  key: string
  artists: CarouselArtist[]
}

const visibleColumnCount = computed(() => Math.max(1, Math.floor(visibleCount.value / 2)))
const columnBasisClass = computed(() => {
  switch (visibleCount.value) {
    case 10:
      return "basis-[calc((100%-2.25rem)/5)]"
    case 8:
      return "basis-[calc((100%-1.75rem)/4)]"
    case 6:
    default:
      return "basis-[calc((100%-1rem)/3)]"
  }
})

const carouselItems = computed<CarouselArtist[]>(() => {
  return artistsCarouselItems.map((artist, index) => ({
    ...artist,
    image: artist.isPlaceholder ? undefined : `/img/artists/artist${index + 1}.jpg`,
  }))
})

const sourceArtistColumns = computed<CarouselArtist[][]>(() => {
  const columns: CarouselArtist[][] = []

  for (let index = 0; index < carouselItems.value.length; index += 2) {
    columns.push(carouselItems.value.slice(index, index + 2))
  }

  return columns
})

const artistColumns = computed<ArtistColumn[]>(() => {
  return Array.from({ length: carouselRepeatCount }, (_, repeatIndex) =>
    sourceArtistColumns.value.map((artists, columnIndex) => ({
      key: `${repeatIndex}-${columnIndex}-${artists.map((artist) => artist.id).join("-")}`,
      artists,
    })),
  ).flat()
})

function updateLayout() {
  if (extraLargeQuery?.matches) {
    visibleCount.value = 10
    return
  }

  if (largeQuery?.matches) {
    visibleCount.value = 8
    return
  }

  if (mediumQuery?.matches) {
    visibleCount.value = 6
    return
  }

  // small screens: show 3 columns (1 carousel item = 1 column with 2 rows)
  visibleCount.value = 6
}

function artistOriginClass(columnIndex: number, rowIndex: number) {
  const visibleLastColumn = visibleColumnCount.value - 1
  const visibleColumn = ((columnIndex % visibleColumnCount.value) + visibleColumnCount.value) % visibleColumnCount.value
  const isTopRow = rowIndex === 0
  const isFirstColumn = visibleColumn === 0
  const isLastColumn = visibleColumn === visibleLastColumn

  if (isTopRow && isFirstColumn) {
    return "origin-top-left"
  }

  if (isTopRow && isLastColumn) {
    return "origin-top-right"
  }

  if (!isTopRow && isFirstColumn) {
    return "origin-bottom-left"
  }

  if (!isTopRow && isLastColumn) {
    return "origin-bottom-right"
  }

  return isTopRow ? "origin-top" : "origin-bottom"
}

function artistDetailRoute(artist: CarouselArtist) {
  if (artist.isPlaceholder || !artistDetails[artist.id]) {
    return undefined
  }

  return { name: "artist-detail", params: { id: artist.id } }
}

onMounted(() => {
  mediumQuery = window.matchMedia("(min-width: 640px)")
  largeQuery = window.matchMedia("(min-width: 1024px)")
  extraLargeQuery = window.matchMedia("(min-width: 1280px)")
  updateLayout()
  mediumQuery.addEventListener("change", updateLayout)
  largeQuery.addEventListener("change", updateLayout)
  extraLargeQuery.addEventListener("change", updateLayout)
})

onBeforeUnmount(() => {
  mediumQuery?.removeEventListener("change", updateLayout)
  largeQuery?.removeEventListener("change", updateLayout)
  extraLargeQuery?.removeEventListener("change", updateLayout)
})
</script>

<template>
  <section class="border-b border-foreground bg-background">
    <div data-reveal role="tablist" class="grid grid-cols-2 border-b border-foreground">
      <button
        v-for="tab in tabItems"
        :key="tab.id"
        :id="`artistas-tab-${tab.id}`"
        type="button"
        role="tab"
        :aria-controls="`artistas-panel-${tab.id}`"
        :aria-selected="activeTab === tab.id"
        :tabindex="activeTab === tab.id ? 0 : -1"
        :class="[
          'flex min-h-16 items-center px-5 py-4 text-left text-3xl font-normal leading-none transition-colors sm:min-h-20 sm:px-6 sm:text-4xl lg:px-8 lg:text-5xl',
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
      v-if="activeTab === 'artistas'"
      id="artistas-panel-artistas"
      role="tabpanel"
      aria-labelledby="artistas-tab-artistas"
      data-reveal
      style="--reveal-delay: 120ms"
      class="px-4 py-4 sm:px-6 lg:px-8"
    >
      <Carousel
        :opts="carouselOptions"
        class="artists-carousel relative mx-auto w-full max-w-full px-4 sm:max-w-216 sm:px-6 lg:max-w-6xl xl:max-w-456"
        aria-label="Carrusel de artistas"
      >
        <CarouselContent class="-ml-2 sm:ml-0">
          <CarouselItem
            v-for="(column, columnIndex) in artistColumns"
            :key="column.key"
            class="pl-1 sm:pl-3"
            :class="columnBasisClass"
          >
            <div class="grid grid-cols-1 gap-2 sm:gap-3">
              <div
                v-for="(artist, rowIndex) in column.artists"
                :key="artist.id"
                class="relative aspect-square overflow-visible p-1"
              >
                <component
                  :is="artistDetailRoute(artist) ? RouterLink : 'div'"
                  :to="artistDetailRoute(artist)"
                  class="group isolate relative block h-full w-full overflow-hidden bg-primary outline-none transition duration-300 z-10 hover:z-20 hover:scale-[1.015] focus-visible:z-20 focus-visible:scale-[1.015]"
                  :class="artistOriginClass(columnIndex - sourceColumnCount, rowIndex)"
                  :aria-label="artistDetailRoute(artist) ? `Ver biografía de ${artist.name}` : undefined"
                >
                  <template v-if="artist.image">
                    <img
                      :src="artist.image"
                      :alt="artist.name"
                      class="absolute inset-0 h-full w-full scale-110 object-cover transition duration-300 group-hover:scale-100 group-focus-visible:scale-100"
                      loading="lazy"
                    />
                    <div class="absolute inset-0 bg-linear-to-t from-background/75 via-transparent to-transparent" />
                    <span class="absolute right-1 top-1 bg-background px-1 py-0.5 text-xs leading-none text-foreground z-30 sm:right-2 sm:top-2 sm:text-base">
                      {{ artist.date }}
                    </span>
                    <h3 class="absolute bottom-3 left-1 max-w-[calc(100%-0.5rem)] text-base font-normal uppercase leading-none text-foreground z-30 sm:bottom-3 sm:left-2 sm:max-w-[calc(100%-1rem)] sm:text-xl lg:text-2xl">
                      {{ artist.name }}
                    </h3>
                  </template>

                  <template v-else>
                    <div class="flex h-full flex-col justify-between p-2 pb-3 text-primary-foreground sm:p-4 sm:pb-4">
                      <span class="self-end bg-background px-1 py-0.5 text-xs leading-none text-foreground z-30 sm:text-base">
                        {{ artist.date }}
                      </span>
                      <h3 class="text-base font-normal uppercase leading-none z-30 sm:text-xl lg:text-2xl">{{ artist.name }}</h3>
                    </div>
                  </template>

                  <span
                    aria-hidden="true"
                    class="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_0_1px_var(--foreground)] transition group-hover:shadow-[inset_0_0_0_2px_var(--foreground)] group-focus-visible:shadow-[inset_0_0_0_2px_var(--foreground)]"
                  />
                </component>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious
          variant="ghost"
          size="icon-lg"
          class="left-0 size-8 rounded-none bg-background/80 text-foreground shadow-none hover:bg-secondary disabled:opacity-40 sm:size-10"
        />
        <CarouselNext
          variant="ghost"
          size="icon-lg"
          class="right-0 size-8 rounded-none bg-background/80 text-foreground shadow-none hover:bg-secondary disabled:opacity-40 sm:size-10"
        />
      </Carousel>
    </div>

    <div
      v-else
      id="artistas-panel-cartel"
      role="tabpanel"
      aria-labelledby="artistas-tab-cartel"
      data-reveal
      style="--reveal-delay: 120ms"
      class="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
    >
      <div class="mx-auto flex w-full max-w-6xl justify-center">
        <div class="w-full max-w-152 overflow-hidden border border-foreground bg-[#F4F4F4] shadow-[0_1rem_2.5rem_rgba(0,0,0,0.08)] sm:max-w-2xl lg:max-w-184">
          <img
            src="/img/artists/cartel.png"
            alt="Cartel de artistas del festival Esclat"
            class="block h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Allow this carousel's inner content to overflow so shadows and labels aren't clipped */
.artists-carousel {
  --carousel-peek: 1rem;
}

@media (min-width: 640px) {
  .artists-carousel {
    --carousel-peek: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .artists-carousel {
    --carousel-peek: 2rem;
  }
}

@media (min-width: 1280px) {
  .artists-carousel {
    --carousel-peek: 2.75rem;
  }
}

.artists-carousel [data-slot="carousel-content"] {
  overflow: visible !important;
  padding-inline: var(--carousel-peek);
}

.artists-carousel [data-slot="carousel-item"] {
  overflow: visible !important;
}
</style>
