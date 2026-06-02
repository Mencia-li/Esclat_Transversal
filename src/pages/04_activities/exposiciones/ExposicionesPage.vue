<script setup lang="ts">
import { RouterLink } from "vue-router"
import { ArrowLeft } from "lucide-vue-next"

type ExhibitionDay = {
  id: string
  weekday: string
  date: string
  opening: string
  label: string
  title: string
  time: string
  description: string
  space: string
  meta: string
  tags: string
}

const exhibitionDays: ExhibitionDay[] = [
  {
    id: "viernes",
    weekday: "Viernes",
    date: "23/10",
    opening: "16:00 h",
    label: "Instalación",
    title: "Exposición fotográfica - Backstage: la otra cara",
    time: "16:00-20:00 h",
    description:
      "Las imágenes que nunca salen en el cartel. Fotógrafos que han trabajado con artistas en gira muestran lo que ocurre entre bambalinas: la espera antes de salir, el cansancio después, la soledad de una habitación de hotel a las dos de la madrugada. Un contrapunto visual brutal a la imagen pulida que el público consume.",
    space: "Sala de Exposiciones · Nave 1, planta baja · hasta 60 personas",
    meta: "Continua | Libre acceso | 10-15 fotografías",
    tags: "salud mental · fama · realidad vs imagen",
  },
  {
    id: "sabado",
    weekday: "Sábado",
    date: "24/10",
    opening: "16:00 h",
    label: "Instalación",
    title: "Exposición fotográfica - Cuerpos sin filtro",
    time: "16:00-20:00 h",
    description:
      "Veinte retratos de mujeres músicas, artistas visuales y asistentes al festival fotografiadas sin retoque y sin posado dirigido. El criterio de selección no es la perfección estética sino la diversidad: cuerpos, edades, contextos diferentes. Cada imagen lleva una frase escrita por la propia protagonista. Una exposición que invita a mirar de otra manera.",
    space: "Sala de Exposiciones · Nave 1, planta baja · hasta 60 personas",
    meta: "Continua | Libre acceso | 20 piezas",
    tags: "cuerpo · belleza · representación",
  },
  {
    id: "domingo",
    weekday: "Domingo",
    date: "25/10",
    opening: "16:00 h",
    label: "Instalación",
    title: "Exposición fotográfica - Lo que no sale en la foto",
    time: "16:00-20:00 h",
    description:
      "Dos series en una sala. La primera replica la estética del paparazzi con personas completamente anónimas en momentos cotidianos íntimos: el efecto es extraño e incómodo por razones que vale la pena explorar. La segunda recoge fichas de artistas que la industria desechó y que nunca llegaron al gran público, con un QR que lleva a un fragmento de su música. El visitante puede añadir su propia recomendación de artista desconocido.",
    space: "Sala de Exposiciones · Nave 1, planta baja · hasta 60 personas",
    meta: "Continua | Libre acceso | 25 piezas + QR interactivo",
    tags: "fama · privacidad · industria · memoria",
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

      <h1 class="text-4xl font-normal leading-none text-foreground sm:text-5xl">Exposiciones.</h1>
    </div>

    <div class="border-b border-foreground bg-blue_ice px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div class="mx-auto grid w-full max-w-[96rem] gap-8">
        <section
          v-for="day in exhibitionDays"
          :key="day.id"
          class="border border-foreground bg-background"
        >
          <div class="grid grid-cols-[minmax(0,1fr)_auto] border-b border-foreground">
            <div class="min-w-0 px-3 py-3 sm:px-4">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70">{{ day.weekday }}</p>
              <h2 class="mt-2 text-3xl font-normal uppercase leading-none text-foreground sm:text-4xl lg:text-5xl">
                Apertura y llegada libre
              </h2>
            </div>
            <p class="flex items-center border-l border-foreground px-3 py-3 text-3xl font-normal leading-none text-foreground sm:px-4 sm:text-4xl lg:text-5xl">
              {{ day.date }}
            </p>
          </div>

          <div class="border-b border-foreground px-4 py-4 sm:px-6">
            <p class="text-xl font-semibold leading-tight text-[#5d6fcb] sm:text-2xl">{{ day.opening }}</p>
          </div>

          <article class="m-4 border border-grey bg-background sm:m-6 lg:m-8">
            <div class="grid grid-cols-[minmax(8rem,15rem)_1fr] border-b border-grey">
              <p class="bg-[#1aa049] px-3 py-3 text-sm font-semibold uppercase text-background sm:px-4 sm:text-base">
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
