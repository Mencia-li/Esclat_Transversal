<template>
  <div class="fixed top-0 left-0 w-full theme-invert shadow-md z-50 transition-colors duration-300">
    <div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

      <div
        class="text-xl font-bold tracking-wide cursor-pointer select-none shrink-0"
        @click="goToSection('home')"
      >
        MENCÍA LI
      </div>

      <div class="flex items-center gap-2 md:gap-4">
        
        <NavigationMenu class="hidden md:flex">
          <NavigationMenuList class="flex items-center gap-6">
            <NavigationMenuItem v-for="item in navItems" :key="item.id">
              <a href="#" @click.prevent="goToSection(item.id)">
                <NavigationMenuLink :class="[navigationMenuTriggerStyle(), 'group/nav relative flex items-center justify-center h-10 rounded-xl px-0 bg-background! text-foreground! hover:opacity-90! overflow-hidden transition-all duration-300 w-11 ' + item.hoverWidth]">
                  <component :is="item.icon" class="w-5 h-5 shrink-0 transition-all duration-300 group-hover/nav:opacity-0 group-hover/nav:scale-50" />
                  <span class="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 text-sm font-medium group-hover/nav:opacity-100">
                    {{ item.label }}
                  </span>
                </NavigationMenuLink>
              </a>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <button class="md:hidden p-2 rounded-full hover:bg-background/10 transition-all duration-300 cursor-pointer flex items-center justify-center outline-none">
              <Menu class="w-6 h-6 transition-all duration-300" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="bg-foreground border-background text-background w-48">
            <DropdownMenuItem v-for="item in navItems" :key="item.id" @click="goToSection(item.id)" class="cursor-pointer hover:bg-background/10! font-medium">
              {{ item.label }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <button class="p-2 rounded-full hover:bg-background/10 transition-all duration-300 cursor-pointer outline-none flex items-center justify-center">
              <Palette class="w-6 h-6 transition-all duration-300" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="bg-foreground border-background text-background">
            <DropdownMenuItem @click="setTheme('palette-1')" class="cursor-pointer hover:bg-background/10!">Paleta - Matcha</DropdownMenuItem>
            <DropdownMenuItem @click="setTheme('palette-2')" class="cursor-pointer hover:bg-background/10!">Paleta - Solar</DropdownMenuItem>
            <DropdownMenuItem @click="setTheme('palette-3')" class="cursor-pointer hover:bg-background/10!">Paleta - Lavanda</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <MusicControl />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "@/composables/useTheme"
import { useNavigation } from "@/composables/useNavigation"
import { Home, FolderKanban, Image, Mail, Palette, Menu } from "lucide-vue-next"

import MusicControl from "@/components/layout/MusicControl.vue"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const { setTheme } = useTheme()
const { goToSection } = useNavigation()

const navItems = [
  { id: 'home', label: 'Home', icon: Home, hoverWidth: 'hover:w-28' },
  { id: 'proyectos', label: 'Proyectos', icon: FolderKanban, hoverWidth: 'hover:w-32' },
  { id: 'ilustraciones', label: 'Ilustraciones', icon: Image, hoverWidth: 'hover:w-36' },
  { id: 'contacto', label: 'Contacto', icon: Mail, hoverWidth: 'hover:w-32' }
] as const
</script>