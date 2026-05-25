<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { RouterLink } from "vue-router"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { artistsCarouselItems } from "@/data/festival"

const visibleCount = ref<6 | 8 | 10>(6)

let mediumQuery: MediaQueryList | undefined
let extraLargeQuery: MediaQueryList | undefined

const carouselOptions = {
  align: "start",
  loop: true,
  slidesToScroll: 1,
  startIndex: 1,
} as const

const visibleColumnCount = computed(() => visibleCount.value / 2)
const columnBasisClass = computed(() => {
  if (visibleCount.value === 10) {
    return "basis-1/5"
  }

  if (visibleCount.value === 8) {
    return "basis-1/4"
  }

  return "basis-1/3"
})

const carouselItems = computed(() => {
  const itemsWithImages = artistsCarouselItems.map((artist, index) => ({
    ...artist,
    image: artist.isPlaceholder ? undefined : `/img/artists/artist${index + 1}.jpg`,
  }))

  return [...itemsWithImages.slice(-2), ...itemsWithImages.slice(0, -2)]
})

const artistColumns = computed(() => {
  const columns = []

  for (let index = 0; index < carouselItems.value.length; index += 2) {
    columns.push(carouselItems.value.slice(index, index + 2))
  }

  return columns
})

function updateLayout() {
  if (extraLargeQuery?.matches) {
    visibleCount.value = 10
    return
  }

  if (mediumQuery?.matches) {
    visibleCount.value = 8
    return
  }

  visibleCount.value = 6
}

function artistOriginClass(columnIndex: number, rowIndex: number) {
  const visibleLastColumn = visibleColumnCount.value - 1
  const visibleColumn = columnIndex % visibleColumnCount.value
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

onMounted(() => {
  mediumQuery = window.matchMedia("(min-width: 640px)")
  extraLargeQuery = window.matchMedia("(min-width: 1280px)")
  updateLayout()
  mediumQuery.addEventListener("change", updateLayout)
  extraLargeQuery.addEventListener("change", updateLayout)
})

onBeforeUnmount(() => {
  mediumQuery?.removeEventListener("change", updateLayout)
  extraLargeQuery?.removeEventListener("change", updateLayout)
})
</script>

<template>
  <section class="border-b border-foreground bg-background">
    <div data-reveal class="border-b border-foreground bg-[#A9FCE6] px-5 py-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-normal leading-none text-foreground sm:text-5xl lg:text-6xl">Artistas.</h2>
    </div>

    <div data-reveal style="--reveal-delay: 120ms" class="px-5 py-4 sm:px-6 lg:px-8">
      <Carousel
        :opts="carouselOptions"
        class="artists-carousel relative mx-auto max-w-[36rem] px-8 sm:max-w-[54rem] sm:px-12 lg:max-w-[72rem] xl:max-w-[114rem]"
        aria-label="Carrusel de artistas"
      >
        <CarouselContent class="-ml-2 sm:-ml-3">
          <CarouselItem
            v-for="(column, columnIndex) in artistColumns"
            :key="column.map((artist) => artist.id).join('-')"
            class="pl-2 sm:pl-3"
            :class="columnBasisClass"
          >
            <div class="grid gap-2 sm:gap-3">
              <div
                v-for="(artist, rowIndex) in column"
                :key="artist.id"
                class="relative aspect-square overflow-visible p-1"
              >
                <component
                  :is="artist.isPlaceholder ? 'div' : RouterLink"
                  :to="artist.isPlaceholder ? undefined : { name: 'artist-detail', params: { id: artist.id } }"
                  class="group isolate relative block h-full w-full overflow-hidden bg-primary outline-none transition duration-300 z-10 hover:z-20 hover:scale-[1.015] focus-visible:z-20 focus-visible:scale-[1.015]"
                  :class="artistOriginClass(columnIndex, rowIndex)"
                >
                  <template v-if="artist.image">
                    <img
                      :src="artist.image"
                      :alt="artist.name"
                      class="absolute inset-0 h-full w-full scale-110 object-cover transition duration-300 group-hover:scale-100 group-focus-visible:scale-100"
                      loading="lazy"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
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
  </section>
</template>

<style scoped>
/* Allow this carousel's inner content to overflow so shadows and labels aren't clipped */
.artists-carousel {
  --carousel-peek: 1.75rem;
}

@media (min-width: 640px) {
  .artists-carousel {
    --carousel-peek: 2.25rem;
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
