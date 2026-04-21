import { landingCollection } from './collections/landing'
import { herosCollection } from './collections/heros'
import { aboutCollection } from './collections/about'
import { servicesCollection } from './collections/services'
import { teamCollection } from './collections/team'
import { tutorialsCollection } from './collections/tutorials'
import { contactCollection } from './collections/contact'
import { videoPostsCollection } from './collections/videoPosts'
import { loginCollection } from './collections/login'
import { docsCollection } from './collections/docs'
import { cardLandingCollection } from './collections/cardLanding'
import { pricingCollection } from './collections/pricing'
import { titleSectionCollection } from './collections/titleSection'

export const collections = {
  landing: landingCollection,
  heros: herosCollection,
  about: aboutCollection,
  services: servicesCollection,
  team: teamCollection,
  tutorials: tutorialsCollection,
  contact: contactCollection,
  videoPosts: videoPostsCollection,
  login: loginCollection,
  docs: docsCollection,
  cardLanding: cardLandingCollection,
  pricing: pricingCollection,
  titleSection: titleSectionCollection
}

export type Collections = typeof collections
