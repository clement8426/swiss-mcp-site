<script setup lang="ts">
const { t } = useI18n()
const { totalTools } = useToolsData()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('seo.installTitle'),
  description: () => t('seo.installDesc'),
  ogTitle: () => t('seo.installTitle'),
  ogDescription: () => t('seo.installDesc'),
})

const activeClient = ref('claude')

const clients = [
  { id: 'claude', name: 'Claude Desktop' },
  { id: 'cursor', name: 'Cursor' },
  { id: 'windsurf', name: 'Windsurf' },
  { id: 'continue', name: 'Continue.dev' },
]

const clientConfigs: Record<string, { path: string; code: string }> = {
  claude: {
    path: '~/Library/Application Support/Claude/claude_desktop_config.json',
    code: `{
  "mcpServers": {
    "swiss-apis-mcp": {
      "command": "npx",
      "args": ["-y", "swiss-apis-mcp"]
    }
  }
}`,
  },
  cursor: {
    path: '~/.cursor/mcp.json',
    code: `{
  "mcpServers": {
    "swiss-apis-mcp": {
      "command": "npx",
      "args": ["-y", "swiss-apis-mcp"]
    }
  }
}`,
  },
  windsurf: {
    path: '~/.codeium/windsurf/mcp_config.json',
    code: `{
  "mcpServers": {
    "swiss-apis-mcp": {
      "command": "npx",
      "args": ["-y", "swiss-apis-mcp"]
    }
  }
}`,
  },
  continue: {
    path: '~/.continue/config.json',
    code: `{
  "experimental": {
    "modelContextProtocolServers": [{
      "transport": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "swiss-apis-mcp"]
      }
    }]
  }
}`,
  },
}

const apiKeys = computed(() => [
  {
    key: 'OTD_API_KEY',
    label: t('apiKey.otdLabel'),
    description: t('apiKey.otdDesc'),
    url: 'https://opentransportdata.swiss/en/dev-community/',
    tools: ['swiss_transport_gtfs_realtime'],
    free: true,
  },
  {
    key: 'ZEFIX_USER / ZEFIX_PASS',
    label: t('apiKey.zefixLabel'),
    description: t('apiKey.zefixDesc'),
    url: 'https://www.zefix.admin.ch/en/search/entity/welcome',
    tools: ['swiss_company_search', 'swiss_company_by_uid', 'swiss_company_publications'],
    free: true,
  },
  {
    key: 'FOODREPO_API_KEY',
    label: t('apiKey.foodrepoLabel'),
    description: t('apiKey.foodrepoDesc'),
    url: 'https://www.foodrepo.org/api-docs/',
    tools: ['swiss_food_search_products'],
    free: true,
  },
])

const exampleConversations = computed(() => [
  {
    category: t('install.ex1Category'),
    user: t('install.ex1User'),
    assistant: t('install.ex1Ai'),
  },
  {
    category: t('install.ex2Category'),
    user: t('install.ex2User'),
    assistant: t('install.ex2Ai'),
  },
  {
    category: t('install.ex3Category'),
    user: t('install.ex3User'),
    assistant: t('install.ex3Ai'),
  },
  {
    category: t('install.ex4Category'),
    user: t('install.ex4User'),
    assistant: t('install.ex4Ai'),
  },
])

const sidebarLinks = computed(() => [
  { id: 'compare', label: t('install.navCompare') },
  { id: 'prereqs', label: t('install.prereqs') },
  { id: 'install-cli', label: t('install.installCli') },
  { id: 'install-mcp', label: t('install.installMcp') },
  { id: 'apikeys', label: t('install.optApiKeys') },
  { id: 'examples', label: t('install.examplePrompts') },
])
</script>

