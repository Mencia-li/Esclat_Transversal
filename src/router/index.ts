import Home from "@/pages/Home.vue"
import RouteShell from "@/router/RouteShell.vue"
import ArtistDetail from "@/pages/03_artists/ArtistDetail.vue"
import DayProgramPage from "@/pages/02_program/DayProgramPage.vue"
import FestivalPage from "@/pages/02_program/festival/FestivalPage.vue"
import CharlasPage from "@/pages/04_experience/charlas/CharlasPage.vue"
import ExposicionesPage from "@/pages/04_experience/exposiciones/ExposicionesPage.vue"
import TalleresPage from "@/pages/04_experience/talleres/TalleresPage.vue"
import StorePage from "@/pages/04_experience/store/StorePage.vue"
import { createRouter, createWebHashHistory } from "vue-router"

// Hash history mantiene URLs tipo /#/programa, practicas para hosting estatico.
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    // Si navegamos a una seccion con hash, dejamos espacio para el header fijo.
    if (to.hash) {
      return {
        el: to.hash,
        top: 80,
        behavior: "smooth",
      }
    }

    return { top: 0 }
  },

  routes: [
    // Home: hero, programa, artistas, actividades y FAQs.
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/festival",
      name: "festival",
      component: FestivalPage,
    },
    {
      path: "/programa",
      component: RouteShell,
      redirect: { path: "/", hash: "#programa" },
      children: [
        // Los tres dias usan el mismo componente base con distinto dayId.
        {
          path: "amor-propio",
          redirect: { name: "program-dia-23" },
        },
        {
          path: "23-10",
          redirect: { name: "program-dia-23" },
        },
        {
          path: "24-10",
          redirect: { name: "program-dia-24" },
        },
        {
          path: "25-10",
          redirect: { name: "program-dia-25" },
        },
        {
          path: "dia-23",
          name: "program-dia-23",
          component: DayProgramPage,
          props: { dayId: "23-10" },
        },
        {
          path: "dia-24",
          name: "program-dia-24",
          component: DayProgramPage,
          props: { dayId: "24-10" },
        },
        {
          path: "dia-25",
          name: "program-dia-25",
          component: DayProgramPage,
          props: { dayId: "25-10" },
        },
        {
          path: ":dia",
          redirect: { path: "/", hash: "#programa" },
        },
      ],
    },
    {
      path: "/artistas/:id",
      name: "artist-detail",
      component: ArtistDetail,
    },
    // Ruta corta que devuelve a la seccion de artistas de la home.
    {
      path: "/artistas",
      redirect: { path: "/", hash: "#artistas" },
    },
    {
      path: "/talleres",
      name: "workshops",
      component: TalleresPage,
    },
    {
      path: "/charlas",
      name: "talks",
      component: CharlasPage,
    },
    {
      path: "/exposiciones",
      name: "exhibitions",
      component: ExposicionesPage,
    },
    {
      path: "/entradas",
      redirect: { name: "program-dia-23", hash: "#entradas-dia" },
    },
    {
      path: "/tienda",
      name: "store",
      component: StorePage,
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/",
    },
  ],
})
