<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { NavigationMenuItemProps } from "reka-ui"
import { NavigationMenuItem } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<NavigationMenuItemProps & {
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <NavigationMenuItem
    data-slot="navigation-menu-item"
    v-bind="props"
    :class="cn('relative', props.class)"
  >
    <slot />
  </NavigationMenuItem>
</template>