<template>
  <div class="install-page">
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <p class="eyebrow">{{ t('install.eyebrow') }}</p>
        <h1 class="page-title">{{ t('install.title') }}</h1>
        <p class="page-desc">{{ t('install.desc') }}</p>
        <div class="npm-banner">
          <p class="npm-banner-title">{{ t('install.npmBannerTitle') }}</p>
          <p class="npm-banner-body">{{ t('install.npmBannerBody') }}</p>
          <p class="npm-banner-links">
            <a href="https://www.npmjs.com/package/swiss-apis-mcp" target="_blank" rel="noopener noreferrer" class="npm-banner-link">{{ t('install.npmLinkMcpLabel') }} ↗</a>
            <span class="npm-banner-sep">·</span>
            <a href="https://www.npmjs.com/package/swiss-apis-cli" target="_blank" rel="noopener noreferrer" class="npm-banner-link">{{ t('install.npmLinkCliLabel') }} ↗</a>
          </p>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="install-layout">
        <!-- Main content -->
        <div class="install-main">

          <section id="compare" class="install-section">
            <h2 class="section-heading">{{ t('install.compareTitle') }}</h2>
            <p class="step-desc">{{ t('install.compareIntro') }}</p>
            <div class="compare-grid">
              <div class="compare-card">
                <span class="compare-badge">MCP</span>
                <h3 class="compare-card-title">{{ t('install.cardMcpTitle') }}</h3>
                <p class="compare-card-desc">{{ t('install.cardMcpDesc') }}</p>
              </div>
              <div class="compare-card compare-card-cli">
                <span class="compare-badge compare-badge-cli">CLI</span>
                <h3 class="compare-card-title">{{ t('install.cardCliTitle') }}</h3>
                <p class="compare-card-desc">{{ t('install.cardCliDesc') }}</p>
              </div>
            </div>
            <div class="keys-note-box">
              <h3 class="keys-note-title">{{ t('install.keysNoteTitle') }}</h3>
              <p class="keys-note-body">{{ t('install.keysNoteBody') }}</p>
            </div>
          </section>

          <section id="prereqs" class="install-section">
            <h2 class="section-heading">{{ t('install.prereqTitle') }}</h2>
            <div class="prereqs-grid">
              <div class="prereq-card">
                <div class="prereq-icon">18+</div>
                <div>
                  <h3>{{ t('install.prereq1Title') }}</h3>
                  <p>{{ t('install.prereq1Desc') }}</p>
                  <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" class="prereq-link">
                    {{ t('install.prereq1Link') }} ↗
                  </a>
                </div>
              </div>
              <div class="prereq-card">
                <div class="prereq-icon">MCP</div>
                <div>
                  <h3>{{ t('install.prereq2Title') }}</h3>
                  <p>{{ t('install.prereq2Desc') }}</p>
                </div>
              </div>
            </div>
          </section>

          <section id="install-cli" class="install-section">
            <h2 class="section-heading">{{ t('install.sectionCli') }}</h2>
            <p class="step-desc">{{ t('install.cliDesc') }}</p>
            <div class="step-badge">{{ t('install.cliStep1Title') }}</div>
            <p class="step-desc">{{ t('install.cliStep1Desc') }}</p>
            <div class="code-block">
              <pre><code>{{ t('install.cliCmdGlobal') }}</code></pre>
            </div>
            <div class="step-badge">{{ t('install.cliStep2Title') }}</div>
            <p class="step-desc">{{ t('install.cliStep2Desc') }}</p>
            <div class="code-block">
              <pre><code>{{ t('install.cliCmdDoctor') }}</code></pre>
            </div>
            <div class="step-badge">{{ t('install.cliStep3Title') }}</div>
            <div class="code-block">
              <pre><code>{{ t('install.cliCmdList') }}
