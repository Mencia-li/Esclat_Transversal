<template>
  <section class="min-h-screen theme-invert px-6 py-20 transition-colors duration-300">
    <div class="max-w-6xl mx-auto space-y-8">
      <h1 class="text-4xl font-bold">Proyectos</h1>
      <p class="max-w-2xl opacity-90">
        Aquí puedes ver todos mis proyectos realizados. Haz clic en cualquiera para ver el detalle.
      </p>

      <ProjectsSection />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProjectsSection from "@/pages/02_projects/ProjectsSection.vue"
</script>