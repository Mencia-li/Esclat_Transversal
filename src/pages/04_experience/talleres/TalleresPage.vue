<script setup lang="ts">
import ActivityDetailPage from "../_shared/ActivityDetailPage.vue"
import { workshopDays } from "../activitiesData"
</script>

<template>
  <ActivityDetailPage title="Talleres" :days="workshopDays" />
</template>
