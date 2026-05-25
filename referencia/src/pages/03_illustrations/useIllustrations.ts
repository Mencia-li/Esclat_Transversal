import { ref, computed } from 'vue'
import { illustrationCategories } from "./illustrations.data"
import type { IllustrationCategory, IllustrationImage } from "./illustrations.data"
import { useLightbox } from "@/composables/useLightbox"
import { useGridColumns } from "@/composables/useGridColumns"

const showAll = ref(false)

export function useIllustrations() {
    // Integramos el lightbox dentro del composable de ilustraciones
    const lightbox = useLightbox()
    
    // Detección de columnas (Móvil, Tablet, PC)
    const { columns } = useGridColumns()

    // Límite de ventanas iniciales (Regla: 6, 4 o 3)
    const initialLimit = computed(() => {
        if (columns.value === 3) return 6
        if (columns.value === 2) return 4
        return 3
    })

    const visibleCategories = computed(() => {
        if (showAll.value) return illustrationCategories
        return illustrationCategories.slice(0, initialLimit.value)
    })

    const shouldShowButton = computed(() => {
        return illustrationCategories.length > initialLimit.value
    })

    const imgUrl = (cat: IllustrationCategory, img: IllustrationImage) => {
        return `/img/illustrations/${cat.folder}/${img.name}.webp`
    }

    const openGallery = (cat: IllustrationCategory) => {
        const formattedImages = cat.images.map(img => ({
            url: imgUrl(cat, img),
            alt: img.alt || cat.title
        }))
        lightbox.openLightbox(formattedImages, 0, cat.title)
    }

    return {
        // Estado y visibilidad
        showAll,
        visibleCategories,
        shouldShowButton,
        // Funciones auxiliares
        imgUrl,
        openGallery,
        // Exponemos el lightbox para el ModalCarousel
        ...lightbox 
    }
}