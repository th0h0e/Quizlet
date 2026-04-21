<script setup lang="ts">
type HeroVariant = 'plain' | 'content-right' | 'content-left' | 'featured' | 'centered' | 'single'

interface HeroConfig {
  backgroundImage?: string
  logoVisible?: boolean
  title?: string
  paragraph?: string
  variant?: HeroVariant
}

const props = withDefaults(
  defineProps<{
    config?: HeroConfig | null
  }>(),
  {
    config: () => ({})
  }
)

const config = computed(() => props.config ?? {})

const variant = computed(() => config.value?.variant ?? 'plain')

const defaultBackgrounds: Record<HeroVariant, string> = {
  'featured': '/images/img_6980.jpg',
  'plain': '/images/img_6905.jpg',
  'content-right': '/images/img_6911.jpg',
  'content-left': '/images/img_6950.jpg',
  'single': '/images/img_6980.jpg',
  'centered': '/images/img_6905.jpg'
}

const background = computed(
  () => config.value?.backgroundImage || defaultBackgrounds[variant.value]
)
</script>

<template>
  <div
    class="relative"
    :style="`min-height: 70vh; background-image: url(${background}); background-size: cover; background-position: center;`"
  >
    <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

    <!-- Timeline Navigation -->
    <div class="absolute top-0 bottom-0 left-0 z-50 hidden items-start p-8 lg:flex">
      <TimelineNavigation />
    </div>

    <HamburgerMenu />

    <HeroInnerHeroPlain
      v-if="variant === 'plain'"
      :logo-visible="config?.logoVisible"
    />

    <HeroInnerHeroContentRight
      v-else-if="variant === 'content-right'"
      :logo-visible="config?.logoVisible"
      :title="config?.title"
      :paragraph="config?.paragraph"
    />

    <HeroInnerHeroContentLeft
      v-else-if="variant === 'content-left'"
      :logo-visible="config?.logoVisible"
      :title="config?.title"
      :paragraph="config?.paragraph"
    />

    <HeroInnerHeroSingle
      v-else-if="variant === 'single'"
      :logo-visible="config?.logoVisible"
      :title="config?.title"
      :paragraph="config?.paragraph"
    />

    <HeroInnerHeroCenter
      v-else-if="variant === 'centered'"
      :logo-visible="config?.logoVisible"
      :title="config?.title"
      :paragraph="config?.paragraph"
    />
  </div>
</template>
