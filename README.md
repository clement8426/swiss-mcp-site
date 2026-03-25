# swiss-mcp-site

Site web **vitrine et documentation** autour des outils qui exploitent les **APIs publiques suisses** (transport, cartographie, opendata, parlement, registre du commerce, etc.).

## À quoi il sert

- **Comprendre** qu’il existe **deux façons** d’utiliser les mêmes briques : un **serveur MCP** (dans un assistant type Claude, Cursor, Windsurf) et une **CLI** `swiss` en terminal — sans les confondre.
- **Installer** : page dédiée avec comparatif, prérequis, configuration des clients MCP, commandes pour la CLI, et rappel sur les **clés API optionnelles** et les **fichiers de clés** (chemins différents selon MCP ou CLI).
- **Parcourir** la **liste des outils** (`swiss_*`) : catégories, paramètres, indication si une clé est nécessaire — pour savoir ce que tu peux demander à ton IA ou lancer en ligne de commande.

## Langues

L’interface est proposée en **anglais** (par défaut), **français**, **allemand** et **italien** (sélecteur de langue dans l’en-tête).

## Où sont les logiciels

Le site **ne remplace pas** l’installation des paquets : le MCP et la CLI se récupèrent via **npm** et les dépôts associés ([swiss-apis-mcp](https://github.com/clement8426/swiss-apis-mcp), [swiss-apis-cli](https://github.com/clement8426/swiss-apis-cli)). Le site sert surtout à **guider et à lister** ce qui existe.
