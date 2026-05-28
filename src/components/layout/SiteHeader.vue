<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Menu } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { label: "Programa", to: { path: "/", hash: "#programa" } },
  { label: "Artistas", to: { path: "/", hash: "#artistas" } },
  { label: "Tienda", to: { path: "/", hash: "#actividades" } },
  { label: "FAQs", to: { path: "/", hash: "#faqs" } },
]

const esclatLogo = "/img/logos/esclat/svg/horizontal-black.svg"
</script>

<template>
  <header class="fixed left-0 top-0 z-50 w-full border-b border-foreground bg-background">
    <div class="flex h-14 items-center gap-4 px-4 sm:px-6 lg:px-8">
      <RouterLink
        :to="{ path: '/', hash: '#inicio' }"
        class="inline-flex items-center"
        aria-label="Ir al inicio"
      >
        <img :src="esclatLogo" alt="ESCLAT" class="h-12 w-auto" />
      </RouterLink>

      <div class="ml-auto flex items-center gap-6">
        <nav class="hidden items-center gap-10 md:flex">
          <RouterLink
            v-for="item in navLinks"
            :key="item.label"
            :to="item.to"
            class="text-xs font-medium uppercase leading-none text-foreground transition hover:underline"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <div class="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" size="icon-sm" class="rounded-none border-foreground md:hidden" aria-label="Abrir menú">
                <Menu class="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Esclat</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem v-for="item in navLinks" :key="item.label" as-child>
                <RouterLink :to="item.to">
                  {{ item.label }}
                </RouterLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button as-child size="sm" class="rounded-none bg-foreground px-4 text-xs uppercase text-background hover:bg-foreground/85">
            <RouterLink :to="{ path: '/', hash: '#actividades' }">
              Entradas
            </RouterLink>
          </Button>

          <Button as-child variant="outline" size="sm" class="hidden rounded-none border-foreground px-4 text-xs uppercase sm:inline-flex">
            <RouterLink :to="{ path: '/', hash: '#inicio' }">
              Festival
            </RouterLink>
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>
