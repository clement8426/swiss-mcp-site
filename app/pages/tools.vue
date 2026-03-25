<script setup lang="ts">
const { t } = useI18n()
const { allTools, totalTools, categories } = useToolsData()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('seo.toolsTitle'),
  description: () => t('seo.toolsDesc'),
  ogTitle: () => t('seo.toolsTitle'),
  ogDescription: () => t('seo.toolsDesc'),
})

const search = ref('')
const activeCategory = ref<string | null>(null)

const route = useRoute()

function syncCategoryFromRoute() {
  const cat = route.query.category
  activeCategory.value = typeof cat === 'string' && cat ? cat : null
}

onMounted(syncCategoryFromRoute)
watch(() => route.query.category, syncCategoryFromRoute)

const filtered = computed(() => {
  let list = allTools.value
  if (activeCategory.value) {
    list = list.filter(t => t.categoryId === activeCategory.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.params.some(p => p.toLowerCase().includes(q))
    )
  }
  return list
})

const groupedFiltered = computed(() => {
  if (activeCategory.value) return null
  const map: Record<string, typeof filtered.value> = {}
  for (const tool of filtered.value) {
    if (!map[tool.categoryId]) map[tool.categoryId] = []
    map[tool.categoryId].push(tool)
  }
  return map
})

function clearFilters() {
  search.value = ''
  activeCategory.value = null
}
</script>

