<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { NavigationMenuLinkEmits, NavigationMenuLinkProps } from "reka-ui"
import { NavigationMenuLink, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<NavigationMenuLinkProps & {
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<NavigationMenuLinkEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <NavigationMenuLink
    data-slot="navigation-menu-link"
    v-bind="forwarded"
    :class="cn('inline-flex h-10 items-center justify-center rounded-md px-3 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none', props.class)"
  >
    <slot />
  </NavigationMenuLink>
</template>
