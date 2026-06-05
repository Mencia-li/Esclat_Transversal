<script setup lang="ts">
import { Volume2, VolumeX } from "lucide-vue-next"
import { ref } from "vue"

const heroVideo = "/video/hero/esclat-hero.mp4"
const videoRef = ref<HTMLVideoElement | null>(null)
const isMuted = ref(true)

async function toggleSound() {
  const video = videoRef.value
  isMuted.value = !isMuted.value

  if (!video) {
    return
  }

  video.muted = isMuted.value

  if (!isMuted.value) {
    video.volume = 1

    try {
      await video.play()
    } catch {
      isMuted.value = true
      video.muted = true
    }
  }
}
</script>

<template>
  <section class="border-b border-foreground bg-background">
    <div class="relative aspect-video w-full overflow-hidden bg-foreground">
      <video
        ref="videoRef"
        class="absolute inset-0 h-full w-full object-cover object-center"
        :src="heroVideo"
        autoplay
        :muted="isMuted"
        loop
        playsinline
        aria-hidden="true"
      />

      <button
        type="button"
        class="absolute bottom-3 right-3 z-10 flex size-11 items-center justify-center rounded-none border border-white/80 bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:bottom-5 sm:right-5 sm:size-12 lg:bottom-6 lg:right-6 lg:size-14"
        :aria-label="isMuted ? 'Activar sonido del video' : 'Silenciar video'"
        :title="isMuted ? 'Activar sonido' : 'Silenciar'"
        @click="toggleSound"
      >
        <VolumeX v-if="isMuted" class="size-5 sm:size-6" aria-hidden="true" />
        <Volume2 v-else class="size-5 sm:size-6" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>
