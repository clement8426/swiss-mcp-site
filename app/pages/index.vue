<script setup lang="ts">
const { t } = useI18n()
const { totalTools, freeTools, categories } = useToolsData()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('seo.homeTitle'),
  description: () => t('seo.homeDesc'),
  ogTitle: () => t('seo.homeTitle'),
  ogDescription: () => t('seo.homeDesc'),
  twitterTitle: () => t('seo.homeTitle'),
  twitterDescription: () => t('seo.homeDesc'),
})

const installSnippetMcp = `{
  "mcpServers": {
    "swiss-apis-mcp": {
      "command": "npx",
      "args": ["-y", "swiss-apis-mcp"]
    }
  }
}`

const clients = [
  { abbr: 'CL', name: 'Claude Desktop', url: 'https://claude.ai/download' },
  { abbr: 'CR', name: 'Cursor', url: 'https://cursor.sh' },
  { abbr: 'WS', name: 'Windsurf', url: 'https://codeium.com/windsurf' },
  { abbr: 'CO', name: 'Continue.dev', url: 'https://continue.dev' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <div class="hero-inner">
          <div class="badge-row">
            <span class="badge-mcp">{{ t('hero.badgeMcp') }}</span>
            <span class="badge-mcp badge-cli">{{ t('hero.badgeCli') }}</span>
            <span class="badge-count">{{ t('hero.toolsCountBadge', { count: totalTools }) }}</span>
          </div>

          <h1 class="hero-title">
            {{ t('hero.title1') }}<br>
            <span class="text-gradient">{{ t('hero.title2') }}</span>
          </h1>

          <p class="hero-desc">
            {{ t('hero.desc', { count: totalTools }) }}
          </p>

          <div class="hero-ctas">
            <NuxtLink :to="localePath('/install')" class="btn btn-primary btn-lg">
              {{ t('hero.cta1') }}
            </NuxtLink>
            <NuxtLink :to="localePath('/tools')" class="btn btn-secondary btn-lg">
              {{ t('hero.cta2', { count: totalTools }) }}
            </NuxtLink>
          </div>

          <!-- Quick install: MCP + CLI -->
          <div class="hero-code-grid">
            <div class="hero-code">
              <p class="code-label">{{ t('hero.codeLabelMcp') }}</p>
              <div class="code-block">
                <pre><code>{{ installSnippetMcp }}</code></pre>
              </div>
            </div>
            <div class="hero-code">
              <p class="code-label">{{ t('hero.codeLabelCli') }}</p>
              <div class="code-block">
                <pre><code>{{ t('install.cliCmdGlobal') }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats bar -->
    <section class="stats-bar">
      <div class="container">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-number">{{ totalTools }}</span>
            <span class="stat-label">{{ t('stats.tools') }}</span>
          </div>
          <div class="stat-divider"/>
          <div class="stat">
            <span class="stat-number">{{ categories.length }}</span>
            <span class="stat-label">{{ t('stats.categories') }}</span>
          </div>
          <div class="stat-divider"/>
          <div class="stat">
            <span class="stat-number">{{ freeTools }}</span>
            <span class="stat-label">{{ t('stats.free') }}</span>
          </div>
          <div class="stat-divider"/>
          <div class="stat">
            <span class="stat-number">MIT</span>
            <span class="stat-label">{{ t('stats.oss') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- What is MCP -->
    <section class="section mcp-section">
      <div class="container">
        <div class="mcp-layout">
          <div class="mcp-content">
            <p class="eyebrow">{{ t('mcp.eyebrow') }}</p>
            <h2 class="section-title">{{ t('mcp.title') }}</h2>
            <p class="section-desc">{{ t('mcp.p1') }}</p>
            <p class="section-desc" style="margin-top:16px">
              {{ t('mcp.p2', { count: totalTools }) }}
            </p>

            <div class="mcp-highlights">
              <div class="mcp-highlight">
                <span class="mcp-highlight-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <div>
                  <strong>{{ t('mcp.localTitle') }}</strong>
                  <p>{{ t('mcp.localDesc') }}</p>
                </div>
              </div>
              <div class="mcp-highlight">
                <span class="mcp-highlight-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </span>
                <div>
                  <strong>{{ t('mcp.freeTitle') }}</strong>
                  <p>{{ t('mcp.freeDesc', { free: freeTools, total: totalTools }) }}</p>
                </div>
              </div>
              <div class="mcp-highlight">
                <span class="mcp-highlight-icon">
                  <svg width="14" height="14" viewBox="0 0 32 32" fill="currentColor">
                    <rect x="13" y="3" width="6" height="26" rx="1"/>
                    <rect x="3" y="13" width="26" height="6" rx="1"/>
                  </svg>
                </span>
                <div>
                  <strong>{{ t('mcp.officialTitle') }}</strong>
                  <p>{{ t('mcp.officialDesc') }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Diagram -->
          <div class="mcp-diagram">
            <div class="diagram-node diagram-ai">
              <span class="diagram-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
                </svg>
              </span>
              <div>
                <strong>{{ t('mcp.diagramAi') }}</strong>
                <span>{{ t('mcp.diagramAiSub') }}</span>
              </div>
            </div>
            <div class="diagram-arrow">
              <div class="diagram-arrow-label">{{ t('mcp.diagramArrowMcp') }}</div>
            </div>
            <div class="diagram-node diagram-server">
              <span class="diagram-icon diagram-icon-red">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                  <rect x="13" y="3" width="6" height="26" rx="1"/>
                  <rect x="3" y="13" width="26" height="6" rx="1"/>
                </svg>
              </span>
              <div>
                <strong>{{ t('mcp.diagramServer') }}</strong>
                <span>{{ t('mcp.diagramServerSub', { count: totalTools }) }}</span>
              </div>
            </div>
            <div class="diagram-arrow">
              <div class="diagram-arrow-label">{{ t('mcp.diagramArrowHttps') }}</div>
            </div>
            <div class="diagram-node diagram-apis">
              <span class="diagram-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </span>
              <div>
                <strong>{{ t('mcp.diagramApis') }}</strong>
                <span>{{ t('mcp.diagramApisSub') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section">
      <div class="container">
        <p class="eyebrow">{{ t('categories.eyebrow', { count: totalTools, cats: categories.length }) }}</p>
        <h2 class="section-title">{{ t('categories.title') }}</h2>
        <p class="section-desc">{{ t('categories.desc') }}</p>

        <div class="categories-grid">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.id"
            :to="localePath('/tools') + `?category=${cat.id}`"
            class="category-card"
          >
            <div class="category-header">
              <span
                class="category-icon"
                :style="{ background: cat.bgColor, color: cat.color }"
              >
                {{ cat.abbr }}
              </span>
              <span class="category-count">{{ t('categories.toolsCount', { n: cat.tools.length }) }}</span>
            </div>
            <h3 class="category-name">{{ t('catLabel.' + cat.id) }}</h3>
            <p class="category-desc">{{ t('catDesc.' + cat.id) }}</p>
            <span class="category-link">
              {{ t('categories.explore', { name: t('catLabel.' + cat.id) }) }} →
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Compatible clients -->
    <section class="section clients-section">
      <div class="container">
        <p class="eyebrow">{{ t('clients.eyebrow') }}</p>
        <h2 class="section-title">{{ t('clients.title') }}</h2>
        <p class="section-desc">{{ t('clients.desc') }}</p>

        <div class="clients-grid">
          <a
            v-for="client in clients"
            :key="client.name"
            :href="client.url"
            target="_blank"
            rel="noopener noreferrer"
            class="client-card"
          >
            <span class="client-icon">{{ client.abbr }}</span>
            <span class="client-name">{{ client.name }}</span>
          </a>
        </div>

        <div class="clients-cta">
          <NuxtLink :to="localePath('/install')" class="btn btn-ghost">
            {{ t('clients.cta') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-box">
          <h2 class="cta-title">{{ t('cta.title') }}</h2>
          <p class="cta-desc">{{ t('cta.desc') }}</p>
          <div class="cta-actions">
            <NuxtLink :to="localePath('/install')" class="btn btn-primary btn-lg">
              {{ t('cta.primary') }}
            </NuxtLink>
            <NuxtLink :to="localePath('/tools')" class="btn btn-secondary btn-lg">
              {{ t('cta.secondary', { count: totalTools }) }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero */
.hero { padding: 96px 0 72px; }
.hero-inner { max-width: 760px; }
.badge-row { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
.badge-mcp {
  font-size: 11px;
  font-weight: 700;
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-red);
  border: 1px solid rgba(212,43,43,.3);
  background: rgba(212,43,43,.08);
  padding: 4px 10px;
  border-radius: 100px;
}
.badge-cli {
  color: var(--color-text-soft);
  border-color: var(--color-border-2);
  background: var(--color-surface-2);
}
.hero-code-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 800px;
}
@media (max-width: 700px) {
  .hero-code-grid { grid-template-columns: 1fr; }
}
.badge-count {
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  letter-spacing: 0.06em;
}
.hero-title {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
}
.hero-desc {
  font-size: 17px;
  color: var(--color-text-soft);
  line-height: 1.7;
  max-width: 640px;
  margin-bottom: 36px;
}
.hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }

/* Code block */
.hero-code {}
.code-label {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 10px;
  font-family: var(--font-mono);
}
.code-block {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
}
.code-block pre {
  margin: 0;
  padding: 20px 24px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
  color: var(--color-text-soft);
  overflow-x: auto;
}

/* Stats bar */
.stats-bar {
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: 0;
}
.stats-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0;
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 28px 48px;
}
.stat-number {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text);
}
.stat-label {
  font-size: 12px;
  color: var(--color-text-muted);
  font-weight: 500;
  white-space: nowrap;
}
.stat-divider { width: 1px; height: 40px; background: var(--color-border); flex-shrink: 0; }
@media (max-width: 600px) {
  .stat { padding: 20px 24px; }
  .stat-divider { display: none; }
  .stats-grid { gap: 0; justify-content: flex-start; }
}

/* MCP section */
.mcp-section { padding: 96px 0; }
.mcp-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}
@media (max-width: 900px) {
  .mcp-layout { grid-template-columns: 1fr; gap: 48px; }
}
.mcp-highlights { margin-top: 32px; display: flex; flex-direction: column; gap: 20px; }
.mcp-highlight {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.mcp-highlight-icon {
  width: 28px; height: 28px;
  border-radius: var(--radius-sm);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-soft);
  flex-shrink: 0;
  margin-top: 2px;
}
.mcp-highlight strong {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 4px;
}
.mcp-highlight p {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* Diagram */
.mcp-diagram {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 8px;
  margin-top: 48px;
}
.diagram-node {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: var(--radius);
}
.diagram-ai { background: var(--color-surface-2); }
.diagram-server {
  background: rgba(212,43,43,.08);
  border: 1px solid rgba(212,43,43,.2);
}
.diagram-apis { background: var(--color-surface-2); }
.diagram-icon {
  width: 36px; height: 36px;
  border-radius: var(--radius-sm);
  background: var(--color-surface-3);
  border: 1px solid var(--color-border);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-soft);
  flex-shrink: 0;
}
.diagram-icon-red {
  background: rgba(212,43,43,.15);
  border-color: rgba(212,43,43,.3);
  color: var(--color-red);
}
.diagram-node strong { display: block; font-size: 14px; font-weight: 600; font-family: var(--font-mono); }
.diagram-node span { font-size: 12px; color: var(--color-text-muted); }
.diagram-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  position: relative;
}
.diagram-arrow::before {
  content: '';
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  border-left: 1px dashed var(--color-border-2);
}
.diagram-arrow-label {
  position: relative;
  z-index: 1;
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  background: var(--color-surface);
  padding: 2px 8px;
  border-radius: 100px;
  border: 1px solid var(--color-border);
}

/* Categories */
.section { padding: 80px 0; }
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 48px;
}
.category-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  transition: all var(--transition);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.category-card:hover {
  border-color: var(--color-border-2);
  background: var(--color-surface-2);
  transform: translateY(-2px);
}
.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}
.category-icon {
  width: 32px; height: 32px;
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.category-count {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
}
.category-name { font-size: 15px; font-weight: 600; color: var(--color-text); }
.category-desc { font-size: 13px; color: var(--color-text-muted); line-height: 1.6; flex: 1; }
.category-link {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-red);
  margin-top: 8px;
  display: block;
}

/* Clients */
.clients-section { background: var(--color-surface); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); }
.clients-grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 40px;
}
.client-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition: all var(--transition);
}
.client-card:hover { border-color: var(--color-border-2); background: var(--color-surface-2); }
.client-icon {
  width: 28px; height: 28px;
  border-radius: var(--radius-sm);
  background: var(--color-surface-3);
  border: 1px solid var(--color-border);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 800;
  color: var(--color-text-soft);
  letter-spacing: 0.02em;
}
.client-name { font-size: 14px; font-weight: 500; color: var(--color-text); }
.clients-cta { margin-top: 32px; }

/* CTA */
.cta-section { padding: 80px 0 96px; }
.cta-box {
  max-width: 600px;
  text-align: left;
}
.cta-title {
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}
.cta-desc {
  font-size: 16px;
  color: var(--color-text-soft);
  line-height: 1.7;
  margin-bottom: 32px;
}
.cta-actions { display: flex; gap: 12px; flex-wrap: wrap; }
</style>
