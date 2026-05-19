<script setup lang="ts">
import { computed, ref } from "vue"
import { RouterLink } from "vue-router"
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { artistsCarouselItems } from "@/data/festival"

const pageSize = 6
const currentStart = ref(0)

const pageStarts = computed(() => {
  const starts: number[] = []

  for (let start = 0; start < artistsCarouselItems.length; start += pageSize) {
    starts.push(Math.min(start, Math.max(artistsCarouselItems.length - pageSize, 0)))
  }

  return [...new Set(starts)]
})

const visibleArtists = computed(() => artistsCarouselItems.slice(currentStart.value, currentStart.value + pageSize))
const currentPage = computed(() => pageStarts.value.indexOf(currentStart.value) + 1)

function moveCarousel(direction: "next" | "previous") {
  const currentIndex = pageStarts.value.indexOf(currentStart.value)
  const nextIndex =
    direction === "next"
      ? (currentIndex + 1) % pageStarts.value.length
      : (currentIndex - 1 + pageStarts.value.length) % pageStarts.value.length

  currentStart.value = pageStarts.value[nextIndex] ?? 0
}

function artistClass(index: number, isPlaceholder?: boolean) {
  if (isPlaceholder) {
    return "border-dashed bg-background text-muted-foreground"
  }

  const classes = [
    "bg-card text-card-foreground",
    "bg-secondary text-secondary-foreground",
    "bg-primary text-primary-foreground",
    "bg-muted text-muted-foreground",
  ] as const

  return classes[index % classes.length] ?? classes[0]
}

function descriptionClass(index: number, isPlaceholder?: boolean) {
  if (isPlaceholder) {
    return "text-muted-foreground"
  }

  return index % 4 === 2 ? "text-primary-foreground/85" : ""
}
</script>

<template>
  <section class="festival-section-center bg-background">
    <div class="section-container-narrow">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase text-primary">Line-up</p>
          <h2 class="mt-3 text-4xl font-semibold text-foreground sm:text-5xl">Artistas.</h2>
        </div>

        <p class="text-sm font-medium text-muted-foreground">
          {{ currentPage }}/{{ pageStarts.length }}
        </p>
      </div>

      <div class="mt-8 grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-5">
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label="Artistas anteriores"
          class="self-center text-foreground"
          @click="moveCarousel('previous')"
        >
          <ArrowLeft class="size-7" />
        </Button>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <component
            :is="artist.isPlaceholder ? 'div' : RouterLink"
            v-for="(artist, index) in visibleArtists"
            :key="artist.id"
            :to="artist.isPlaceholder ? undefined : { name: 'artist-detail', params: { id: artist.id } }"
            class="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Card
              :class="[
                'aspect-square justify-between overflow-hidden transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg',
                artistClass(index, artist.isPlaceholder),
              ]"
            >
              <CardHeader class="space-y-0 p-4">
                <div class="flex items-start justify-end gap-3">
                  <span class="inline-flex items-center gap-1 rounded-md bg-background px-2 py-1 text-xs font-semibold text-foreground">
                    <CalendarDays class="size-3" />
                    {{ artist.date }}
                  </span>
                </div>
              </CardHeader>

              <CardContent class="space-y-2 p-4">
                <CardTitle class="text-2xl leading-tight">{{ artist.name }}</CardTitle>
                <CardDescription :class="descriptionClass(index, artist.isPlaceholder)">
                  {{ artist.time }} · {{ artist.stage }}
                </CardDescription>
              </CardContent>
            </Card>
          </component>
        </div>

        <Button
          variant="ghost"
          size="icon-lg"
          aria-label="Artistas siguientes"
          class="self-center text-foreground"
          @click="moveCarousel('next')"
        >
          <ArrowRight class="size-7" />
        </Button>
      </div>
    </div>
  </section>
</template>
