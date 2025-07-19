# 𝑆𝛪𝑅~𝛭𝛥𝛸 MD - Bot Telegram + WhatsApp

## 🧩 Fonctionnalités
- Commandes Telegram : /pair /delpair
- Commandes WhatsApp : tagall, tictactoe, play (bientôt)

## 🚀 Déploiement sur Render

1. Crée un compte sur https://render.com
2. Connecte ton GitHub
3. Crée un nouveau Web Service et choisis ce repo
4. Commande de démarrage : `node telegramBot.js`
5. Variables d’environnement :
   - TELEGRAM_TOKEN=7953723093:AAHM43KNzzQgT10vlZTJ1S2e5LzklPvOMH4
   - NODE_VERSION=18

---

## 📁 Structure du projet

- `telegramBot.js` → Bot Telegram
- `whatsappBot.js` → Bot WhatsApp
- `config.json` → Paramètres
- `sessions/` → Sessions WhatsApp (QR codes)
