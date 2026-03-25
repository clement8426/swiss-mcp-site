# swiss-mcp-site

Public website for **Swiss public-data tooling**: the [MCP server](https://github.com/clement8426/swiss-apis-mcp), the [terminal CLI](https://github.com/clement8426/swiss-apis-cli), install guides, and a browsable catalog of tools. Content is available in **English (default)**, **French**, **German**, and **Italian** (`@nuxtjs/i18n`, strategy `prefix_except_default`).

## Related repositories

| Repo | Role |
|------|------|
| [swiss-apis-mcp](https://github.com/clement8426/swiss-apis-mcp) | Model Context Protocol server — tools inside Claude, Cursor, Windsurf, etc. |
| [swiss-apis-cli](https://github.com/clement8426/swiss-apis-cli) | Standalone `swiss` CLI — same tool names, separate npm package and key file. |

**npm:** [swiss-apis-mcp](https://www.npmjs.com/package/swiss-apis-mcp) · [swiss-apis-cli](https://www.npmjs.com/package/swiss-apis-cli)

## Stack

- [Nuxt 4](https://nuxt.com/) (Vue 3)
- [@nuxtjs/i18n](https://i18n.nuxtjs.org/) — locale JSON in `i18n/` (`en.json`, `fr.json`, `de.json`, `it.json`)
- Tool metadata: `app/composables/useToolsData.ts` (names, categories, parameters — keep in sync with the MCP/CLI tool lists)

## Project layout

```
app/
  components/     # AppHeader, AppFooter, AppLangSwitcher, …
  layouts/
  pages/          # index, install, tools
  composables/
i18n/             # translation files (loaded by @nuxtjs/i18n)
public/
nuxt.config.ts
```

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

App runs at `http://localhost:3000` (default Nuxt port).

## Production build

```bash
npm run build
npm run preview   # local preview of the Node server build
```

Static export (if you use a static host):

```bash
npm run generate
```

See [Nuxt deployment](https://nuxt.com/docs/getting-started/deployment) for hosting (Node, serverless, static).

## Editing content

- **UI copy / SEO:** edit `i18n/<locale>.json` and keep keys aligned across all four files.
- **Tool list / descriptions:** `app/composables/useToolsData.ts` (should reflect what the MCP server and CLI actually expose).

## Licence

Unless stated otherwise in the repository, follow the licence of the parent project you ship this site with (often MIT for the Swiss APIs tooling).
