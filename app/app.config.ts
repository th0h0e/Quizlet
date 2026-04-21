export default defineAppConfig({
  ui: {
    colors: {
      primary: 'frequency',
      neutral: 'gray'
    },
    toast: {
      slots: {
        root: 'relative group overflow-hidden bg-elevated shadow-lg rounded-lg ring ring-default p-4 flex gap-2.5 focus:outline-none',
        wrapper: 'w-0 flex-1 flex flex-col',
        title: 'text-sm font-medium text-highlighted',
        description: 'text-sm text-muted',
        icon: 'shrink-0 size-5',
        avatar: 'shrink-0',
        avatarSize: '2xl',
        actions: 'flex gap-1.5 shrink-0',
        progress: 'absolute inset-x-0 bottom-0',
        close: 'p-0'
      },
      variants: {
        color: {
          primary: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
            icon: 'text-primary'
          },
          secondary: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary',
            icon: 'text-secondary'
          },
          success: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success',
            icon: 'text-success'
          },
          info: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info',
            icon: 'text-info'
          },
          warning: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning',
            icon: 'text-warning'
          },
          error: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error',
            icon: 'text-error'
          },
          neutral: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted',
            icon: 'text-highlighted'
          }
        },
        orientation: {
          horizontal: {
            root: 'items-center',
            actions: 'items-center'
          },
          vertical: {
            root: 'items-start',
            actions: 'items-start mt-2.5'
          }
        },
        title: {
          true: {
            description: 'mt-1'
          }
        }
      },
      defaultVariants: {
        color: 'primary'
      }
    }
  },
  seo: {
    siteName: 'Frequency Digital'
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/th0h0e/Frequency-Nuxt-Studio/edit/main/content',
      links: [
        {
          icon: 'i-simple-icons-github',
          label: 'Star on GitHub',
          to: 'https://github.com/th0h0e/Frequency-Nuxt-Studio',
          target: '_blank'
        }
      ]
    }
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: []
  },
  icons: {
    arrowDown: 'feather:chevron-down',
    arrowLeft: 'feather:arrow-left',
    arrowRight: 'feather:arrow-right',
    arrowUp: 'feather:chevron-up',
    caution: 'feather:alert-triangle',
    check: 'feather:check',
    chevronDoubleLeft: 'feather:chevrons-left',
    chevronDoubleRight: 'feather:chevrons-right',
    chevronDown: 'feather:chevron-down',
    chevronLeft: 'feather:chevron-left',
    chevronRight: 'feather:chevron-right',
    chevronUp: 'feather:chevron-up',
    close: 'feather:x',
    copy: 'feather:copy',
    copyCheck: 'feather:check-circle',
    dark: 'feather:moon',
    drag: 'feather:more-vertical',
    ellipsis: 'feather:more-horizontal',
    error: 'feather:x-circle',
    external: 'feather:external-link',
    eye: 'feather:eye',
    eyeOff: 'feather:eye-off',
    file: 'feather:file',
    folder: 'feather:folder',
    folderOpen: 'feather:folder',
    hash: 'feather:hash',
    info: 'feather:info',
    light: 'feather:sun',
    loading: 'feather:loader',
    menu: 'feather:menu',
    minus: 'feather:minus',
    panelClose: 'feather:chevron-left',
    panelOpen: 'feather:chevron-right',
    plus: 'feather:plus',
    reload: 'feather:refresh-cw',
    search: 'feather:search',
    stop: 'feather:square',
    success: 'feather:check-circle',
    system: 'feather:monitor',
    tip: 'feather:sun',
    upload: 'feather:upload',
    warning: 'feather:alert-triangle'
  }
})
