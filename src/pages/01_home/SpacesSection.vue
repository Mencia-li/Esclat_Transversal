<script setup lang="ts">
import { Building2, MapPin, Users } from "lucide-vue-next"
import { festivalInfo, festivalSpaces } from "@/data/festival"
</script>

<template>
  <section class="festival-section-center festival-theme-alt">
    <div class="section-container">
      <div data-reveal class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase text-primary">El espacio</p>
          <h2 class="mt-3 max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            {{ festivalInfo.place }}.
          </h2>
        </div>
        <p class="max-w-md text-sm leading-relaxed text-muted-foreground">
          Un espacio industrial reconvertido en centro de creación, con salas, patios y pasillos
          pensados para pasar de un concierto a una conversación en círculo.
        </p>
      </div>

      <div class="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="(space, index) in festivalSpaces"
          :key="space.id"
          data-reveal="clip"
          :style="{ '--reveal-delay': `${index * 70}ms` }"
          class="overflow-hidden rounded-md border border-border bg-background"
        >
          <div class="flex aspect-[16/9] items-center justify-center bg-primary text-primary-foreground">
            <Building2 class="size-12" />
          </div>

          <div class="space-y-4 p-5">
            <div>
              <p class="flex items-center gap-2 text-xs font-semibold uppercase text-primary">
                <MapPin class="size-3.5" />
                {{ space.location }}
              </p>
              <h3 class="mt-2 text-2xl font-semibold text-foreground">{{ space.name }}</h3>
            </div>

            <p class="text-sm leading-relaxed text-muted-foreground">
              {{ space.summary }}
            </p>

            <div class="flex flex-wrap gap-2 text-xs font-semibold">
              <span class="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
                <Users class="size-3.5" />
                {{ space.capacity }}
              </span>
              <span class="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
                {{ space.use }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
