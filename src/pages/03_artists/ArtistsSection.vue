<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { CirclePlus } from "lucide-vue-next"
import { RouterLink } from "vue-router"
import type { Artist } from "@/data/festival"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { artistDetails, artistsCarouselItems } from "@/data/festival"

const spotifyLogoUrl = "/img/logos/spotify_logo.png"

const tabItems = [
  { id: "artistas", label: "Artistas." },
  { id: "cartel", label: "Cartel." },
] as const

type TabId = (typeof tabItems)[number]["id"]

const artistFilterItems = [
  { id: "todos", label: "Todos" },
  { id: "23/10", label: "23/10" },
  { id: "24/10", label: "24/10" },
  { id: "25/10", label: "25/10" },
] as const

type ArtistFilter = (typeof artistFilterItems)[number]["id"]
type ArtistDateFilter = Exclude<ArtistFilter, "todos">

type StoredArtistsViewState = {
  expanded: boolean
  filter: ArtistFilter
}

const artistsViewStorageKey = "esclat-artists-view-state"
const defaultArtistsViewState: StoredArtistsViewState = {
  expanded: false,
  filter: "todos",
}

function isArtistFilter(value: unknown): value is ArtistFilter {
  return artistFilterItems.some((item) => item.id === value)
}

function readStoredArtistsViewState(): StoredArtistsViewState {
  if (typeof window === "undefined") {
    return defaultArtistsViewState
  }

  try {
    const rawState = window.sessionStorage.getItem(artistsViewStorageKey)

    if (!rawState) {
      return defaultArtistsViewState
    }

    const parsedState = JSON.parse(rawState) as Partial<StoredArtistsViewState> | null

    if (!parsedState || typeof parsedState !== "object") {
      return defaultArtistsViewState
    }

    return {
      expanded: parsedState.expanded === true,
      filter: isArtistFilter(parsedState.filter) ? parsedState.filter : "todos",
    }
  } catch {
    return defaultArtistsViewState
  }
}

function writeStoredArtistsViewState(state: StoredArtistsViewState) {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.sessionStorage.setItem(artistsViewStorageKey, JSON.stringify(state))
  } catch {
    // If storage is blocked, keep the in-memory Vue state working.
  }
}

const storedArtistsViewState = readStoredArtistsViewState()

const activeTab = ref<TabId>("artistas")

const showExpandedArtists = ref(storedArtistsViewState.expanded)
const expandedActiveFilter = ref<ArtistFilter>(storedArtistsViewState.filter)
const visibleCount = ref<6 | 8 | 10>(6)
const carouselRepeatCount = 3
const sourceColumnCount = Math.ceil(artistsCarouselItems.length / 2)

let mediumQuery: MediaQueryList | undefined
let largeQuery: MediaQueryList | undefined
let extraLargeQuery: MediaQueryList | undefined

const carouselOptions = {
  align: "start",
  loop: true,
  slidesToScroll: 1,
  startIndex: sourceColumnCount,
} as const

type CarouselArtist = Artist & {
  image?: string
}

type ArtistColumn = {
  key: string
  artists: CarouselArtist[]
}

type PlaylistSong = {
  artistName: string
  title: string
  description: string
  duration: string
}

type PlaylistCoverImage = {
  src: string
  alt: string
}

type PlaylistTheme = {
  title: string
  subtitle: string
  color: string
  listColor: string
  coverColor: string
  textColor: string
  mutedTextColor: string
  subtleTextColor: string
  badgeBackground: string
  badgeTextColor: string
  borderColor: string
}

type PlaylistColumn = PlaylistTheme & {
  date: ArtistDateFilter
  coverImages: PlaylistCoverImage[]
  songs: PlaylistSong[]
}

