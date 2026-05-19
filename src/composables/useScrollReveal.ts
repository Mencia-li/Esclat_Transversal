import { nextTick, onMounted, onUnmounted, watch } from "vue"
import { useRoute } from "vue-router"

const revealSelector = "[data-reveal]"
const parallaxSelector = "[data-parallax]"

export function useScrollReveal() {
  const route = useRoute()
  const observedElements = new WeakSet<Element>()
  let observer: IntersectionObserver | null = null
  let mutationObserver: MutationObserver | null = null
  let animationFrame = 0

  function shouldReduceMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }

  function revealElement(element: Element) {
    element.classList.add("is-visible")
  }

  function hideElement(element: Element) {
    element.classList.remove("is-visible")
  }

  function observeElement(element: Element) {
    if (!(element instanceof HTMLElement) || observedElements.has(element)) {
      return
    }

    observedElements.add(element)

    if (!observer || shouldReduceMotion()) {
      revealElement(element)
      return
    }

    observer.observe(element)
  }

  function observeTree(root: ParentNode = document) {
    if (root instanceof HTMLElement && root.matches(revealSelector)) {
      observeElement(root)
    }

    root.querySelectorAll(revealSelector).forEach(observeElement)
  }

  function getProgress(rect: DOMRect) {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const total = viewportHeight + rect.height
    const passed = viewportHeight - rect.top

    return Math.min(Math.max(passed / total, 0), 1)
  }

  function updateParallax() {
    animationFrame = 0

    if (shouldReduceMotion()) {
      return
    }

    document.querySelectorAll<HTMLElement>(parallaxSelector).forEach((element) => {
      const amount = Number(element.dataset.parallax ?? 0)

      if (!Number.isFinite(amount)) {
        return
      }

      const progress = getProgress(element.getBoundingClientRect())
      const offset = (progress - 0.5) * amount

      element.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`)
    })
  }

  function requestParallaxUpdate() {
    if (animationFrame) {
      return
    }

    animationFrame = window.requestAnimationFrame(updateParallax)
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            hideElement(entry.target)
            return
          }

          revealElement(entry.target)
        })
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    )

    observeTree()
    requestParallaxUpdate()

    mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            observeTree(node)
          }
        })
      })
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    window.addEventListener("scroll", requestParallaxUpdate, { passive: true })
    window.addEventListener("resize", requestParallaxUpdate)
  })

  watch(
    () => route.fullPath,
    async () => {
      await nextTick()
      observeTree()
      requestParallaxUpdate()
    },
  )

  onUnmounted(() => {
    observer?.disconnect()
    mutationObserver?.disconnect()
    window.removeEventListener("scroll", requestParallaxUpdate)
    window.removeEventListener("resize", requestParallaxUpdate)

    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame)
    }
  })
}
