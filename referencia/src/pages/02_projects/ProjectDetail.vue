<template>
    <section class="min-h-screen theme-base pt-20 transition-colors duration-300 relative">
        <div class="hidden xl:block">
            <button 
                v-if="navigation.prev"
                @click="goToProject(navigation.prev.id)"
                class="fixed left-6 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full theme-invert shadow-2xl hover:scale-110 transition-all cursor-pointer group"
                title="Proyecto anterior"
            >
                <ArrowLeft class="w-8 h-8" />
                <span class="absolute left-full ml-4 px-3 py-1 rounded bg-foreground text-background text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {{ navigation.prev.title }}
                </span>
            </button>

            <button 
                v-if="navigation.next"
                @click="goToProject(navigation.next.id)"
                class="fixed right-6 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full theme-invert shadow-2xl hover:scale-110 transition-all cursor-pointer group"
                title="Siguiente proyecto"
            >
                <ArrowRight class="w-8 h-8" />
                <span class="absolute right-full mr-4 px-3 py-1 rounded bg-foreground text-background text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {{ navigation.next.title }}
                </span>
            </button>
        </div>

        <div v-if="project" class="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="max-w-5xl mx-auto px-6 space-y-16">
                
                <div class="space-y-6">
                    <button
                        @click="goToGallery"
                        class="theme-invert btn-ghost text-sm font-bold uppercase tracking-widest transition-opacity flex items-center gap-2 cursor-pointer mb-8"
                    >
                        ← Volver a proyectos
                    </button>

                    <div class="space-y-2">
                        <h1 class="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                            {{ project.title }}
                        </h1>
                        <p v-if="project.subtitle" class="text-2xl md:text-3xl font-light italic opacity-80">
                            {{ project.subtitle }}
                        </p>
                    </div>
                </div>

                <div class="aspect-video bg-foreground rounded-2xl shadow-2xl overflow-hidden border border-foreground/10">
                    <img
                        :src="`/img/projects/${project.folder}/${project.cover}`"
                        :alt="project.title"
                        class="w-full h-full object-cover"
                        decoding="async"
                    />
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div class="lg:col-span-2 space-y-16">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="space-y-4">
                                <h2 class="text-xl font-bold uppercase tracking-tight border-b border-foreground/10 pb-2">Contexto</h2>
                                <p class="text-lg leading-relaxed opacity-90">{{ project.contexto }}</p>
                            </div>
                            <div class="space-y-4">
                                <h2 class="text-xl font-bold uppercase tracking-tight border-b border-foreground/10 pb-2">Objetivo</h2>
                                <p class="text-lg leading-relaxed opacity-90">{{ project.objetivo }}</p>
                            </div>
                        </div>

                        <div class="space-y-4 bg-foreground/5 p-8 rounded-2xl border border-foreground/10">
                            <h2 class="text-2xl font-bold uppercase tracking-tight">El Proceso</h2>
                            <p class="text-lg leading-relaxed text-justify opacity-90">{{ project.proceso }}</p>
                        </div>

                        <div class="space-y-4">
                            <h2 class="text-2xl font-bold uppercase tracking-tight border-b border-foreground/10 pb-2">
                                Resultado Final
                            </h2>
                            <p class="text-lg leading-relaxed opacity-90">{{ project.resultado }}</p>
                        </div>

                        <div class="space-y-8 pt-8">
                            <h2 class="text-2xl font-bold uppercase tracking-tight border-b border-foreground/10 pb-2">Exploración Visual</h2>
                            <div class="columns-1 sm:columns-2 gap-4 space-y-4">
                                <button
                                    v-for="(img, idx) in project.images"
                                    :key="idx"
                                    @click="openGallery(idx)"
                                    class="break-inside-avoid group cursor-pointer w-full text-left"
                                >
                                    <img
                                        :src="`/img/projects/${project.folder}/${img}`"
                                        class="w-full rounded-xl shadow-md border border-foreground/5 group-hover:scale-[1.03] transition-transform duration-300"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <aside class="space-y-10 lg:sticky lg:top-32 h-fit pb-10">
                        <div class="space-y-1">
                            <h4 class="text-xs font-bold uppercase tracking-widest opacity-50">Categoría</h4>
                            <p class="font-bold text-xl">Diseño & Tecnologías Creativas</p>
                        </div>
                        <div class="space-y-3">
                            <h4 class="text-xs font-bold uppercase tracking-widest opacity-50">Herramientas</h4>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="tool in project.herramientas" :key="tool" class="theme-invert px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
                                    {{ tool }}
                                </span>
                            </div>
                        </div>
                        <div class="space-y-1">
                            <h4 class="text-xs font-bold uppercase tracking-widest opacity-50">Año</h4>
                            <p class="font-bold text-xl">2024 - 2025</p>
                        </div>
                    </aside>
                </div>
            </div>

            <div class="mt-20 theme-invert py-24 text-center transition-colors duration-300">
                <div class="max-w-5xl mx-auto px-6 flex flex-col items-center gap-12">
                    
                    <Pagination 
                        :total="2" 
                        :items-per-page="1" 
                        class="w-full justify-center xl:hidden border-b border-background/20 pb-12"
                    >
                        <PaginationContent class="flex gap-4 w-full justify-between sm:justify-center">
                            <PaginationItem :value="1" v-if="navigation.prev">
                                <PaginationPrevious 
                                    @click="goToProject(navigation.prev.id)" 
                                    class="cursor-pointer hover:bg-background/20 px-4 py-2"
                                />
                            </PaginationItem>
                            
                            <PaginationItem :value="2" v-if="navigation.next">
                                <PaginationNext 
                                    @click="goToProject(navigation.next.id)" 
                                    class="cursor-pointer hover:bg-background/20 px-4 py-2"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    
                    <button
                        @click="goToGallery"
                        class="theme-base px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-2xl border border-background/20"
                    >
                        Volver a la galería
                    </button>
                </div>
            </div>
        </div>

        <div v-else class="text-center space-y-6 py-40">
            <h1 class="text-4xl font-black uppercase">Proyecto no encontrado</h1>
            <button @click="goToGallery" class="underline font-bold cursor-pointer">Volver al inicio</button>
        </div>

        <ModalCarousel :is-open="isOpen" :images="images" :initial-index="initialIndex" :title="title" @close="closeLightbox" />
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { ArrowLeft, ArrowRight } from "lucide-vue-next"
import { useProjects } from "@/pages/02_projects/useProjects"
import { projects } from "@/pages/02_projects/projects_data"
import ModalCarousel from "@/components/layout/ModalCarousel.vue"
import { useLightbox } from "@/composables/useLightbox"
import { useNavigation } from "@/composables/useNavigation"

