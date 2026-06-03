import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"
import type { Artist } from "@/data/festival"
import { artistDetails, artistsCarouselItems } from "@/data/festival"
import { artistImagePath } from "./useArtistImages"

export const tabItems = [
  { id: "artistas", label: "ARTISTAS" },
  { id: "cartel", label: "CARTEL" },
] as const

export const artistFilterItems = [
  { id: "todos", label: "Todos" },
  { id: "23/10", label: "23/10" },
  { id: "24/10", label: "24/10" },
  { id: "25/10", label: "25/10" },
] as const

type TabId = (typeof tabItems)[number]["id"]
type ArtistFilter = (typeof artistFilterItems)[number]["id"]
type ArtistDateFilter = Exclude<ArtistFilter, "todos">

type StoredArtistsViewState = {
  expanded: boolean
  filter: ArtistFilter
}

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

const artistsViewStorageKey = "esclat-artists-view-state"
const defaultArtistsViewState: StoredArtistsViewState = {
  expanded: false,
  filter: "todos",
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

export function useArtistsSection() {
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
      image: artistImagePath(index),
    }))
  })

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

  function coverImagesForDate(date: ArtistDateFilter): PlaylistCoverImage[] {
    return orderedArtistsForDate(date)
      .filter((artist) => artist.image)
      .slice(0, 4)
      .map((artist) => ({
        src: artist.image as string,
        alt: artist.name,
      }))
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

    return orderedArtistsForDate(expandedActiveFilter.value)
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

  return {
    activeTab,
    artistColumns,
    artistDetailRoute,
    artistFilterItems,
    artistOriginClass,
    carouselOptions,
    columnBasisClass,
    expandedActiveFilter,
    expandedArtists,
    expandedArtistsGridClass,
    hideExpandedArtistsView,
    playlistColumns,
    showExpandedArtistName,
    showExpandedArtists,
    showExpandedArtistsView,
    sourceColumnCount,
    tabItems,
  }
}
