<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue"

type PartnerLogo = {
  src: string
  alt: string
}

const partnerBasePath = "/img/logos/partners"

const marqueeRef = ref<HTMLElement | null>(null)
const groupRef = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

// Array con el orden exacto de los 8 logos
const partnerLogos: PartnerLogo[] = [
  { src: `${partnerBasePath}/partner-label-organiza.png`, alt: "Organiza" },
  { src: `${partnerBasePath}/partner-esclat.png`, alt: "Esclat" },
  { src: `${partnerBasePath}/partner-las-naves-ayuntamiento.png`, alt: "Las Naves y Ayuntamiento de Valencia" },
  { src: `${partnerBasePath}/partner-label-colabora.png`, alt: "Colabora" },
  { src: `${partnerBasePath}/partner-coca-cola.png`, alt: "Coca-Cola" },
  { src: `${partnerBasePath}/partner-diputacion-valencia.png`, alt: "Diputación de Valencia" },
  { src: `${partnerBasePath}/partner-ivaj.png`, alt: "IVAJ" },
  { src: `${partnerBasePath}/partner-turia.png`, alt: "Turia" },
]

const updateMarqueeDistance = () => {
  const marquee = marqueeRef.value
  const group = groupRef.value

  if (!marquee || !group) {
    return
  }

  const groupWidth = group.getBoundingClientRect().width
  marquee.style.setProperty("--marquee-distance", `${groupWidth}px`)
}

onMounted(async () => {
  await nextTick()
  updateMarqueeDistance()

  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(updateMarqueeDistance)
    if (groupRef.value) {
      resizeObserver.observe(groupRef.value)
    }
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})
</script>

<template>
  <section class="mt-6 border-t border-foreground bg-background sm:mt-8 lg:mt-10" aria-label="Organiza y colabora">
    <div ref="marqueeRef" class="partners-marquee relative flex items-center overflow-hidden border-b border-foreground">
      <div
        class="partners-track flex w-max py-6"
        aria-hidden="true"
      >
        <div ref="groupRef" class="partners-group flex shrink-0 items-center gap-6 pr-6 sm:gap-12 sm:pr-12 lg:gap-16 lg:pr-16">
          <img
            v-for="logo in partnerLogos"
            :key="`primary-${logo.src}`"
            :src="logo.src"
            :alt="logo.alt"
            class="h-14 w-auto shrink-0 object-contain sm:h-16 lg:h-20"
            loading="lazy"
          />
        </div>
        <div class="partners-group flex shrink-0 items-center gap-6 pr-6 sm:gap-12 sm:pr-12 lg:gap-16 lg:pr-16">
          <img
            v-for="logo in partnerLogos"
            :key="`clone-${logo.src}`"
            :src="logo.src"
            :alt="logo.alt"
            class="h-14 w-auto shrink-0 object-contain sm:h-16 lg:h-20"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners-marquee {
  /* Valores base para móvil (mucho más reducidos) */
  --marquee-gap: 1.5rem;
  --marquee-fade: 2.5rem;
  padding-inline: var(--marquee-gap);
  mask-image: linear-gradient(
    90deg,
    transparent 0,
    transparent var(--marquee-gap),
    black calc(var(--marquee-gap) + var(--marquee-fade)),
    black calc(100% - var(--marquee-gap) - var(--marquee-fade)),
    transparent calc(100% - var(--marquee-gap)),
    transparent 100%
  );
}

/* Tablet */
@media (min-width: 640px) {
  .partners-marquee {
    --marquee-gap: 4rem;
    --marquee-fade: 8rem;
  }
}

/* Desktop (valores originales) */
@media (min-width: 1024px) {
  .partners-marquee {
    --marquee-gap: 8rem;
    --marquee-fade: 16rem;
  }
}

.partners-track {
  animation: partners-marquee 32s linear infinite;
  will-change: transform;
}

@keyframes partners-marquee {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(calc(-1 * var(--marquee-distance, 0px)), 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .partners-track {
    animation: none;
  }
}
</style>