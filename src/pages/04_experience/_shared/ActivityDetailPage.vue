<script setup lang="ts">
import { RouterLink } from "vue-router"
import { ArrowLeft } from "lucide-vue-next"
import type { ActivityDetailDay } from "../activitiesData"

defineProps<{
  title: string
  days: ActivityDetailDay[]
}>()
</script>

<template>
  <section class="bg-background">
    <div class="border-b border-foreground bg-background px-5 py-5 sm:px-6 lg:px-8">
      <RouterLink
        :to="{ path: '/', hash: '#actividades' }"
        class="mb-5 inline-flex items-center gap-2 border border-foreground bg-background px-5 py-3 text-sm font-medium uppercase text-foreground transition-colors hover:bg-grey sm:px-6 sm:text-base"
      >
        <ArrowLeft class="size-4" />
        Volver a actividades
      </RouterLink>

      <h1 class="text-4xl font-normal leading-none text-foreground sm:text-5xl">{{ title.toUpperCase() }}</h1>
    </div>

    <div class="border-b border-foreground bg-blue_ice px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div class="mx-auto grid w-full max-w-384 gap-8">
        <section
          v-for="day in days"
          :key="day.id"
          class="border border-foreground bg-background"
        >
          <div class="grid grid-cols-[minmax(0,1fr)_auto] border-b border-foreground">
            <div class="min-w-0 px-3 py-3 sm:px-4">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70">{{ day.weekday }}</p>
              <h2 class="mt-2 text-3xl font-normal uppercase leading-none text-foreground sm:text-4xl lg:text-5xl">
                {{ day.sectionTitle }}
              </h2>
            </div>
            <p class="flex items-center border-l border-foreground px-3 py-3 text-3xl font-normal leading-none text-foreground sm:px-4 sm:text-4xl lg:text-5xl">
              {{ day.date }}
            </p>
          </div>

          <div class="border-b border-foreground px-4 py-4 sm:px-6">
            <p class="text-xl font-semibold leading-tight text-turquesa sm:text-2xl">{{ day.timeRange }}</p>
          </div>

          <div class="grid gap-6 p-4 sm:p-6 lg:p-8">
            <article
              v-for="activity in day.activities"
              :key="activity.id"
              class="border border-grey bg-background"
            >
              <div class="grid grid-cols-[minmax(7rem,15rem)_1fr] border-b border-grey">
                <p
                  :class="[
                    'px-3 py-3 text-sm font-semibold uppercase text-foreground sm:px-4 sm:text-base',
                    activity.labelClass ?? 'bg-blue_ice',
                  ]"
                >
                  {{ activity.label }}
                </p>
                <p class="px-3 py-3 text-right text-sm font-semibold text-turquesa sm:px-4 sm:text-base">
                  {{ activity.time }}
                </p>
              </div>

              <h3 class="border-b border-grey px-3 py-3 text-2xl font-semibold leading-tight text-foreground sm:px-4 sm:text-3xl">
                {{ activity.title }}
              </h3>

              <p class="min-h-40 border-b border-grey px-3 py-4 text-base leading-relaxed text-foreground/80 sm:px-4 sm:text-lg lg:text-xl">
                {{ activity.description }}
              </p>

              <p class="border-b border-grey bg-secondary/40 px-3 py-3 text-sm font-semibold leading-tight text-foreground/75 sm:px-4 sm:text-base">
                Espacio: {{ activity.space }}
              </p>

              <div class="grid gap-2 px-3 py-3 text-sm font-medium leading-tight text-foreground/75 sm:px-4 sm:text-base md:grid-cols-[1fr_auto]">
                <p>{{ activity.meta }}</p>
                <p class="italic">{{ activity.tags }}</p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
