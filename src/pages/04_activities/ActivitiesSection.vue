<script setup lang="ts">
import { programBlocks } from "@/data/festival"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function blockClass(index: number) {
  const classes = [
    "bg-background text-foreground",
    "bg-foreground text-background",
    "bg-primary text-primary-foreground",
    "bg-secondary text-secondary-foreground",
  ] as const

  return classes[index] ?? classes[0]
}
</script>

<template>
  <section class="festival-section-center festival-theme-program">
    <div class="section-container">
      <h2 data-reveal class="border-b border-border pb-4 text-4xl font-semibold text-foreground sm:text-5xl">
        Programación.
      </h2>

      <div data-reveal class="grid border-x border-b border-border md:grid-cols-2">
        <Card
          v-for="(block, index) in programBlocks"
          :key="block.id"
          :class="[
            'min-h-44 justify-between rounded-none border-0 border-b border-border shadow-none transition hover:brightness-95 md:min-h-48 md:odd:border-r md:[&:nth-last-child(-n+2)]:border-b-0',
            blockClass(index),
          ]"
        >
          <CardHeader class="px-6 pt-6">
            <CardTitle class="text-4xl leading-tight tracking-normal">{{ block.title }}</CardTitle>
          </CardHeader>

          <CardContent class="px-6 pb-6">
            <p class="max-w-xl text-sm leading-relaxed">
              {{ block.summary }}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
