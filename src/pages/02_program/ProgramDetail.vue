<script setup lang="ts">
import { computed } from "vue"
import { RouterLink, useRoute } from "vue-router"
import { ArrowLeft, CalendarDays, CheckCircle2 } from "lucide-vue-next"
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
      <Button as-child variant="ghost" class="mb-8 px-0">
        <RouterLink :to="{ path: '/', hash: '#programa' }">
          <ArrowLeft class="size-4" />
          Volver al programa
        </RouterLink>
      </Button>

      <article v-if="day" class="space-y-8">
        <div class="space-y-4">
          <p class="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
            <CalendarDays class="size-4" />
            {{ day.date }}
          </p>
          <h1 class="text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            {{ day.title }}
          </h1>
          <p class="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {{ day.detail }}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle class="text-2xl">Actividades destacadas</CardTitle>
          </CardHeader>
          <CardContent class="grid gap-3 pb-6 sm:grid-cols-2">
            <div
              v-for="activity in day.activities"
              :key="activity"
              class="flex items-center gap-3 rounded-md bg-secondary px-4 py-3 text-sm font-medium"
            >
              <CheckCircle2 class="size-4 text-primary" />
              {{ activity }}
            </div>
          </CardContent>
        </Card>
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
