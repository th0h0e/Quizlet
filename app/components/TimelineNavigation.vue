<script setup lang="ts">
interface NavItem {
  path: string
  title: string
}

const emit = defineEmits<{
  navigate: [path: string]
}>()

const route = useRoute()

const pages: NavItem[] = [
  { path: '/', title: 'Home' },
  { path: '/about', title: 'About' },
  { path: '/services', title: 'Services' },
  { path: '/contact', title: 'Contact' },
  { path: '/team', title: 'Team' },
  { path: '/faq', title: 'FAQ' },
  { path: '/login', title: 'Login' }
]

function getSection(path: string): string {
  return path === '/' ? 'home' : path.slice(1)
}

function isActive(path: string): boolean {
  return route.path === path
}

function handleNavClick(path: string) {
  // Let any parent listening know we clicked (e.g. to close a menu)
  emit('navigate', path)
}
</script>

<template>
  <nav class="timeline-nav">
    <NuxtLink
      v-for="item in pages"
      :key="item.path"
      :to="item.path"
      :data-section="getSection(item.path)"
      class="timeline-item"
      :class="{ 'timeline-active': isActive(item.path) }"
      @click="handleNavClick(item.path)"
    >
      <svg
        class="timeline-dot"
        width="15"
        height="15"
        viewBox="0 0 15 15"
      >
        <circle
          class="timeline-dot-circle"
          cx="7.5"
          cy="7.5"
          r="5"
        />
      </svg>
      <NavBadge
        :label="item.title"
        :active="isActive(item.path)"
      />
    </NuxtLink>
  </nav>
</template>

<style scoped>
.timeline-nav {
  position: relative;
  width: auto;
  display: flex;
  flex-direction: column;
}

.timeline-nav::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 70vh;
  width: 1.5px;
  background-color: var(--ui-primary);
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  text-decoration: none;
}

.timeline-dot {
  flex-shrink: 0;
  overflow: visible;
  margin-left: -7px;
}

.timeline-dot-circle {
  fill: var(--ui-primary);
  transform-origin: center;
  transition: transform 0.3s ease;
}

.timeline-active .timeline-dot-circle {
  transform: scale(1.5);
  transform-origin: center;
}

@media (max-width: 768px) {
  .timeline-nav {
    width: 100%;
    padding: 1rem 0;
    flex-grow: 1;
  }

  .timeline-nav::before {
    height: 100%;
  }

  .timeline-item {
    height: 48px;
  }
}
</style>
