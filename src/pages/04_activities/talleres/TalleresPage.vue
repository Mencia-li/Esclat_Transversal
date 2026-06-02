<script setup lang="ts">
import { RouterLink } from "vue-router"
import { ArrowLeft } from "lucide-vue-next"

type WorkshopItem = {
  id: string
  label: string
  title: string
  time: string
  space: string
  description: string
  meta: string
  tags: string
}

type WorkshopDay = {
  id: string
  weekday: string
  date: string
  timeRange: string
  title: string
  workshops: WorkshopItem[]
}

const workshopDays: WorkshopDay[] = [
  {
    id: "viernes",
    weekday: "Viernes",
    date: "23/10",
    timeRange: "16:15-18:15 h",
    title: "Talleres simultáneos - 2 sesiones cada uno",
    workshops: [
      {
        id: "viernes-produce",
        label: "Taller",
        title: "Taller A - Produce tu estado de ánimo (x 2 sesiones)",
        time: "16:15-16:55 h y 17:25-18:05 h",
        space: "Sala Factoría · Nave 1, 1ª planta",
        description:
          "¿Qué sonaría si tradujéramos lo que sientes a un loop de cuatro compases? En este taller de iniciación a la producción musical cada participante crea una pieza breve usando solo su intuición emocional del momento, sin conocimientos técnicos previos. Al final se escuchan todas juntas. El resultado siempre sorprende. Sin experiencia necesaria, con ordenadores y software disponibles en sala.",
        meta: "40 min por sesión | Máxim. 48 personas | Con ordenadores",
        tags: "producción · emoción · iniciación musical",
      },
      {
        id: "viernes-adivina",
        label: "Taller",
        title: "Taller B - Adivina quién eres (x 2 sesiones)",
        time: "16:25-17:05 h y 17:35-18:15 h",
        space: "Sala Visual Room · Nave 1, 1ª planta",
        description:
          "Versión musical del juego clásico de los post-its: cada participante lleva pegado un arquetipo social — el raro, el popular, el artista underground, el que siempre encaja — y el resto del grupo le trata en consonancia sin decirle cuál es el suyo. Lo que empieza como un juego divertido acaba siendo una conversación muy honesta sobre cómo las etiquetas moldean el comportamiento. Muy participativo, muy revelador.",
        meta: "40 min por sesión | Máxim. 30 personas | Muy participativo",
        tags: "etiquetas · presión social · identidad",
      },
    ],
  },
  {
    id: "sabado",
    weekday: "Sábado",
    date: "24/10",
    timeRange: "16:15-18:15 h",
    title: "Talleres simultáneos - 2 sesiones cada uno",
    workshops: [
      {
        id: "sabado-pinta-caras",
        label: "Taller",
        title: "Taller A - Pinta caras (x 2 sesiones)",
        time: "16:15-16:55 h y 17:25-18:05 h",
        space: "Sala Factoría · Nave 1, 1ª planta",
        description:
          "Suena una canción. Tienes quince minutos y una mesa llena de maquillaje compartido. La única regla es que no puedes mirar ninguna referencia visual: solo escuchas y te dejas llevar. ¿Cómo suena el indie folk en purpurina? ¿Y el techno en sombra de ojos? Un taller sin técnica ni objetivo estético que acaba siendo una de las experiencias más divertidas y sorprendentes del festival.",
        meta: "40 min por sesión | Grupos de 10 | Maquillaje compartido en sala",
        tags: "belleza · música · improvisación · juego",
      },
      {
        id: "sabado-portada",
        label: "Taller",
        title: "Taller B - Crea tu portada de álbum (x 2 sesiones)",
        time: "16:25-17:05 h y 17:35-18:15 h",
        space: "Sala Visual Room · Nave 1, 1ª planta",
        description:
          "Revistas viejas de moda y música, tijeras, pegamento y la pregunta: ¿qué portada te hubiera gustado ver cuando tenías quince años? Cada participante monta la suya con collage analógico, sin límite estético ni narrativo. Al final del día todas las portadas se exponen juntas en el espacio. Te llevas la tuya a casa.",
        meta: "40 min por sesión | Grupos de 12 | Te llevas tu portada",
        tags: "representación · collage · creatividad · medios",
      },
    ],
  },
  {
    id: "domingo",
    weekday: "Domingo",
    date: "25/10",
    timeRange: "16:15-18:15 h",
    title: "Talleres simultáneos - 2 sesiones cada uno",
    workshops: [
      {
        id: "domingo-camiseta",
        label: "Taller",
        title: "Taller A - Pinta tu camiseta (x 2 sesiones)",
        time: "16:15-17:15 h y 17:15-18:15 h",
        space: "Sala Factoría · Nave 1, 1ª planta",
        description:
          "Painting ligero sobre una camiseta: diseña tu propia camiseta según la impresión de la música. Sin experiencia previa.",
        meta: "60 min por sesión | Grupos de 20",
        tags: "cuerpo · arte · expresión",
      },
      {
        id: "domingo-cuerpo",
        label: "Taller",
        title: "Taller B - El cuerpo escucha (x 2 sesiones)",
        time: "16:15-17:05 h y 17:15-18:05 h",
        space: "Sala Visual Room · Nave 1, 1ª planta",
        description:
          "Taller de movimiento y música que explora cómo el sonido se procesa corporalmente. Mezcla danza espontánea, respiración y sonoridades distintas.",
        meta: "50 min por sesión | Grupos de 20",
        tags: "cuerpo · bienestar · sensorialidad",
      },
    ],
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

      <h1 class="text-4xl font-normal leading-none text-foreground sm:text-5xl">Talleres.</h1>
    </div>

    <div class="border-b border-foreground bg-blue_ice px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div class="mx-auto grid w-full max-w-[96rem] gap-8">
        <section
          v-for="day in workshopDays"
          :key="day.id"
          class="border border-foreground bg-background"
        >
          <div class="grid grid-cols-[minmax(0,1fr)_auto] border-b border-foreground">
            <div class="min-w-0 px-3 py-3 sm:px-4">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70">{{ day.weekday }}</p>
              <h2 class="mt-2 text-3xl font-normal uppercase leading-none text-foreground sm:text-4xl lg:text-5xl">
                {{ day.title }}
              </h2>
            </div>
            <p class="flex items-center border-l border-foreground px-3 py-3 text-3xl font-normal leading-none text-foreground sm:px-4 sm:text-4xl lg:text-5xl">
              {{ day.date }}
            </p>
          </div>

          <div class="border-b border-foreground px-4 py-4 sm:px-6">
            <p class="text-xl font-semibold leading-tight text-[#5d6fcb] sm:text-2xl">{{ day.timeRange }}</p>
          </div>

          <div class="grid gap-6 p-4 sm:p-6 lg:p-8">
            <article
              v-for="workshop in day.workshops"
              :key="workshop.id"
              class="border border-grey bg-background"
            >
              <div class="grid grid-cols-[minmax(7rem,12rem)_1fr] border-b border-grey">
                <p class="bg-turquesa px-3 py-3 text-sm font-semibold uppercase text-foreground sm:px-4 sm:text-base">
                  {{ workshop.label }}
                </p>
                <p class="px-3 py-3 text-right text-sm font-semibold text-foreground/75 sm:px-4 sm:text-base">
                  {{ workshop.time }}
                </p>
              </div>

              <h3 class="border-b border-grey px-3 py-3 text-2xl font-semibold leading-tight text-foreground sm:px-4 sm:text-3xl">
                {{ workshop.title }}
              </h3>

              <p class="min-h-32 border-b border-grey px-3 py-4 text-base leading-relaxed text-foreground/80 sm:px-4 sm:text-lg lg:text-xl">
                {{ workshop.description }}
              </p>

              <p class="border-b border-grey bg-secondary/40 px-3 py-3 text-sm font-semibold leading-tight text-foreground/75 sm:px-4 sm:text-base">
                Espacio: {{ workshop.space }}
              </p>

              <div class="grid gap-2 px-3 py-3 text-sm font-medium leading-tight text-foreground/75 sm:px-4 sm:text-base md:grid-cols-[1fr_auto]">
                <p>{{ workshop.meta }}</p>
                <p class="italic">{{ workshop.tags }}</p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
