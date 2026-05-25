import { computed } from 'vue'

export function useHeroCarousel() {
    // Genera el array de rutas: /img/carrusel/carru1.webp ... /img/carrusel/carru13.webp
    const images = computed(() => 
        Array.from({ length: 13 }, (_, i) => `/img/carrusel/carru${i + 1}.webp`)
    )

    // Configuración básica para que el carrusel sea infinito
    const carouselOptions = {
        loop: true,
        // Define la velocidad de la animación de transición (en ms). 
        // Un valor de 30 hace que el deslizamiento sea más suave y fluido.
        duration: 25, 
    }

    return {
        images,
        carouselOptions
    }
}