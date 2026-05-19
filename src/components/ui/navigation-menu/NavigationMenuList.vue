<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { NavigationMenuListProps } from "reka-ui"
import { NavigationMenuList } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<NavigationMenuListProps & {
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <NavigationMenuList
    data-slot="navigation-menu-list"
    v-bind="props"
    :class="cn('group flex flex-1 list-none items-center justify-center gap-1', props.class)"
  >
    <slot />
  </NavigationMenuList>
</template>
