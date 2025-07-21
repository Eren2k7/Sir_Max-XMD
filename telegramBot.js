// telegramBot.js

const { Telegraf } = require('telegraf');

// Remplace 'TON_TOKEN_ICI' par le vrai token de ton bot Telegram
const bot = new Telegraf(process.env.BOT_TOKEN || 'TON_TOKEN_ICI');

// Commande de démarrage
bot.start((ctx) => {
  ctx.reply(`👋 Salut ${ctx.from.first_name} ! Bienvenue sur mon bot Telegram.`);
});

// Commande d'aide
bot.help((ctx) => {
  ctx.reply("Voici les commandes disponibles:\n/start - Démarrer\n/help - Aide\n/ping - Vérifier si le bot fonctionne");
});

// Commande ping
bot.command('ping', (ctx) => {
  ctx.reply("🏓 Pong !");
});

// Message non reconnu
bot.on('text', (ctx) => {
  ctx.reply("Je n'ai pas compris 😅 Tape /help pour voir les commandes.");
});

// Lancer le bot
bot.launch()
  .then(() => console.log("✅ Bot Telegram lancé avec succès"))
  .catch((err) => console.error("❌ Erreur lors du démarrage du bot :", err));

// Graceful stop (optionnel pour Render)
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
