<script setup lang="ts">
import { RouterLink } from "vue-router"
import { ArrowDown, CalendarDays, MapPin } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { festivalInfo } from "@/data/festival"
import heroVideo from "@/assets/festival/esclat-hero.mp4"
</script>

<template>
  <section class="festival-section flex items-end overflow-hidden">
    <video
      data-parallax="-90"
      style="--parallax-scale: 1.08"
      class="absolute inset-x-0 -top-10 h-[calc(100%+5rem)] w-full object-cover object-top"
      :src="heroVideo"
      autoplay
      muted
      loop
      playsinline
      aria-hidden="true"
    />
    <div data-parallax="-35" class="absolute inset-x-0 -inset-y-10 bg-foreground/55" />

    <div class="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 pt-24 text-primary-foreground">
      <div data-reveal="left" class="flex flex-wrap items-center gap-3 text-sm font-medium uppercase">
        <span class="inline-flex items-center gap-2 rounded-md bg-background px-3 py-2 text-foreground">
          <CalendarDays class="size-4" />
          {{ festivalInfo.dates }}
        </span>
        <span class="inline-flex items-center gap-2 rounded-md bg-background px-3 py-2 text-foreground">
          <MapPin class="size-4" />
          {{ festivalInfo.place }}
        </span>
      </div>

      <h1
        data-reveal="clip"
        style="--reveal-delay: 120ms"
        class="mt-8 text-7xl font-semibold leading-none text-background sm:text-8xl md:text-[10rem] lg:text-[13rem]"
      >
        {{ festivalInfo.name }}
      </h1>

      <div
        data-reveal
        style="--reveal-delay: 240ms"
        class="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
      >
        <p class="max-w-2xl text-xl font-medium leading-tight text-background sm:text-2xl">
          {{ festivalInfo.claim }}
        </p>

        <Button as-child variant="secondary" size="lg" class="w-fit">
          <RouterLink :to="{ path: '/', hash: '#programa' }">
            <ArrowDown class="size-4" />
            Ver programa
          </RouterLink>
        </Button>
      </div>
    </div>
  </section>
</template>