swiss call swiss_check_setup '{}'</code></pre>
            </div>
            <p class="step-sub">
              <a href="https://www.npmjs.com/package/swiss-apis-cli" target="_blank" rel="noopener noreferrer" class="prereq-link">
                {{ t('install.cliNpmLinkLabel') }} ↗
              </a>
            </p>
            <p class="restart-note">{{ t('install.cliReadmeHint') }}</p>
          </section>

          <section id="install-mcp" class="install-section">
            <h2 class="section-heading">{{ t('install.sectionMcp') }}</h2>
            <div class="step-badge">{{ t('install.step1Title') }}</div>
            <p class="step-desc">{{ t('install.step1Desc') }}</p>
            <div class="code-block">
              <pre><code>{{ t('install.globalInstallCmd') }}</code></pre>
            </div>

            <div class="step-badge required">{{ t('install.step2Title') }}</div>
            <p class="step-desc">{{ t('install.step2Desc') }}</p>
            <div class="client-tabs">
              <button
                v-for="client in clients"
                :key="client.id"
                class="client-tab"
                :class="{ active: activeClient === client.id }"
                @click="activeClient = client.id"
              >
                {{ client.name }}
              </button>
            </div>
            <div class="client-config">
              <p class="config-path">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                {{ clientConfigs[activeClient]?.path }}
              </p>
              <div class="code-block">
                <pre><code>{{ clientConfigs[activeClient]?.code }}</code></pre>
              </div>
              <p class="restart-note">{{ t('install.restartNote') }}</p>
            </div>

            <div class="step-badge">{{ t('install.step3Title') }}</div>
            <p class="step-desc">{{ t('install.step3Desc') }}</p>
            <div class="verify-prompt">
              <p>{{ t('install.verifyPrompt') }}</p>
            </div>
            <p class="step-sub">{{ t('install.step3Sub', { count: totalTools }) }}</p>
          </section>

          <section id="apikeys" class="install-section">
            <h2 class="section-heading">
              {{ t('install.apiKeysTitle') }}
              <span class="badge-soft">{{ t('install.apiKeysBadge', { count: 3, total: totalTools }) }}</span>
            </h2>
            <p class="step-desc">{{ t('install.apiKeysDesc', { free: 30, total: totalTools }) }}</p>
            <div class="api-keys-list">
              <div v-for="key in apiKeys" :key="key.key" class="api-key-card">
                <div class="api-key-header">
                  <div>
                    <h3 class="api-key-name">{{ key.label }}</h3>
                    <code class="api-key-env">{{ key.key }}</code>
                  </div>
                  <a :href="key.url" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
                    {{ t('install.getFreeKey') }}
                  </a>
                </div>
                <p class="api-key-desc">{{ key.description }}</p>
                <div class="api-key-tools">
                  <span class="unlocks-label">{{ t('install.unlocks') }}:</span>
                  <code v-for="tool in key.tools" :key="tool" class="tool-ref">{{ tool }}</code>
                </div>
              </div>
            </div>
            <p class="api-key-note">{{ t('install.apiKeyNote') }}</p>
          </section>

          <section id="examples" class="install-section">
            <h2 class="section-heading">{{ t('install.examplesTitle') }}</h2>
            <p class="step-desc">{{ t('install.examplesDesc') }}</p>
            <div class="examples-list">
              <div v-for="(ex, i) in exampleConversations" :key="i" class="example-card">
                <span class="example-category">{{ ex.category }}</span>
                <div class="example-user">
                  <span class="bubble-label">{{ t('install.exampleYou') }}</span>
                  <p>{{ ex.user }}</p>
                </div>
                <div class="example-ai">
                  <span class="bubble-label">{{ t('install.exampleAi') }}</span>
                  <p>{{ ex.assistant }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <aside class="install-sidebar">
          <div class="sidebar-card">
            <h3 class="sidebar-title">{{ t('install.sidebarTitle') }}</h3>
            <nav class="sidebar-nav">
              <a v-for="link in sidebarLinks" :key="link.id" :href="`#${link.id}`" class="sidebar-link">
                {{ link.label }}
              </a>
            </nav>
          </div>

          <div class="sidebar-card sidebar-callout">
            <p class="sidebar-two-steps">{{ t('install.sidebarTwoSteps') }}</p>
            <ol class="sidebar-steps">
              <li>{{ t('install.sidebarStep1') }}</li>
              <li>{{ t('install.sidebarStep2') }}</li>
            </ol>
            <p class="sidebar-note">{{ t('install.sidebarNote') }}</p>
          </div>

          <div class="sidebar-card">
            <h3 class="sidebar-title">{{ t('install.sidebarLinks') }}</h3>
            <div class="sidebar-resources">
              <NuxtLink :to="localePath('/tools')" class="sidebar-resource-link">
                {{ t('install.browseTools', { count: totalTools }) }}
              </NuxtLink>
              <a href="https://www.npmjs.com/package/swiss-apis-mcp" target="_blank" rel="noopener noreferrer" class="sidebar-resource-link">
                {{ t('footer.resourceNpmMcp') }} ↗
              </a>
              <a href="https://www.npmjs.com/package/swiss-apis-cli" target="_blank" rel="noopener noreferrer" class="sidebar-resource-link">
                {{ t('footer.resourceNpmCli') }} ↗
              </a>
              <a href="https://github.com/clement8426/swiss-apis-mcp" target="_blank" rel="noopener noreferrer" class="sidebar-resource-link">
                {{ t('footer.resourceGithubMcp') }} ↗
              </a>
              <a href="https://github.com/clement8426/swiss-apis-cli" target="_blank" rel="noopener noreferrer" class="sidebar-resource-link">
                {{ t('footer.resourceGithubCli') }} ↗
              </a>
              <a href="https://github.com/clement8426/swiss-mcp-site" target="_blank" rel="noopener noreferrer" class="sidebar-resource-link">
                {{ t('install.siteGithub') }} ↗
              </a>
              <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" class="sidebar-resource-link">
                {{ t('install.mcpDocsLink') }} ↗
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.install-page { padding-bottom: 96px; }
.page-header { padding: 72px 0 48px; }
.page-title {
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}
.page-desc { font-size: 16px; color: var(--color-text-soft); max-width: 720px; line-height: 1.7; }

.npm-banner {
  margin-top: 24px;
  max-width: 720px;
  padding: 16px 20px;
  background: rgba(212,43,43,.08);
  border: 1px solid rgba(212,43,43,.22);
  border-radius: var(--radius);
}
.npm-banner-title {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-red);
  margin-bottom: 8px;
}
.npm-banner-body { font-size: 14px; color: var(--color-text-soft); line-height: 1.65; margin-bottom: 10px; }
.npm-banner-links { font-size: 14px; margin: 0; }
.npm-banner-link { color: var(--color-red); font-weight: 600; }
.npm-banner-link:hover { text-decoration: underline; }
.npm-banner-sep { color: var(--color-text-muted); margin: 0 8px; }

