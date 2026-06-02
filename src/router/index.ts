import Home from "@/pages/01_home/Home.vue"
import RouteShell from "@/pages/detail/RouteShell.vue"
import ArtistDetail from "@/pages/03_artists/ArtistDetail.vue"
import ProgramDetail from "@/pages/02_program/ProgramDetail.vue"
import Day23Page from "@/pages/02_program/days/Day23Page.vue"
import Day24Page from "@/pages/02_program/days/Day24Page.vue"
import Day25Page from "@/pages/02_program/days/Day25Page.vue"
import FestivalPage from "@/pages/02_program/festival/FestivalPage.vue"
import CharlasPage from "@/pages/04_activities/charlas/CharlasPage.vue"
import ExposicionesPage from "@/pages/04_activities/exposiciones/ExposicionesPage.vue"
import TalleresPage from "@/pages/04_activities/talleres/TalleresPage.vue"
import EntriesPage from "@/pages/05_entries/EntriesPage.vue"
import StorePage from "@/pages/07_store/StorePage.vue"
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
          path: "dia-23",
          name: "program-dia-23",
          component: Day23Page,
        },
        {
          path: "dia-24",
          name: "program-dia-24",
          component: Day24Page,
        },
        {
          path: "dia-25",
          name: "program-dia-25",
          component: Day25Page,
        },
        {
          path: ":dia",
          name: "program-detail",
          component: ProgramDetail,
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
      name: "entries",
      component: EntriesPage,
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
