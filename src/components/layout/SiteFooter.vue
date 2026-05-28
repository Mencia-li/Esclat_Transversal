<script setup lang="ts">
import { festivalInfo } from "@/data/festival"

const esclatLogo = "/img/logos/esclat/svg/horizontal-black.svg"

const socialLinks = [
  { name: "Instagram", icon: "/img/logos/instagram.svg" },
  { name: "TikTok", icon: "/img/logos/tiktok.svg" },
  { name: "X", icon: "/img/logos/x-logo.svg" },
] as const
</script>

<template>
  <footer class="border-t border-foreground bg-background">
    <div class="grid gap-8 px-5 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
      <div>
        <img :src="esclatLogo" alt="ESCLAT" class="h-12 w-auto" loading="lazy" />
      </div>

      <div class="space-y-2 text-xs">
        <p class="font-medium uppercase text-foreground">Contacto:</p>
        <a class="block text-muted-foreground underline-offset-4 hover:underline" :href="`mailto:${festivalInfo.email}`">
          {{ festivalInfo.email }}
        </a>
        <p class="text-muted-foreground">{{ festivalInfo.venueAddress }}</p>
      </div>

      <div class="space-y-2 text-xs">
        <p class="font-medium uppercase text-foreground">Síguenos:</p>
        <div class="flex gap-2">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            href="#"
            class="flex size-10 items-center justify-center transition-opacity hover:opacity-65"
            :aria-label="social.name"
          >
            <img :src="social.icon" :alt="social.name" class="size-7 object-contain" loading="lazy" />
          </a>
        </div>
      </div>

      <div class="space-y-2 text-xs">
        <p class="font-medium uppercase text-foreground">Acceso:</p>
        <p class="text-muted-foreground">Festival gratuito</p>
        <p class="text-muted-foreground">Talleres con inscripción previa</p>
        <p class="text-muted-foreground">{{ festivalInfo.hours }}</p>
      </div>
    </div>
  </footer>
</template>
