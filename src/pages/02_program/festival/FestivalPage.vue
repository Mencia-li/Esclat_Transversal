<script setup lang="ts">
import { RouterLink } from "vue-router"
import { ArrowLeft } from "lucide-vue-next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { accessSteps, safetyRules } from "@/data/festival"
import FestivalMap from "./FestivalMap.vue"
import { festivalMaps } from "./festivalMaps"

const accessModes = [
  {
    id: "libre",
    title: "LIBRE ACCESO",
    meta: "GRATUITO · SIN RESERVA",
    summary:
      "Conciertos, exposiciones fotográficas, proyecciones de cine, el cuarto de escucha, la zona de stands y los espacios comunes. Ven cuando quieras, hasta completar aforo.",
  },
  {
    id: "inscripcion",
    title: "CON INSCRIPCIÓN",
    meta: "GRATUITO · PLAZA LIMITADA",
    summary:
      "Talleres temáticos y talleres de instrumento. Plazas limitadas. Inscripción abierta una semana antes del festival a través de esta web.",
  },
] as const
</script>

<template>
  <section class="border-b border-foreground bg-background">
    <div class="border-b border-foreground bg-background px-5 py-5 sm:px-6 lg:px-8">
      <RouterLink
        :to="{ path: '/', hash: '#programa' }"
        class="mb-5 inline-flex items-center gap-2 border border-foreground bg-background px-5 py-3 text-sm font-medium uppercase text-foreground transition-colors hover:bg-grey sm:px-6 sm:text-base"
      >
        <ArrowLeft class="size-4" />
        Volver al programa
      </RouterLink>

      <h1 class="text-4xl font-normal leading-none text-foreground sm:text-5xl">FESTIVAL</h1>
    </div>

    <div class="mx-auto w-full max-w-368 border-x border-foreground">
      <div class="grid border-b border-foreground lg:grid-cols-[1fr_1.15fr]">
        <div class="relative min-h-64 overflow-hidden border-b border-foreground bg-background lg:min-h-80 lg:border-b-0 lg:border-r">
          <div class="relative z-10 flex h-full items-center justify-center p-8">
            <img
              src="/img/logos/esclat/png/72/vertical-black.png"
              alt="Logo de Esclat"
              class="w-28 sm:w-36 lg:w-44"
            />
          </div>
        </div>

        <div class="bg-blue_ice p-6 sm:p-8 lg:p-10">
          <div class="mt-4 space-y-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
            <p>
              Festival de música, pensament i creativitat en Las Naves de Valencia. Durante tres días combina conciertos, talleres, exposiciones, cine y charlas.
            </p>
            <p>
              Su nombre significa estallido, una forma de hablar de todo eso que crece por dentro y a veces cuesta poner en palabras.
            </p>
            <p>
              Salud mental, estándares de belleza e industria del entretenimiento atraviesan el programa. La música abre la puerta emocional; los talleres y conversaciones ayudan a cruzarla.
            </p>
          </div>
        </div>
      </div>

      <div class="border-b border-foreground px-6 py-8 sm:px-8 lg:px-10">
        <p class="text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
          Este festival nace de una necesidad: hablar de lo que cuesta articular en voz alta.
        </p>
      </div>

      <div class="esclat-section-title-box">
        <p class="esclat-section-title">LAS NAVES</p>
      </div>

      <div class="border-b border-foreground bg-background px-6 py-8 sm:px-8 lg:px-10">
        <p class="max-w-4xl text-sm leading-relaxed text-foreground/90 sm:text-base">
          Un espacio industrial reconvertido en centro de creación que lleva años siendo escenario de
          proyectos culturales en Valencia. Grande sin ser frío, con patios exteriores, salas de distintos
          tamaños y una acústica que funciona igual para un concierto que para una conversación en círculo.
        </p>
        <p class="mt-5 max-w-4xl text-sm leading-relaxed text-foreground/90 sm:text-base">
          ESCLAT ocupa tres días sus naves, pasillos y patios.
        </p>
      </div>

      <div class="border-b border-foreground bg-background px-6 py-6 sm:px-8 lg:px-10">
        <div
          v-for="(map, index) in festivalMaps"
          :key="map.id"
          :class="index === 0 ? '' : 'mt-6 border-t border-black pt-6'"
        >
          <FestivalMap :map="map" />
        </div>
      </div>

      <section class="border-b border-foreground bg-background">
        <div class="esclat-section-title-box">
          <h2 class="esclat-section-title">ACCESO</h2>
        </div>

        <div class="px-6 py-8 sm:px-8 lg:px-10">
          <div class="grid gap-6 lg:grid-cols-2">
            <article
              v-for="mode in accessModes"
              :key="mode.id"
              class="rounded-md border border-foreground bg-background shadow-sm"
            >
              <div class="border-b border-foreground bg-blue_ice px-6 py-4">
                <h3 class="text-lg font-semibold uppercase text-foreground">{{ mode.title }}</h3>
              </div>
              <div class="p-6">
                <p class="text-xs font-semibold uppercase text-muted-foreground">{{ mode.meta }}</p>
                <p class="mt-4 text-sm leading-relaxed text-foreground/90">{{ mode.summary }}</p>
              </div>
            </article>
          </div>

          <div class="mt-10 grid gap-6 lg:grid-cols-2">
            <article
              v-for="(step, index) in accessSteps"
              :key="step.id"
              class="grid gap-4 border border-foreground bg-background p-4 sm:grid-cols-[5rem_1fr] sm:gap-5 sm:p-5"
            >
              <div class="flex h-16 w-16 items-center justify-center border border-foreground bg-blue_ice text-2xl font-semibold text-foreground sm:h-20 sm:w-20 sm:text-3xl">
                {{ index + 1 }}.
              </div>
              <div class="space-y-2">
                <h3 class="text-base font-semibold uppercase text-foreground sm:text-lg">{{ step.title }}</h3>
                <p class="text-sm leading-relaxed text-muted-foreground">{{ step.summary }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="mt-6 border-y border-foreground bg-background sm:mt-8 lg:mt-10">
        <div data-reveal class="esclat-section-title-box">
          <h2 class="esclat-section-title">NORMAS</h2>
        </div>

        <Accordion
          type="single"
          collapsible
          default-value="seguro"
          data-reveal
          style="--reveal-delay: 120ms"
          class="border-t border-foreground"
        >
          <AccordionItem v-for="rule in safetyRules" :key="rule.id" :value="rule.id" class="border-foreground">
            <AccordionTrigger
              class="min-h-14 items-center gap-3 rounded-none px-5 py-0 text-foreground transition-colors hover:bg-grey hover:text-foreground data-[state=open]:bg-background data-[state=open]:hover:bg-background sm:min-h-16 sm:gap-4 sm:px-6 lg:px-8 [&_svg]:mt-0 [&_svg]:text-foreground"
            >
              <span class="text-left text-base font-normal leading-tight sm:text-lg lg:text-xl">
                {{ rule.title }}
              </span>
            </AccordionTrigger>
            <AccordionContent class="px-5 pb-5 text-base leading-relaxed text-foreground/80 sm:px-6 sm:text-lg lg:px-8 lg:pb-6 lg:text-xl lg:leading-relaxed">
              {{ rule.summary }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  </section>
</template>
