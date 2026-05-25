<template>
    <div 
        class="relative flex items-center justify-center"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
        <button 
            @click="handleClick"
            class="p-2 rounded-full hover:bg-background/10 transition-all duration-300 cursor-pointer outline-none flex items-center justify-center"
            aria-label="Control de música"
        >
            <VolumeX v-if="isMuted || !isPlaying" class="w-6 h-6 transition-all duration-300" />
            <Volume2 v-else class="w-6 h-6 transition-all duration-300" />
        </button>

        <Transition name="fade-slide">
            <div 
                v-show="isHovered"
                :class="[
                    'absolute top-full pt-4 z-50 transition-all duration-300',
                    /* Móvil: Alineado a la derecha | Desktop (md): Centrado */
                    'right-0 md:right-auto md:left-1/2 md:-translate-x-1/2'
                ]"
            >
                <div class="bg-foreground text-background shadow-2xl rounded-2xl p-4 w-60 flex flex-col gap-4 border border-background/10">
                    
                    <div class="flex flex-col border-b border-background/10 pb-3 overflow-hidden select-none">
                        <span class="text-[9px] uppercase tracking-tighter opacity-50 font-bold">Reproduciendo</span>
                        <span class="text-[12px] font-bold truncate leading-tight">{{ currentTrack?.title }}</span>
                        <span class="text-[10px] opacity-70 truncate leading-tight">
                            {{ currentTrack?.artist }} · {{ currentTrack?.source }}
                        </span>
                    </div>

                    <div class="flex items-center justify-center gap-5 pb-1">
                        <button @click="prevTrack" class="p-1 hover:bg-background/10 rounded-full cursor-pointer transition-colors" title="Anterior">
                            <SkipBack class="w-4 h-4" />
                        </button>
                        
                        <button @click="togglePlay" class="p-2 bg-background text-foreground rounded-full cursor-pointer hover:scale-105 transition-transform shadow-lg">
                            <Pause v-if="isPlaying" class="w-4 h-4 fill-current" />
                            <Play v-else class="w-4 h-4 fill-current ml-0.5" />
                        </button>

                        <button @click="nextTrack" class="p-1 hover:bg-background/10 rounded-full cursor-pointer transition-colors" title="Siguiente">
                            <SkipForward class="w-4 h-4" />
                        </button>
                    </div>

                    <div class="flex items-center gap-2 h-8 px-3 shadow-sm rounded-full bg-background/5">
                        <button 
                            @click="decreaseVolume" 
                            class="p-1 hover:bg-background/10 rounded-full transition-colors cursor-pointer outline-none shrink-0" 
                            aria-label="Bajar volumen"
                        >
                            <Minus class="w-3.5 h-3.5 opacity-60" />
                        </button>

                        <Slider
                            v-model="volume"
                            :max="100"
                            :step="1"
                            orientation="horizontal"
                            class="flex-1 cursor-grab active:cursor-grabbing"
                        />

                        <button 
                            @click="increaseVolume" 
                            class="p-1 hover:bg-background/10 rounded-full transition-colors cursor-pointer outline-none shrink-0" 
                            aria-label="Subir volumen"
                        >
                            <Plus class="w-3.5 h-3.5 opacity-60" />
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Volume2, VolumeX, Minus, Plus, SkipBack, SkipForward, Play, Pause } from 'lucide-vue-next'
import { Slider } from '@/components/ui/slider'
import { useMusic } from '@/composables/useMusic'

const { isPlaying, isMuted, volume, currentTrack, togglePlay, toggleMute, nextTrack, prevTrack } = useMusic()

const isHovered = ref(false)
let hoverTimeout: ReturnType<typeof setTimeout> | null = null

const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    isHovered.value = true
}

const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
        isHovered.value = false
    }, 400)
}

const handleClick = () => {
    if (!isPlaying.value) {
        togglePlay()
        if (isMuted.value) toggleMute()
    } else {
        toggleMute()
    }
}

const decreaseVolume = () => {
    let val = (volume.value[0] ?? 0) - 10
    if (val < 0) val = 0
    volume.value = [val]
}

const increaseVolume = () => {
    let val = (volume.value[0] ?? 0) + 10
    if (val > 100) val = 100
    volume.value = [val]
}
</script>

<style scoped>
/* Transición refinada para manejar el cambio de transform de móvil a desktop */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>