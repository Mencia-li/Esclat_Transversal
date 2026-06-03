<script setup lang="ts">
import AccessStepsBlock from "./AccessStepsBlock.vue"
import MerchBlock from "./MerchBlock.vue"
import SafetyRulesBlock from "./SafetyRulesBlock.vue"
import TicketsBlock from "./TicketsBlock.vue"
</script>

<template>
  <section class="festival-section-entries festival-theme-alt">
    <div class="entries-section-container">
      <div data-reveal class="mb-5 flex shrink-0 flex-col gap-3 md:flex-row md:items-end md:justify-between lg:mb-4">
        <div>
          <p class="text-sm font-semibold uppercase text-primary">Entradas gratuitas</p>
          <h2 class="mt-2 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">ENTRADAS</h2>
        </div>

        <p class="max-w-md text-sm leading-relaxed text-muted-foreground">
          El acceso a ESCLAT es gratuito. Solo los talleres necesitan inscripción previa por aforo limitado.
        </p>
      </div>

      <div class="grid min-h-0 flex-1 gap-5 lg:grid-cols-[1.55fr_0.85fr]">
        <TicketsBlock />
        <MerchBlock />
      </div>

      <div class="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <AccessStepsBlock />
        <SafetyRulesBlock />
      </div>
    </div>
  </section>
</template>
