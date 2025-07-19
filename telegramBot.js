const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');
const { startWhatsApp, sessions, deleteSession } = require('./whatsappBot');
const config = require('./config.json');

const bot = new Telegraf(config.telegramToken);

bot.start((ctx) => ctx.reply(`🤖 Bienvenue sur ${config.botName} !\nUtilise /pair ou /delpair pour gérer ton compte WhatsApp.`));

bot.command('pair', async (ctx) => {
  const phone = ctx.message.text.split(' ')[1];
  if (!phone) return ctx.reply('⚠️ Usage: /pair <numéro sans +>');
  const code = await startWhatsApp(phone);
  ctx.reply(`📱 Code de pairage pour ${phone}:\n*${code}*`, { parse_mode: 'Markdown' });
});

bot.command('delpair', async (ctx) => {
  const phone = ctx.message.text.split(' ')[1];
  if (!phone) return ctx.reply('⚠️ Usage: /delpair <numéro sans +>');
  await deleteSession(phone);
  ctx.reply(`✅ Session supprimée pour ${phone}`);
});

bot.launch();
console.log(`${config.botName} Telegram bot lancé.`)
