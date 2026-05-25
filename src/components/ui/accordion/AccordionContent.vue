<script setup lang="ts">
import type { AccordionContentProps } from "reka-ui"
import { computed, useAttrs } from "vue"
import { AccordionContent as AccordionContentPrimitive } from "reka-ui"
import { cn } from "@/lib/utils"

defineOptions({ inheritAttrs: false })

const props = defineProps<AccordionContentProps>()
const attrs = useAttrs()

const delegatedAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const mergedBindings = computed(() => ({
  ...props,
  ...delegatedAttrs.value,
}))
</script>

<template>
  <AccordionContentPrimitive
    data-slot="accordion-content"
    v-bind="mergedBindings"
    class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
  >
    <div :class="cn('pt-0 pb-4', attrs.class as string | undefined)">
      <slot />
    </div>
  </AccordionContentPrimitive>
</template>
