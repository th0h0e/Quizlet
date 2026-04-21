import { onBeforeUnmount, onMounted } from 'vue'

interface ContactFormAnimationReturn {
  drawConnectorLine: () => void
  triggerAnimation: () => void
  cleanup: () => void
}

export function useContactForm(): ContactFormAnimationReturn {
  let resizeTimeout: ReturnType<typeof setTimeout> | null = null
  let resizeHandler: (() => void) | null = null
  let hasAnimated = false
  let sendButton: HTMLElement | null = null

  function drawConnectorLine() {
    const svg = document.querySelector('svg[data-contact-connector="true"]') as SVGSVGElement
    const titleText = document.getElementById('contact-title-text')
    const sendButtonEl = document.getElementById('contact-send-button')
    const cardBody = document.querySelector('[data-contact-card-body]')
    const contactGrid = document.querySelector('.contact-grid')

    if (!svg || !titleText || !sendButtonEl || !cardBody || !contactGrid) return

    const gsap = useGSAP()

    svg.innerHTML = ''

    const cardRect = cardBody.getBoundingClientRect()
    svg.setAttribute('width', String(cardRect.width))
    svg.setAttribute('height', String(cardRect.height))

    const titleTextRect = titleText.getBoundingClientRect()
    const buttonRect = sendButtonEl.getBoundingClientRect()
    const gridRect = contactGrid.getBoundingClientRect()

    const startX = titleTextRect.right - cardRect.left
    const startY = titleTextRect.top - cardRect.top + titleTextRect.height / 2

    const endX = buttonRect.left - cardRect.left
    const endY = buttonRect.top - cardRect.top + buttonRect.height / 2

    const gridLeftEdge = gridRect.left - cardRect.left
    const centerX = gridLeftEdge + gridRect.width / 2

    const pathData = `M ${startX} ${startY} L ${centerX} ${startY} L ${centerX} ${endY} L ${endX} ${endY}`

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', pathData)
    path.setAttribute('stroke-width', '1')
    path.setAttribute('fill', 'none')
    path.setAttribute('stroke-linecap', 'square')
    path.setAttribute('stroke-linejoin', 'miter')
    path.classList.add('connector-line')

    svg.appendChild(path)

    const pathLength = path.getTotalLength()
    path.style.strokeDasharray = String(pathLength)
    path.style.strokeDashoffset = String(pathLength)

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.inOut'
    })
  }

  function handleSendClick() {
    hasAnimated = true
    drawConnectorLine()
  }

  function triggerAnimation() {
    hasAnimated = true
    drawConnectorLine()
  }

  function cleanup() {
    if (sendButton) {
      sendButton.removeEventListener('click', handleSendClick)
    }

    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler)
    }
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }
  }

  onMounted(() => {
    sendButton = document.getElementById('contact-send-button')
    sendButton?.addEventListener('click', handleSendClick)

    resizeHandler = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (hasAnimated) {
          drawConnectorLine()
        }
      }, 250)
    }
    window.addEventListener('resize', resizeHandler)
  })

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    drawConnectorLine,
    triggerAnimation,
    cleanup
  }
}
