<script setup lang="ts">
import { programBlocks } from "@/data/festival"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function blockClass(index: number) {
  const classes = [
    "bg-card text-card-foreground",
    "bg-muted text-muted-foreground",
    "bg-primary text-primary-foreground",
    "bg-secondary text-secondary-foreground",
  ] as const

  return classes[index] ?? classes[0]
}
</script>

<template>
  <section class="festival-section-center bg-background">
    <div class="section-container">
      <h2 class="text-4xl font-semibold text-foreground sm:text-5xl">Programación.</h2>

      <div class="mt-8 grid gap-4 md:grid-cols-2">
        <Card
          v-for="(block, index) in programBlocks"
          :key="block.id"
          :class="['min-h-56 justify-between transition hover:-translate-y-1 hover:shadow-lg', blockClass(index)]"
        >
          <CardHeader>
            <CardTitle class="text-4xl leading-tight">{{ block.title }}</CardTitle>
          </CardHeader>
          <CardContent class="pb-6">
            <p class="max-w-xl text-sm leading-relaxed">
              {{ block.summary }}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
