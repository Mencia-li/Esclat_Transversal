import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { projects as projectsData, type Project } from "@/pages/02_projects/projects_data"
import { useGridColumns } from "@/composables/useGridColumns"

const showAll = ref(false)
const selectedProject = ref<Project | null>(null)

export function useProjects() {
    const router = useRouter()

    // Detección de columnas (Móvil, Tablet, PC)
    const { columns } = useGridColumns()

    // Límite inicial según tu regla de filas
    const initialLimit = computed(() => {
        if (columns.value === 3) return 6 // 2 filas de 3
        if (columns.value === 2) return 4 // 2 filas de 2
        return 3                          // 3 filas de 1
    })

    const visibleProjects = computed<Project[]>(() => {
        if (showAll.value) return projectsData
        return projectsData.slice(0, initialLimit.value)
    })

    const shouldShowButton = computed(() => {
        return projectsData.length > initialLimit.value
    })

    const openPreview = (project: Project) => {
        selectedProject.value = project
        document.body.style.overflow = "hidden"
    }

    const closePreview = () => {
        selectedProject.value = null
        document.body.style.overflow = "auto"
    }

    const getProjectById = (id: string | number) => {
        const numericId = Number(id)
        return projectsData.find(p => p.id === numericId)
    }

    const goToProject = (id: number) => {
        closePreview()
        router.push({ name: "project-detail", params: { id } })
    }

    return {
        showAll,
        visibleProjects,
        shouldShowButton,
        selectedProject,
        openPreview,
        closePreview,
        getProjectById,
        goToProject
    }
}