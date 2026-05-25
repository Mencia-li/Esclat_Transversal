import { useRoute, useRouter } from "vue-router"

export function useNavigation() {
    const router = useRouter()
    const route = useRoute()

    async function goToSection(id: string, isInstant: boolean = false): Promise<void> {
        // Determinamos el hash destino: vacío para home, o #id para el resto
        const targetHash = id === 'home' ? '' : `#${id}`
        
        if (route.path !== "/") {
            // Si venimos de otra página, el router ya añade /#/#hash automáticamente
            await router.push({ path: "/", hash: targetHash })
        } else {
            // Usamos replace para no ensuciar el historial del navegador con cada scroll
            router.replace({ path: "/", hash: targetHash }).catch(() => {})

            const el = document.getElementById(id)
            if (el) {
                if (isInstant) {
                    document.documentElement.style.scrollBehavior = 'auto'
                    el.scrollIntoView({ behavior: 'auto', block: "start" })
                    
                    setTimeout(() => {
                        document.documentElement.style.scrollBehavior = ''
                    }, 50)
                } else {
                    el.scrollIntoView({ behavior: "smooth", block: "start" })
                }
            }
        }
    }

    function goToAbout(): void {
        router.push("/sobre-mi")
    }

    return { goToSection, goToAbout }
}