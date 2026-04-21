<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)

function initDiskAnimation() {
  const container = containerRef.value
  if (!container) return

  const disks = container.querySelectorAll('.disk')
  if (disks.length === 0) return

  const gsap = useGSAP()

  gsap.set(disks, { y: 0 })

  disks.forEach((disk) => {
    disk.addEventListener('mouseenter', () => {
      gsap.to(disk, {
        y: -20,
        duration: 0.3,
        ease: 'power2.out'
      })
    })

    disk.addEventListener('mouseleave', () => {
      gsap.to(disk, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  })
}

onMounted(async () => {
  await nextTick()
  initDiskAnimation()
})
</script>

<template>
  <div class="border-default bg-elevated h-80 w-full overflow-hidden rounded-lg border">
    <div class="h-full p-0">
      <div
        ref="containerRef"
        class="animation-container"
      >
        <div class="disk" />
        <div class="disk" />
        <div class="disk" />
        <div class="disk" />
        <div class="disk" />
        <div class="disk" />
        <div class="disk" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.animation-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  gap: 0;
}

.disk {
  position: absolute;
  width: 20%;
  height: 80%;
  background: linear-gradient(90deg, var(--ui-color-neutral-100) 0%, var(--ui-primary) 100%);
  border-radius: 50%;
  cursor: pointer;
  transition: box-shadow 0.3s ease-out;
}

.disk:hover {
  box-shadow: 0 4px 12px color-mix(in srgb, var(--ui-color-neutral-500) 15%, transparent);
}

.disk:nth-child(1) {
  left: 2.5%;
}
.disk:nth-child(2) {
  left: 15%;
}
.disk:nth-child(3) {
  left: 27.5%;
}
.disk:nth-child(4) {
  left: 40%;
}
.disk:nth-child(5) {
  left: 52.5%;
}
.disk:nth-child(6) {
  left: 65%;
}
.disk:nth-child(7) {
  left: 77.5%;
}
</style>
