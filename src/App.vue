<script setup lang="ts">
import { RouterView } from "vue-router"
import SiteFooter from "@/components/layout/SiteFooter.vue"
import SiteHeader from "@/components/layout/SiteHeader.vue"
import { useScrollReveal } from "@/composables/useScrollReveal"

useScrollReveal()
</script>

<template>
  <SiteHeader />
  <main class="pt-20">
    <RouterView />
  </main>
  <SiteFooter />
</template>
