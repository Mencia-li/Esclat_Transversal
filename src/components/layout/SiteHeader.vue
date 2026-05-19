<script setup lang="ts">
import { RouterLink } from "vue-router"
import { CalendarDays, ChevronDown, HelpCircle, List, Menu, Music2, Ticket, Users } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

const programLinks = [
  { label: "Calendario", to: { path: "/", hash: "#programa" }, icon: CalendarDays },
  { label: "Programación", to: { path: "/", hash: "#actividades" }, icon: List },
]

const navLinks = [
  { label: "Artistas", to: { path: "/", hash: "#artistas" }, icon: Users },
  { label: "Tienda", to: { path: "/", hash: "#tienda" }, icon: Music2 },
  { label: "FAQs", to: { path: "/", hash: "#faqs" }, icon: HelpCircle },
]
</script>

<template>
  <header class="fixed left-0 top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6">
      <RouterLink
        :to="{ path: '/', hash: '#inicio' }"
        class="text-2xl font-semibold text-foreground transition hover:text-primary"
      >
        Esclat.
      </RouterLink>

      <NavigationMenu class="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                class="inline-flex h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
              >
                <CalendarDays class="size-4" />
                Programa
                <ChevronDown class="size-3.5 opacity-70" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Programa</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem v-for="item in programLinks" :key="item.label" as-child>
                  <RouterLink :to="item.to">
                    <component :is="item.icon" class="size-4" />
                    {{ item.label }}
                  </RouterLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>

          <NavigationMenuItem v-for="item in navLinks" :key="item.label">
            <NavigationMenuLink as-child>
              <RouterLink :to="item.to" class="gap-2">
                <component :is="item.icon" class="size-4" />
                {{ item.label }}
              </RouterLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div class="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="icon" class="md:hidden" aria-label="Abrir menú">
              <Menu class="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Esclat</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem v-for="item in programLinks" :key="item.label" as-child>
              <RouterLink :to="item.to">
                <component :is="item.icon" class="size-4" />
                {{ item.label }}
              </RouterLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem v-for="item in navLinks" :key="item.label" as-child>
              <RouterLink :to="item.to">
                <component :is="item.icon" class="size-4" />
                {{ item.label }}
              </RouterLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button as-child size="sm">
          <RouterLink :to="{ path: '/', hash: '#tienda' }">
            <Ticket class="size-4" />
            Entradas
          </RouterLink>
        </Button>

        <Button as-child variant="outline" size="sm" class="hidden sm:inline-flex">
          <RouterLink :to="{ path: '/', hash: '#inicio' }">
            Festival
          </RouterLink>
        </Button>
      </div>
    </div>
  </header>
</template>
