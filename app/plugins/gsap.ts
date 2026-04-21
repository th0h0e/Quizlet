import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(CustomEase)

  return {
    provide: {
      gsap
    }
  }
})
