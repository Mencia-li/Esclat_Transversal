<script setup lang="ts">
import { ClipboardList } from "lucide-vue-next"
import { accessSteps } from "@/data/festival"
</script>

<template>
  <section data-reveal class="rounded-md border border-border bg-background p-6">
    <div class="mb-6 flex items-center gap-3 text-primary">
      <ClipboardList class="size-5" />
      <h3 class="text-2xl font-semibold text-foreground">CÓMO ASISTIR</h3>
    </div>

    <div class="grid gap-4">
      <article
        v-for="(step, index) in accessSteps"
        :key="step.id"
        class="grid grid-cols-[2.5rem_1fr] gap-3"
      >
        <span class="flex size-10 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
          {{ index + 1 }}
        </span>
        <div>
          <h4 class="font-semibold text-foreground">{{ step.title }}</h4>
          <p class="mt-1 text-sm leading-relaxed text-muted-foreground">{{ step.summary }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
