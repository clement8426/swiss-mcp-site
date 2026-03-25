export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n'],

  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-CH', file: 'en.json' },
      { code: 'fr', name: 'Français', language: 'fr-CH', file: 'fr.json' },
      { code: 'de', name: 'Deutsch', language: 'de-CH', file: 'de.json' },
      { code: 'it', name: 'Italiano', language: 'it-CH', file: 'it.json' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: '.',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'swiss-apis-mcp' },
        { name: 'theme-color', content: '#D42B2B' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'swiss-apis-mcp',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'macOS, Linux, Windows',
            description:
              'MCP server and CLI for 34 Swiss public-data tools — transport, geography, health, politics, business, energy, weather, food and statistics.',
            url: 'https://swiss-apis-mcp.dev',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],
})
