import { createRouter, createWebHashHistory } from "vue-router"
import Home from "@/pages/01_home/Home.vue"

export const router = createRouter({
  // Mantenemos WebHashHistory para usar el formato /#/...
  history: createWebHashHistory(import.meta.env.BASE_URL),
  
  scrollBehavior(to, from, savedPosition) {
    // Si el usuario usa los botones de atrás/adelante del navegador, 
    // respetamos la posición guardada
    if (savedPosition) {
      return savedPosition
    }

    // Si navegamos entre secciones de la MISMA página (ej: de #proyectos a #ilustraciones),
    // NO queremos que este scrollBehavior interfiera, porque useNavigation ya hace 
    // el scroll suave con scrollToElement.
    if (to.path === from.path && to.hash) {
      return false // Deja que useNavigation maneje el scroll
    }

    // Si venimos de otra página (ej. /sobre-mi) y hay un hash,
    // forzamos el salto instantáneo para evitar ver el inicio del Home
    if (to.hash) {
      // Apagamos el scroll suave global momentáneamente
      document.documentElement.style.scrollBehavior = 'auto'
      
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth'
      }, 50)

      return {
        el: to.hash,
        behavior: 'auto' // Salto directo nativo
      }
    }

    // Por defecto, ir arriba
    return { top: 0 }
  },
  
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/sobre-mi",
      name: "sobre-mi",
      component: () => import("@/pages/01_home/0_about/SobreMi.vue"),
    },
    {
      path: "/proyectos/:id",
      name: "project-detail",
      component: () => import("@/pages/02_projects/ProjectDetail.vue"),
      props: true,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
})