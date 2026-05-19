<script setup lang="ts">
import { RouterLink } from "vue-router"
import { ArrowUpRight, CalendarDays } from "lucide-vue-next"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { festivalDays, festivalInfo } from "@/data/festival"

function dayClass(index: number) {
  const classes = [
    "bg-card text-card-foreground",
    "bg-primary text-primary-foreground",
    "bg-secondary text-secondary-foreground",
  ] as const

  return classes[index] ?? classes[0]
}
</script>

<template>
  <section class="festival-section-center bg-background">
    <div class="section-container">
      <div class="max-w-4xl">
        <p class="text-sm font-semibold uppercase text-primary">Programa</p>
        <h2 class="mt-3 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          {{ festivalInfo.claim }}
        </h2>
      </div>

      <div class="mt-10 grid gap-4 md:grid-cols-3">
        <RouterLink
          v-for="(day, index) in festivalDays"
          :key="day.id"
          :to="{ name: 'program-detail', params: { dia: day.id } }"
          class="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Card
            :class="[
              'min-h-80 justify-between overflow-hidden transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg',
              dayClass(index),
            ]"
          >
            <CardHeader class="gap-5">
              <div class="flex items-start justify-between gap-4">
                <span class="text-2xl font-semibold">{{ day.date }}</span>
                <ArrowUpRight class="size-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <CardTitle class="text-3xl leading-tight">{{ day.title }}</CardTitle>
            </CardHeader>

            <CardContent class="space-y-5 pb-6">
              <CardDescription :class="index === 1 ? 'text-primary-foreground/85' : ''">
                {{ day.summary }}
              </CardDescription>
              <div class="flex items-center gap-2 text-sm font-medium">
                <CalendarDays class="size-4" />
                {{ day.highlight }}
              </div>
            </CardContent>
          </Card>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
