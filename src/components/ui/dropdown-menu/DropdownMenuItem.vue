<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { DropdownMenuItemProps } from "reka-ui"
import { DropdownMenuItem } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<DropdownMenuItemProps & {
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <DropdownMenuItem
    data-slot="dropdown-menu-item"
    v-bind="props"
    :class="cn('relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', props.class)"
  >
    <slot />
  </DropdownMenuItem>
</template>
