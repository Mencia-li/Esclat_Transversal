import Home from "@/pages/01_home/Home.vue"
import RouteShell from "@/pages/detail/RouteShell.vue"
import ArtistDetail from "@/pages/03_artists/ArtistDetail.vue"
import ProgramDetail from "@/pages/02_program/ProgramDetail.vue"
import Dia23Page from "@/pages/02_program/Dia_23/Dia_23.vue"
import Dia24Page from "@/pages/02_program/Dia_24/Dia_24.vue"
import Dia25Page from "@/pages/02_program/Dia_25/Dia_25.vue"
import FestivalPage from "@/pages/02_program/festival/FestivalPage.vue"
import CharlasPage from "@/pages/04_activities/charlas/CharlasPage.vue"
import ExposicionesPage from "@/pages/04_activities/exposiciones/ExposicionesPage.vue"
import TalleresPage from "@/pages/04_activities/talleres/TalleresPage.vue"
import EntriesPage from "@/pages/05_entries/EntriesPage.vue"
import { createRouter, createWebHashHistory } from "vue-router"

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
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
        {
          path: "amor-propio",
          redirect: { name: "program-dia-23" },
        },
        {
          path: "dia-23",
          name: "program-dia-23",
          component: Dia23Page,
        },
        {
          path: "dia-24",
          name: "program-dia-24",
          component: Dia24Page,
        },
        {
          path: "dia-25",
          name: "program-dia-25",
          component: Dia25Page,
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
      redirect: { name: "entries" },
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/",
    },
  ],
})
