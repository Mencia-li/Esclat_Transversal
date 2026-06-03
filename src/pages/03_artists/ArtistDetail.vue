<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { RouterLink } from "vue-router"
import { ArrowLeft, CirclePlay } from "lucide-vue-next"
import { useArtistDetail } from "./useArtistDetail"

const { artist, artistId, artistImage, detail, displayName, factRows, videoTitle } = useArtistDetail()

const songsScrollRef = ref<HTMLOListElement | null>(null)
const songsThumbStyle = ref<Record<string, string>>({})
const isSongsScrollable = ref(false)

let dragStartY = 0
let dragStartScrollTop = 0

function updateSongsScrollbar() {
  const element = songsScrollRef.value

  if (!element) {
    isSongsScrollable.value = false
    songsThumbStyle.value = {}
    return
  }

  const { clientHeight, scrollHeight, scrollTop } = element
  const scrollableDistance = scrollHeight - clientHeight

  if (scrollableDistance <= 1) {
    isSongsScrollable.value = false
    songsThumbStyle.value = {}
    return
  }

  isSongsScrollable.value = true

  const thumbHeight = Math.max((clientHeight / scrollHeight) * clientHeight, 44)
  const thumbTravel = Math.max(clientHeight - thumbHeight, 0)
  const thumbTop = (scrollTop / scrollableDistance) * thumbTravel

  songsThumbStyle.value = {
    height: `${thumbHeight}px`,
    transform: `translateX(-50%) translateY(${thumbTop}px)`,
  }
}

function scrollSongsFromDrag(clientY: number) {
  const element = songsScrollRef.value

  if (!element) {
    return
  }

  const thumbHeight = Number.parseFloat(songsThumbStyle.value.height ?? "0")
  const thumbTravel = Math.max(element.clientHeight - thumbHeight, 1)
  const scrollableDistance = element.scrollHeight - element.clientHeight
  const dragDistance = clientY - dragStartY

  element.scrollTop = dragStartScrollTop + (dragDistance / thumbTravel) * scrollableDistance
}

function onSongsThumbPointerMove(event: PointerEvent) {
  scrollSongsFromDrag(event.clientY)
}

function stopSongsThumbDrag() {
  window.removeEventListener("pointermove", onSongsThumbPointerMove)
  window.removeEventListener("pointerup", stopSongsThumbDrag)
}

function startSongsThumbDrag(event: PointerEvent) {
  const element = songsScrollRef.value

  if (!element) {
    return
  }

  event.preventDefault()
  dragStartY = event.clientY
  dragStartScrollTop = element.scrollTop
  window.addEventListener("pointermove", onSongsThumbPointerMove)
  window.addEventListener("pointerup", stopSongsThumbDrag)
}

function onSongsRailPointerDown(event: PointerEvent) {
  const element = songsScrollRef.value
  const target = event.target as HTMLElement

  if (!element || target.closest(".artist-songs-thumb")) {
    return
  }

  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const thumbHeight = Number.parseFloat(songsThumbStyle.value.height ?? "0")
  const clickPosition = event.clientY - rect.top - thumbHeight / 2
  const thumbTravel = Math.max(element.clientHeight - thumbHeight, 1)
  const scrollableDistance = element.scrollHeight - element.clientHeight

  element.scrollTop = (clickPosition / thumbTravel) * scrollableDistance
}

onMounted(() => {
  nextTick(updateSongsScrollbar)
  window.addEventListener("resize", updateSongsScrollbar)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateSongsScrollbar)
  stopSongsThumbDrag()
})

watch(
  () => [artistId.value, detail.value?.recommendedSongs.length],
  async () => {
    await nextTick()
    updateSongsScrollbar()
  },
)
</script>

