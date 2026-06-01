<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card"
import { characters } from "./data"
import { computed, ref } from "vue"

const inPagina = 6
const nuncPagina = ref(1)

const totalPaginae = computed(() => Math.ceil(characters.length / inPagina))

const listaSimpsons = computed(() => {
  const inicio = (nuncPagina.value - 1) * inPagina
  const fin = inicio + inPagina
  return characters.slice(inicio, fin)
})

const ireAddPaginam = (pagina: number) => {
  if (pagina >= 1 && pagina <= totalPaginae.value) {
    nuncPagina.value = pagina
  }
}

const paginaNumeri = computed(() =>
  Array.from({ length: totalPaginae.value }, (_, i) => i + 1)

)

import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex flex-col items-center gap-8 w-full max-w-[1400px] my-8 mx-auto">
    <div class="text-center">
      <h1 class="font-bold text-xl lg:text-5xl mb-5">The Simpsons Quote App</h1>
      <p class="mb-4">Click on the quote of your favorite character</p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-8 mx-auto">
      <Card
        v-for="character in listaSimpsons"
        :key="character.nomen"
        class="cursor-pointer w-[220px] h-[240px] border border-zinc-300 hover:bg-[#ee3133] hover:text-white transition-colors"
      >
        <CardContent
          class="flex flex-col items-center gap-1 w-full px-0"
          @click="router.push(`/simpsons/gallery/${character.id}`)"
        >
          <img
            :src="`/imagines/simpsons/${character.imago}`"
            alt=""
            class="w-48 h-44 object-cover object-top mt-2 bg-[#ffde00] rounded-t-md border border-black"
          />
          <h2 class="font-medium text-lg">{{ character.nomen }}</h2>
        </CardContent>
      </Card>
    </div>

    <div class="flex items-center justify-center gap-2 mt-4">
      <!-- Anterior -->
      <button
        @click="ireAddPaginam(nuncPagina - 1)"
        :disabled="nuncPagina === 1"
        class="px-4 py-2 rounded-md font-medium transition-colors
               bg-[#ffde00] hover:bg-[#ee3133] hover:text-white
               disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        Anterior
      </button>

      <!-- Números -->
      <button
        v-for="pagina in paginaNumeri"
        :key="pagina"
        @click="ireAddPaginam(pagina)"
        :class="[
          'w-10 h-10 rounded-md font-medium transition-colors',
          nuncPagina === pagina
            ? 'bg-[#ee3133] text-white'
            : 'bg-[#ffde00] hover:bg-[#ee3133] hover:text-white'
        ]"
      >
        {{ pagina }}
      </button>

      <!-- Siguiente -->
      <button
        @click="ireAddPaginam(nuncPagina + 1)"
        :disabled="nuncPagina === totalPaginae"
        class="px-4 py-2 rounded-md font-medium transition-colors
               bg-[#ffde00] hover:bg-[#ee3133] hover:text-white
               disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>

<style scoped> </style>