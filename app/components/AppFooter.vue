<script setup lang="ts">
const { t } = useI18n()
const { totalTools, categories } = useToolsData()
const localePath = useLocalePath()
</script>

<template>
  <footer class="footer">
    <hr class="section-divider">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <NuxtLink :to="localePath('/')" class="logo">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="6" fill="#D42B2B"/>
              <rect x="13" y="6" width="6" height="20" fill="white"/>
              <rect x="6" y="13" width="20" height="6" fill="white"/>
            </svg>
            <span>{{ t('nav.brand') }}</span>
          </NuxtLink>
          <p class="footer-desc">
            {{ t('footer.desc', { count: totalTools }) }}
          </p>
          <a
            href="https://github.com/swiss-apis-mcp/swiss-apis-mcp"
            target="_blank"
            rel="noopener noreferrer"
            class="github-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/>
            </svg>
            {{ t('nav.github') }} ↗
          </a>
        </div>

        <!-- Navigation -->
        <div class="footer-col">
          <h4 class="footer-heading">{{ t('footer.navTitle') }}</h4>
          <ul class="footer-links">
            <li><NuxtLink :to="localePath('/')">{{ t('footer.home') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/tools')">{{ t('footer.allTools') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/install')">{{ t('footer.installation') }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Categories -->
        <div class="footer-col">
          <h4 class="footer-heading">{{ t('footer.categoriesTitle') }}</h4>
          <ul class="footer-links">
            <li v-for="cat in categories.slice(0, 5)" :key="cat.id">
              <NuxtLink :to="localePath('/tools') + `?category=${cat.id}`">
                {{ t('catLabel.' + cat.id) }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/tools')" class="see-all">{{ t('footer.seeAll') }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="footer-col">
          <h4 class="footer-heading">{{ t('footer.resourcesTitle') }}</h4>
          <ul class="footer-links">
            <li>
              <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">
                {{ t('footer.resourceMcpDocs') }} ↗
              </a>
            </li>
            <li>
              <a href="https://www.npmjs.com/package/swiss-apis-mcp" target="_blank" rel="noopener noreferrer">
                {{ t('footer.resourceNpmMcp') }} ↗
              </a>
            </li>
            <li>
              <a href="https://www.npmjs.com/package/swiss-apis-cli" target="_blank" rel="noopener noreferrer">
                {{ t('footer.resourceNpmCli') }} ↗
              </a>
            </li>
            <li>
              <a href="https://opendata.swiss" target="_blank" rel="noopener noreferrer">
                {{ t('footer.resourceOpendata') }} ↗
              </a>
            </li>
            <li>
              <a href="https://transport.opendata.ch" target="_blank" rel="noopener noreferrer">
                {{ t('footer.resourceTransport') }} ↗
              </a>
            </li>
            <li>
              <a href="https://api3.geo.admin.ch" target="_blank" rel="noopener noreferrer">
                {{ t('footer.resourceSwisstopo') }} ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-legal">{{ t('footer.legal') }}</p>
        <p class="footer-copy">{{ t('footer.license') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { padding: 60px 0 32px; }
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}
@media (max-width: 900px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
  .footer-brand { grid-column: 1 / -1; }
}
@media (max-width: 600px) {
  .footer-grid { grid-template-columns: 1fr; gap: 24px; }
}
.logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 12px;
}
.footer-desc {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 320px;
  margin-bottom: 16px;
}
.github-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-soft);
  transition: color var(--transition);
}
.github-link:hover { color: var(--color-text); }
.footer-heading {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 14px;
}
.footer-links { display: flex; flex-direction: column; gap: 8px; }
.footer-links a {
  font-size: 13px;
  color: var(--color-text-soft);
  transition: color var(--transition);
}
.footer-links a:hover { color: var(--color-text); }
.see-all { color: var(--color-red) !important; font-weight: 500; }
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
  gap: 16px;
  flex-wrap: wrap;
}
.footer-legal, .footer-copy {
  font-size: 12px;
  color: var(--color-text-muted);
}
</style>
