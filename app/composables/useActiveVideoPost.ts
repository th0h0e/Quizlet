/**
 * Tracks which card in a list of refs has the highest intersection ratio
 * with the viewport. Returns the index of the most-visible card, or -1.
 * Client-only — IntersectionObserver is not available during SSR.
 */
export function useActiveVideoPost(cardRefs: Ref<HTMLElement[]>) {
  const activeIndex = ref(-1)
  const ratios = reactive<Map<number, number>>(new Map())

  let observer: IntersectionObserver | null = null
  let observedElements: WeakSet<HTMLElement> = new WeakSet()

  function startObserving() {
    stopObserving()

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = cardRefs.value.indexOf(entry.target as HTMLElement)
          if (idx !== -1) {
            ratios.set(idx, entry.intersectionRatio)
          }
        }
        updateActiveIndex()
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    )

    observedElements = new WeakSet()
    observeNewElements()
  }

  function observeNewElements() {
    if (!observer) return
    for (const el of cardRefs.value) {
      if (el && !observedElements.has(el)) {
        observer.observe(el)
        observedElements.add(el)
      }
    }
  }

  function stopObserving() {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    ratios.clear()
    activeIndex.value = -1
    observedElements = new WeakSet()
  }

  function updateActiveIndex() {
    let maxRatio = 0
    let maxIdx = -1

    for (const [idx, ratio] of ratios) {
      if (ratio > maxRatio) {
        maxRatio = ratio
        maxIdx = idx
      }
    }

    // Only set active if the card is at least partially visible
    activeIndex.value = maxRatio > 0 ? maxIdx : -1
  }

  // Only run on the client — IntersectionObserver is browser-only
  onMounted(() => {
    startObserving()
  })

  // Re-observe whenever new cards appear in the refs list
  watch(
    () => cardRefs.value.length,
    () => {
      nextTick(() => {
        if (observer) {
          observeNewElements()
        }
        else {
          startObserving()
        }
      })
    }
  )

  onBeforeUnmount(() => {
    stopObserving()
  })

  return { activeIndex }
}
