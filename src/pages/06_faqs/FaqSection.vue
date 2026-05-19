<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/data/festival"
</script>

<template>
  <section class="festival-section-center festival-theme-alt">
    <div class="section-container max-w-5xl">
      <div data-reveal>
        <h2 class="text-4xl font-semibold uppercase tracking-wide text-muted-foreground sm:text-5xl">FAQS</h2>
      </div>

      <Accordion
        type="single"
        collapsible
        default-value="reserva"
        data-reveal
        style="--reveal-delay: 120ms"
        class="mx-auto mt-8 border-t border-border"
      >
        <AccordionItem v-for="(faq, index) in faqs" :key="faq.id" :value="faq.id">
          <AccordionTrigger class="py-4 text-muted-foreground">
            <span class="flex items-center gap-2 font-semibold text-muted-foreground">
              <span class="text-xs tabular-nums">{{ String(index + 1).padStart(2, "0") }}</span>
              {{ faq.question }}
            </span>
          </AccordionTrigger>
          <AccordionContent class="pl-8 text-muted-foreground">
            {{ faq.answer }}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>
</template>
