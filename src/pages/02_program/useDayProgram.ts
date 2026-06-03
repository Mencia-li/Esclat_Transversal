import type { Component } from "vue"
import { computed } from "vue"
import { Camera, Mic2, MessagesSquare, Music2, Play } from "lucide-vue-next"
import { artistConcertSlots, artists, festivalDays } from "@/data/festival"

export type CompleteProgramItem = {
  time: string
  title: string
  category: string
  location: string
  description: string
  meta: string
  tags: string[]
  icon: Component
  sortValue: number
}

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

function cleanMeta(meta: string) {
  return meta
    .split("·")
    .map((item) => item.trim())
    .filter((item) => !/^(hasta\s+\d+\s+personas|grupos?\s+de\s+\d+)$/i.test(item))
    .join(" · ")
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

export function useDayProgram(dayId: () => string) {
  const day = computed(() => {
    const selectedDay = festivalDays.find((item) => item.id === dayId())

    if (!selectedDay) {
      throw new Error(`No se ha encontrado la programación del día ${dayId()}.`)
    }

    return selectedDay
  })

  const dayTitle = computed(() => `${day.value.weekday} ${day.value.date.split("/")[0]}.`)
  const dayArtists = computed(() => artists.filter((artist) => artist.date === day.value.date))

  const completeProgram = computed<CompleteProgramItem[]>(() => [
    ...day.value.schedule.map((event) => ({
      time: event.time,
      title: eventTitle(event.category, event.title),
      category: categoryLabel(event.category),
      location: event.space,
      description: event.summary,
      meta: cleanMeta(event.meta),
      tags: event.tags,
      icon: categoryIcon(event.category),
      sortValue: timeToMinutes(event.time),
    })),
    ...dayArtists.value.map((artist) => ({
      time: concertTimeLabel(artist.id, artist.time),
      title: `Concierto - ${artist.name}`,
      category: "Concierto",
      location: artist.stage,
      description: artist.summary,
      meta: "",
      tags: [],
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

  return {
    completeProgram,
    day,
    dayTitle,
    timelineItems,
  }
}
