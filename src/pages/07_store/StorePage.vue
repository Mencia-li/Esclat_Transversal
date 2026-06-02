<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import {
  CheckCircle2,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-vue-next"
import { Button } from "@/components/ui/button"

const storeCategories = ["Todos", "Textil", "Accesorios", "Papelería"] as const

type StoreCategory = (typeof storeCategories)[number]
type ProductCategory = Exclude<StoreCategory, "Todos">
type ProductMockup = "tote" | "bottle" | "tee" | "stickers" | "poster" | "bundle"

type StoreProduct = {
  id: string
  name: string
  category: ProductCategory
  price: number
  status: string
  description: string
  mockup: ProductMockup
  background: string
  accent: string
  ink: string
}

const products: StoreProduct[] = [
  {
    id: "tote-bag",
    name: "Tote bag ESCLAT",
    category: "Accesorios",
    price: 18,
    status: "Mockup pendiente",
    description: "Bolsa de algodón para llevar programa, prints y compras del festival.",
    mockup: "tote",
    background: "#b2f2f4",
    accent: "#ffffff",
    ink: "#005eea",
  },
  {
    id: "cantimplora",
    name: "Cantimplora azul",
    category: "Accesorios",
    price: 22,
    status: "Diseño provisional",
    description: "Botella reutilizable para los tres días de ESCLAT.",
    mockup: "bottle",
    background: "#f6e27f",
    accent: "#005eea",
    ink: "#ffffff",
  },
  {
    id: "camiseta",
    name: "Camiseta festival",
    category: "Textil",
    price: 25,
    status: "Color por definir",
    description: "Camiseta base con aplicación frontal de la identidad ESCLAT.",
    mockup: "tee",
    background: "#d5d4d8",
    accent: "#005eea",
    ink: "#ffffff",
  },
  {
    id: "prints-pegatinas",
    name: "Prints y pegatinas",
    category: "Papelería",
    price: 12,
    status: "Arte pendiente",
    description: "Pack de ilustraciones, stickers y piezas gráficas del festival.",
    mockup: "stickers",
    background: "#ffffff",
    accent: "#b2f2f4",
    ink: "#3f3f46",
  },
  {
    id: "poster",
    name: "Póster cartel",
    category: "Papelería",
    price: 15,
    status: "Cartel final pendiente",
    description: "Lámina del cartel oficial en formato póster.",
    mockup: "poster",
    background: "#ffd1c7",
    accent: "#ffffff",
    ink: "#005eea",
  },
  {
    id: "pack-merch",
    name: "Pack merch festival",
    category: "Accesorios",
    price: 42,
    status: "Contenido abierto",
    description: "Combinación de tote, cantimplora y piezas gráficas.",
    mockup: "bundle",
    background: "#e8f0ff",
    accent: "#005eea",
    ink: "#ffffff",
  },
]

const activeCategory = ref<StoreCategory>("Todos")
const orderPrepared = ref(false)
const cart = reactive<Record<string, number>>({})

const filteredProducts = computed(() => {
  if (activeCategory.value === "Todos") {
    return products
  }

  return products.filter((product) => product.category === activeCategory.value)
})

const cartItems = computed(() => {
  return products
    .map((product) => ({
      product,
      quantity: cart[product.id] ?? 0,
    }))
    .filter((item) => item.quantity > 0)
})

const cartItemCount = computed(() => cartItems.value.reduce((total, item) => total + item.quantity, 0))
const cartTotal = computed(() => cartItems.value.reduce((total, item) => total + item.product.price * item.quantity, 0))

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price)
}

function addToCart(product: StoreProduct) {
  cart[product.id] = (cart[product.id] ?? 0) + 1
  orderPrepared.value = false
}

function removeFromCart(product: StoreProduct) {
  const currentQuantity = cart[product.id] ?? 0
  orderPrepared.value = false

  if (currentQuantity <= 1) {
    delete cart[product.id]
    return
  }

  cart[product.id] = currentQuantity - 1
}

function productVisualStyle(product: StoreProduct) {
  return {
    backgroundColor: product.background,
    "--product-bg": product.background,
    "--product-accent": product.accent,
    "--product-ink": product.ink,
  }
}

function prepareOrder() {
  if (!cartItems.value.length) {
    return
  }

  orderPrepared.value = true
}
</script>