// Importamos la paginación de Shadcn
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination'

const route = useRoute()
const router = useRouter()
const { goToSection } = useNavigation()

const { getProjectById } = useProjects()
const { isOpen, images, initialIndex, title, openLightbox, closeLightbox } = useLightbox()

const project = computed(() => getProjectById(route.params.id as string))

// Navegación secuencial de proyectos
const navigation = computed(() => {
    const currentIndex = projects.findIndex(p => p.id === Number(route.params.id))
    return {
        prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
        next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
    }
})

// Vuelve directamente a la sección proyectos del index
const goToGallery = () => {
    goToSection('proyectos', true)
}

// Navega a otro proyecto limpiando el scroll
const goToProject = (id: number) => {
    router.push({ name: "project-detail", params: { id } })
    window.scrollTo({ top: 0, behavior: 'instant' })
}

// Escuchador de teclado (Izquierda/Derecha)
const handleKeyDown = (e: KeyboardEvent) => {
    if (isOpen.value) return
    if (e.key === 'ArrowLeft' && navigation.value.prev) goToProject(navigation.value.prev.id)
    if (e.key === 'ArrowRight' && navigation.value.next) goToProject(navigation.value.next.id)
}

onMounted(() => window.addEventListener('keydown', handleKeyDown))
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))

// Abrir el carrusel en una imagen en concreto
const openGallery = (index: number) => {
    if (!project.value) return
    const formattedImages = project.value.images.map(img => ({
        url: `/img/projects/${project.value!.folder}/${img}`,
        alt: project.value!.title
    }))
    openLightbox(formattedImages, index, project.value.title)
}
</script>