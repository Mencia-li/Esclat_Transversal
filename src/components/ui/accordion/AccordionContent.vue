<script setup lang="ts">
import type { AccordionContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { AccordionContent as AccordionContentPrimitive } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AccordionContentProps & {
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <AccordionContentPrimitive
    data-slot="accordion-content"
    v-bind="props"
    class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
  >
    <div :class="cn('pt-0 pb-4', props.class)">
      <slot />
    </div>
  </AccordionContentPrimitive>
</template>
