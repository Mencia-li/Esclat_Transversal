<script setup lang="ts">
import { festivalInfo } from "@/data/festival"

const heroVideo = "/video/hero/esclat-hero.mp4"
</script>

<template>
  <section class="border-b border-foreground bg-background">
    <div class="relative aspect-video w-full overflow-hidden bg-foreground">
      <video
        class="absolute inset-0 h-full w-full object-cover object-center"
        :src="heroVideo"
        autoplay
        muted
        loop
        playsinline
        aria-hidden="true"
      />
      <div class="absolute inset-0 bg-foreground/20" />

      <h1
        data-reveal="clip"
        class="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center text-[clamp(7rem,30vw,38rem)] font-semibold leading-none text-[#C5FD5E] opacity-85"
      >
        {{ festivalInfo.name }}
      </h1>
    </div>
  </section>
</template>