.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}
@media (max-width: 700px) {
  .compare-grid { grid-template-columns: 1fr; }
}
.compare-card {
  padding: 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.compare-card-cli { border-color: rgba(212,43,43,.25); background: rgba(212,43,43,.04); }
.compare-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 800;
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin-bottom: 10px;
}
.compare-badge-cli { color: var(--color-red); }
.compare-card-title { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
.compare-card-desc { font-size: 13px; color: var(--color-text-muted); line-height: 1.65; }
.keys-note-box {
  padding: 16px 20px;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}
.keys-note-title { font-size: 13px; font-weight: 700; margin-bottom: 8px; }
.keys-note-body { font-size: 13px; color: var(--color-text-soft); line-height: 1.65; }

/* Layout */
.install-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 56px;
  align-items: start;
}
@media (max-width: 1024px) {
  .install-layout { grid-template-columns: 1fr; }
  .install-sidebar { display: none; }
}

/* Sections */
.install-section { padding-bottom: 56px; border-bottom: 1px solid var(--color-border); margin-bottom: 56px; }
.install-section:last-child { border-bottom: none; }
.section-heading {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.badge-soft {
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  padding: 2px 8px;
  border-radius: 100px;
}

/* Step badge */
.step-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  padding: 4px 12px;
  border-radius: 100px;
  margin-bottom: 16px;
}
.step-badge.required {
  color: var(--color-red);
  background: rgba(212,43,43,.08);
  border-color: rgba(212,43,43,.25);
}
.step-desc { font-size: 14px; color: var(--color-text-soft); line-height: 1.7; margin-bottom: 20px; }
.step-sub { font-size: 13px; color: var(--color-text-muted); line-height: 1.7; margin-top: 16px; }

