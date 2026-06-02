<script lang="ts" setup>
import HeroSection from "@/pages/01_home/HeroSection.vue"
import CalendarSection from "@/pages/02_program/CalendarSection.vue"
import ArtistsSection from "@/pages/03_artists/ArtistsSection.vue"
import ActivitiesSection from "@/pages/04_activities/ActivitiesSection.vue"
import FaqSection from "@/pages/06_faqs/FaqSection.vue"
import PartnersMarquee from "@/pages/08_partners/PartnersMarquee.vue"
</script>

<template>
  <div>
    <section id="inicio" class="scroll-mt-20">
      <HeroSection />
    </section>

    <section id="programa" class="scroll-mt-20">
      <CalendarSection />
    </section>

    <section id="artistas" class="scroll-mt-20">
      <ArtistsSection />
    </section>

    <section id="actividades" class="scroll-mt-20">
      <ActivitiesSection />
    </section>

    <section id="faqs" class="scroll-mt-20">
      <FaqSection />
    </section>

    <PartnersMarquee />
  </div>
</template>
