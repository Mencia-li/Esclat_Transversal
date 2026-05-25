<template>
    <main>
        <section id="home">
        <HeroSection />
        </section>

        <section id="proyectos">
        <ProjectsSection />
        </section>

        <section id="ilustraciones">
        <IllustrationsSection />
        </section>

        <section id="contacto">
        <ContactSection />
        </section>
    </main>
</template>

<script setup lang="ts">
import HeroSection from "@/pages/01_home/HeroSection.vue"
import ProjectsSection from "@/pages/02_projects/ProjectsSection.vue"
import IllustrationsSection from "@/pages/03_illustrations/IllustrationsSection.vue"
import ContactSection from "@/pages/04_contact/ContactSection.vue"
</script>