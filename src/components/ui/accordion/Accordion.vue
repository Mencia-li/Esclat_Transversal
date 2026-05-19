<script setup lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { AccordionRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AccordionRootProps & {
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<AccordionRootEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AccordionRoot
    data-slot="accordion"
    v-bind="forwarded"
    :class="cn('w-full', props.class)"
  >
    <slot />
  </AccordionRoot>
</template>
