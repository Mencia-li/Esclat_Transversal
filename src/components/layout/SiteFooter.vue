<script setup lang="ts">
import { festivalInfo } from "@/data/festival"
</script>

<template>
  <footer class="border-t border-foreground bg-background">
    <div class="grid gap-8 px-5 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
      <div data-reveal>
        <p class="text-3xl font-normal leading-none text-foreground">Esclat.</p>
      </div>

      <div data-reveal style="--reveal-delay: 80ms" class="space-y-2 text-xs">
        <p class="font-medium uppercase text-foreground">Contacto:</p>
        <a class="block text-muted-foreground underline-offset-4 hover:underline" :href="`mailto:${festivalInfo.email}`">
          {{ festivalInfo.email }}
        </a>
        <p class="text-muted-foreground">{{ festivalInfo.venueAddress }}</p>
      </div>

      <div data-reveal style="--reveal-delay: 160ms" class="space-y-2 text-xs">
        <p class="font-medium uppercase text-foreground">Síguenos:</p>
        <div class="flex gap-2">
          <a href="#" class="flex size-7 items-center justify-center bg-secondary text-[0.65rem] font-medium text-secondary-foreground">
            IG
          </a>
          <a href="#" class="flex size-7 items-center justify-center bg-secondary text-[0.65rem] font-medium text-secondary-foreground">
            SP
          </a>
          <a href="#" class="flex size-7 items-center justify-center bg-secondary text-[0.65rem] font-medium text-secondary-foreground">
            TT
          </a>
        </div>
      </div>

      <div data-reveal style="--reveal-delay: 240ms" class="space-y-2 text-xs">
        <p class="font-medium uppercase text-foreground">Acceso:</p>
        <p class="text-muted-foreground">Festival gratuito</p>
        <p class="text-muted-foreground">Talleres con inscripción previa</p>
        <p class="text-muted-foreground">{{ festivalInfo.hours }}</p>
      </div>
    </div>
  </footer>
</template>
