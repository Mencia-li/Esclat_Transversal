<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { DropdownMenuContentEmits, DropdownMenuContentProps } from "reka-ui"
import {
  DropdownMenuContent as DropdownMenuContentPrimitive,
  DropdownMenuPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<DropdownMenuContentProps & {
  class?: HTMLAttributes["class"]
}>(), {
  sideOffset: 6,
})

const emits = defineEmits<DropdownMenuContentEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContentPrimitive
      data-slot="dropdown-menu-content"
      v-bind="forwarded"
      :class="cn('bg-popover text-popover-foreground z-50 min-w-44 overflow-hidden rounded-md border p-1 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out', props.class)"
    >
      <slot />
    </DropdownMenuContentPrimitive>
  </DropdownMenuPortal>
</template>