<template>
  <section class="bg-background">
    <div class="border-b border-foreground bg-background px-5 py-5 sm:px-6 lg:px-8">
      <RouterLink
        :to="{ path: '/', hash: '#artistas' }"
        class="mb-5 inline-flex items-center gap-2 border border-foreground bg-background px-5 py-3 text-sm font-medium uppercase text-foreground transition-colors hover:bg-grey sm:px-6 sm:text-base"
      >
        <ArrowLeft class="size-4" />
        Volver a artistas
      </RouterLink>

      <h1 class="text-4xl font-normal leading-none text-foreground sm:text-5xl">ARTISTAS</h1>
    </div>

    <div class="border-b border-foreground bg-blue_ice px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <article
        v-if="artist && detail"
        class="mx-auto w-full max-w-384 border border-foreground bg-background"
      >
        <div class="grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(16rem,22rem)_1fr] lg:gap-8 lg:p-8">
          <aside class="space-y-3">
            <div class="aspect-square overflow-hidden bg-secondary">
              <img
                :src="artistImage"
                :alt="displayName"
                class="h-full w-full object-cover"
                decoding="async"
              />
            </div>

            <a
              v-if="detail.spotifyUrl"
              :href="detail.spotifyUrl"
              target="_blank"
              rel="noreferrer"
              class="flex min-h-14 items-center justify-center gap-3 border border-foreground bg-background px-4 text-lg font-normal uppercase text-foreground transition-colors hover:bg-blue_ice"
            >
              <CirclePlay class="size-6 shrink-0 fill-grey text-grey" />
              Escuchar en Spotify
            </a>
          </aside>

          <div class="min-w-0">
            <div class="grid grid-cols-[minmax(0,1fr)_auto] border border-foreground">
              <h2 class="min-w-0 px-3 py-3 text-4xl font-normal uppercase leading-none text-foreground sm:px-4 sm:text-5xl lg:text-6xl">
                {{ displayName }}
              </h2>
              <p class="flex items-center border-l border-foreground px-3 py-3 text-3xl font-normal leading-none text-foreground sm:px-4 sm:text-4xl lg:text-5xl">
                {{ artist.date }}
              </p>
            </div>

            <div class="mt-5 flex flex-wrap gap-3">
              <span class="bg-turquesa px-4 py-3 text-sm font-medium uppercase text-foreground sm:text-base">
                {{ artist.stage }}
              </span>
              <span class="bg-turquesa px-4 py-3 text-sm font-medium uppercase text-foreground sm:text-base">
                {{ artist.time }}
              </span>
            </div>

            <p class="mt-6 w-full text-lg leading-snug text-muted-foreground">
              {{ artist.summary }}
            </p>

            <dl class="mt-7 border-t border-foreground text-sm sm:text-base">
              <div
                v-for="fact in factRows"
                :key="fact.label"
                class="grid gap-1 border-b border-foreground py-3 md:grid-cols-[14rem_1fr] md:gap-5"
              >
                <dt class="font-medium text-foreground">{{ fact.label }}:</dt>
                <dd class="text-muted-foreground">{{ fact.value }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="border-t border-foreground p-4 sm:p-6 lg:p-8">
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div class="space-y-8">
              <section>
                <h3 class="text-2xl font-normal uppercase leading-none text-foreground sm:text-3xl">Biografía:</h3>
                <p class="mt-4 w-full text-base leading-relaxed text-foreground sm:text-lg">
                  {{ detail.shortBio }}
                </p>
              </section>

              <section>
                <h3 class="text-2xl font-normal uppercase leading-none text-foreground sm:text-3xl">Relación con el concepto del día:</h3>
                <p class="mt-4 w-full text-base leading-relaxed text-foreground sm:text-lg">
                  {{ detail.dayRelation }}
                </p>
              </section>

              <section>
                <h3 class="text-2xl font-normal uppercase leading-none text-foreground sm:text-3xl">Por qué forma parte de ESCLAT:</h3>
                <p class="mt-4 w-full text-base leading-relaxed text-foreground sm:text-lg">
                  {{ detail.festivalReason }}
                </p>
              </section>
            </div>

            <aside class="border-t border-foreground pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" aria-label="Canciones para el festival">
              <h3 class="text-2xl font-normal uppercase leading-none text-foreground sm:text-3xl">
                Canciones para el festival:
              </h3>

              <div class="relative mt-5">
                <ol
                  ref="songsScrollRef"
                  class="artist-songs-scroll max-h-112 space-y-4 overflow-y-auto pr-7 lg:max-h-128"
                  @scroll="updateSongsScrollbar"
                >
                  <li v-for="song in detail.recommendedSongs" :key="song.title" class="border-b border-foreground pb-4 last:border-b-0">
                    <p class="text-base font-medium uppercase leading-tight text-foreground">{{ song.title }}</p>
                    <p class="mt-1 text-sm leading-snug text-muted-foreground">{{ song.description }}</p>
                  </li>
                </ol>

                <div
                  v-if="isSongsScrollable"
                  class="artist-songs-rail"
                  aria-hidden="true"
                  @pointerdown="onSongsRailPointerDown"
                >
                  <span
                    class="artist-songs-thumb"
                    :style="songsThumbStyle"
                    @pointerdown="startSongsThumbDrag"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div v-if="detail.videoEmbedUrl" class="border-t border-foreground p-4 sm:p-6 lg:p-8">
          <div class="aspect-video overflow-hidden bg-secondary">
            <iframe
              :src="detail.videoEmbedUrl"
              :title="videoTitle"
              class="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
        </div>
      </article>

      <article v-else class="mx-auto w-full max-w-5xl border border-foreground bg-background p-6 sm:p-8">
        <h2 class="text-3xl font-normal uppercase leading-none text-foreground sm:text-4xl">BIOGRAFÍA NO DISPONIBLE</h2>
        <p class="mt-4 text-base leading-relaxed text-muted-foreground">
          La ficha solicitada todavía no está preparada.
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.artist-songs-scroll {
  scrollbar-width: none;
}

.artist-songs-scroll::-webkit-scrollbar {
  display: none;
}

.artist-songs-rail {
  position: absolute;
  bottom: 0;
  right: 0.15rem;
  top: 0;
  width: 0.8rem;
  background: transparent;
  cursor: pointer;
}

.artist-songs-thumb {
  position: absolute;
  left: 50%;
  top: 2px;
  width: 0.45rem;
  border-radius: 9999px;
  background: var(--grey);
  cursor: grab;
  transform: translateX(-50%);
  touch-action: none;
}

.artist-songs-thumb:active {
  cursor: grabbing;
}
</style>
