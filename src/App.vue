<script setup lang="ts">
import { RouterView } from "vue-router"
import SiteFooter from "@/components/layout/SiteFooter.vue"
import SiteHeader from "@/components/layout/SiteHeader.vue"
</script>

<template>
  <SiteHeader />
  <main class="pt-20">
    <RouterView />
  </main>
  <SiteFooter />
</template>
