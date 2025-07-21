const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN; // sécurise ton token via les variables Railway
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Hello depuis Railway !");
});
