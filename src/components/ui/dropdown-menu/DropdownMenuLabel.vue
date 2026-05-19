<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { DropdownMenuLabelProps } from "reka-ui"
import { DropdownMenuLabel } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<DropdownMenuLabelProps & {
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <DropdownMenuLabel
    data-slot="dropdown-menu-label"
    v-bind="props"
    :class="cn('px-2 py-1.5 text-sm font-semibold', props.class)"
  >
    <slot />
  </DropdownMenuLabel>
</template>
