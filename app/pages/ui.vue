<template>
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold mb-8 text-center">
      UI Components
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      <ClientOnly>
        <AnimationsDisk />
        <AnimationsLineWithParticles />
        <AnimationsCardStack />
        <AnimationsParticle />
        <AnimationsLoginAnimation />
        <AnimationsWaveAnimation />
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped></style>
