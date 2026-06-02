<script setup lang="ts">
import { RouterLink } from "vue-router"
import { ArrowUpRight, CheckCircle2, Package, ShoppingBag } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const merchItems = [
  "Camiseta azul Esclat",
  "Tote bag del festival",
  "Prints y pegatinas",
]
</script>

<template>
  <Card
    data-reveal="clip"
    style="--reveal-delay: 140ms"
    class="min-h-[36rem] overflow-hidden border-0 bg-[#86a0d5] text-background lg:h-full"
  >
    <CardHeader class="p-6 sm:p-8">
      <div class="flex items-center justify-between gap-4">
        <p class="inline-flex items-center gap-2 rounded-md bg-background/15 px-3 py-2 text-xs font-semibold uppercase">
          <ShoppingBag class="size-4" />
          Merch
        </p>
        <Package class="size-6" />
      </div>
      <CardTitle class="pt-8 text-4xl leading-tight sm:text-5xl">
        Merch oficial.
      </CardTitle>
    </CardHeader>

    <CardContent class="flex h-full flex-col justify-between gap-6 p-6 pt-0 sm:p-8 sm:pt-0">
      <div class="grid gap-3">
        <div class="rounded-xl bg-background/90 p-5 text-foreground">
          <div class="mx-auto aspect-[3/4] max-w-40 rounded-t-3xl rounded-b-lg bg-primary shadow-lg">
            <div class="mx-auto h-10 w-16 rounded-b-full bg-[#86a0d5]" />
            <p class="px-5 pt-12 text-center text-2xl font-semibold text-primary-foreground">ESCLAT</p>
          </div>
        </div>

        <div class="grid gap-2">
          <p v-for="item in merchItems" :key="item" class="flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2 class="size-4" />
            {{ item }}
          </p>
        </div>
      </div>

      <Button as-child variant="secondary" size="lg" class="w-fit">
        <RouterLink :to="{ path: '/entradas', hash: '#contacto' }">
          Consultar merch
          <ArrowUpRight class="size-4" />
        </RouterLink>
      </Button>
    </CardContent>
  </Card>
</template>
