<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { RouterLink } from "vue-router"
import {
  ArrowLeft,
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

type StoreCategory = (typeof storeCategories)[number]
type ProductCategory = Exclude<StoreCategory, "Todos los productos">
type SortOption = (typeof sortOptions)[number]
type ProductImage = {
  src: string
  alt: string
  label: string
}
type ProductVariant = {
  id: string
  label: string
  color: string
  images: [ProductImage, ...ProductImage[]]
}
type StoreProduct = {
  id: string
  name: string
  category: ProductCategory
  price: number
  status?: string
  description: string
  variants: [ProductVariant, ...ProductVariant[]]
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
    variants: [
      {
        id: "natural",
        label: "Natural",
        color: "#f6f1e7",
        images: [
          {
            src: "/img/merch/totebag-1.png",
            alt: "Tote bag ESCLAT natural con logotipo frontal",
            label: "Frente",
          },
          {
            src: "/img/merch/totebag-2.png",
            alt: "Tote bag ESCLAT natural con gráfica circular",
            label: "Reverso",
          },
        ],
      },
    ],
    rank: 1,
  },
  {
    id: "bolsa-merch",
    name: "Bolsa merch ESCLAT",
    category: "Bolsos y accesorios",
    price: 2.99,
    description: "Bolsa de papel para compras y recuerdos del festival.",
    variants: [
      {
        id: "blanco",
        label: "Blanco",
        color: "#ffffff",
        images: [
          {
            src: "/img/merch/bolsitas-merch.png",
            alt: "Bolsas de papel ESCLAT blancas con gráfica turquesa",
            label: "Vista",
          },
        ],
      },
    ],
    rank: 2,
  },
  {
    id: "sudadera",
    name: "Sudadera ESCLAT",
    category: "Ropa",
    price: 35.99,
    description: "Sudadera con logo frontal y gráfica en la espalda para noches de festival.",
    variants: [
      {
        id: "blue-ice",
        label: "Blue ice",
        color: "#b2f2f4",
        images: [
          {
            src: "/img/merch/hoodie-1.png",
            alt: "Sudadera ESCLAT blue ice vista frontal",
            label: "Frente",
          },
          {
            src: "/img/merch/hoodie-2.png",
            alt: "Sudadera ESCLAT blue ice vista trasera",
            label: "Espalda",
          },
        ],
      },
      {
        id: "blanco",
        label: "Blanco",
        color: "#ffffff",
        images: [
          {
            src: "/img/merch/hoodie-3.png",
            alt: "Sudadera ESCLAT blanca vista frontal",
            label: "Frente",
          },
          {
            src: "/img/merch/hoodie-4.png",
            alt: "Sudadera ESCLAT blanca vista trasera",
            label: "Espalda",
          },
        ],
      },
    ],
    rank: 3,
  },
  {
    id: "camiseta-logo",
    name: "T-shirt icono ESCLAT",
    category: "Ropa",
    price: 19.99,
    description: "T-shirt con icono ESCLAT en el pecho.",
    variants: [
      {
        id: "blanco",
        label: "Blanco",
        color: "#ffffff",
        images: [
          {
            src: "/img/merch/shirt-1.png",
            alt: "T-shirt icono ESCLAT blanca plegada",
            label: "Vista",
          },
        ],
      },
      {
        id: "negro",
        label: "Negro",
        color: "#1c1c1c",
        images: [
          {
            src: "/img/merch/shirt-3.png",
            alt: "T-shirt icono ESCLAT negra plegada",
            label: "Vista",
          },
        ],
      },
      {
        id: "blue-ice",
        label: "Blue ice",
        color: "#74d2cd",
        images: [
          {
            src: "/img/merch/shirt-2.png",
            alt: "T-shirt icono ESCLAT blue ice plegada",
            label: "Vista",
          },
        ],
      },
    ],
    rank: 4,
  },
  {
    id: "camiseta-2026",
    name: "Camiseta ESCLAT 2026",
    category: "Ropa",
    price: 22.99,
    description: "Camiseta edición 2026 con gráfica frontal y trasera.",
    variants: [
      {
        id: "blanco",
        label: "Blanco",
        color: "#ffffff",
        images: [
          {
            src: "/img/merch/camisa-1.png",
            alt: "Camiseta ESCLAT 2026 blanca con vistas frontal y trasera",
            label: "Vista",
          },
        ],
      },
      {
        id: "negro",
        label: "Negro",
        color: "#1c1c1c",
        images: [
          {
            src: "/img/merch/camisa-3.png",
            alt: "Camiseta ESCLAT 2026 negra con vistas frontal y trasera",
            label: "Vista",
          },
        ],
      },
      {
        id: "blue-ice",
        label: "Blue ice",
        color: "#74d2cd",
        images: [
          {
            src: "/img/merch/camisa-2.png",
            alt: "Camiseta ESCLAT 2026 blue ice con vistas frontal y trasera",
            label: "Vista",
          },
        ],
      },
    ],
    rank: 5,
  },
  {
    id: "gorra-icono",
    name: "Gorra icono ESCLAT",
    category: "Complementos",
    price: 8.99,
    description: "Gorra ajustable con icono radial bordado.",
    variants: [
      {
        id: "negro",
        label: "Negro",
        color: "#050505",
        images: [
          {
            src: "/img/merch/cap-icono-negro.png",
            alt: "Gorra icono ESCLAT negra",
            label: "Vista",
          },
        ],
      },
      {
        id: "turquesa",
        label: "Turquesa",
        color: "#2ad9dd",
        images: [
          {
            src: "/img/merch/cap-icono-2.png",
            alt: "Gorra icono ESCLAT turquesa",
            label: "Vista",
          },
        ],
      },
    ],
    rank: 6,
  },
  {
    id: "gorra-burbuja",
    name: "Gorra burbuja ESCLAT",
    category: "Complementos",
    price: 9.49,
    description: "Gorra ajustable con símbolo circular del festival.",
    variants: [
      {
        id: "turquesa",
        label: "Turquesa",
        color: "#2ad9dd",
        images: [
          {
            src: "/img/merch/cap-burbuja-1.png",
            alt: "Gorra burbuja ESCLAT turquesa",
            label: "Vista",
          },
        ],
      },
      {
        id: "negro",
        label: "Negro",
        color: "#050505",
        images: [
          {
            src: "/img/merch/cap-burbuja-2.png",
            alt: "Gorra burbuja ESCLAT negra",
            label: "Vista",
          },
        ],
      },
    ],
    rank: 7,
  },
  {
    id: "cuaderno",
    name: "Cuaderno ESCLAT",
    category: "Papelería",
    price: 5.99,
    description: "Cuaderno de espiral para notas, letras, ideas y recuerdos.",
    variants: [
      {
        id: "kraft",
        label: "Kraft",
        color: "#a66a43",
        images: [
          {
            src: "/img/merch/cuaderno.png",
            alt: "Cuaderno ESCLAT kraft con bolígrafo",
            label: "Vista",
          },
        ],
      },
    ],
    rank: 8,
  },
  {
    id: "cantimplora",
    name: "Cantimplora ESCLAT",
    category: "Complementos",
    price: 10.99,
    description: "Botella reutilizable para hidratarte durante los tres días.",
    variants: [
      {
        id: "negro",
        label: "Negro",
        color: "#0f0f0f",
        images: [
          {
            src: "/img/merch/botellas-nuevas.png",
            alt: "Cantimploras ESCLAT negra, turquesa y gris",
            label: "Vista",
          },
        ],
      },
      {
        id: "turquesa",
        label: "Turquesa",
        color: "#0d9f9c",
        images: [
          {
            src: "/img/merch/botellas-nuevas.png",
            alt: "Cantimploras ESCLAT negra, turquesa y gris",
            label: "Vista",
          },
        ],
      },
      {
        id: "gris",
        label: "Gris",
        color: "#8a8a8a",
        images: [
          {
            src: "/img/merch/botellas-nuevas.png",
            alt: "Cantimploras ESCLAT negra, turquesa y gris",
            label: "Vista",
          },
        ],
      },
    ],
    rank: 9,
  },
  {
    id: "llavero-burbuja",
    name: "Llavero burbuja ESCLAT",
    category: "Llaveros",
    price: 3.99,
    description: "Llavero metálico con el símbolo circular del festival.",
    variants: [
      {
        id: "turquesa",
        label: "Turquesa",
        color: "#2ad9dd",
        images: [
          {
            src: "/img/merch/llavero-1.png",
            alt: "Llavero burbuja ESCLAT turquesa",
            label: "Vista",
          },
        ],
      },
      {
        id: "negro",
        label: "Negro",
        color: "#1c1c1c",
        images: [
          {
            src: "/img/merch/llavero-4.png",
            alt: "Llavero burbuja ESCLAT negro",
            label: "Vista",
          },
        ],
      },
      {
        id: "blanco",
        label: "Blanco",
        color: "#ffffff",
        images: [
          {
            src: "/img/merch/llavero-5.png",
            alt: "Llavero burbuja ESCLAT blanco",
            label: "Vista",
          },
        ],
      },
    ],
    rank: 10,
  },
  {
    id: "llavero-icono",
    name: "Llavero icono ESCLAT",
    category: "Llaveros",
    price: 3.99,
    description: "Llavero metálico con el icono radial del festival.",
    variants: [
      {
        id: "turquesa",
        label: "Turquesa",
        color: "#2ad9dd",
        images: [
          {
            src: "/img/merch/llavero-2.png",
            alt: "Llavero icono ESCLAT turquesa",
            label: "Vista",
          },
        ],
      },
      {
        id: "negro",
        label: "Negro",
        color: "#1c1c1c",
        images: [
          {
            src: "/img/merch/llavero-3.png",
            alt: "Llavero icono ESCLAT negro",
            label: "Vista",
          },
        ],
      },
      {
        id: "blanco",
        label: "Blanco",
        color: "#ffffff",
        images: [
          {
            src: "/img/merch/llavero-6.png",
            alt: "Llavero icono ESCLAT blanco",
            label: "Vista",
          },
        ],
      },
    ],
    rank: 11,
  },
  {
    id: "sticker-pack",
    name: "Sticker pack ESCLAT",
    category: "Papelería",
    price: 4.99,
    status: "Nuevo",
    description: "Pack de pegatinas con el universo visual del festival.",
    variants: [
      {
        id: "pack",
        label: "Pack",
        color: "#36d5d4",
        images: [
          {
            src: "/img/merch/sticker-pack.png",
            alt: "Pack de pegatinas ESCLAT",
            label: "Vista",
          },
        ],
      },
    ],
    rank: 12,
  },
  {
    id: "boli",
    name: "Bolígrafo ESCLAT",
    category: "Papelería",
    price: 2.99,
    description: "Bolígrafo kraft con identidad gráfica del festival.",
    variants: [
      {
        id: "kraft",
        label: "Kraft",
        color: "#7b5b3a",
        images: [
          {
            src: "/img/merch/boli.png",
            alt: "Bolígrafo ESCLAT kraft con funda",
            label: "Vista",
          },
        ],
      },
    ],
    rank: 13,
  },
]

