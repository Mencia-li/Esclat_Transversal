<script setup lang="ts">
import { Instagram, Mail, MapPin, Music2, Phone } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { festivalInfo } from "@/data/festival"
</script>

<template>
  <footer class="border-t border-border bg-background">
    <div class="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
      <div>
        <p class="text-3xl font-semibold text-foreground">Esclat.</p>
        <p class="mt-3 max-w-xs text-sm text-muted-foreground">
          {{ festivalInfo.producer }}
        </p>
      </div>

      <div class="space-y-3 text-sm">
        <p class="font-semibold uppercase text-foreground">Contacto:</p>
        <a class="flex items-center gap-2 text-muted-foreground transition hover:text-primary" :href="`mailto:${festivalInfo.email}`">
          <Mail class="size-4" />
          {{ festivalInfo.email }}
        </a>
        <a class="flex items-center gap-2 text-muted-foreground transition hover:text-primary" :href="`tel:${festivalInfo.phone}`">
          <Phone class="size-4" />
          {{ festivalInfo.phone }}
        </a>
        <p class="flex items-center gap-2 text-muted-foreground">
          <MapPin class="size-4" />
          {{ festivalInfo.place }}
        </p>
      </div>

      <div class="space-y-3">
        <p class="text-sm font-semibold uppercase text-foreground">Síguenos:</p>
        <div class="flex gap-2">
          <Button as-child variant="secondary" size="icon" aria-label="Instagram">
            <a href="#" aria-label="Instagram">
              <Instagram class="size-4" />
            </a>
          </Button>
          <Button as-child variant="secondary" size="icon" aria-label="Playlist">
            <a href="#" aria-label="Playlist">
              <Music2 class="size-4" />
            </a>
          </Button>
        </div>
      </div>

      <div class="space-y-3 text-sm">
        <p class="font-semibold uppercase text-foreground">Acceso:</p>
        <p class="text-muted-foreground">Bus: líneas urbanas</p>
        <p class="text-muted-foreground">Metro: parada centro</p>
        <p class="text-muted-foreground">Parking: zona norte</p>
      </div>
    </div>
  </footer>
</template>
