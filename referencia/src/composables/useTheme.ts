import { ref, onMounted } from 'vue'

export type Theme = 'palette-1' | 'palette-2' | 'palette-3'

const activeTheme = ref<Theme>('palette-1')

export function useTheme() {
    const setTheme = (theme: Theme) => {
        activeTheme.value = theme
        // Aplicamos el atributo al HTML para que el CSS cambie
        document.documentElement.setAttribute('data-theme', theme)
        // Guardamos la preferencia
        localStorage.setItem('user-theme', theme)
    }

    onMounted(() => {
        const savedTheme = localStorage.getItem('user-theme') as Theme | null
        if (savedTheme) {
        setTheme(savedTheme)
        }
    })

    return {
        activeTheme,
        setTheme
    }
}