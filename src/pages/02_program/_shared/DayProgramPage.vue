<script setup lang="ts">
import type { Component } from "vue"
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue"
import { Camera, CheckCircle2, ChevronDown, MapPin, Mic2, MessagesSquare, Music2, Play, Ticket } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { artistConcertSlots, artists, festivalDays, festivalInfo } from "@/data/festival"

const props = defineProps<{
  dayId: string
}>()

type CompleteProgramItem = {
  time: string
  title: string
  category: string
  location: string
  icon: Component
  sortValue: number
}

type TicketFormField = "name" | "email"

const venueMapUrl = "https://www.google.com/maps?q=Las%20Naves%20Valencia&output=embed"

const ticketForm = reactive({
  name: "",
  email: "",
})

const ticketSubmitted = ref(false)
const ticketTriedSubmit = ref(false)

function timeToMinutes(value: string) {
  const match = value.match(/(\d{1,2}):(\d{2})/)

  if (!match) {
    return Number.MAX_SAFE_INTEGER
  }

  return Number(match[1]) * 60 + Number(match[2])
}

function eventTitle(category: string, title: string) {
  if (category === "Exposición") {
    return `Exposición fotográfica - ${title}`
  }

  if (category === "Cine / Doc") {
    return `Proyección - ${title}`
  }

  return `${category} - ${title}`
}

function categoryLabel(category: string) {
  if (category === "Exposición") {
    return "Instalación"
  }

  return category
}

function categoryIcon(category: string) {
  if (category === "Exposición") {
    return Camera
  }

  if (category === "Cine / Doc") {
    return Play
  }

  if (category === "Charla") {
    return MessagesSquare
  }

  return Music2
}

function concertTimeLabel(artistId: string, fallbackTime: string) {
  const slot = artistConcertSlots[artistId]

  if (!slot) {
    return fallbackTime
  }

  return `${slot.start}-${slot.end}`
}

function concertSortValue(artistId: string, fallbackTime: string) {
  return timeToMinutes(artistConcertSlots[artistId]?.start ?? fallbackTime)
}

const day = computed(() => {
  const selectedDay = festivalDays.find((item) => item.id === props.dayId)

  if (!selectedDay) {
    throw new Error(`No se ha encontrado la programación del día ${props.dayId}.`)
  }

  return selectedDay
})

const dayTitle = computed(() => `${day.value.weekday} ${day.value.date.split("/")[0]}.`)
const dayArtists = computed(() => artists.filter((artist) => artist.date === day.value.date))
const validTicketEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ticketForm.email))
const canSubmitTicket = computed(() => ticketForm.name.trim().length > 1 && validTicketEmail.value)

const completeProgram = computed<CompleteProgramItem[]>(() => [
  ...day.value.schedule.map((event) => ({
    time: event.time,
    title: eventTitle(event.category, event.title),
    category: categoryLabel(event.category),
    location: event.space,
    icon: categoryIcon(event.category),
    sortValue: timeToMinutes(event.time),
  })),
  ...dayArtists.value.map((artist) => ({
    time: concertTimeLabel(artist.id, artist.time),
    title: `Concierto - ${artist.name}`,
    category: "Concierto",
    location: artist.stage,
    icon: Mic2,
    sortValue: concertSortValue(artist.id, artist.time),
  })),
].sort((firstItem, secondItem) => {
  if (firstItem.sortValue !== secondItem.sortValue) {
    return firstItem.sortValue - secondItem.sortValue
  }

  return firstItem.title.localeCompare(secondItem.title)
}))

const timelineItems = computed(() => completeProgram.value.map((event) => ({
  time: event.time,
  title: event.title,
})))

const timelineColumnRef = ref<HTMLElement | null>(null)
const timelineContentRef = ref<HTMLElement | null>(null)
const programSectionRef = ref<HTMLElement | null>(null)
const programScrollRef = ref<HTMLElement | null>(null)
const programMaxHeight = ref<string>()

let timelineResizeObserver: ResizeObserver | undefined

function numericStyleValue(styles: CSSStyleDeclaration, property: string) {
  return Number.parseFloat(styles.getPropertyValue(property)) || 0
}

