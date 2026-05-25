<template>
    <section class="min-h-screen relative theme-invert">
        <!-- Botón fijo (te acompaña al hacer scroll) -->
        <button
        @click="goBack"
        class="theme-base btn-ghost fixed top-22 left-6 z-50"
        aria-label="Volver a inicio"
        >
        ← Volver
        </button>

        <div class="section-container space-y-16">
            <header class="text-center">
                <h1 class="section-title mb-6">Sobre mí</h1>
                <p class="max-w-3xl mx-auto text-lg font-medium opacity-90">
                Diseño, ilustración y el camino de convertir una pasión en una forma de comunicar.
                </p>
            </header>

            <div class="max-w-5xl mx-auto prose-about">
                <p>
                Estoy cursando el grado de <strong>Diseño y Tecnologías Creativas en la UPV</strong> y actualmente estoy en segundo de
                carrera. Desde pequeña he tenido una relación muy natural con el dibujo: pasaba las tardes en el local de mis padres
                inventando historias, haciendo manualidades y llenando hojas sin parar. Con el tiempo entendí que no era solo una afición,
                sino una forma de pensar y de comunicar.
                </p>

                <p>
                Durante la ESO dudé entre el camino artístico o el científico, porque también disfrutaba de las matemáticas. Finalmente elegí
                el bachillerato artístico, apostando por lo que realmente me motivaba, a pesar de prejuicios y comentarios que cuestionaban
                esa tipo de decisión. Esa etapa me enseñó algo importante: una nota no define tu capacidad, y nadie puede determinar tu
                potencial por una mínima diferencia.
                </p>

                <p>
                En la carrera he aprendido a ir más allá del “porque me parece bonito”. Ahora tomo decisiones con criterio: entiendo el color,
                la composición y la intención detrás de cada elección. Me interesa especialmente el diseño y la ilustración, y disfruto
                desarrollando proyectos donde la creatividad tiene una base sólida y argumentada.
                </p>

                <p>
                Soy organizada y perfeccionista, pero también curiosa. Desde pequeña he ido explorando técnicas poco a poco (<strong
                    >rotuladores de alcohol, acuarela, tinta china, gouache, lápices de color…</strong
                >) construyendo una base que hoy me permite moverme con comodidad entre lo tradicional y lo digital. Trabajo bien tanto de
                forma independiente como en equipo, porque creo que ambas experiencias me obligan a crecer de maneras distintas: una me exige
                autonomía y disciplina; la otra, apertura y capacidad de escuchar.
                </p>

                <p>
                Más allá de lo académico, me inspiran <strong>las series, el anime, el kpop y las personas que me rodean</strong>. Muchas
                veces mis referentes visuales nacen de ahí, de personajes, historias o pequeños detalles cotidianos que despiertan algo
                creativo. También disfruto de la repostería, que para mí tiene mucho en común con el diseño: paciencia, precisión y cuidado
                por el resultado final.
                </p>

                <p>
                Sigo dibujando fanarts porque forman parte de mi manera de aprender y expresarme. Dibujar aquello que me apasiona me permite
                experimentar sin presión, explorar estilos, estudiar personajes y conectar con otras personas que comparten esos mismos
                intereses. Esa parte más personal y “friki” no está separada de mi perfil profesional; al contrario, es una de las raíces que
                alimentan mi forma de crear.
                </p>

                <p class="font-medium italic border-l-4 border-background pl-4">
                Todavía estoy descubriendo hacia dónde quiero ir exactamente, pero tengo claro que quiero seguir creando, aprendiendo y
                disfrutando del proceso.
                </p>
            </div>

            <section class="max-w-5xl mx-auto">
                <h2 class="text-2xl font-semibold mb-4 border-b border-background/20 pb-2">Estudios</h2>
                <ul class="space-y-2">
                    <li>
                        <span>• Grado en Diseño y Tecnologías Creativas - En curso</span>
                        <span class="block pl-3 mt-1 text-sm">
                            Universidad Politécnica de Valencia
                        </span>
                    </li>

                    <li>
                        <span>• Bachillerato de Artes - Nota Media: MH</span>
                        <span class="block pl-3 mt-1 text-sm">
                            IES 26
                        </span>
                    </li>

                    <li>
                        <span>• Educación Secundaria Obligatorio - Nota Media: 9.3</span>
                        <span class="block pl-3 mt-1 text-sm">
                            IES Malilla
                        </span>
                    </li>

                </ul>
            </section>

            <section class="max-w-5xl mx-auto">
                <h2 class="text-2xl font-semibold mb-6 border-b border-background/20 pb-2">Habilidades</h2>

                <Accordion type="multiple" collapsible class="w-full border-none">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    <AccordionItem
                    v-for="(group, index) in skillGroups"
                    :key="group.title"
                    :value="`item-${index}`"
                    class="border-none"
                    >
                    <AccordionTrigger class="theme-base accordion-trigger-card">
                        {{ group.title }}
                    </AccordionTrigger>

                    <AccordionContent class="pt-6 pb-2">
                        <div class="space-y-4">
                        <div v-for="skill in group.skills" :key="skill.name" class="space-y-1">
                            <div class="flex justify-between text-xs font-bold uppercase tracking-tighter">
                            <span>{{ skill.name }}</span>
                            </div>

                            <div class="skill-track">
                            <div
                                class="skill-fill"
                                :style="{ width: `${skill.level}%` }"
                                :aria-label="`${skill.name}: ${skill.level}%`"
                                role="img"
                            />
                            </div>
                        </div>
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                </div>
                </Accordion>
            </section>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

type Skill = { name: string; level: number }
type SkillGroup = { title: string; skills: Skill[] }

const router = useRouter()
const goBack = () => router.push("/")

const skillGroups: SkillGroup[] = [
    {
        title: "Técnicas artísticas",
        skills: [
        { name: "Acuarela", level: 95 },
        { name: "Tinta china", level: 90 },
        { name: "Lápiz", level: 90 },
        { name: "Lápices de colores", level: 85 },
        { name: "Rotuladores de alcohol", level: 100 },
        { name: "Rotuladores acrílicos", level: 85 },
        { name: "Acrílico", level: 75 },
        { name: "Gouache", level: 85 },
        ],
    },
    {
        title: "Software digital",
        skills: [
        { name: "Illustrator", level: 90 },
        { name: "Procreate", level: 100 },
        { name: "InDesign", level: 85 },
        { name: "Photoshop", level: 80 },
        { name: "Premiere", level: 85 },
        { name: "Blender", level: 55 },
        { name: "Java", level: 50 },
        { name: "Vue + TS", level: 40 },
        ],
    },
    {
        title: "Competencias",
        skills: [
        { name: "Dirección de arte", level: 80 },
        { name: "Diseño editorial", level: 90 },
        { name: "Branding", level: 92 },
        { name: "Ilustración", level: 93 },
        { name: "Trabajo en equipo", level: 100 },
        { name: "Castellano", level: 100 },
        { name: "Valenciano", level: 95 },
        { name: "Chino", level: 100 },
        { name: "Inglés", level: 85 },
        ],
    },
]
</script>

<style scoped>
:deep([data-radix-collection-item] svg),
:deep([data-state] svg) {
    display: none !important;
}
</style>