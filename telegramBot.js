const TelegramBot = require("node-telegram-bot-api");

// Utilise ton vrai token ici
const token = process.env.BOT_TOKEN || "7953723093:AAHM43KNzzQgT10vlZTJ1S2e5LzklPvOMH4";

// Active le bot en mode polling
const bot = new TelegramBot(token, { polling: true });

// Une simple commande pour tester
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Hello ! Le bot fonctionne !");
});
