<script setup lang="ts">
import { RouterLink } from "vue-router"
import { festivalDays, festivalInfo } from "@/data/festival"

function dayClass(index: number) {
  const classes = [
    "bg-primary text-primary-foreground",
    "bg-background text-foreground",
    "bg-secondary text-secondary-foreground",
  ] as const

  return classes[index] ?? classes[0]
}
</script>

<template>
  <section class="border-b border-foreground bg-background">
    <div data-reveal class="px-5 py-4 sm:px-6 lg:px-8">
      <h2 class="max-w-6xl text-3xl font-normal leading-tight text-foreground sm:text-5xl lg:text-6xl">
        {{ festivalInfo.claim }}
      </h2>
    </div>

    <div data-reveal class="grid grid-cols-4 border-t border-foreground">
      <RouterLink
        :to="{ name: 'program-detail', params: { dia: festivalDays[0]?.id } }"
        class="group relative min-h-52 overflow-hidden border-r border-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-60 lg:min-h-80"
      >
        <video
          class="absolute inset-0 h-full w-full object-cover grayscale transition duration-300 group-hover:scale-105"
          src="/video/hero/esclat-hero.mp4"
          autoplay
          muted
          loop
          playsinline
          aria-hidden="true"
        />
        <div class="absolute inset-0 bg-foreground/35" />
        <div class="relative z-10 flex h-full min-h-52 flex-col justify-between p-2 text-background sm:min-h-60 sm:p-4 lg:min-h-80 lg:p-5">
          <p class="text-sm leading-tight sm:text-lg lg:text-2xl">
            23/10 -<br />
            25/10
          </p>
          <h2 class="max-w-xs text-lg font-semibold leading-tight sm:text-2xl lg:text-3xl">
            Tres días para que todo lo que llevamos dentro estalle.
          </h2>
        </div>
      </RouterLink>

      <RouterLink
        v-for="(day, index) in festivalDays"
        :key="day.id"
        :to="{ name: 'program-detail', params: { dia: day.id } }"
        :class="[
          'group flex min-h-52 flex-col justify-between border-r border-foreground p-2 outline-none transition duration-300 last:border-r-0 hover:brightness-95 focus-visible:ring-2 focus-visible:ring-ring sm:min-h-60 sm:p-4 lg:min-h-80 lg:p-5',
          dayClass(index),
        ]"
      >
        <div class="space-y-1 sm:space-y-2">
          <p class="max-w-xs break-words text-[0.7rem] font-medium leading-tight sm:text-sm lg:text-base">{{ day.theme }}.</p>
          <p class="max-w-xs break-words text-[0.65rem] leading-tight opacity-90 sm:text-xs lg:text-sm">{{ day.summary }}</p>
        </div>

        <p class="self-end text-base leading-none sm:text-xl lg:text-2xl">{{ day.date }}</p>
      </RouterLink>
    </div>
  </section>
</template>
