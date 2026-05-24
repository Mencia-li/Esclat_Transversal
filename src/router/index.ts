import Home from "@/pages/01_home/Home.vue"
import ArtistDetail from "@/pages/03_artists/ArtistDetail.vue"
import RouteShell from "@/pages/detail/RouteShell.vue"
import ProgramDetail from "@/pages/02_program/ProgramDetail.vue"
import ShopSection from "@/pages/05_shop/ShopSection.vue"
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
      path: "/programa",
      component: RouteShell,
      redirect: { path: "/", hash: "#programa" },
      children: [
        {
          path: ":dia",
          name: "program-detail",
          component: ProgramDetail,
        },
      ],
    },
    {
      path: "/artistas",
      component: RouteShell,
      redirect: { path: "/", hash: "#artistas" },
      children: [
        {
          path: ":id",
          name: "artist-detail",
          component: ArtistDetail,
        },
      ],
    },
    {
      path: "/tienda",
      name: "shop",
      component: ShopSection,
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/",
    },
  ],
})