<template>
  <div>
    <section class="page-header">
      <div class="container">
        <p class="eyebrow">{{ t('tools.eyebrow') }}</p>
        <h1 class="page-title">{{ t('tools.title', { count: totalTools }) }}</h1>
        <p class="page-desc">{{ t('tools.desc') }}</p>
        <p class="page-note">{{ t('tools.mcpCliNote') }}</p>
      </div>
    </section>

    <!-- Toolbar -->
    <div class="toolbar-sticky">
      <div class="container">
        <div class="toolbar">
          <!-- Search -->
          <div class="search-wrap">
            <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              v-model="search"
              type="search"
              class="search-input"
              :placeholder="t('tools.searchPlaceholder')"
            >
          </div>
          <!-- Category tabs -->
          <div class="cat-tabs">
            <button
              class="cat-tab"
              :class="{ active: !activeCategory }"
              @click="activeCategory = null"
            >
              {{ t('tools.filterAll') }}
            </button>
            <button
              v-for="cat in categories"
              :key="cat.id"
              class="cat-tab"
              :class="{ active: activeCategory === cat.id }"
              @click="activeCategory = cat.id"
            >
              {{ t('catLabel.' + cat.id) }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Results count -->
    <div class="container">
      <p class="results-count">{{ t('tools.count', { count: filtered.length }) }}</p>
    </div>

    <!-- Tools by category (ungrouped when searching/filtering) -->
    <div class="container tools-container">
      <!-- Active category or search: flat list -->
      <template v-if="activeCategory || search.trim()">
        <div v-if="filtered.length === 0" class="empty-state">
          <p class="empty-title">{{ t('tools.empty') }}</p>
          <p class="empty-desc">{{ t('tools.emptyDesc') }}</p>
          <button class="btn btn-secondary" @click="clearFilters">{{ t('tools.clearFilters') }}</button>
        </div>
        <div v-else class="tools-grid">
          <div v-for="tool in filtered" :key="tool.name" class="tool-card">
            <div class="tool-top">
              <code class="tool-name">{{ tool.name }}</code>
              <div class="tool-badges">
                <span v-if="tool.requiresAuth" class="badge-auth">{{ t('tools.keyRequired') }}</span>
                <span v-else class="badge-free">{{ t('tools.noKeyNeeded') }}</span>
              </div>
            </div>
            <p class="tool-desc">{{ tool.description }}</p>
            <div v-if="tool.params.length" class="tool-params">
              <p class="params-label">{{ t('tools.params') }}</p>
              <div class="params-list">
                <code v-for="param in tool.params" :key="param" class="param-tag">{{ param }}</code>
              </div>
            </div>
            <p v-else class="no-params">{{ t('tools.noParams') }}</p>
          </div>
        </div>
      </template>

      <!-- Default: grouped by category -->
      <template v-else>
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="category-section"
        >
          <div class="cat-heading">
            <span
              class="cat-icon"
              :style="{ background: cat.bgColor, color: cat.color }"
            >{{ cat.abbr }}</span>
            <div>
              <h2 class="cat-name">{{ t('catLabel.' + cat.id) }}</h2>
              <p class="cat-desc">{{ t('catDesc.' + cat.id) }}</p>
            </div>
          </div>
          <div class="tools-grid">
            <div
              v-for="tool in cat.tools"
              :key="tool.name"
              class="tool-card"
            >
              <div class="tool-top">
                <code class="tool-name">{{ tool.name }}</code>
                <div class="tool-badges">
                  <span v-if="tool.requiresAuth" class="badge-auth">{{ t('tools.keyRequired') }}</span>
                  <span v-else class="badge-free">{{ t('tools.noKeyNeeded') }}</span>
                </div>
              </div>
              <p class="tool-desc">{{ tool.description }}</p>
              <div v-if="tool.params.length" class="tool-params">
                <p class="params-label">{{ t('tools.params') }}</p>
                <div class="params-list">
                  <code v-for="param in tool.params" :key="param" class="param-tag">{{ param }}</code>
                </div>
              </div>
              <p v-else class="no-params">{{ t('tools.noParams') }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Bottom CTA -->
    <section class="bottom-cta">
      <div class="container">
        <h2>{{ t('tools.ctaTitle') }}</h2>
        <p>{{ t('tools.ctaDesc') }}</p>
        <NuxtLink :to="localePath('/install')" class="btn btn-primary">{{ t('tools.ctaLink') }}</NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-header { padding: 72px 0 48px; }
.page-title {
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}
.page-desc { font-size: 16px; color: var(--color-text-soft); max-width: 600px; line-height: 1.7; }
.page-note {
  margin-top: 16px;
  font-size: 14px;
  color: var(--color-text-muted);
  max-width: 720px;
  line-height: 1.65;
  padding: 14px 18px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--color-red);
}

/* Toolbar */
.toolbar-sticky {
  position: sticky;
  top: 60px;
  z-index: 90;
  background: rgba(13,15,18,0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
  padding: 12px 0;
}
.toolbar { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.search-wrap {
  position: relative;
  flex: 1;
  min-width: 200px;
  max-width: 320px;
}
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 8px 12px 8px 36px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--color-text);
  outline: none;
  transition: border-color var(--transition);
}
.search-input:focus { border-color: var(--color-border-2); }
.search-input::placeholder { color: var(--color-text-muted); }

.cat-tabs {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  overflow-x: auto;
}
.cat-tab {
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
  white-space: nowrap;
  transition: all var(--transition);
}
.cat-tab:hover { color: var(--color-text); background: var(--color-surface-2); }
.cat-tab.active { background: var(--color-surface-2); color: var(--color-text); border-color: var(--color-border-2); }

.results-count {
  margin: 16px 0 0;
  font-size: 13px;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

/* Tools container */
.tools-container { padding-bottom: 80px; }
.category-section { margin-bottom: 64px; }
.cat-heading {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  padding-top: 32px;
}
.cat-icon {
  width: 36px; height: 36px;
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  flex-shrink: 0;
  margin-top: 2px;
}
.cat-name { font-size: 20px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 4px; }
.cat-desc { font-size: 13px; color: var(--color-text-muted); line-height: 1.6; }

/* Tools grid */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
  margin-top: 16px;
}
.tool-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color var(--transition);
}
.tool-card:hover { border-color: var(--color-border-2); }
.tool-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
.tool-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-red);
  font-family: var(--font-mono);
  word-break: break-all;
}
.tool-badges { display: flex; gap: 4px; flex-shrink: 0; }
.badge-auth, .badge-free {
  font-size: 10px;
  font-weight: 600;
  font-family: var(--font-mono);
  padding: 2px 7px;
  border-radius: 4px;
  white-space: nowrap;
}
.badge-auth {
  background: rgba(212,43,43,.1);
  border: 1px solid rgba(212,43,43,.25);
  color: var(--color-red);
}
.badge-free {
  background: rgba(52,199,89,.1);
  border: 1px solid rgba(52,199,89,.25);
  color: #34c759;
}
.tool-desc { font-size: 13px; color: var(--color-text-soft); line-height: 1.6; }
.tool-params { margin-top: 4px; }
.params-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}
.params-list { display: flex; flex-wrap: wrap; gap: 4px; }
.param-tag {
  font-size: 11px;
  font-family: var(--font-mono);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  color: var(--color-text-soft);
  padding: 2px 8px;
  border-radius: 4px;
}
.no-params { font-size: 12px; color: var(--color-text-muted); font-style: italic; }

/* Empty state */
.empty-state {
  text-align: center;
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.empty-title { font-size: 18px; font-weight: 600; }
.empty-desc { font-size: 14px; color: var(--color-text-muted); }

/* Bottom CTA */
.bottom-cta {
  padding: 72px 0 96px;
  border-top: 1px solid var(--color-border);
}
.bottom-cta h2 {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}
.bottom-cta p { font-size: 15px; color: var(--color-text-soft); margin-bottom: 24px; }
</style>