const playlistThemes: Record<ArtistDateFilter, PlaylistTheme> = {
  "23/10": {
    title: "DAY 23",
    subtitle: "Amor propio y salud mental",
    color: "#000000",
    listColor: "#111111",
    coverColor: "#1f1f1f",
    textColor: "#ffffff",
    mutedTextColor: "rgb(255 255 255 / 72%)",
    subtleTextColor: "rgb(255 255 255 / 45%)",
    badgeBackground: "rgb(255 255 255 / 14%)",
    badgeTextColor: "#ffffff",
    borderColor: "rgb(255 255 255 / 18%)",
  },
  "24/10": {
    title: "DAY 24",
    subtitle: "Cuerpo, identidad y belleza",
    color: "var(--turquesa)",
    listColor: "color-mix(in oklch, var(--turquesa) 88%, black)",
    coverColor: "color-mix(in oklch, var(--turquesa) 78%, white)",
    textColor: "var(--foreground)",
    mutedTextColor: "color-mix(in oklch, var(--foreground) 72%, transparent)",
    subtleTextColor: "color-mix(in oklch, var(--foreground) 48%, transparent)",
    badgeBackground: "rgb(0 0 0 / 14%)",
    badgeTextColor: "var(--foreground)",
    borderColor: "rgb(0 0 0 / 16%)",
  },
  "25/10": {
    title: "DAY 25",
    subtitle: "Fama, industria e imagen pública",
    color: "#ffffff",
    listColor: "#f2f2f2",
    coverColor: "color-mix(in oklch, var(--background) 90%, black)",
    textColor: "var(--foreground)",
    mutedTextColor: "color-mix(in oklch, var(--foreground) 72%, transparent)",
    subtleTextColor: "color-mix(in oklch, var(--foreground) 48%, transparent)",
    badgeBackground: "rgb(0 0 0 / 12%)",
    badgeTextColor: "var(--foreground)",
    borderColor: "rgb(0 0 0 / 18%)",
  },
}

const playlistArtistOrder: Record<ArtistDateFilter, string[]> = {
  "23/10": ["aurora", "laufey", "amaia", "olivia-rodrigo", "bts"],
  "24/10": ["meghan-trainor", "hwasa", "olivia-dean", "raye", "gidle"],
  "25/10": ["pablo-alboran", "benson-boone", "the-marias", "iu", "lana-del-rey"],
}

const visibleColumnCount = computed(() => Math.max(1, Math.floor(visibleCount.value / 2)))
const columnBasisClass = computed(() => {
  switch (visibleCount.value) {
    case 10:
      return "basis-[calc((100%-2.25rem)/5)]"
    case 8:
      return "basis-[calc((100%-1.75rem)/4)]"
    case 6:
    default:
      return "basis-[calc((100%-1rem)/3)]"
  }
})

const carouselItems = computed<CarouselArtist[]>(() => {
  return artistsCarouselItems.map((artist, index) => ({
    ...artist,
    image: `/img/artists/artist${index + 1}.jpg`,
  }))
})

const sourceArtistColumns = computed<CarouselArtist[][]>(() => {
  const columns: CarouselArtist[][] = []

  for (let index = 0; index < carouselItems.value.length; index += 2) {
    columns.push(carouselItems.value.slice(index, index + 2))
  }

  return columns
})

const artistColumns = computed<ArtistColumn[]>(() => {
  return Array.from({ length: carouselRepeatCount }, (_, repeatIndex) =>
    sourceArtistColumns.value.map((artists, columnIndex) => ({
      key: `${repeatIndex}-${columnIndex}-${artists.map((artist) => artist.id).join("-")}`,
      artists,
    })),
  ).flat()
})

const expandedArtists = computed(() => {
  if (expandedActiveFilter.value === "todos") {
    return carouselItems.value
  }

  return carouselItems.value.filter((artist) => artist.date === expandedActiveFilter.value && !artist.isPlaceholder)
})

const expandedArtistsGridClass = computed(() => {
  return expandedActiveFilter.value === "todos"
    ? "artists-expanded-grid--all"
    : "artists-expanded-grid--day"
})
const showExpandedArtistName = computed(() => expandedActiveFilter.value !== "todos")

const playlistColumns = computed<PlaylistColumn[]>(() => {
  const dates: ArtistDateFilter[] = expandedActiveFilter.value === "todos"
    ? ["23/10", "24/10", "25/10"]
    : [expandedActiveFilter.value]

  return dates.map((date) => ({
    date,
    ...playlistThemes[date],
    coverImages: coverImagesForDate(date),
    songs: songsForDate(date),
  }))
})

function coverImagesForDate(date: ArtistDateFilter): PlaylistCoverImage[] {
  return orderedArtistsForDate(date)
    .filter((artist) => artist.image)
    .slice(0, 4)
    .map((artist) => ({
      src: artist.image as string,
      alt: artist.name,
    }))
}

