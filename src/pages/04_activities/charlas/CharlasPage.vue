<script setup lang="ts">
import ActivityDetailPage from "../_shared/ActivityDetailPage.vue"
import { talkDays } from "../activitiesData"
</script>

<template>
  <ActivityDetailPage title="Charlas" :days="talkDays" />
</template>
