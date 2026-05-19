<script setup lang="ts">
import { computed } from "vue"
import { RouterLink, useRoute } from "vue-router"
import { ArrowLeft, CalendarDays, Clock, MapPin, Mic2 } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { artists } from "@/data/festival"

const route = useRoute()
const artistId = computed(() => String(route.params.id ?? ""))
const artist = computed(() => artists.find((item) => item.id === artistId.value))
</script>

<template>
  <section class="bg-background">
    <div class="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Button as-child variant="ghost" class="mb-8 px-0">
        <RouterLink :to="{ path: '/', hash: '#artistas' }">
          <ArrowLeft class="size-4" />
          Volver a artistas
        </RouterLink>
      </Button>

      <article v-if="artist" class="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
        <Card class="aspect-[4/5] justify-between overflow-hidden bg-primary text-primary-foreground">
          <CardHeader>
            <div class="flex items-center justify-between">
              <span class="rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground">
                {{ artist.date }}
              </span>
              <Mic2 class="size-8" />
            </div>
          </CardHeader>
          <CardContent class="pb-8">
            <p class="text-sm uppercase text-primary-foreground/80">Directo confirmado</p>
            <h1 class="mt-3 text-5xl font-semibold leading-tight">{{ artist.name }}</h1>
          </CardContent>
        </Card>

        <div class="space-y-6">
          <div>
            <h2 class="text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {{ artist.name }} en Esclat.
            </h2>
            <p class="mt-4 text-lg leading-relaxed text-muted-foreground">
              {{ artist.summary }}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Información de actuación</CardTitle>
            </CardHeader>
            <CardContent class="grid gap-3 pb-6 sm:grid-cols-3">
              <div class="rounded-md bg-secondary p-4">
                <CalendarDays class="mb-3 size-5 text-primary" />
                <p class="text-sm font-semibold">{{ artist.date }}</p>
              </div>
              <div class="rounded-md bg-secondary p-4">
                <Clock class="mb-3 size-5 text-primary" />
                <p class="text-sm font-semibold">{{ artist.time }}</p>
              </div>
              <div class="rounded-md bg-secondary p-4">
                <MapPin class="mb-3 size-5 text-primary" />
                <p class="text-sm font-semibold">{{ artist.stage }}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>

      <Card v-else>
        <CardHeader>
          <CardTitle>Artista no encontrado</CardTitle>
        </CardHeader>
        <CardContent class="pb-6">
          <p class="text-muted-foreground">La ficha solicitada no existe.</p>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