function orderedArtistsForDate(date: ArtistDateFilter): CarouselArtist[] {
  const artistsForDate = carouselItems.value.filter((artist) => artist.date === date && !artist.isPlaceholder)
  const orderedArtists = playlistArtistOrder[date]
    .map((artistId) => artistsForDate.find((artist) => artist.id === artistId))
    .filter((artist): artist is CarouselArtist => Boolean(artist))

  const remainingArtists = artistsForDate.filter(
    (artist) => !playlistArtistOrder[date].includes(artist.id),
  )

  return [...orderedArtists, ...remainingArtists]
}

function songsForDate(date: ArtistDateFilter): PlaylistSong[] {
  const songs: PlaylistSong[] = []

  orderedArtistsForDate(date)
    .forEach((artist) => {
      const detail = artistDetails[artist.id]

      if (!detail) {
        return
      }

      detail.recommendedSongs.forEach((song) => {
        songs.push({
          artistName: artist.name,
          title: song.title,
          description: song.description,
          duration: playlistDuration(song.title, songs.length),
        })
      })
    })

  return songs
}

function playlistDuration(title: string, index: number) {
  const firstChar = title.charCodeAt(0) || 0
  const minutes = 2 + ((firstChar + index) % 3)
  const seconds = 12 + ((title.length * 7 + index * 11) % 48)

  return `${minutes}:${String(seconds).padStart(2, "0")}`
}

