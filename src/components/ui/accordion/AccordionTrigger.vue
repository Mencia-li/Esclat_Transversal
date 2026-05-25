<script setup lang="ts">
import type { AccordionTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { AccordionHeader, AccordionTrigger as AccordionTriggerPrimitive } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AccordionTriggerProps & {
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTriggerPrimitive
      data-slot="accordion-trigger"
      v-bind="props"
      :class="cn('focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:text-primary focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-90', props.class)"
    >
      <slot />
      <svg
        class="mt-0.5 size-4 shrink-0 text-foreground transition-transform duration-200"
        viewBox="0 0 10 10"
        aria-hidden="true"
      >
        <path d="M2 1.5 L8.5 5 L2 8.5 Z" fill="currentColor" />
      </svg>
    </AccordionTriggerPrimitive>
  </AccordionHeader>
</template>