function updateProgramMaxHeight() {
  const timelineColumn = timelineColumnRef.value
  const timelineContent = timelineContentRef.value
  const programSection = programSectionRef.value
  const programScroll = programScrollRef.value

  if (!timelineColumn || !timelineContent || !programSection || !programScroll || window.innerWidth < 1024) {
    programMaxHeight.value = undefined
    return
  }

  const timelineStyles = window.getComputedStyle(timelineColumn)
  const timelineNaturalHeight =
    timelineContent.getBoundingClientRect().height +
    numericStyleValue(timelineStyles, "padding-top") +
    numericStyleValue(timelineStyles, "padding-bottom")

  const programStyles = window.getComputedStyle(programSection)
  const programSectionTop = programSection.getBoundingClientRect().top
  const programScrollTop = programScroll.getBoundingClientRect().top
  const scrollOffset = programScrollTop - programSectionTop
  const availableHeight = timelineNaturalHeight - scrollOffset - numericStyleValue(programStyles, "padding-bottom")

  programMaxHeight.value = `${Math.max(availableHeight, 320)}px`
}

function updateTicketField(field: TicketFormField, event: Event) {
  const target = event.target as HTMLInputElement
  ticketForm[field] = target.value
  ticketSubmitted.value = false
}

function submitTicketForm() {
  ticketTriedSubmit.value = true

  if (!canSubmitTicket.value) {
    return
  }

  ticketSubmitted.value = true
}

