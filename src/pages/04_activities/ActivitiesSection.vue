<script setup lang="ts">
import { RouterLink } from "vue-router"

const activityBlocks = [
  {
    id: "talleres",
    title: "Talleres.",
    summary:
      "Producción musical, collage, maquillaje, movimiento y creación de objetos para transformar los temas del festival en práctica.",
    className: "bg-background text-foreground",
    to: undefined,
  },
  {
    id: "charlas",
    title: "Charlas.",
    summary:
      "Conversaciones en La Polivalent con formato abierto, preguntas del público y enfoque accesible.",
    className: "bg-foreground text-background",
    to: undefined,
  },
  {
    id: "exposiciones",
    title: "Exposiciones.",
    summary:
      "Tres exposiciones fotográficas sobre salud mental, cuerpo, fama, privacidad e industria musical.",
    className: "bg-primary text-primary-foreground",
    to: undefined,
  },
  {
    id: "stands-merch",
    title: "Tienda.",
    summary:
      "Food trucks, bebidas, merchandising oficial y espacios comunes abiertos durante todo el horario del festival.",
    className: "bg-secondary text-secondary-foreground",
    to: { path: "/tienda" },
  },
] as const
</script>

<template>
  <section class="border-b border-foreground bg-background">
    <h2 data-reveal class="border-b border-foreground px-5 py-4 text-4xl font-normal leading-none text-foreground sm:px-6 sm:text-5xl lg:px-8">
      Programación.
    </h2>

    <div data-reveal class="grid grid-cols-2">
      <component
        :is="block.to ? RouterLink : 'article'"
        v-for="block in activityBlocks"
        :key="block.id"
        :to="block.to"
        :class="[
          'block min-h-44 border-b border-foreground p-4 outline-none transition odd:border-r [&:nth-last-child(-n+2)]:border-b-0 sm:min-h-52 sm:p-6 lg:min-h-60 lg:p-8',
          block.to ? 'hover:brightness-95 focus-visible:ring-2 focus-visible:ring-ring' : '',
          block.className,
        ]"
      >
        <h3 class="text-2xl font-normal leading-none sm:text-4xl lg:text-5xl">{{ block.title }}</h3>
        <p class="mt-5 max-w-2xl text-xs leading-relaxed sm:mt-8 sm:text-sm lg:text-base">
          {{ block.summary }}
        </p>
      </component>
    </div>
  </section>
</template>
