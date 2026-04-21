declare module 'nuxt/schema' {
  interface AppConfig {
    /**
     * Table of Contents configuration for documentation pages
     */
    toc?: {
      title?: string
      bottom?: {
        title?: string
        edit?: string
        links?: Array<{
          icon?: string
          label: string
          to?: string
          href?: string
          target?: string
        }>
      }
    }

    /**
     * Header configuration
     */
    header?: {
      title?: string
      to?: string
      logo?: {
        alt?: string
        light?: string
        dark?: string
      }
      search?: boolean
      colorMode?: boolean
      links?: Array<{
        label: string
        to?: string
        icon?: string
        target?: string
      }>
    }

    /**
     * Icon mappings for the application
     */
    icons?: Record<string, string>
  }
}

declare module '@nuxt/schema' {
  interface AppConfig {
    /**
     * Table of Contents configuration for documentation pages
     */
    toc?: {
      title?: string
      bottom?: {
        title?: string
        edit?: string
        links?: Array<{
          icon?: string
          label: string
          to?: string
          href?: string
          target?: string
        }>
      }
    }

    /**
     * Header configuration
     */
    header?: {
      title?: string
      to?: string
      logo?: {
        alt?: string
        light?: string
        dark?: string
      }
      search?: boolean
      colorMode?: boolean
      links?: Array<{
        label: string
        to?: string
        icon?: string
        target?: string
      }>
    }

    /**
     * Icon mappings for the application
     */
    icons?: Record<string, string>
  }
}
