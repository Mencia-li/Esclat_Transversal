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
  <section class="border-b border-foreground bg-background">
    <div data-reveal class="grid border-b border-foreground md:grid-cols-[1.15fr_1fr]">
      <div class="border-b border-foreground px-5 py-4 sm:px-6 md:border-b-0 md:border-r lg:px-8">
        <h2 class="text-5xl font-normal uppercase leading-none text-foreground sm:text-6xl lg:text-7xl">FAQS</h2>
      </div>

      <div class="bg-primary px-5 py-4 text-primary-foreground sm:px-6 lg:px-8">
        <p class="max-w-xl text-xl font-normal leading-tight sm:text-2xl lg:text-3xl">
          Respuestas rápidas antes de venir al festival.
        </p>
      </div>
    </div>

    <Accordion
      type="single"
      collapsible
      default-value="reserva"
      data-reveal
      style="--reveal-delay: 120ms"
      class="border-t border-foreground"
    >
      <AccordionItem v-for="(faq, index) in faqs" :key="faq.id" :value="faq.id" class="border-foreground">
        <AccordionTrigger
          class="min-h-14 items-center rounded-none px-5 py-0 text-foreground hover:text-primary sm:min-h-16 sm:px-6 lg:px-8 [&_svg]:mt-0 [&_svg]:text-foreground"
        >
          <span class="flex items-center gap-3 text-left sm:gap-4">
            <span class="text-[0.7rem] font-medium tabular-nums sm:text-xs">{{ String(index + 1).padStart(2, "0") }}</span>
            <span class="text-base font-normal leading-tight sm:text-lg lg:text-xl">
              {{ faq.question }}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent class="px-5 pb-4 pl-14 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pl-20 lg:px-8 lg:pl-24">
          {{ faq.answer }}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>
