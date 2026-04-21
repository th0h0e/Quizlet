<script setup lang="ts">
const { data: cardLandingContent } = await useAsyncData('card-landing', () =>
  queryCollection('cardLanding').order('order', 'ASC').all()
)

const { data: titleSectionContent } = await useAsyncData('title-section', () =>
  queryCollection('titleSection').where('stem', '=', 'title-section/home').first()
)
</script>

<template>
  <UPage>
    <UPageBody>
      <section
        v-if="titleSectionContent"
        class="mb-16"
      >
        <TitleSection
          :title="titleSectionContent.title"
          :description="titleSectionContent.description"
          :variant="titleSectionContent.variant"
          :links="titleSectionContent.links"
        />
      </section>

      <CardLanding
        v-if="cardLandingContent"
        :cards="cardLandingContent"
      />
    </UPageBody>
  </UPage>
</template>
