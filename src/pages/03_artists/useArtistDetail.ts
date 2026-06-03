import { computed } from "vue"
import { useRoute } from "vue-router"
import { artistDetails, artists } from "@/data/festival"
import { artistImagePath } from "./useArtistImages"

export function useArtistDetail() {
  const route = useRoute()

  const artistId = computed(() => String(route.params.id ?? ""))
  const artist = computed(() => artists.find((item) => item.id === artistId.value))
  const artistIndex = computed(() => artists.findIndex((item) => item.id === artistId.value))
  const detail = computed(() => artistDetails[artistId.value])

  const artistImage = computed(() => artistImagePath(artistIndex.value))
  const displayName = computed(() => detail.value?.artisticName ?? artist.value?.name ?? "Artista")
  const videoTitle = computed(() => detail.value?.videoTitle ?? `${displayName.value} en ESCLAT`)

  const factRows = computed(() => {
    if (!detail.value) {
      return []
    }

    return [
      { label: "Nombre artístico", value: detail.value.artisticName },
      { label: detail.value.realNameLabel ?? "Nombre real", value: detail.value.realName },
      { label: "Procedencia", value: detail.value.origin },
      { label: "Disciplina", value: detail.value.discipline },
      { label: "Género musical", value: detail.value.genre },
      { label: "Eje temático en ESCLAT", value: detail.value.themeAxis },
    ]
  })

  return {
    artist,
    artistId,
    artistImage,
    detail,
    displayName,
    factRows,
    videoTitle,
  }
}
