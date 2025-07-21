const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = process.env.PORT || 3000;

// Petit serveur pour satisfaire Render
app.get("/", (req, res) => {
  res.send("✅ Bot is running on Render (Web Service mode)");
});

app.listen(PORT, () => {
  console.log(`🚀 Web server started on port ${PORT}`);
});

// Ton bot Telegram
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Ton bot Telegram fonctionne GRATUITEMENT sur Render 😎");
});

console.log("🤖 Bot Telegram actif...");
