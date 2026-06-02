<script setup lang="ts">
import { RouterLink } from "vue-router"
import { ArrowLeft } from "lucide-vue-next"

type TalkDay = {
  id: string
  weekday: string
  date: string
  timeRange: string
  sectionTitle: string
  label: string
  title: string
  time: string
  description: string
  space: string
  meta: string
  tags: string
}

const talkDays: TalkDay[] = [
  {
    id: "viernes",
    weekday: "Viernes",
    date: "23/10",
    timeRange: "18:30-19:30 h",
    sectionTitle: "Charla principal - La Polivalent",
    label: "Conversación",
    title: "Cómo suena la ansiedad",
    time: "18:30-19:30 h",
    description:
      "Un psicólogo y un músico comparten escenario para hablar de algo que casi todo el mundo ha vivido pero pocos saben explicar: por qué la música nos afecta emocionalmente de formas que no controlamos, por qué elegimos canciones tristes cuando estamos mal y qué dice eso de cómo funciona nuestra mente. Una hora sin tecnicismos, con ejemplos en directo y muchas preguntas del público. No hace falta saber nada de música ni de psicología para entrar.",
    space: "La Polivalent · Nave 1, planta baja · hasta 80 personas",
    meta: "60 min | Máxim. 80 personas | Preguntas abiertas",
    tags: "salud mental · neurociencia sonora · accesible",
  },
  {
    id: "sabado",
    weekday: "Sábado",
    date: "24/10",
    timeRange: "18:30-19:30 h",
    sectionTitle: "Charla principal - La Polivalent",
    label: "Conversación",
    title: "La imagen del artista en la industria musical",
    time: "18:30-19:30 h",
    description:
      "Cuánto de lo que vemos en el escenario es una decisión artística y cuánto es una instrucción del sello. Qué le pasa a una artista cuando decide no jugar ese juego y qué le pasa cuando sí. Un debate abierto con artistas, periodistas y público sobre la imagen femenina en la música, los mandatos que la rodean y los espacios que se están abriendo — y los que todavía cuesta ocupar. Una hora que puede ponerse interesante.",
    space: "La Polivalent · Nave 1, planta baja · hasta 80 personas",
    meta: "60 min | Máxim. 80 personas | Debate abierto",
    tags: "imagen · belleza · industria · autenticidad",
  },
  {
    id: "domingo",
    weekday: "Domingo",
    date: "25/10",
    timeRange: "18:30-19:30 h",
    sectionTitle: "Charla principal + batucada de cierre",
    label: "Conversación",
    title: "Ser famoso cuesta más de lo que cobras",
    time: "18:30-19:30 h",
    description:
      "Exartistas y managers hablan sin eufemismos de lo que la industria no te cuenta antes de que firmes: el burnout, las cancelaciones, la exposición que no puedes apagar, la soledad detrás de los números de streaming. Una conversación honesta sobre el precio real de la fama y por qué el sistema está diseñado para que no te salga rentable emocionalmente. Formato abierto, sin respuestas fáciles.",
    space: "La Polivalent · Nave 1, planta baja · hasta 80 personas",
    meta: "60 min | Máxim. 80 personas | Formato abierto",
    tags: "fama · salud mental · industria · honestidad",
  },
]
</script>

<template>
  <section class="bg-background">
    <div class="border-b border-foreground bg-background px-5 py-5 sm:px-6 lg:px-8">
      <RouterLink
        :to="{ path: '/', hash: '#actividades' }"
        class="mb-5 inline-flex items-center gap-2 border border-foreground bg-background px-5 py-3 text-sm font-medium uppercase text-foreground transition-colors hover:bg-grey sm:px-6 sm:text-base"
      >
        <ArrowLeft class="size-4" />
        Volver a actividades
      </RouterLink>

      <h1 class="text-4xl font-normal leading-none text-foreground sm:text-5xl">Charlas.</h1>
    </div>

    <div class="border-b border-foreground bg-blue_ice px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div class="mx-auto grid w-full max-w-[96rem] gap-8">
        <section
          v-for="day in talkDays"
          :key="day.id"
          class="border border-foreground bg-background"
        >
          <div class="grid grid-cols-[minmax(0,1fr)_auto] border-b border-foreground">
            <div class="min-w-0 px-3 py-3 sm:px-4">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70">{{ day.weekday }}</p>
              <h2 class="mt-2 text-3xl font-normal uppercase leading-none text-foreground sm:text-4xl lg:text-5xl">
                {{ day.sectionTitle }}
              </h2>
            </div>
            <p class="flex items-center border-l border-foreground px-3 py-3 text-3xl font-normal leading-none text-foreground sm:px-4 sm:text-4xl lg:text-5xl">
              {{ day.date }}
            </p>
          </div>

          <div class="border-b border-foreground px-4 py-4 sm:px-6">
            <p class="text-xl font-semibold leading-tight text-[#5d6fcb] sm:text-2xl">{{ day.timeRange }}</p>
          </div>

          <article class="m-4 border border-grey bg-background sm:m-6 lg:m-8">
            <div class="grid grid-cols-[minmax(8rem,15rem)_1fr] border-b border-grey">
              <p class="bg-[#5d6fcb] px-3 py-3 text-sm font-semibold uppercase text-background sm:px-4 sm:text-base">
                {{ day.label }}
              </p>
              <p class="px-3 py-3 text-right text-sm font-semibold text-foreground/75 sm:px-4 sm:text-base">
                {{ day.time }}
              </p>
            </div>

            <h3 class="border-b border-grey px-3 py-3 text-2xl font-semibold leading-tight text-foreground sm:px-4 sm:text-3xl">
              {{ day.title }}
            </h3>

            <p class="min-h-40 border-b border-grey px-3 py-4 text-base leading-relaxed text-foreground/80 sm:px-4 sm:text-lg lg:text-xl">
              {{ day.description }}
            </p>

            <p class="border-b border-grey bg-secondary/40 px-3 py-3 text-sm font-semibold leading-tight text-foreground/75 sm:px-4 sm:text-base">
              Espacio: {{ day.space }}
            </p>

            <div class="grid gap-2 px-3 py-3 text-sm font-medium leading-tight text-foreground/75 sm:px-4 sm:text-base md:grid-cols-[1fr_auto]">
              <p>{{ day.meta }}</p>
              <p class="italic">{{ day.tags }}</p>
            </div>
          </article>
        </section>
      </div>
    </div>
  </section>
</template>
