const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode-terminal');

const sessions = {};

async function startWhatsApp(number) {
  const sessionFile = path.join(__dirname, `./sessions/${number}.json`);
  const { state, saveState } = useSingleFileAuthState(sessionFile);
  
  const sock = makeWASocket({ auth: state });
  sessions[number] = sock;

  sock.ev.on('connection.update', ({ qr, connection }) => {
    if (qr) {
      qrcode.generate(qr, { small: true });
      sock.pairingCode = qr;
    }
    if (connection === 'open') {
      console.log(`✅ WhatsApp connecté: ${number}`);
    }
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

    if (text === 'tagall') {
      const group = await sock.groupMetadata(msg.key.remoteJid);
      const mentions = group.participants.map(p => p.id);
      await sock.sendMessage(msg.key.remoteJid, {
        text: `@${mentions.join(' @')}`,
        mentions
      });
    }

    if (text.startsWith('tictactoe')) {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎮 Fonction tictactoe en développement." });
    }

    if (text.startsWith('play')) {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎵 Fonction play bientôt disponible." });
    }
  });

  return sock.pairingCode || 'QR affiché dans la console';
}

async function deleteSession(number) {
  const sessionFile = path.join(__dirname, `./sessions/${number}.json`);
  if (fs.existsSync(sessionFile)) {
    fs.unlinkSync(sessionFile);
  }
  delete sessions[number];
}

module.exports = { startWhatsApp, sessions, deleteSession };
