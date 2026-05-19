<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { SelectContentEmits, SelectContentProps } from "reka-ui"
import {
  SelectContent as SelectContentPrimitive,
  SelectPortal,
  SelectViewport,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<SelectContentProps & {
  class?: HTMLAttributes["class"]
}>(), {
  position: "popper",
  sideOffset: 6,
})

const emits = defineEmits<SelectContentEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectPortal>
    <SelectContentPrimitive
      data-slot="select-content"
      v-bind="forwarded"
      :class="cn('bg-popover text-popover-foreground relative z-50 max-h-96 min-w-36 overflow-hidden rounded-md border shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out', props.class)"
    >
      <SelectViewport class="p-1">
        <slot />
      </SelectViewport>
    </SelectContentPrimitive>
  </SelectPortal>
</template>
