<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { SelectItemProps } from "reka-ui"
import { Check } from "lucide-vue-next"
import {
  SelectItem as SelectItemPrimitive,
  SelectItemIndicator,
  SelectItemText,
} from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<SelectItemProps & {
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <SelectItemPrimitive
    data-slot="select-item"
    v-bind="props"
    :class="cn('relative flex w-full cursor-default select-none items-center rounded-sm py-2 pr-8 pl-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', props.class)"
  >
    <span class="absolute right-2 flex size-4 items-center justify-center">
      <SelectItemIndicator>
        <Check class="size-4" />
      </SelectItemIndicator>
    </span>
    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItemPrimitive>
</template>
