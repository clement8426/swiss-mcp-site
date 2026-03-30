<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const menuOpen = ref(false)
const localePath = useLocalePath()

const navLinks = computed(() => [
  { to: localePath('/'), label: t('nav.home') },
  { to: localePath('/tools'), label: t('nav.tools') },
  { to: localePath('/install'), label: t('nav.install') },
])

watch(() => route.path, () => { menuOpen.value = false })
</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="logo">
          <span class="logo-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="6" fill="#D42B2B"/>
              <rect x="13" y="6" width="6" height="20" fill="white"/>
              <rect x="6" y="13" width="20" height="6" fill="white"/>
            </svg>
          </span>
          <span class="logo-text">{{ t('nav.brand') }}</span>
        </NuxtLink>

        <!-- Desktop nav -->
        <ul class="nav-links hide-mobile">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink :to="link.to" class="nav-link" :class="{ active: route.path === link.to }">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Actions -->
        <div class="nav-actions">
          <AppLangSwitcher class="hide-mobile" />
          <a
            href="https://github.com/clement8426/swiss-mcp-site"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-ghost hide-mobile"
            :aria-label="t('nav.github')"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/>
            </svg>
            {{ t('nav.github') }}
          </a>
          <NuxtLink :to="localePath('/install')" class="btn btn-primary hide-mobile">
            {{ t('nav.getStarted') }}
          </NuxtLink>
          <!-- Mobile burger -->
          <button class="burger show-mobile" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" :aria-label="t('nav.menuToggle')">
            <span class="burger-bar" :class="{ open: menuOpen }"/>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile menu -->
    <div class="mobile-menu show-mobile" :class="{ visible: menuOpen }">
      <ul>
        <li v-for="link in navLinks" :key="link.to">
          <NuxtLink :to="link.to" class="mobile-nav-link" :class="{ active: route.path === link.to }">
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
      <div class="mobile-actions">
        <AppLangSwitcher style="width:100%;justify-content:center" />
        <a href="https://github.com/clement8426/swiss-mcp-site" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width:100%;justify-content:center">
          {{ t('nav.github') }}
        </a>
        <NuxtLink :to="localePath('/install')" class="btn btn-primary" style="width:100%;justify-content:center">
          {{ t('nav.getStarted') }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(13, 15, 18, 0.88);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  gap: 16px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--color-text);
  letter-spacing: -0.02em;
  flex-shrink: 0;
}
.logo:hover .logo-text { color: var(--color-red-hover); }
.logo-icon { flex-shrink: 0; }
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-link {
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-soft);
  transition: all var(--transition);
}
.nav-link:hover, .nav-link.active { color: var(--color-text); background: var(--color-surface-2); }
.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.burger {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-sm);
  position: relative;
}
.burger:hover { background: var(--color-surface-2); }
.burger-bar,
.burger-bar::before,
.burger-bar::after {
  content: '';
  display: block;
  width: 18px; height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: all 0.2s ease;
}
.burger-bar { position: relative; }
.burger-bar::before { position: absolute; top: -5px; }
.burger-bar::after  { position: absolute; top: 5px; }
.burger-bar.open { background: transparent; }
.burger-bar.open::before { transform: rotate(45deg); top: 0; }
.burger-bar.open::after  { transform: rotate(-45deg); top: 0; }

.mobile-menu {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease;
  border-top: 1px solid transparent;
}
.mobile-menu.visible {
  max-height: 480px;
  border-top-color: var(--color-border);
}
.mobile-menu ul { padding: 12px 24px; display: flex; flex-direction: column; gap: 4px; }
.mobile-nav-link {
  display: block;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-soft);
}
.mobile-nav-link:hover, .mobile-nav-link.active {
  background: var(--color-surface-2);
  color: var(--color-text);
}
.mobile-actions {
  padding: 12px 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
