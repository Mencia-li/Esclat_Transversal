<template>
    <div class="relative w-full aspect-square flex items-center justify-center group perspective-1000">
        <div class="relative w-full h-full">
        <div 
            v-for="(image, index) in limitedImages" 
            :key="index"
            :class="[
            'absolute inset-0 w-full h-full rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-foreground/10 bg-background overflow-hidden',
            'transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom',
            getZIndex(index),
            getHoverTransform(index)
            ]"
        >
            <img
            :src="image.url"
            :alt="image.alt || 'Illustration'"
            class="w-full h-full object-cover"
            loading="lazy"
            />

            <div 
            v-if="index === 0 && title" 
            class="absolute inset-0 flex flex-col items-center justify-center bg-foreground/80 group-hover:bg-foreground/10 transition-all duration-500 backdrop-blur-[2px] group-hover:backdrop-blur-none"
            >
            <span class="text-background font-bold text-2xl uppercase tracking-widest transition-opacity duration-300 group-hover:opacity-0 px-4 text-center">
                {{ title }}
            </span>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface StackedImage {
    url: string;
    alt?: string;
}

const props = defineProps<{
    images: StackedImage[];
    title?: string;
}>();

const limitedImages = computed(() => props.images.slice(0, 3));

const getZIndex = (index: number) => {
    if (index === 0) return 'z-30';
    if (index === 1) return 'z-20';
    if (index === 2) return 'z-10';
    return 'z-0';
};

// Abanico y su apertiura
const getHoverTransform = (index: number) => {
    if (index === 0) {
        // Carta principal: se eleva y escala de forma muy sutil
        return 'group-hover:-translate-y-1 group-hover:scale-[1.01]';
    }
    if (index === 1) {
        // Segunda carta (izquierda): translate-x-5 (20px) y rotate-3 (3 grados)
        return 'group-hover:-translate-x-1 group-hover:-rotate-6';
    }
    if (index === 2) {
        // Tercera carta (derecha): translate-x-5 (20px) y rotate-3 (3 grados)
        return 'group-hover:translate-x-1 group-hover:rotate-6';
    }
    return '';
};

</script>