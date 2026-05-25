import { computed } from 'vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

export function useGridColumns() {
    // Importamos los breakpoints estándar de Tailwind CSS
    const breakpoints = useBreakpoints(breakpointsTailwind)

    // Calculamos el número de columnas de forma completamente reactiva
    const columns = computed(() => {
        if (breakpoints.lg.value) return 3      // PC (>= 1024px)
        if (breakpoints.sm.value) return 2      // Tablet (>= 640px)
        return 1                                // Móvil (< 640px)
    })

    return { columns }
}