const activeCategory = ref<StoreCategory>("Todos los productos")
const activeSort = ref<SortOption>("Más vendidos")
const sustainabilityOpen = ref(false)
const orderPrepared = ref(false)
const cart = reactive<Record<string, number>>({})
const selectedVariants = reactive<Record<string, string>>({})
const selectedImages = reactive<Record<string, number>>({})

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
    .flatMap((product) => product.variants.map((variant) => ({
      product,
      variant,
      quantity: cart[cartKey(product, variant)] ?? 0,
    })))
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

function activeVariant(product: StoreProduct) {
  return product.variants.find((variant) => variant.id === selectedVariants[product.id]) ?? product.variants[0]
}

function activeImage(product: StoreProduct) {
  const variant = activeVariant(product)
  return variant.images[selectedImages[product.id] ?? 0] ?? variant.images[0]
}

function selectVariant(product: StoreProduct, variant: ProductVariant) {
  selectedVariants[product.id] = variant.id
  selectedImages[product.id] = 0
}

function selectImage(product: StoreProduct, imageIndex: number) {
  selectedImages[product.id] = imageIndex
}

function cartKey(product: StoreProduct, variant: ProductVariant = activeVariant(product)) {
  return `${product.id}:${variant.id}`
}

function addToCart(product: StoreProduct, variant: ProductVariant = activeVariant(product)) {
  const key = cartKey(product, variant)
  cart[key] = (cart[key] ?? 0) + 1
  orderPrepared.value = false
}

