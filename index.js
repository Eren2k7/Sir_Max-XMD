const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Petit serveur juste pour garder Render en vie
app.get("/", (req, res) => {
  res.send("Telegram bot is running.");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Lancer ton bot
require("./telegramBot");
