<script setup lang="ts">
import { ShieldCheck } from "lucide-vue-next"
import { safetyRules } from "@/data/festival"
</script>

<template>
  <section data-reveal style="--reveal-delay: 120ms" class="rounded-md border border-border bg-secondary p-6">
    <div class="mb-6 flex items-center gap-3 text-primary">
      <ShieldCheck class="size-5" />
      <h3 class="text-2xl font-semibold text-foreground">Normas básicas.</h3>
    </div>

    <div class="grid gap-3 sm:grid-cols-2">
      <article
        v-for="rule in safetyRules"
        :key="rule.id"
        class="rounded-md bg-background p-4"
      >
        <h4 class="font-semibold text-foreground">{{ rule.title }}</h4>
        <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ rule.summary }}</p>
      </article>
    </div>
  </section>
</template>
