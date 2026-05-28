<script setup lang="ts">
import { RouterLink } from "vue-router"
import { festivalDays, festivalInfo } from "@/data/festival"

function dayClass(index: number) {
  const classes = [
    "bg-blue_ice text-foreground",
    "bg-background text-foreground",
    "bg-grey text-foreground",
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
        class="group flex min-h-52 items-center justify-center overflow-hidden border-r border-foreground bg-black p-6 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-60 lg:min-h-80"
        aria-label="Ver programa"
      >
        <img
          src="/img/logos/esclat/png/72/vertical-white.png"
          alt="ESCLAT"
          class="h-24 w-auto object-contain sm:h-28 lg:h-36"
        />
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
