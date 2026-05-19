<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { SelectTriggerProps } from "reka-ui"
import { ChevronDown } from "lucide-vue-next"
import { SelectIcon, SelectTrigger } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<SelectTriggerProps & {
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    v-bind="props"
    :class="cn('border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="size-4 opacity-60" />
    </SelectIcon>
  </SelectTrigger>
</template>
