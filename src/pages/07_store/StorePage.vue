<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { RouterLink } from "vue-router"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Minus,
  Plus,
  Recycle,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Tag,
} from "lucide-vue-next"
import { Button } from "@/components/ui/button"

const storeCategories = ["Todos los productos", "Ropa", "Bolsos y accesorios", "Papelería", "Complementos", "Llaveros"] as const
const sortOptions = ["Más vendidos", "Precio menor", "Precio mayor", "Nombre"] as const
const vatRate = 0.21
const logoIconBlack = "/img/logos/esclat/svg/icon-black.svg"
const logoIconWhite = "/img/logos/esclat/svg/icon-white.svg"

type StoreCategory = (typeof storeCategories)[number]
type ProductCategory = Exclude<StoreCategory, "Todos los productos">
type SortOption = (typeof sortOptions)[number]
type ProductMockup = "tote" | "hoodie" | "cap" | "tee" | "notebook" | "bubble" | "bottle" | "keychain"

type StoreProduct = {
  id: string
  name: string
  category: ProductCategory
  price: number
  status?: string
  description: string
  mockup: ProductMockup
  colors: string[]
  rank: number
}

const products: StoreProduct[] = [
  {
    id: "tote-bag",
    name: "Tote bag ESCLAT",
    category: "Bolsos y accesorios",
    price: 12.99,
    status: "Nuevo",
    description: "Bolsa de algodón para llevar programa, prints y compras del festival.",
    mockup: "tote",
    colors: ["#050505", "#ffffff", "#2f6388"],
    rank: 1,
  },
  {
    id: "sudadera",
    name: "Sudadera ESCLAT",
    category: "Ropa",
    price: 35.99,
    description: "Sudadera gris con el icono del festival bordado en el pecho.",
    mockup: "hoodie",
    colors: ["#050505", "#b9b9b9", "#ffffff"],
    rank: 2,
  },
  {
    id: "gorra",
    name: "Gorra ESCLAT",
    category: "Complementos",
    price: 8.99,
    description: "Gorra ajustable con logotipo frontal para días de festival y calle.",
    mockup: "cap",
    colors: ["#050505", "#ffffff", "#2f6388", "#5f9678"],
    rank: 3,
  },
  {
    id: "camiseta",
    name: "Camiseta ESCLAT",
    category: "Ropa",
    price: 22.99,
    description: "Camiseta negra con gráfica ESCLAT Festival 2026.",
    mockup: "tee",
    colors: ["#050505", "#ffffff", "#a8a8a8"],
    rank: 4,
  },
  {
    id: "cuaderno",
    name: "Cuaderno ESCLAT",
    category: "Papelería",
    price: 5.99,
    description: "Cuaderno de espiral para notas, letras, ideas y recuerdos.",
    mockup: "notebook",
    colors: ["#ffffff", "#d5d4d8", "#b2f2f4"],
    rank: 5,
  },
  {
    id: "pompero",
    name: "Pompero ESCLAT",
    category: "Complementos",
    price: 8.99,
    description: "Pompero de bolsillo para patios, conciertos y cierres de día.",
    mockup: "bubble",
    colors: ["#f05b6a", "#2ad9dd", "#ffffff"],
    rank: 6,
  },
  {
    id: "cantimplora",
    name: "Cantimplora ESCLAT",
    category: "Bolsos y accesorios",
    price: 10.99,
    description: "Botella reutilizable para hidratarte durante los tres días.",
    mockup: "bottle",
    colors: ["#d5d4d8", "#ffffff", "#050505"],
    rank: 7,
  },
  {
    id: "llavero",
    name: "Llavero ESCLAT",
    category: "Llaveros",
    price: 3.99,
    description: "Llavero flexible con una figura inspirada en el estallido del festival.",
    mockup: "keychain",
    colors: ["#f4d83e", "#2ad9dd", "#050505"],
    rank: 8,
  },
]

const activeCategory = ref<StoreCategory>("Todos los productos")
const activeSort = ref<SortOption>("Más vendidos")
const sustainabilityOpen = ref(false)
const orderPrepared = ref(false)
const cart = reactive<Record<string, number>>({})

