import { useElementBounding, useTemplateRefsList } from '@vueuse/core'

interface TeamGridReturn {
  containerRef: Ref<HTMLElement | null>
  pathRef: Ref<SVGPathElement | null>
  cardRefs: ReturnType<typeof useTemplateRefsList<HTMLDivElement>>
  svgWidth: Ref<number>
  svgHeight: Ref<number>
  pathData: Ref<string>
  updatePath: () => void
}

export function useTeamGrid(): TeamGridReturn {
  const containerRef = ref<HTMLElement | null>(null)
  const pathRef = ref<SVGPathElement | null>(null)
  const cardRefs = useTemplateRefsList<HTMLDivElement>()

  const containerBounds = useElementBounding(containerRef, { windowScroll: true })

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

    const firstRect = firstCard.getBoundingClientRect()
    const lastRect = lastCard.getBoundingClientRect()

    svgWidth.value = containerBounds.width.value
    svgHeight.value = lastRect.bottom - firstRect.top + 40

    let d = ''
    let prevRect: DOMRect | null = null

    cards.forEach((card, idx) => {
      const currentRect = card.getBoundingClientRect()

      if (idx === 0) {
        const x = currentRect.left - containerBounds.left.value + currentRect.width / 2
        const y = currentRect.bottom - containerBounds.top.value
        d = `M ${x} ${y}`
      }
      else {
        const x1 = prevRect!.left - containerBounds.left.value + prevRect!.width / 2
        const y1 = prevRect!.bottom - containerBounds.top.value
        const x2 = currentRect.left - containerBounds.left.value + currentRect.width / 2
        const y2 = currentRect.top - containerBounds.top.value
        const midY = (y1 + y2) / 2

        d += ` L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`
      }

      prevRect = currentRect
    })

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
