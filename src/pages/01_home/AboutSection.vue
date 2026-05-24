<script setup lang="ts">
import { MessageCircle, Music2, PenTool } from "lucide-vue-next"
import { festivalInfo, festivalPillars } from "@/data/festival"

const pillarIcons = [Music2, PenTool, MessageCircle] as const
</script>

<template>
  <section class="festival-section-center festival-theme-alt">
    <div class="section-container">
      <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div data-reveal class="space-y-5">
          <p class="text-sm font-semibold uppercase text-primary">Qué es ESCLAT</p>
          <h2 class="text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Un festival con argumento, pensado para escuchar, pensar y participar.
          </h2>
        </div>

        <div data-reveal style="--reveal-delay: 120ms" class="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            ESCLAT es un festival de tres días en Las Naves de Valencia que combina música en directo,
            talleres y charlas. Su nombre significa estallido: usar la música como puerta de entrada
            a lo que a menudo cuesta decir.
          </p>
          <p>
            Salud mental, estándares de belleza e industria del entretenimiento atraviesan las canciones
            que escuchamos cada día, pero no siempre encuentran un espacio para ser debatidos.
          </p>
        </div>
      </div>

      <div class="mt-10 grid gap-4 md:grid-cols-3">
        <div
          v-for="(pillar, index) in festivalPillars"
          :key="pillar.id"
          data-reveal="clip"
          :style="{ '--reveal-delay': `${index * 90}ms` }"
          class="rounded-md border border-border bg-background p-6"
        >
          <component :is="pillarIcons[index] ?? Music2" class="mb-8 size-6 text-primary" />
          <h3 class="text-2xl font-semibold text-foreground">{{ pillar.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
            {{ pillar.summary }}
          </p>
        </div>
      </div>

      <p data-reveal class="mt-8 text-sm font-medium text-muted-foreground">
        {{ festivalInfo.dates }} · {{ festivalInfo.hours }} · {{ festivalInfo.venueAddress }}
      </p>
    </div>
  </section>
</template>