function removeFromCart(product: StoreProduct, variant: ProductVariant = activeVariant(product)) {
  const key = cartKey(product, variant)
  const currentQuantity = cart[key] ?? 0
  orderPrepared.value = false

  if (currentQuantity <= 1) {
    delete cart[key]
    return
  }

  cart[key] = currentQuantity - 1
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

      <p class="w-full text-base leading-relaxed text-foreground/90 sm:text-lg lg:text-xl">
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
                :key="`${item.product.id}-${item.variant.id}`"
                class="grid grid-cols-[1fr_auto] gap-3 border-b border-foreground/25 py-3 first:pt-0 last:border-b-0"
              >
                <div>
                  <p class="text-sm font-semibold uppercase leading-tight">{{ item.product.name }}</p>
                  <p class="mt-1 text-xs font-semibold uppercase leading-tight text-foreground/60">{{ item.variant.label }}</p>
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
              class="h-10 min-w-44 rounded-none border border-foreground bg-background px-3 text-sm outline-none transition focus:border-turquesa focus:ring-2 focus:ring-turquesa focus-visible:outline-none"
            >
              <option v-for="option in sortOptions" :key="option" :value="option">{{ option }}</option>
            </select>
          </label>
        </div>

        <section data-reveal class="mb-5 border border-foreground bg-blue_ice">
          <div class="grid gap-5 p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_auto] md:items-center lg:p-5">
            <h2 class="text-2xl font-normal leading-tight text-foreground lg:text-3xl">
              <span class="block">Diseñado para durar.</span>
              <span class="block">Hecho con materiales reciclados.</span>
            </h2>

            <p class="w-full text-sm font-semibold leading-relaxed text-foreground/90 lg:text-base">
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
          </div>
        </section>

        <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <template v-for="product in filteredProducts" :key="product.id">
            <article
              data-reveal="clip"
              class="group flex min-h-104 flex-col border border-grey bg-background"
            >
              <div class="relative flex aspect-[1.18] items-center justify-center overflow-hidden border-b border-grey bg-white p-6">
                <span
                  v-if="product.status"
                  class="absolute left-4 top-4 bg-foreground px-3 py-1 text-xs font-semibold uppercase text-background"
                >
                  {{ product.status }}
                </span>
                <img
                  :src="activeImage(product).src"
                  :alt="activeImage(product).alt"
                  class="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>

              <div class="flex flex-1 flex-col p-4">
                <div
                  v-if="activeVariant(product).images.length > 1"
                  class="mb-3 flex flex-wrap gap-2"
                  aria-label="Vistas disponibles"
                >
                  <button
                    v-for="(image, imageIndex) in activeVariant(product).images"
                    :key="`${product.id}-${activeVariant(product).id}-${image.src}`"
                    type="button"
                    :class="[
                      'min-h-8 border px-3 text-xs font-semibold uppercase leading-none transition-colors',
                      activeImage(product).src === image.src
                        ? 'border-foreground bg-blue_ice text-foreground'
                        : 'border-grey bg-background text-foreground/70 hover:border-foreground hover:text-foreground',
                    ]"
                    :aria-pressed="activeImage(product).src === image.src"
                    @click="selectImage(product, imageIndex)"
                  >
                    {{ image.label }}
                  </button>
                </div>

                <div class="flex items-start justify-between gap-4">
                  <h2 class="text-xl font-semibold uppercase leading-tight text-foreground">{{ product.name }}</h2>
                  <p class="shrink-0 text-lg font-semibold text-foreground">{{ formatPrice(product.price) }}</p>
                </div>

                <div class="mt-4 flex items-center justify-between gap-3">
                  <p class="text-xs font-semibold uppercase leading-none text-foreground/60">{{ activeVariant(product).label }}</p>
                  <div class="flex flex-wrap justify-end gap-2" aria-label="Variantes disponibles">
                    <button
                      v-for="variant in product.variants"
                      :key="`${product.id}-${variant.id}`"
                      type="button"
                      :title="variant.label"
                      :class="[
                        'flex size-8 items-center justify-center border transition-colors',
                        activeVariant(product).id === variant.id
                          ? 'border-foreground bg-background'
                          : 'border-grey bg-background hover:border-foreground',
                      ]"
                      :aria-label="`${product.name}: ${variant.label}`"
                      :aria-pressed="activeVariant(product).id === variant.id"
                      @click="selectVariant(product, variant)"
                    >
                      <span
                        class="size-5 border border-grey"
                        :style="{ backgroundColor: variant.color }"
                      />
                    </button>
                  </div>
                </div>

                <p class="mt-4 text-sm leading-relaxed text-foreground/70">{{ product.description }}</p>

                <div class="mt-auto flex items-center justify-between gap-3 pt-5">
                  <Button type="button" size="sm" class="rounded-none" @click="addToCart(product)">
                    <ShoppingCart class="size-4" />
                    Añadir
                  </Button>

                  <div
                    v-if="cart[cartKey(product)]"
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
                    <span class="min-w-9 text-center">{{ cart[cartKey(product)] }}</span>
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
