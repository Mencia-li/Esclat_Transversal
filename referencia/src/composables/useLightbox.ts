import { ref, onUnmounted } from "vue"

export interface LightboxImage {
    url: string
    alt: string
}

export function useLightbox() {
    const isOpen = ref(false)
    const images = ref<LightboxImage[]>([])
    const initialIndex = ref(0)
    const title = ref("")
    
    // Guardamos la referencia del timeout para poder cancelarlo
    let clearImagesTimeout: ReturnType<typeof setTimeout> | null = null

    const openLightbox = (imgList: LightboxImage[], startIndex = 0, galleryTitle = "") => {
        // Si había un borrado pendiente, lo cancelamos
        if (clearImagesTimeout) clearTimeout(clearImagesTimeout)
            
        images.value = imgList
        initialIndex.value = startIndex
        title.value = galleryTitle
        isOpen.value = true
        document.body.style.overflow = "hidden"
    }

    const closeLightbox = () => {
        isOpen.value = false
        document.body.style.overflow = "auto"
        clearImagesTimeout = setTimeout(() => { 
            images.value = [] 
        }, 300)
    }

    onUnmounted(() => {
        document.body.style.overflow = "auto"
        if (clearImagesTimeout) clearTimeout(clearImagesTimeout)
    })

    return {
        isOpen,
        images,
        initialIndex,
        title,
        openLightbox,
        closeLightbox
    }
}