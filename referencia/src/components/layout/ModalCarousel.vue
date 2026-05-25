<template>
    <Teleport to="body">
        <Transition name="fade">
        <div v-if="isOpen" class="modal-overlay z-100 sm:p-10" role="dialog" @click="emit('close')">
            
            <Button variant="ghost" size="icon" class="absolute top-6 right-6 text-foreground/70 hover:text-foreground z-50 rounded-full h-12 w-12 cursor-pointer" @click="emit('close')">
            <X class="h-8 w-8" />
            </Button>

            <div class="relative max-w-5xl w-full h-full flex flex-col items-center justify-center p-4" @click.stop>
            
            <Carousel 
                class="w-full sm:px-16 md:px-24" 
                :opts="{ startIndex: initialIndex, loop: true }" 
                @init-api="onInitApi"
            >
                <CarouselContent>
                <CarouselItem v-for="(img, idx) in images" :key="idx" class="flex justify-center items-center">
                    <img 
                    :src="img.url" 
                    :alt="img.alt" 
                    class="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-lg border border-border/50 select-none animate-in fade-in zoom-in-95 duration-300" 
                    loading="lazy"
                    decoding="async"
                    />
                </CarouselItem>
                </CarouselContent>
                
                <CarouselPrevious v-if="images.length > 1" class="hidden sm:flex h-12 w-12 md:h-14 md:w-14 absolute left-2 md:left-6 bg-background/50 backdrop-blur-md border-primary/20 hover:bg-primary hover:text-primary-foreground cursor-pointer" />
                <CarouselNext v-if="images.length > 1" class="hidden sm:flex h-12 w-12 md:h-14 md:w-14 absolute right-2 md:right-6 bg-background/50 backdrop-blur-md border-primary/20 hover:bg-primary hover:text-primary-foreground cursor-pointer" />
            </Carousel>

            <div v-if="images.length > 1" class="mt-8 px-6 py-2 bg-muted/50 backdrop-blur-sm rounded-full border border-border z-10">
                <p class="text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
                    <span v-if="title" class="text-foreground font-bold">{{ title }}</span>
                    <span v-if="title" class="mx-3 opacity-30 text-foreground">|</span>
                    <span class="text-foreground font-bold">{{ currentSlide }} / {{ images.length }}</span>
                </p>
            </div>

            </div>
        </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import type { CarouselApi } from '@/components/ui/carousel'
import type { LightboxImage } from '@/composables/useLightbox'

const props = defineProps<{
    isOpen: boolean
    images: LightboxImage[]
    initialIndex: number
    title?: string
}>()

const emit = defineEmits(['close'])

const currentSlide = ref(0)
const carouselApi = ref<CarouselApi>()

const onInitApi = (api: CarouselApi) => {
    if (!api) return
    carouselApi.value = api
    currentSlide.value = api.selectedScrollSnap() + 1

    api.on("select", () => {
        currentSlide.value = api.selectedScrollSnap() + 1
    })
}

const handleKeyDown = (e: KeyboardEvent) => {
    if (!props.isOpen) return
    
    if (e.key === 'Escape') emit('close')
    if (e.key === 'ArrowRight') carouselApi.value?.scrollNext()
    if (e.key === 'ArrowLeft') carouselApi.value?.scrollPrev()
}

onMounted(() => window.addEventListener('keydown', handleKeyDown))
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))

// Actualizamos el número visible si entramos por una foto que no sea la primera
watch(() => props.isOpen, (newVal) => {
    if (newVal) currentSlide.value = props.initialIndex + 1
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease-in-out; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>