async function scrollToArtistsStart() {
  await nextTick()

  document.querySelector("#artistas")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

async function showExpandedArtistsView() {
  showExpandedArtists.value = true
  expandedActiveFilter.value = "todos"
  await scrollToArtistsStart()
}

async function hideExpandedArtistsView() {
  showExpandedArtists.value = false
  await scrollToArtistsStart()
}

function updateLayout() {
  if (extraLargeQuery?.matches) {
    visibleCount.value = 10
    return
  }

  if (largeQuery?.matches) {
    visibleCount.value = 8
    return
  }

  if (mediumQuery?.matches) {
    visibleCount.value = 6
    return
  }

  // small screens: show 3 columns (1 carousel item = 1 column with 2 rows)
  visibleCount.value = 6
}

function artistOriginClass(columnIndex: number, rowIndex: number) {
  const visibleLastColumn = visibleColumnCount.value - 1
  const visibleColumn = ((columnIndex % visibleColumnCount.value) + visibleColumnCount.value) % visibleColumnCount.value
  const isTopRow = rowIndex === 0
  const isFirstColumn = visibleColumn === 0
  const isLastColumn = visibleColumn === visibleLastColumn

  if (isTopRow && isFirstColumn) {
    return "origin-top-left"
  }

  if (isTopRow && isLastColumn) {
    return "origin-top-right"
  }

  if (!isTopRow && isFirstColumn) {
    return "origin-bottom-left"
  }

  if (!isTopRow && isLastColumn) {
    return "origin-bottom-right"
  }

  return isTopRow ? "origin-top" : "origin-bottom"
}

function artistDetailRoute(artist: CarouselArtist) {
  if (artist.isPlaceholder || !artistDetails[artist.id]) {
    return undefined
  }

  return { name: "artist-detail", params: { id: artist.id } }
}

watch([showExpandedArtists, expandedActiveFilter], ([expanded, filter]) => {
  writeStoredArtistsViewState({ expanded, filter })
})

onMounted(() => {
  mediumQuery = window.matchMedia("(min-width: 640px)")
  largeQuery = window.matchMedia("(min-width: 1024px)")
  extraLargeQuery = window.matchMedia("(min-width: 1280px)")
  updateLayout()
  mediumQuery.addEventListener("change", updateLayout)
  largeQuery.addEventListener("change", updateLayout)
  extraLargeQuery.addEventListener("change", updateLayout)
})

onBeforeUnmount(() => {
  mediumQuery?.removeEventListener("change", updateLayout)
  largeQuery?.removeEventListener("change", updateLayout)
  extraLargeQuery?.removeEventListener("change", updateLayout)
})
</script>

<template>
  <section class="border-b border-foreground bg-background">
    <div data-reveal role="tablist" class="grid grid-cols-2 border-b border-foreground">
      <button
        v-for="(tab, index) in tabItems"
        :key="tab.id"
        :id="`artistas-tab-${tab.id}`"
        type="button"
        role="tab"
        :aria-controls="`artistas-panel-${tab.id}`"
        :aria-selected="activeTab === tab.id"
        :tabindex="activeTab === tab.id ? 0 : -1"
        :class="[
          'flex min-h-16 items-center px-5 py-4 text-left text-3xl font-normal leading-none transition-colors sm:min-h-20 sm:px-6 sm:text-4xl lg:px-8 lg:text-5xl',
          index === 0 ? 'border-r border-foreground' : '',
          activeTab === tab.id
            ? 'bg-turquesa text-foreground'
            : 'bg-background text-foreground hover:bg-grey',
        ]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div
      v-if="activeTab === 'artistas'"
      id="artistas-panel-artistas"
      role="tabpanel"
      aria-labelledby="artistas-tab-artistas"
      data-reveal
      style="--reveal-delay: 120ms"
      class="px-4 pb-8 pt-4 sm:px-6 sm:pb-10 lg:px-8 lg:pb-12"
    >
      <Carousel
        v-if="!showExpandedArtists"
        :opts="carouselOptions"
        class="artists-carousel relative mx-auto w-full max-w-full px-4 sm:max-w-216 sm:px-6 lg:max-w-6xl xl:max-w-456"
        aria-label="Carrusel de artistas"
      >
        <CarouselContent class="-ml-2 sm:ml-0">
          <CarouselItem
            v-for="(column, columnIndex) in artistColumns"
            :key="column.key"
            class="pl-1 sm:pl-3"
            :class="columnBasisClass"
          >
            <div class="grid grid-cols-1 gap-2 sm:gap-3">
              <div
                v-for="(artist, rowIndex) in column.artists"
                :key="artist.id"
                class="relative aspect-square overflow-visible p-1"
              >
                <component
                  :is="artistDetailRoute(artist) ? RouterLink : 'div'"
                  :to="artistDetailRoute(artist)"
                  class="group isolate relative block h-full w-full overflow-hidden bg-primary outline-none transition duration-300 z-10 hover:z-20 hover:scale-[1.015] focus-visible:z-20 focus-visible:scale-[1.015]"
                  :class="artistOriginClass(columnIndex - sourceColumnCount, rowIndex)"
                  :aria-label="artistDetailRoute(artist) ? `Ver biografía de ${artist.name}` : undefined"
                >
                  <template v-if="artist.image">
                    <img
                      :src="artist.image"
                      :alt="artist.name"
                      class="absolute inset-0 h-full w-full scale-110 object-cover transition duration-300 group-hover:scale-100 group-focus-visible:scale-100"
                      loading="lazy"
                    />
                  </template>

                  <template v-else>
                    <div class="h-full bg-primary" />
                  </template>

                  <span
                    aria-hidden="true"
                    class="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_0_1px_var(--foreground)] transition group-hover:shadow-[inset_0_0_0_2px_var(--foreground)] group-focus-visible:shadow-[inset_0_0_0_2px_var(--foreground)]"
                  />
                </component>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious
          variant="ghost"
          size="icon-lg"
          class="left-0 size-8 rounded-none bg-background/70 text-foreground shadow-none hover:bg-grey/70 disabled:opacity-40 sm:size-10"
        />
        <CarouselNext
          variant="ghost"
          size="icon-lg"
          class="right-0 size-8 rounded-none bg-background/70 text-foreground shadow-none hover:bg-grey/70 disabled:opacity-40 sm:size-10"
        />
      </Carousel>

      <div v-if="!showExpandedArtists" class="mt-5 flex justify-center">
        <button
          type="button"
          class="border border-foreground bg-background px-5 py-3 text-sm font-medium uppercase text-foreground transition-colors hover:bg-grey sm:px-6 sm:text-base"
          @click="showExpandedArtistsView"
        >
          Ver todos los artistas
        </button>
      </div>

      <div v-if="showExpandedArtists" class="mt-6 border-t border-foreground pt-5">
        <div role="tablist" aria-label="Filtrar artistas por día" class="grid grid-cols-4 border border-foreground">
          <button
            v-for="filter in artistFilterItems"
            :key="filter.id"
            type="button"
            role="tab"
            :aria-selected="expandedActiveFilter === filter.id"
            :class="[
              'min-h-12 px-2 text-center text-base font-normal leading-none transition-colors sm:text-xl',
              filter.id !== '25/10' ? 'border-r border-foreground' : '',
              expandedActiveFilter === filter.id
                ? 'bg-blue_ice text-foreground'
                : 'bg-background text-foreground hover:bg-grey',
            ]"
            @click="expandedActiveFilter = filter.id"
          >
            {{ filter.label }}
          </button>
        </div>

        <div class="mt-5 space-y-8">
          <div>
            <div :class="['grid gap-3', expandedArtistsGridClass]">
              <div v-for="artist in expandedArtists" :key="artist.id" class="relative aspect-square overflow-visible">
                <component
                  :is="artistDetailRoute(artist) ? RouterLink : 'div'"
                  :to="artistDetailRoute(artist)"
                  class="group isolate relative block h-full w-full overflow-hidden bg-primary outline-none transition duration-300 hover:scale-[1.015] focus-visible:scale-[1.015]"
                  :aria-label="artistDetailRoute(artist) ? `Ver biografía de ${artist.name}` : undefined"
                >
                  <template v-if="artist.image">
                    <img
                      :src="artist.image"
                      :alt="artist.name"
                      class="absolute inset-0 h-full w-full scale-105 object-cover transition duration-300 group-hover:scale-100 group-focus-visible:scale-100"
                      loading="lazy"
                    />
                    <div
                      v-if="showExpandedArtistName"
                      class="absolute inset-0 bg-linear-to-t from-background/75 via-transparent to-transparent"
                    />
                    <h3
                      v-if="showExpandedArtistName"
                      class="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] bg-background/85 px-1 text-base font-normal uppercase leading-none text-foreground z-30 sm:text-xl"
                    >
                      {{ artist.name }}
                    </h3>
                  </template>

                  <template v-else>
                    <div class="flex h-full flex-col justify-between p-3 text-primary-foreground">
                      <h3
                        v-if="showExpandedArtistName"
                        class="mt-auto text-base font-normal uppercase leading-none z-30 sm:text-xl"
                      >
                        {{ artist.name }}
                      </h3>
                    </div>
                  </template>

                  <span
                    aria-hidden="true"
                    class="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_0_1px_var(--foreground)] transition group-hover:shadow-[inset_0_0_0_2px_var(--foreground)] group-focus-visible:shadow-[inset_0_0_0_2px_var(--foreground)]"
                  />
                </component>
              </div>
            </div>
          </div>

          <section class="space-y-5">
            <div :class="['grid gap-5', expandedActiveFilter === 'todos' ? 'lg:grid-cols-3' : 'lg:grid-cols-1']">
              <article
                v-for="playlist in playlistColumns"
                :key="playlist.date"
                class="overflow-hidden rounded-lg border border-[var(--playlist-border-color)] bg-(--playlist-list-color) text-[var(--playlist-text-color)] shadow-[0_1rem_2.5rem_rgba(0,0,0,0.16)]"
                :style="{
                  '--playlist-color': playlist.color,
                  '--playlist-list-color': playlist.listColor,
                  '--playlist-cover-color': playlist.coverColor,
                  '--playlist-text-color': playlist.textColor,
                  '--playlist-muted-color': playlist.mutedTextColor,
                  '--playlist-subtle-color': playlist.subtleTextColor,
                  '--playlist-badge-bg': playlist.badgeBackground,
                  '--playlist-badge-text': playlist.badgeTextColor,
                  '--playlist-border-color': playlist.borderColor,
                }"
              >
                <div class="relative grid gap-4 bg-(--playlist-color) p-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:p-5 xl:grid-cols-[8.5rem_minmax(0,1fr)]">
                  <img
                    :src="spotifyLogoUrl"
                    alt="Spotify"
                    class="absolute right-4 top-4 size-8 rounded-full"
                    loading="lazy"
                  />

                  <div class="grid size-24 grid-cols-2 overflow-hidden rounded-md border border-[var(--playlist-border-color)] bg-(--playlist-cover-color) sm:size-28 xl:size-[8.5rem]">
                    <img
                      v-for="cover in playlist.coverImages"
                      :key="cover.src"
                      :src="cover.src"
                      :alt="cover.alt"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div class="flex min-w-0 flex-col justify-between pr-10">
                    <div>
                      <h4 class="max-w-full text-3xl font-bold uppercase leading-none text-[var(--playlist-text-color)] sm:text-4xl lg:text-3xl xl:text-4xl">
                        {{ playlist.title }}
                      </h4>

                      <div class="mt-2 flex flex-wrap items-center gap-2">
                        <span class="rounded-sm bg-[var(--playlist-badge-bg)] px-2 py-1 text-xs font-bold uppercase leading-none text-[var(--playlist-badge-text)]">
                          Muestra
                        </span>
                        <p class="text-lg font-semibold leading-none text-[var(--playlist-muted-color)]">
                          ESCLAT Festival
                        </p>
                      </div>

                      <p class="mt-2 text-sm font-medium leading-tight text-[var(--playlist-muted-color)]">
                        {{ playlist.subtitle }}
                      </p>

                      <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--playlist-text-color)] transition-opacity hover:opacity-75"
                        >
                          <CirclePlus class="size-5" aria-hidden="true" />
                          Guardar en Spotify
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <ol
                  :class="[
                    'playlist-song-list m-0 list-none bg-[var(--playlist-list-color)] px-4 py-3',
                    expandedActiveFilter === 'todos'
                      ? 'max-h-56 overflow-y-auto'
                      : 'playlist-song-list--day overflow-y-auto',
                  ]"
                >
                  <li
                    v-for="(song, songIndex) in playlist.songs"
                    :key="`${playlist.date}-${song.artistName}-${song.title}`"
                    class="grid grid-cols-[1.75rem_minmax(0,1fr)_3.25rem] items-center gap-3 py-2.5"
                    :title="song.description"
                  >
                    <span class="text-sm font-semibold text-[var(--playlist-subtle-color)]">{{ songIndex + 1 }}</span>
                    <span class="min-w-0">
                      <span class="block truncate text-sm font-bold uppercase leading-tight text-[var(--playlist-text-color)]">{{ song.title }}</span>
                      <span class="mt-1 block truncate text-xs font-semibold leading-tight text-[var(--playlist-muted-color)]">{{ song.artistName }}</span>
                    </span>
                    <span class="text-right text-sm font-semibold text-[var(--playlist-muted-color)]">{{ song.duration }}</span>
                  </li>
                </ol>
              </article>
            </div>
          </section>
        </div>

        <div class="mt-8 flex justify-center">
          <button
            type="button"
            class="border border-foreground bg-background px-5 py-3 text-sm font-medium uppercase text-foreground transition-colors hover:bg-grey sm:px-6 sm:text-base"
            @click="hideExpandedArtistsView"
          >
            Ver menos
          </button>
        </div>
      </div>
    </div>

    <div
      v-else
      id="artistas-panel-cartel"
      role="tabpanel"
      aria-labelledby="artistas-tab-cartel"
      data-reveal
      style="--reveal-delay: 120ms"
      class="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
    >
      <div class="mx-auto flex w-full max-w-6xl justify-center">
        <div class="w-full max-w-152 overflow-hidden border border-foreground bg-[#F4F4F4] shadow-[0_1rem_2.5rem_rgba(0,0,0,0.08)] sm:max-w-2xl lg:max-w-184">
          <img
            src="/img/artists/cartel.png"
            alt="Cartel de artistas del festival Esclat"
            class="block h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Allow this carousel's inner content to overflow so shadows and labels aren't clipped */
.artists-carousel {
  --carousel-peek: 1rem;
}

.artists-expanded-grid--all {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.artists-expanded-grid--day {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.playlist-song-list {
  scrollbar-color: var(--grey) transparent;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
}

.playlist-song-list--day {
  max-height: 19rem;
}

.playlist-song-list::-webkit-scrollbar {
  width: 0.5rem;
}

.playlist-song-list::-webkit-scrollbar-track {
  background: transparent;
}

.playlist-song-list::-webkit-scrollbar-thumb {
  background: var(--grey);
  border-radius: 999px;
}

@media (orientation: landscape) {
  .artists-expanded-grid--all {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }

  .artists-expanded-grid--day {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .playlist-song-list--day {
    max-height: 35rem;
  }
}

@media (min-width: 640px) {
  .artists-carousel {
    --carousel-peek: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .artists-carousel {
    --carousel-peek: 2rem;
  }
}

@media (min-width: 1280px) {
  .artists-carousel {
    --carousel-peek: 2.75rem;
  }
}

.artists-carousel [data-slot="carousel-content"] {
  overflow: visible !important;
  padding-inline: var(--carousel-peek);
}

.artists-carousel [data-slot="carousel-item"] {
  overflow: visible !important;
}
</style>
