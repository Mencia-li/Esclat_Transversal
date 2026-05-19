<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { DropdownMenuSeparatorProps } from "reka-ui"
import { DropdownMenuSeparator } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<DropdownMenuSeparatorProps & {
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <DropdownMenuSeparator
    data-slot="dropdown-menu-separator"
    v-bind="props"
    :class="cn('bg-border -mx-1 my-1 h-px', props.class)"
  />
</template>
