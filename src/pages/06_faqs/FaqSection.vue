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
  <section class="mt-6 border-y border-foreground bg-background sm:mt-8 lg:mt-10">
    <div data-reveal class="border-b border-foreground bg-[#A9FCE6] px-5 py-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-normal leading-none text-foreground sm:text-4xl lg:text-5xl">FAQs.</h2>
    </div>

    <Accordion
      type="single"
      collapsible
      default-value="reserva"
      data-reveal
      style="--reveal-delay: 120ms"
      class="border-t border-foreground"
    >
      <AccordionItem v-for="faq in faqs" :key="faq.id" :value="faq.id" class="border-foreground">
        <AccordionTrigger
          class="min-h-14 items-center justify-start gap-3 rounded-none px-5 py-0 text-foreground sm:min-h-16 sm:gap-4 sm:px-6 lg:px-8 [&_svg]:mt-0 [&_svg]:text-foreground"
        >
          <span class="text-left text-base font-normal leading-tight sm:text-lg lg:text-xl">
            {{ faq.question }}
          </span>
        </AccordionTrigger>
        <AccordionContent class="px-5 pb-4 text-sm leading-relaxed text-foreground/80 sm:px-6 lg:px-8">
          {{ faq.answer }}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>
