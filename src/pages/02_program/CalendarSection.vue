<script setup lang="ts">
import { RouterLink } from "vue-router"
import { festivalDays, festivalInfo } from "@/data/festival"

const dayRouteNames: Record<string, string> = {
  "23-10": "program-dia-23",
  "24-10": "program-dia-24",
  "25-10": "program-dia-25",
}

function dayClass(index: number) {
  const classes = [
    "bg-blue_ice text-foreground",
    "bg-background text-foreground",
    "bg-grey text-foreground",
  ] as const

  return classes[index] ?? classes[0]
}

function dayBorderClass(index: number) {
  const classes = [
    "border-b sm:border-b-0 sm:border-r",
    "border-r",
    "",
  ] as const

  return classes[index] ?? ""
}

function dayRoute(dayId: string) {
  if (dayRouteNames[dayId]) {
    return { name: dayRouteNames[dayId] }
  }

  return { name: "program-detail", params: { dia: dayId } }
}
</script>

<template>
  <section class="border-b border-foreground bg-background">
    <div data-reveal class="px-5 py-4 sm:px-6 lg:px-8">
      <h2 class="max-w-6xl text-3xl font-normal leading-tight text-foreground sm:text-5xl lg:text-6xl">
        {{ festivalInfo.claim }}
      </h2>
    </div>

    <div id="festival-imagen" data-reveal class="scroll-mt-20 grid grid-cols-2 border-t border-foreground sm:grid-cols-4">
      <RouterLink
        :to="{ name: 'festival' }"
        class="group flex min-h-44 items-center justify-center overflow-hidden border-b border-r border-foreground bg-black p-5 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-60 sm:border-b-0 sm:p-6 lg:min-h-80"
        aria-label="Ver programa"
      >
        <img
          src="/img/logos/esclat/png/72/vertical-white.png"
          alt="ESCLAT"
          class="h-20 w-auto object-contain sm:h-28 lg:h-36"
        />
      </RouterLink>

      <RouterLink
        v-for="(day, index) in festivalDays"
        :key="day.id"
        :to="dayRoute(day.id)"
        :class="[
          'group flex min-h-44 flex-col justify-between border-foreground p-3 outline-none transition duration-300 hover:brightness-95 focus-visible:ring-2 focus-visible:ring-ring sm:min-h-60 sm:p-4 lg:min-h-80 lg:p-5',
          dayBorderClass(index),
          dayClass(index),
        ]"
      >
        <div class="space-y-2">
          <p class="max-w-xs break-words text-xs font-medium leading-snug sm:text-sm lg:text-base">{{ day.theme }}.</p>
          <p class="max-w-xs break-words text-[0.72rem] leading-snug opacity-90 sm:text-xs lg:text-sm">{{ day.summary }}</p>
        </div>

        <p class="self-end text-lg leading-none sm:text-xl lg:text-2xl">{{ day.date }}</p>
      </RouterLink>
    </div>
  </section>
</template>
