<script setup lang="ts">
import ActivityDetailPage from "../_shared/ActivityDetailPage.vue"
import { exhibitionDays } from "../activitiesData"
</script>

<template>
  <ActivityDetailPage title="Exposiciones" :days="exhibitionDays" />
</template>
