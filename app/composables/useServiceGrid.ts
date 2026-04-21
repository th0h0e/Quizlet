import { useElementBounding, useTemplateRefsList } from '@vueuse/core'

interface ServiceGridReturn {
  containerRef: Ref<HTMLElement | null>
  pathRef: Ref<SVGPathElement | null>
  cardRefs: ReturnType<typeof useTemplateRefsList<HTMLDivElement>>
  svgWidth: Ref<number>
  svgHeight: Ref<number>
  pathData: Ref<string>
  updatePath: () => void
}

export function useServiceGrid(): ServiceGridReturn {
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

    // Find the text section in the last card to calculate total height
    const lastTextSection = lastCard.querySelector('.service-text') as HTMLElement
    if (!lastTextSection) {
      pathData.value = ''
      return
    }

    const firstRect = firstCard.getBoundingClientRect()
    const lastTextRect = lastTextSection.getBoundingClientRect()

    svgWidth.value = containerWidth
    svgHeight.value = lastTextRect.bottom - firstRect.top

    let d = ''

    for (let idx = 0; idx < cards.length; idx++) {
      const card = cards[idx]

      // Type guard: ensure card exists
      if (!card) continue

      // Find the UCard and text section within this card
      const uCardElement = card.querySelector('.h-fit') as HTMLElement | null
      const textSection = card.querySelector('.service-text') as HTMLElement | null

      if (!uCardElement || !textSection) continue

      const uCardRect = uCardElement.getBoundingClientRect()
      const textRect = textSection.getBoundingClientRect()

      // Get positions relative to container
      const uCardBottom = {
        x: uCardRect.left - containerLeft + uCardRect.width / 2,
        y: uCardRect.bottom - containerTop
      }

      const textBottom = {
        x: textRect.left - containerLeft + textRect.width / 2,
        y: textRect.bottom - containerTop
      }

      if (idx === 0) {
        // Start at the bottom center of the first UCard
        d = `M ${uCardBottom.x} ${uCardBottom.y}`
      }

      // Draw down to bottom of text section
      d += ` L ${textBottom.x} ${textBottom.y}`

      // If there's a next card, draw the connector
      const nextCard = cards[idx + 1]
      if (nextCard) {
        const nextUCardElement = nextCard.querySelector('.h-fit') as HTMLElement | null
        if (!nextUCardElement) continue

        const nextUCardRect = nextUCardElement.getBoundingClientRect()
        const nextTop = {
          x: nextUCardRect.left - containerLeft + nextUCardRect.width / 2,
          y: nextUCardRect.top - containerTop
        }

        // Calculate the midpoint between current text bottom and next UCard top
        const midY = (textBottom.y + nextTop.y) / 2

        // Go down to midpoint
        d += ` L ${textBottom.x} ${midY}`
        // Cross over horizontally to the other side
        d += ` L ${nextTop.x} ${midY}`
        // Go up to the top of next UCard
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
