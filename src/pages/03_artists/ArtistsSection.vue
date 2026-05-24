<script setup lang="ts">
import { computed, ref } from "vue"
import { RouterLink } from "vue-router"
import { ArrowLeft, ArrowRight } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { artistsCarouselItems } from "@/data/festival"

const pageSize = 6
const pageStep = 4
const currentStart = ref(0)

const pageStarts = computed(() => {
  const starts: number[] = []
  const lastFullPageStart = Math.max(artistsCarouselItems.length - pageSize, 0)

  for (let start = 0; start < artistsCarouselItems.length; start += pageStep) {
    starts.push(Math.min(start, lastFullPageStart))
  }

  return [...new Set(starts)]
})

const carouselItems = computed(() =>
  artistsCarouselItems.map((artist, index) => ({
    ...artist,
    image: artist.isPlaceholder ? undefined : `/img/artists/artist${index + 1}.jpg`,
  })),
)

const visibleArtists = computed(() => carouselItems.value.slice(currentStart.value, currentStart.value + pageSize))
const currentPage = computed(() => pageStarts.value.indexOf(currentStart.value) + 1)
const visualOrderClasses = [
  "order-1",
  "order-4",
  "order-2",
  "order-5",
  "order-3",
  "order-6",
] as const

function moveCarousel(direction: "next" | "previous") {
  const currentIndex = pageStarts.value.indexOf(currentStart.value)
  const nextIndex =
    direction === "next"
      ? (currentIndex + 1) % pageStarts.value.length
      : (currentIndex - 1 + pageStarts.value.length) % pageStarts.value.length

  currentStart.value = pageStarts.value[nextIndex] ?? 0
}
</script>

<template>
  <section class="border-b border-foreground bg-background">
    <div data-reveal class="flex items-end justify-between border-b border-foreground px-5 py-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-normal leading-none text-foreground sm:text-5xl">Artistas.</h2>
      <p class="text-sm font-medium text-foreground">
        {{ currentPage }}/{{ pageStarts.length }}
      </p>
    </div>

    <div data-reveal style="--reveal-delay: 120ms" class="relative px-10 py-4 sm:px-16 lg:px-20">
      <Button
        variant="ghost"
        size="icon-lg"
        aria-label="Artistas anteriores"
        class="absolute left-1 top-1/2 z-10 size-8 -translate-y-1/2 rounded-none bg-transparent text-foreground shadow-none hover:bg-secondary sm:left-4 sm:size-10 lg:left-8"
        @click="moveCarousel('previous')"
      >
        <ArrowLeft class="size-6 sm:size-8" />
      </Button>

      <Transition name="artists-page" mode="out-in">
        <div :key="currentStart" class="grid grid-cols-3 gap-2 sm:gap-3">
          <component
            :is="artist.isPlaceholder ? 'div' : RouterLink"
            v-for="(artist, index) in visibleArtists"
            :key="artist.id"
            :to="artist.isPlaceholder ? undefined : { name: 'artist-detail', params: { id: artist.id } }"
            class="group relative block aspect-square overflow-hidden border border-foreground bg-primary outline-none transition duration-300 hover:z-20 hover:scale-[1.08] hover:shadow-lg focus-visible:z-20 focus-visible:scale-[1.08] focus-visible:ring-2 focus-visible:ring-ring"
            :class="visualOrderClasses[index]"
          >
            <template v-if="artist.image">
              <img
                :src="artist.image"
                :alt="artist.name"
                class="absolute inset-0 h-full w-full scale-110 object-cover transition duration-300 group-hover:scale-100 group-focus-visible:scale-100"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
              <span class="absolute right-1 top-1 bg-background px-1 py-0.5 text-xs leading-none text-foreground sm:right-2 sm:top-2 sm:text-base">
                {{ artist.date }}
              </span>
              <h3 class="absolute bottom-1 left-1 max-w-[calc(100%-0.5rem)] text-base font-normal uppercase leading-none text-foreground sm:bottom-2 sm:left-2 sm:max-w-[calc(100%-1rem)] sm:text-xl lg:text-2xl">
                {{ artist.name }}
              </h3>
            </template>

            <template v-else>
              <div class="flex h-full flex-col justify-between p-2 text-primary-foreground sm:p-4">
                <span class="self-end bg-background px-1 py-0.5 text-xs leading-none text-foreground sm:text-base">
                  {{ artist.date }}
                </span>
                <h3 class="text-base font-normal uppercase leading-none sm:text-xl lg:text-2xl">{{ artist.name }}</h3>
              </div>
            </template>
          </component>
        </div>
      </Transition>

      <Button
        variant="ghost"
        size="icon-lg"
        aria-label="Artistas siguientes"
        class="absolute right-1 top-1/2 z-10 size-8 -translate-y-1/2 rounded-none bg-transparent text-foreground shadow-none hover:bg-secondary sm:right-4 sm:size-10 lg:right-8"
        @click="moveCarousel('next')"
      >
        <ArrowRight class="size-6 sm:size-8" />
      </Button>
    </div>
  </section>
</template>

<style scoped>
.artists-page-enter-active,
.artists-page-leave-active {
  transition:
    opacity 240ms ease,
    transform 240ms ease;
}

.artists-page-enter-from,
.artists-page-leave-to {
  opacity: 0;
  transform: translate3d(0, 0.75rem, 0);
}

@media (prefers-reduced-motion: reduce) {
  .artists-page-enter-active,
  .artists-page-leave-active {
    transition: none;
  }

  .artists-page-enter-from,
  .artists-page-leave-to {
    opacity: 1;
    transform: none;
  }
}
</style>