<template>
  <section class="festival-section-entries festival-theme-alt">
    <div class="entries-section-container gap-8">
      <div
        data-reveal
        class="grid gap-6 border-b border-foreground pb-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end"
      >
        <div>
          <p class="text-sm font-semibold uppercase text-primary">Merchandising oficial</p>
          <h1 class="mt-2 max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Tienda ESCLAT.
          </h1>
          <p class="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Una tienda de festival para tote bags, cantimploras, textil y piezas gráficas. Los mockups finales están
            pendientes, así que esta página plantea la estructura comercial y la colección base.
          </p>
        </div>

        <div class="border border-foreground bg-blue_ice p-5">
          <div class="flex items-center justify-between gap-4">
            <p class="text-sm font-semibold uppercase text-foreground">Colección en diseño</p>
            <Package class="size-5 text-foreground" />
          </div>
          <p class="mt-4 text-sm leading-relaxed text-foreground/80">
            Artículos de merch, sin venta de entradas ni reservas de acceso.
          </p>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)_20rem]">
        <aside data-reveal="left" class="lg:sticky lg:top-20 lg:self-start">
          <div class="border border-foreground bg-background p-4">
            <div class="mb-4 flex items-center gap-2 text-sm font-semibold uppercase text-foreground">
              <SlidersHorizontal class="size-4" />
              Categorías
            </div>
            <div class="flex flex-wrap gap-2 lg:grid">
              <button
                v-for="category in storeCategories"
                :key="category"
                type="button"
                :class="[
                  'min-h-10 border border-foreground px-3 text-left text-sm uppercase leading-none transition-colors',
                  activeCategory === category
                    ? 'bg-foreground text-background'
                    : 'bg-background text-foreground hover:bg-grey',
                ]"
                @click="activeCategory = category"
              >
                {{ category }}
              </button>
            </div>
          </div>
        </aside>

        <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="product in filteredProducts"
            :key="product.id"
            data-reveal="clip"
            class="flex min-h-[32rem] flex-col overflow-hidden border border-foreground bg-background"
          >
            <div
              class="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-foreground p-8"
              :style="productVisualStyle(product)"
            >
              <span class="absolute left-4 top-4 bg-background px-3 py-1 text-xs font-semibold uppercase text-foreground">
                {{ product.status }}
              </span>

              <div v-if="product.mockup === 'tote'" class="relative h-44 w-36 bg-[var(--product-accent)] shadow-xl">
                <div class="absolute -top-7 left-1/2 h-16 w-20 -translate-x-1/2 rounded-t-full border-4 border-foreground/35 border-b-0" />
                <p class="flex h-full items-center justify-center text-2xl font-semibold text-[var(--product-ink)]">
                  ESCLAT
                </p>
              </div>

              <div v-else-if="product.mockup === 'bottle'" class="relative h-52 w-20">
                <div class="mx-auto h-6 w-10 rounded-t-md bg-foreground/70" />
                <div class="h-[11.5rem] rounded-b-3xl rounded-t-lg bg-[var(--product-accent)] shadow-xl">
                  <p class="flex h-full items-center justify-center -rotate-90 text-2xl font-semibold tracking-normal text-[var(--product-ink)]">
                    ESCLAT
                  </p>
                </div>
              </div>

              <div v-else-if="product.mockup === 'tee'" class="relative h-44 w-44">
                <div class="absolute left-0 top-7 h-16 w-12 -rotate-12 rounded-sm bg-[var(--product-accent)]" />
                <div class="absolute right-0 top-7 h-16 w-12 rotate-12 rounded-sm bg-[var(--product-accent)]" />
                <div class="absolute left-8 top-4 h-40 w-28 rounded-b-md bg-[var(--product-accent)] shadow-xl">
                  <div class="mx-auto h-9 w-14 rounded-b-full bg-[var(--product-bg)]" />
                  <p class="pt-10 text-center text-xl font-semibold text-[var(--product-ink)]">ESCLAT</p>
                </div>
              </div>

              <div v-else-if="product.mockup === 'stickers'" class="relative h-44 w-44">
                <div class="absolute left-4 top-6 h-32 w-24 -rotate-6 border border-foreground bg-[var(--product-accent)] shadow-lg" />
                <div class="absolute right-4 top-3 h-36 w-24 rotate-6 border border-foreground bg-background shadow-lg" />
                <div class="absolute bottom-5 left-10 flex size-20 items-center justify-center rounded-full border border-foreground bg-primary text-sm font-semibold text-primary-foreground">
                  ESCLAT
                </div>
              </div>

              <div v-else-if="product.mockup === 'poster'" class="relative h-48 w-[8.5rem] border border-foreground bg-[var(--product-accent)] p-4 shadow-xl">
                <div class="h-full border border-primary p-3">
                  <p class="text-xs font-semibold uppercase text-primary">Cartel</p>
                  <p class="mt-10 text-3xl font-semibold leading-none text-[var(--product-ink)]">ESCLAT</p>
                  <p class="mt-3 text-xs uppercase text-foreground">2026</p>
                </div>
              </div>

              <div v-else class="relative h-48 w-48">
                <div class="absolute left-3 top-12 h-32 w-28 bg-background shadow-xl">
                  <p class="flex h-full items-center justify-center text-xl font-semibold text-primary">TOTE</p>
                </div>
                <div class="absolute right-3 top-4 h-40 w-16 rounded-b-3xl rounded-t-lg bg-[var(--product-accent)] shadow-xl" />
                <div class="absolute bottom-5 left-16 flex size-20 items-center justify-center rounded-full bg-turquesa text-xs font-semibold uppercase text-foreground">
                  Pack
                </div>
              </div>
            </div>

            <div class="flex flex-1 flex-col p-4 sm:p-5">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs font-semibold uppercase text-primary">{{ product.category }}</p>
                  <h2 class="mt-2 text-2xl font-semibold leading-tight text-foreground">{{ product.name }}</h2>
                </div>
                <p class="shrink-0 text-lg font-semibold text-foreground">{{ formatPrice(product.price) }}</p>
              </div>

              <p class="mt-4 text-sm leading-relaxed text-muted-foreground">{{ product.description }}</p>

              <div class="mt-auto flex items-center justify-between gap-3 pt-6">
                <Button type="button" size="sm" class="rounded-none" @click="addToCart(product)">
                  <ShoppingCart class="size-4" />
                  Añadir
                </Button>
                <div
                  v-if="cart[product.id]"
                  class="inline-flex min-h-9 items-center border border-foreground text-sm font-semibold"
                  aria-label="Cantidad en carrito"
                >
                  <button
                    type="button"
                    class="flex size-9 items-center justify-center border-r border-foreground hover:bg-grey"
                    aria-label="Quitar una unidad"
                    @click="removeFromCart(product)"
                  >
                    <Minus class="size-4" />
                  </button>
                  <span class="min-w-9 text-center">{{ cart[product.id] }}</span>
                  <button
                    type="button"
                    class="flex size-9 items-center justify-center border-l border-foreground hover:bg-grey"
                    aria-label="Añadir una unidad"
                    @click="addToCart(product)"
                  >
                    <Plus class="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        <aside data-reveal="right" class="lg:sticky lg:top-20 lg:self-start">
          <div class="border border-foreground bg-foreground p-5 text-background">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-2 text-sm font-semibold uppercase">
                <ShoppingBag class="size-4" />
                Carrito
              </div>
              <span class="text-sm">{{ cartItemCount }} uds.</span>
            </div>

            <div v-if="cartItems.length" class="mt-5 grid gap-4">
              <div
                v-for="item in cartItems"
                :key="item.product.id"
                class="grid grid-cols-[1fr_auto] gap-3 border-b border-background/25 pb-4 last:border-b-0 last:pb-0"
              >
                <div>
                  <p class="text-sm font-semibold">{{ item.product.name }}</p>
                  <p class="mt-1 text-xs text-background/70">{{ item.quantity }} x {{ formatPrice(item.product.price) }}</p>
                </div>
                <p class="text-sm font-semibold">{{ formatPrice(item.product.price * item.quantity) }}</p>
              </div>
            </div>

            <div v-else class="mt-5 border border-background/25 p-4">
              <p class="text-sm leading-relaxed text-background/75">
                Selecciona productos para preparar una propuesta de compra.
              </p>
            </div>

            <div class="mt-6 flex items-center justify-between border-t border-background/25 pt-4">
              <span class="text-sm uppercase text-background/70">Total</span>
              <span class="text-2xl font-semibold">{{ formatPrice(cartTotal) }}</span>
            </div>

            <p v-if="orderPrepared" class="mt-5 border border-background/25 p-3 text-sm text-background/80">
              Propuesta preparada. El checkout final queda pendiente de producción.
            </p>

            <Button
              type="button"
              variant="secondary"
              class="mt-5 w-full rounded-none"
              :disabled="!cartItems.length"
              @click="prepareOrder"
            >
              <CheckCircle2 class="size-4" />
              Preparar pedido
            </Button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