const filteredProducts = computed(() => {
  const byCategory = activeCategory.value === "Todos los productos"
    ? products
    : products.filter((product) => product.category === activeCategory.value)

  return [...byCategory].sort((firstProduct, secondProduct) => {
    if (activeSort.value === "Precio menor") {
      return firstProduct.price - secondProduct.price
    }

    if (activeSort.value === "Precio mayor") {
      return secondProduct.price - firstProduct.price
    }

    if (activeSort.value === "Nombre") {
      return firstProduct.name.localeCompare(secondProduct.name, "es")
    }

    return firstProduct.rank - secondProduct.rank
  })
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
const cartSubtotal = computed(() => cartItems.value.reduce((total, item) => total + item.product.price * item.quantity, 0))
const cartVat = computed(() => cartSubtotal.value * vatRate)
const cartTotal = computed(() => cartSubtotal.value + cartVat.value)

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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

function prepareOrder() {
  if (!cartItems.value.length) {
    return
  }

  orderPrepared.value = true
}
</script>

<template>
  <section class="border-b border-foreground bg-background">
    <div class="esclat-section-title-box">
      <h1 class="esclat-section-title">TIENDA</h1>
    </div>

    <div class="border-b border-foreground bg-background px-5 py-5 sm:px-6 lg:px-8">
      <RouterLink
        :to="{ path: '/', hash: '#actividades' }"
        class="mb-5 inline-flex items-center gap-2 border border-foreground bg-background px-5 py-3 text-sm font-medium uppercase text-foreground transition-colors hover:bg-grey sm:px-6 sm:text-base"
      >
        <ArrowLeft class="size-4" />
        Volver a actividades
      </RouterLink>

      <p class="max-w-5xl text-base leading-relaxed text-foreground/90 sm:text-lg lg:text-xl">
        Llévate contigo un pedazo de Esclat. Descubre una colección de productos diseñados para seguir haciendo ruido
        mucho después de que termine el festival.
      </p>
    </div>

    <div class="grid border-b border-foreground lg:grid-cols-[20rem_minmax(0,1fr)]">
      <aside class="border-b border-foreground bg-blue_ice lg:border-b-0 lg:border-r">
        <div class="sticky top-14 grid gap-6 p-5 sm:p-6 lg:h-[calc(100vh-3.5rem)] lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-5 lg:overflow-hidden lg:p-6">
          <section data-reveal="left" class="border border-foreground bg-background p-4 sm:p-5">
            <div class="mb-4 flex items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <SlidersHorizontal class="size-5" aria-hidden="true" />
                <h2 class="text-2xl font-semibold uppercase leading-none text-foreground">Categorías</h2>
              </div>
              <span class="h-px w-8 bg-foreground" aria-hidden="true" />
            </div>

            <div class="grid">
              <button
                v-for="category in storeCategories"
                :key="category"
                type="button"
                :class="[
                  'min-h-12 border-b border-grey px-3 text-left text-base font-semibold leading-none transition-colors last:border-b-0 lg:min-h-10',
                  activeCategory === category
                    ? 'bg-blue_ice text-foreground'
                    : 'bg-background text-foreground hover:bg-grey',
                ]"
                @click="activeCategory = category"
              >
                {{ category }}
              </button>
            </div>
          </section>

          <section data-reveal="left" style="--reveal-delay: 120ms" class="flex min-h-0 flex-col overflow-hidden border border-foreground bg-background p-4 text-foreground">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <ShoppingBag class="size-5" aria-hidden="true" />
                <h2 class="text-xl font-semibold uppercase leading-none">Carrito</h2>
              </div>
              <span class="text-lg font-semibold">{{ cartItemCount }} uds.</span>
            </div>

            <div v-if="cartItems.length" class="mt-4 grid max-h-48 overflow-y-auto pr-2">
              <div
                v-for="item in cartItems"
                :key="item.product.id"
                class="grid grid-cols-[1fr_auto] gap-3 border-b border-foreground/25 py-3 first:pt-0 last:border-b-0"
              >
                <div>
                  <p class="text-sm font-semibold uppercase leading-tight">{{ item.product.name }}</p>
                  <p class="mt-1 text-xs leading-tight text-foreground/70">{{ item.quantity }} x {{ formatPrice(item.product.price) }}</p>
                </div>
                <p class="text-sm font-semibold">{{ formatPrice(item.product.price * item.quantity) }}</p>
              </div>
            </div>

            <div v-else class="mt-4 border border-foreground/25 p-4">
              <p class="text-sm leading-relaxed text-foreground/75">
                Selecciona productos para preparar una propuesta de compra.
              </p>
            </div>

            <div class="mt-4 grid gap-2 border-t border-foreground/25 pt-3">
              <div class="flex items-center justify-between gap-4 text-sm text-foreground/75">
                <span>Subtotal</span>
                <span>{{ formatPrice(cartSubtotal) }}</span>
              </div>
              <div class="flex items-center justify-between gap-4 text-sm text-foreground/75">
                <span>IVA España 21%</span>
                <span>{{ formatPrice(cartVat) }}</span>
              </div>
              <div class="flex items-center justify-between gap-4 border-t border-foreground/25 pt-3">
                <span class="text-sm uppercase text-foreground/70">Total</span>
                <span class="text-3xl font-semibold">{{ formatPrice(cartTotal) }}</span>
              </div>
            </div>

            <p v-if="orderPrepared" class="mt-4 border border-foreground/25 p-3 text-sm text-foreground/80">
              Solicitud preparada. Revisaremos tu selección y te escribiremos con disponibilidad.
            </p>

            <Button
              type="button"
              variant="secondary"
              class="mt-4 w-full rounded-none border border-foreground bg-background text-foreground hover:bg-blue_ice"
              :disabled="!cartItems.length"
              @click="prepareOrder"
            >
              <CheckCircle2 class="size-4" />
              Preparar pedido
            </Button>
          </section>
        </div>
      </aside>

      <div class="bg-background p-5 sm:p-6 lg:p-8">
        <div data-reveal class="mb-5 flex flex-col gap-4 border-b border-grey pb-5 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm font-semibold text-foreground">
            Mostrando {{ filteredProducts.length }} productos
          </p>

          <label class="flex items-center gap-3 text-sm font-semibold text-foreground">
            Ordenar por:
            <select
              v-model="activeSort"
              class="h-10 min-w-44 rounded-none border border-foreground bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            >
              <option v-for="option in sortOptions" :key="option" :value="option">{{ option }}</option>
            </select>
          </label>
        </div>

        <section data-reveal class="mb-5 border border-foreground bg-blue_ice">
          <div class="grid gap-4 p-4 sm:grid-cols-[auto_minmax(0,1.1fr)_minmax(0,1.4fr)_auto] sm:items-center lg:p-5">
            <Recycle class="size-12 stroke-[1.5] text-foreground lg:size-14" aria-hidden="true" />

            <h2 class="text-2xl font-normal leading-tight text-foreground lg:text-3xl">
              Diseñado para durar.<br />Hecho con materiales reciclados.
            </h2>

            <p class="max-w-2xl text-sm font-semibold leading-relaxed text-foreground/90 lg:text-base">
              Cada producto de la tienda Esclat está pensado para acompañarte más allá del festival, con materiales
              reciclados y procesos responsables.
            </p>

            <button
              type="button"
              class="inline-flex min-h-10 items-center justify-center gap-3 border border-foreground bg-background px-4 text-xs font-semibold uppercase leading-none text-foreground transition-colors hover:bg-grey"
              :aria-expanded="sustainabilityOpen"
              @click="sustainabilityOpen = !sustainabilityOpen"
            >
              {{ sustainabilityOpen ? "Ver menos" : "Ver más" }}
              <span aria-hidden="true">{{ sustainabilityOpen ? "−" : ">" }}</span>
            </button>
          </div>

          <div v-if="sustainabilityOpen" class="border-t border-foreground">
            <div class="grid md:grid-cols-3">
              <article class="grid gap-3 border-b border-foreground p-4 md:border-b-0 md:border-r lg:p-5">
                <Leaf class="size-9 stroke-[1.5]" aria-hidden="true" />
                <div>
                  <h3 class="text-lg font-semibold leading-tight text-foreground">Materiales reciclados</h3>
                  <p class="mt-2 text-sm font-semibold leading-relaxed text-foreground/85">
                    Usamos tejidos y componentes reciclados siempre que es posible, reduciendo materias primas nuevas.
                  </p>
                </div>
              </article>

              <article class="grid gap-3 border-b border-foreground p-4 md:border-b-0 md:border-r lg:p-5">
                <Recycle class="size-9 stroke-[1.5]" aria-hidden="true" />
                <div>
                  <h3 class="text-lg font-semibold leading-tight text-foreground">Producción responsable</h3>
                  <p class="mt-2 text-sm font-semibold leading-relaxed text-foreground/85">
                    Seleccionamos productos y proveedores con criterios éticos y medioambientales.
                  </p>
                </div>
              </article>

              <article class="grid gap-3 p-4 lg:p-5">
                <Tag class="size-9 stroke-[1.5]" aria-hidden="true" />
                <div>
                  <h3 class="text-lg font-semibold leading-tight text-foreground">Menos huella, más recuerdo</h3>
                  <p class="mt-2 text-sm font-semibold leading-relaxed text-foreground/85">
                    Cada pieza está pensada para acompañarte más allá del festival y durar en el día a día.
                  </p>
                </div>
              </article>
            </div>

            <div class="flex flex-col gap-3 border-t border-foreground p-4 sm:flex-row sm:items-center sm:justify-between lg:p-5">
              <p class="text-base font-semibold leading-tight text-foreground">
                Llevarte un pedazo de Esclat también puede cuidar lo que nos rodea.
              </p>
              <button
                type="button"
                class="inline-flex min-h-10 items-center justify-center gap-3 border border-foreground bg-background px-4 text-xs font-semibold uppercase leading-none text-foreground transition-colors hover:bg-grey"
                @click="activeCategory = 'Todos los productos'"
              >
                Ver productos sostenibles
                <ArrowRight class="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <template v-for="product in filteredProducts" :key="product.id">
            <article
              data-reveal="clip"
              class="group flex min-h-[26rem] flex-col border border-grey bg-background"
            >
              <div class="relative flex aspect-[1.18] items-center justify-center overflow-hidden border-b border-grey bg-white p-8">
                <span
                  v-if="product.status"
                  class="absolute left-4 top-4 bg-foreground px-3 py-1 text-xs font-semibold uppercase text-background"
                >
                  {{ product.status }}
                </span>

                <div v-if="product.mockup === 'tote'" class="relative h-48 w-36 bg-black shadow-xl">
                  <div class="absolute -top-8 left-1/2 h-20 w-20 -translate-x-1/2 rounded-t-full border-8 border-black border-b-0" />
                  <img :src="logoIconWhite" alt="" class="absolute left-1/2 top-14 w-14 -translate-x-1/2" />
                  <p class="absolute bottom-10 w-full text-center text-2xl font-semibold text-white">Esclat</p>
                </div>

                <div v-else-if="product.mockup === 'hoodie'" class="relative h-56 w-44">
                  <div class="absolute left-4 top-10 h-20 w-10 -rotate-12 rounded-md bg-grey" />
                  <div class="absolute right-4 top-10 h-20 w-10 rotate-12 rounded-md bg-grey" />
                  <div class="absolute left-8 top-3 h-48 w-28 rounded-b-xl rounded-t-3xl bg-grey shadow-xl">
                    <div class="mx-auto h-12 w-16 rounded-b-full border-x-8 border-b-8 border-background" />
                    <img :src="logoIconBlack" alt="" class="absolute right-5 top-16 w-7" />
                  </div>
                </div>

                <div v-else-if="product.mockup === 'cap'" class="relative h-40 w-56">
                  <div class="absolute left-5 top-16 h-16 w-[11.5rem] rounded-t-full bg-black shadow-xl" />
                  <div class="absolute bottom-2 left-1/2 h-12 w-52 -translate-x-1/2 rounded-b-full bg-black shadow-lg" />
                  <img :src="logoIconWhite" alt="" class="absolute left-1/2 top-20 w-10 -translate-x-1/2" />
                </div>

                <div v-else-if="product.mockup === 'tee'" class="relative h-52 w-52">
                  <div class="absolute left-1 top-9 h-[4.5rem] w-14 -rotate-12 rounded-sm bg-black" />
                  <div class="absolute right-1 top-9 h-[4.5rem] w-14 rotate-12 rounded-sm bg-black" />
                  <div class="absolute left-10 top-5 h-44 w-32 rounded-b-md bg-black shadow-xl">
                    <div class="mx-auto h-10 w-16 rounded-b-full bg-background" />
                    <p class="pt-11 text-center text-xs font-semibold uppercase leading-tight text-white">
                      Esclat Festival<br />2026
                    </p>
                  </div>
                </div>

                <div v-else-if="product.mockup === 'notebook'" class="relative h-56 w-36 border border-grey bg-white shadow-xl">
                  <div class="absolute left-3 top-0 h-full w-px bg-grey" />
                  <div class="absolute -left-2 top-5 grid gap-3">
                    <span v-for="loopIndex in 8" :key="loopIndex" class="block h-2 w-4 rounded-full border border-grey bg-background" />
                  </div>
                  <img :src="logoIconBlack" alt="" class="absolute left-1/2 top-24 w-9 -translate-x-1/2" />
                  <p class="absolute bottom-14 w-full text-center text-sm font-semibold text-foreground">Esclat</p>
                </div>

                <div v-else-if="product.mockup === 'bubble'" class="relative h-56 w-20">
                  <div class="mx-auto h-14 w-14 rounded-full bg-[#d94d5d] shadow-lg" />
                  <div class="mx-auto mt-1 h-32 w-12 rounded-b-2xl rounded-t-md bg-[#f48aa1] shadow-xl">
                    <img :src="logoIconWhite" alt="" class="mx-auto pt-9 w-7" />
                  </div>
                  <div class="mx-auto h-8 w-10 rounded-b-full bg-[#d94d5d]" />
                </div>

                <div v-else-if="product.mockup === 'bottle'" class="relative h-56 w-20">
                  <div class="mx-auto h-6 w-10 rounded-t-md bg-foreground/60" />
                  <div class="h-48 rounded-b-3xl rounded-t-lg bg-grey shadow-xl">
                    <img :src="logoIconBlack" alt="" class="mx-auto pt-20 w-8" />
                    <p class="pt-1 text-center text-sm font-semibold text-foreground">Esclat</p>
                  </div>
                </div>

                <div v-else class="relative h-56 w-32">
                  <div class="absolute left-1/2 top-0 h-12 w-12 -translate-x-1/2 rounded-full border-4 border-grey bg-background" />
                  <div class="absolute left-1/2 top-10 h-28 w-16 -translate-x-1/2 rounded-full bg-[#f4d83e] shadow-xl">
                    <span class="absolute left-5 top-8 size-2 rounded-full bg-foreground" />
                    <span class="absolute right-5 top-8 size-2 rounded-full bg-foreground" />
                    <span class="absolute left-1/2 top-14 h-1 w-7 -translate-x-1/2 rounded-full bg-foreground" />
                  </div>
                  <div class="absolute left-6 top-24 h-12 w-5 -rotate-12 rounded-full bg-[#f4d83e]" />
                  <div class="absolute right-6 top-24 h-12 w-5 rotate-12 rounded-full bg-[#f4d83e]" />
                </div>
              </div>

              <div class="flex flex-1 flex-col p-4">
                <div class="flex items-start justify-between gap-4">
                  <h2 class="text-xl font-semibold uppercase leading-tight text-foreground">{{ product.name }}</h2>
                  <p class="shrink-0 text-lg font-semibold text-foreground">{{ formatPrice(product.price) }}</p>
                </div>

                <div class="mt-4 flex flex-wrap gap-3" aria-label="Colores disponibles">
                  <span
                    v-for="color in product.colors"
                    :key="`${product.id}-${color}`"
                    class="size-5 border border-grey"
                    :style="{ backgroundColor: color }"
                  />
                </div>

                <p class="mt-4 text-sm leading-relaxed text-foreground/70">{{ product.description }}</p>

                <div class="mt-auto flex items-center justify-between gap-3 pt-5">
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

          </template>
        </div>
      </div>
    </div>
  </section>
</template>