onMounted(() => {
  nextTick(updateProgramMaxHeight)
  window.addEventListener("resize", updateProgramMaxHeight)

  if (typeof ResizeObserver !== "undefined" && timelineContentRef.value) {
    timelineResizeObserver = new ResizeObserver(updateProgramMaxHeight)
    timelineResizeObserver.observe(timelineContentRef.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateProgramMaxHeight)
  timelineResizeObserver?.disconnect()
})

watch(
  () => [props.dayId, completeProgram.value.length],
  async () => {
    await nextTick()
    updateProgramMaxHeight()
  },
)
</script>

<template>
  <section class="border-b border-foreground bg-background">
    <div class="mx-auto w-full max-w-368 border-x border-foreground">
      <div data-reveal class="border-b border-foreground bg-turquesa px-5 py-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-normal leading-none text-foreground sm:text-4xl lg:text-5xl">
          {{ dayTitle }}
        </h1>
      </div>

      <div data-reveal style="--reveal-delay: 120ms" class="border-b border-foreground bg-background px-5 py-6 sm:px-6 lg:px-8">
        <p class="max-w-4xl text-base leading-relaxed text-foreground/90 sm:text-lg lg:text-xl">
          {{ day.detail }}
        </p>
      </div>

      <div data-reveal style="--reveal-delay: 220ms" class="border-b border-foreground bg-turquesa px-5 py-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-normal leading-none text-foreground sm:text-4xl lg:text-5xl">
          Talleres.
        </h2>
      </div>

      <div data-reveal style="--reveal-delay: 320ms" class="grid border-b border-foreground bg-background lg:grid-cols-[26rem_1fr]">
        <aside ref="timelineColumnRef" class="border-b border-foreground px-5 py-6 sm:px-6 lg:border-b-0 lg:border-r lg:px-8">
          <div ref="timelineContentRef" class="flow-root">
            <h3 class="text-xl font-semibold uppercase leading-tight text-foreground sm:text-2xl">
              TIMELINE DEL DÍA
            </h3>

            <ol class="mt-8 space-y-0">
              <li
                v-for="(item, index) in timelineItems"
                :key="`${item.time}-${item.title}`"
                class="grid min-h-12 grid-cols-[5.8rem_1.25rem_1fr] gap-4 sm:grid-cols-[7.5rem_1.5rem_1fr]"
              >
                <p class="pt-0.5 text-sm font-semibold leading-tight text-black sm:text-base">
                  {{ item.time }}
                </p>

                <div class="relative flex justify-center">
                  <span
                    v-if="index !== timelineItems.length - 1"
                    class="absolute left-1/2 top-3 h-full w-px -translate-x-1/2 bg-turquesa"
                  />
                  <span class="relative mt-1.5 size-3 rounded-full bg-turquesa" />
                </div>

                <p class="text-sm leading-tight text-foreground/80 sm:text-base">
                  {{ item.title }}
                </p>
              </li>
            </ol>
          </div>
        </aside>

        <section ref="programSectionRef" class="px-5 py-6 sm:px-6 lg:px-8" aria-labelledby="programa-completo-title">
          <h3 id="programa-completo-title" class="text-xl font-semibold leading-tight text-foreground sm:text-2xl">
            Programa completo
          </h3>

          <div
            ref="programScrollRef"
            class="mt-6 overflow-y-auto pr-2"
            :style="{ maxHeight: programMaxHeight, scrollbarColor: 'var(--grey) transparent' }"
          >
            <div class="overflow-hidden rounded-md border border-grey bg-background">
              <article
                v-for="event in completeProgram"
                :key="`${event.time}-${event.title}`"
                class="grid min-h-20 grid-cols-[2.75rem_minmax(0,1fr)_1.5rem] gap-3 border-b border-grey px-4 py-4 last:border-b-0 sm:px-5 lg:grid-cols-[3rem_minmax(13rem,1.35fr)_8.5rem_8rem_minmax(12rem,1fr)_1.5rem] lg:items-center"
              >
                <div class="flex size-10 items-center justify-center rounded-md bg-blue_ice text-black">
                  <component :is="event.icon" class="size-5" aria-hidden="true" />
                </div>

                <div class="min-w-0">
                  <h4 class="text-base font-semibold leading-tight text-foreground sm:text-lg">
                    {{ event.title }}
                  </h4>

                  <div class="mt-2 grid gap-1 text-sm leading-tight text-foreground/70 sm:grid-cols-3 lg:hidden">
                    <p>{{ event.category }}</p>
                    <p>{{ event.time }}</p>
                    <p>{{ event.location }}</p>
                  </div>
                </div>

                <p class="hidden text-sm font-semibold leading-tight text-foreground/70 lg:block">
                  {{ event.category }}
                </p>

                <p class="hidden text-sm font-semibold leading-tight text-foreground lg:block">
                  {{ event.time }}
                </p>

                <p class="hidden text-sm font-semibold leading-tight text-foreground/70 lg:block">
                  {{ event.location }}
                </p>

                <ChevronDown class="mt-2 size-5 justify-self-end text-foreground/80 lg:mt-0" aria-hidden="true" />
              </article>
            </div>
          </div>
        </section>
      </div>

      <div data-reveal style="--reveal-delay: 420ms" class="border-b border-foreground bg-turquesa px-5 py-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-normal leading-none text-foreground sm:text-4xl lg:text-5xl">
          Entradas.
        </h2>
      </div>

      <div data-reveal style="--reveal-delay: 520ms" class="grid border-b border-foreground bg-background lg:grid-cols-[1.1fr_0.9fr]">
        <section class="min-h-[24rem] border-b border-foreground lg:min-h-[34rem] lg:border-b-0 lg:border-r" aria-label="Mapa de ubicación">
          <iframe
            :src="venueMapUrl"
            title="Mapa de Las Naves, Valencia"
            class="h-full min-h-[24rem] w-full lg:min-h-[34rem]"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
          />
        </section>

        <section class="px-5 py-6 sm:px-6 lg:px-8" aria-labelledby="entradas-form-title">
          <div class="flex items-center gap-3 text-foreground">
            <span class="flex size-10 items-center justify-center rounded-md bg-blue_ice text-black">
              <Ticket class="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 id="entradas-form-title" class="text-xl font-semibold leading-tight text-foreground sm:text-2xl">
                Reserva tu entrada
              </h3>
              <p class="mt-1 text-sm leading-tight text-foreground/70">
                {{ dayTitle }} · Acceso gratuito
              </p>
            </div>
          </div>

          <div class="mt-6 border border-grey bg-background p-4 sm:p-5">
            <div class="flex gap-3 border-b border-grey pb-4 text-sm leading-relaxed text-foreground/75">
              <MapPin class="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden="true" />
              <p>{{ festivalInfo.venueAddress }}</p>
            </div>

            <form class="mt-5 space-y-4" @submit.prevent="submitTicketForm">
              <div class="space-y-2">
                <Label for="ticket-name">Nombre</Label>
                <Input
                  id="ticket-name"
                  :value="ticketForm.name"
                  placeholder="Nombre y apellidos"
                  class="rounded-none border-grey"
                  @input="updateTicketField('name', $event)"
                />
              </div>

              <div class="space-y-2">
                <Label for="ticket-email">Correo</Label>
                <Input
                  id="ticket-email"
                  type="email"
                  :value="ticketForm.email"
                  placeholder="tu@email.com"
                  class="rounded-none border-grey"
                  @input="updateTicketField('email', $event)"
                />
              </div>

              <p v-if="ticketTriedSubmit && !canSubmitTicket" class="text-sm font-medium text-foreground">
                Completa el nombre y un correo válido.
              </p>

              <p v-if="ticketSubmitted" class="border border-turquesa bg-blue_ice px-3 py-2 text-sm font-medium text-foreground">
                Solicitud recibida. Enviaremos la confirmación a {{ ticketForm.email }}.
              </p>

              <Button type="submit" class="w-full rounded-none bg-foreground text-background hover:bg-foreground/90">
                <CheckCircle2 class="size-4" aria-hidden="true" />
                Confirmar entrada
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
