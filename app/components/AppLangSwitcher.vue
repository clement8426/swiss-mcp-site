<script setup lang="ts">
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const langs = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'it', label: 'IT' },
]
</script>

<template>
  <div class="lang-switcher" role="navigation" :aria-label="t('langSwitcher.aria')">
    <NuxtLink
      v-for="lang in langs"
      :key="lang.code"
      :to="switchLocalePath(lang.code)"
      class="lang-btn"
      :class="{ active: locale === lang.code }"
      :aria-current="locale === lang.code ? 'true' : undefined"
    >
      {{ lang.label }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.lang-switcher {
  display: flex;
  align-items: center;
  gap: 1px;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 2px;
}
.lang-btn {
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 700;
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
  transition: all var(--transition);
  line-height: 1;
}
.lang-btn:hover { color: var(--color-text); background: var(--color-surface-3); }
.lang-btn.active {
  background: var(--color-surface-3);
  color: var(--color-text);
  border-color: var(--color-border-2);
}
</style>
