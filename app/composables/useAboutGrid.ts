import { useElementBounding, useTemplateRefsList } from '@vueuse/core'

interface SvgPathReturn {
  containerRef: Ref<HTMLElement | null>
  pathRef: Ref<SVGPathElement | null>
  cardRefs: ReturnType<typeof useTemplateRefsList<HTMLDivElement>>
  svgWidth: Ref<number>
  svgHeight: Ref<number>
  pathData: Ref<string>
  updatePath: () => void
}

export function useAboutGridPath(): SvgPathReturn {
  const containerRef = ref<HTMLElement | null>(null)
  const pathRef = ref<SVGPathElement | null>(null)
  const cardRefs = useTemplateRefsList<HTMLDivElement>()

  const containerBounds = useElementBounding(containerRef, {
    windowScroll: true
  })

  const svgWidth = ref(0)
  const svgHeight = ref(0)
  const pathData = ref('')
  const pathLength = ref(0)

  function updatePath() {
    const cards = cardRefs.value
    const firstCard = cards[0]
    const lastCard = cards[cards.length - 1]

    if (!firstCard || !lastCard || cards.length < 2) {
      pathData.value = ''
      return
    }

    const containerTop = containerBounds.top.value
    const containerLeft = containerBounds.left.value
    const containerWidth = containerBounds.width.value

    const firstRect = firstCard.getBoundingClientRect()
    const lastRect = lastCard.getBoundingClientRect()

    svgWidth.value = containerWidth
    svgHeight.value = lastRect.bottom - firstRect.top

    let d = ''

    for (let idx = 0; idx < cards.length; idx++) {
      const card = cards[idx]

      // Type guard: ensure card exists
      if (!card) continue

      const cardRect = card.getBoundingClientRect()

      // Get positions relative to container
      const cardCenter = {
        x: cardRect.left - containerLeft + cardRect.width / 2,
        y: cardRect.top - containerTop + cardRect.height / 2
      }

      const cardBottom = {
        x: cardRect.left - containerLeft + cardRect.width / 2,
        y: cardRect.bottom - containerTop
      }

      if (idx === 0) {
        // Start at the center of the first card
        d = `M ${cardCenter.x} ${cardCenter.y}`
        // Draw down to bottom of card
        d += ` L ${cardBottom.x} ${cardBottom.y}`
      }
      else {
        // Start from top of this card
        const cardTop = {
          x: cardRect.left - containerLeft + cardRect.width / 2,
          y: cardRect.top - containerTop
        }

        // Draw to center then to bottom
        d += ` L ${cardTop.x} ${cardTop.y}`
        d += ` L ${cardCenter.x} ${cardCenter.y}`
        d += ` L ${cardBottom.x} ${cardBottom.y}`
      }

      // If there's a next card, draw the zigzag connector
      const nextCard = cards[idx + 1]
      if (nextCard) {
        const nextRect = nextCard.getBoundingClientRect()
        const nextTop = {
          x: nextRect.left - containerLeft + nextRect.width / 2,
          y: nextRect.top - containerTop
        }

        // Calculate the midpoint between current card bottom and next card top
        const midY = (cardBottom.y + nextTop.y) / 2

        // Go down to midpoint
        d += ` L ${cardBottom.x} ${midY}`
        // Cross over horizontally to the other side (zigzag!)
        d += ` L ${nextTop.x} ${midY}`
        // Go up to the top of next card
        d += ` L ${nextTop.x} ${nextTop.y}`
      }
    }

    pathData.value = d
  }

  const progress = computed(() => {
    if (!containerBounds.height.value) return 0

    const viewportHeight = window.innerHeight
    const elementTop = containerBounds.top.value
    const elementHeight = containerBounds.height.value

    const totalTravel = viewportHeight + elementHeight
    const currentPosition = viewportHeight - elementTop

    return Math.max(0, Math.min(1, currentPosition / totalTravel))
  })

  watch(
    () => containerBounds.width.value,
    async (width) => {
      if (width > 0) {
        updatePath()

        await nextTick()

        if (pathRef.value && pathData.value) {
          pathLength.value = pathRef.value.getTotalLength()
          pathRef.value.style.strokeDasharray = String(pathLength.value)
        }
      }
    }
  )

  watch(progress, (p) => {
    if (pathRef.value && pathLength.value > 0) {
      pathRef.value.style.strokeDashoffset = String(pathLength.value * (1 - p))
    }
  })

  return {
    containerRef,
    pathRef,
    cardRefs,
    svgWidth,
    svgHeight,
    pathData,
    updatePath
  }
}
