<script setup lang="ts">
import { computed } from "vue"
import { RouterLink, useRoute } from "vue-router"
import { ArrowLeft, CalendarDays, CheckCircle2, Clock, MapPin, Tags } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { festivalDays } from "@/data/festival"

const route = useRoute()
const dayId = computed(() => String(route.params.dia ?? ""))
const day = computed(() => festivalDays.find((item) => item.id === dayId.value))
</script>

<template>
  <section class="bg-background">
    <div class="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Button as-child variant="ghost" class="mb-8 px-0" data-reveal="left">
        <RouterLink :to="{ path: '/', hash: '#programa' }">
          <ArrowLeft class="size-4" />
          Volver al programa
        </RouterLink>
      </Button>

      <article v-if="day" class="space-y-8">
        <div data-reveal class="space-y-4">
          <p class="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
            <CalendarDays class="size-4" />
            {{ day.date }}
          </p>
          <p class="text-sm font-semibold uppercase text-primary">{{ day.weekday }} · {{ day.theme }}</p>
          <h1 class="text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            {{ day.title }}
          </h1>
          <p class="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {{ day.detail }}
          </p>
        </div>

        <Card data-reveal style="--reveal-delay: 140ms">
          <CardHeader>
            <CardTitle class="text-2xl">Actividades destacadas</CardTitle>
          </CardHeader>
          <CardContent class="grid gap-3 pb-6 sm:grid-cols-2">
            <div
              v-for="activity in day.activities"
              :key="activity"
              data-reveal
              class="flex items-center gap-3 rounded-md bg-secondary px-4 py-3 text-sm font-medium"
            >
              <CheckCircle2 class="size-4 text-primary" />
              {{ activity }}
            </div>
          </CardContent>
        </Card>

        <div data-reveal style="--reveal-delay: 220ms" class="space-y-4">
          <div class="flex items-end justify-between gap-4 border-b border-border pb-3">
            <h2 class="text-3xl font-semibold text-foreground">Horario.</h2>
            <p class="text-sm font-medium text-muted-foreground">{{ day.schedule.length }} bloques</p>
          </div>

          <article
            v-for="event in day.schedule"
            :key="event.id"
            class="grid gap-4 rounded-md border border-border bg-background p-4 md:grid-cols-[11rem_1fr]"
          >
            <div class="space-y-2">
              <p class="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground">
                <Clock class="size-4" />
                {{ event.time }}
              </p>
              <p class="text-sm font-semibold uppercase text-primary">{{ event.category }}</p>
            </div>

            <div class="space-y-3">
              <h3 class="text-2xl font-semibold leading-tight text-foreground">{{ event.title }}</h3>
              <p class="text-sm leading-relaxed text-muted-foreground">{{ event.summary }}</p>

              <div class="flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
                <span class="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
                  <MapPin class="size-3.5" />
                  {{ event.space }}
                </span>
                <span class="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
                  {{ event.meta }}
                </span>
              </div>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in event.tags"
                  :key="tag"
                  class="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium text-muted-foreground"
                >
                  <Tags class="size-3" />
                  {{ tag }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </article>

      <Card v-else>
        <CardHeader>
          <CardTitle>Día no encontrado</CardTitle>
        </CardHeader>
        <CardContent class="pb-6">
          <p class="text-muted-foreground">La programación solicitada no existe.</p>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
