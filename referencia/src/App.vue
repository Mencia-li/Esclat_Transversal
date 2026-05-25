<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import BottomFooter from '@/components/layout/BottomFooter.vue'

</script>

<template>
  <Header />
  <main class="pt-20">
    <RouterView />
  </main>
  <BottomFooter />
</template>

<style scoped>
</style>