/* Code block */
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

/* Prerequisites */
.prereqs-grid { display: flex; flex-direction: column; gap: 12px; }
.prereq-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.prereq-icon {
  width: 40px; height: 40px;
  border-radius: var(--radius-sm);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  color: var(--color-text-muted);
  flex-shrink: 0;
}
.prereq-card h3 { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.prereq-card p { font-size: 13px; color: var(--color-text-muted); line-height: 1.6; }
.prereq-link { font-size: 13px; color: var(--color-red); font-weight: 500; display: inline-block; margin-top: 6px; }

/* Client tabs */
.client-tabs {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.client-tab {
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: all var(--transition);
}
.client-tab:hover { color: var(--color-text); border-color: var(--color-border-2); }
.client-tab.active {
  color: var(--color-text);
  background: var(--color-surface-2);
  border-color: var(--color-border-2);
}
.config-path {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  margin-bottom: 10px;
}
.restart-note {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 12px;
  padding: 10px 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--color-border-2);
}

/* Verify prompt */
.verify-prompt {
  padding: 16px 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-red);
  border-radius: var(--radius-sm);
  font-size: 14px;
  color: var(--color-text-soft);
  font-style: italic;
  margin-bottom: 4px;
}

/* API Keys */
.api-keys-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }
.api-key-card {
  padding: 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.api-key-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
}
.api-key-name { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.api-key-env {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-red);
  background: rgba(212,43,43,.08);
  padding: 2px 8px;
  border-radius: 4px;
}
.api-key-desc { font-size: 13px; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 12px; }
.api-key-tools { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.unlocks-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); }
.tool-ref {
  font-size: 11px;
  font-family: var(--font-mono);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  color: var(--color-text-soft);
  padding: 2px 7px;
  border-radius: 4px;
}
.btn-sm { padding: 6px 12px; font-size: 12px; white-space: nowrap; }
.api-key-note {
  font-size: 12px;
  color: var(--color-text-muted);
  padding: 12px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  line-height: 1.6;
}

/* Examples */
.examples-list { display: flex; flex-direction: column; gap: 20px; margin-top: 24px; }
.example-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
}
.example-category {
  display: block;
  padding: 8px 16px;
  background: var(--color-surface-2);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
}
.example-user, .example-ai {
  padding: 14px 16px;
  display: flex;
  gap: 12px;
  font-size: 13px;
  line-height: 1.6;
}
.example-user { background: var(--color-surface); color: var(--color-text-soft); }
.example-ai { background: var(--color-bg); color: var(--color-text-muted); border-top: 1px solid var(--color-border); }
.bubble-label {
  font-size: 10px;
  font-weight: 700;
  font-family: var(--font-mono);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  white-space: nowrap;
  padding-top: 2px;
}

/* Sidebar */
.install-sidebar {
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.sidebar-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 20px;
}
.sidebar-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 14px;
}
.sidebar-nav { display: flex; flex-direction: column; gap: 2px; }
.sidebar-link {
  font-size: 13px;
  color: var(--color-text-soft);
  padding: 5px 8px;
  border-radius: var(--radius-sm);
  transition: all var(--transition);
  display: block;
}
.sidebar-link:hover { color: var(--color-text); background: var(--color-surface-2); }

.sidebar-callout { background: rgba(212,43,43,.06); border-color: rgba(212,43,43,.2); }
.sidebar-two-steps {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-red);
  margin-bottom: 12px;
}
.sidebar-steps {
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}
.sidebar-steps li { font-size: 13px; color: var(--color-text-soft); line-height: 1.5; }
.sidebar-note { font-size: 12px; color: var(--color-text-muted); line-height: 1.6; }

.sidebar-resources { display: flex; flex-direction: column; gap: 8px; }
.sidebar-resource-link {
  font-size: 13px;
  color: var(--color-text-soft);
  transition: color var(--transition);
  display: block;
}
.sidebar-resource-link:hover { color: var(--color-text); }
</style>
