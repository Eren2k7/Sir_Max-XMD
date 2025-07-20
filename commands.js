const fs = require('fs');
const { getAudioFromUrl } = require('./utils'); // Pour la commande !play

module.exports = async function handleCommand(sock, msg, sender, text) {
  const reply = async (txt, extra = {}) => {
    await sock.sendMessage(sender, { text: txt, ...extra });
  };

  // 🎯 !tagall
  if (text.toLowerCase() === '!tagall') {
    const metadata = await sock.groupMetadata(sender);
    const participants = metadata.participants.map(p => p.id);
    const mentionText = '📢 *TAGALL* :\n' + participants.map(p => `@${p.split('@')[0]}`).join(' ');
    
    return await sock.sendMessage(sender, {
      text: mentionText,
      mentions: participants
    });
  }

  // 🎮 !tictactoe
  if (text.toLowerCase() === '!tictactoe') {
    const board = `
🟦🟦🟦
🟦🟦🟦
🟦🟦🟦

*Réponds avec un numéro (1-9) pour jouer !*
    `;
    return reply(board);
  }

  // 🎵 !play [nom musique]
  if (text.toLowerCase().startsWith('!play')) {
    const query = text.split(' ').slice(1).join(' ');
    if (!query) return reply('❗ Utilise comme ça : `!play Booba – DKR`');

    await reply(`🎶 Recherche : *${query}*...\n⏳ Patiente...`);

    try {
      const audioBuffer = await getAudioFromUrl(query); // nécessite utils.js + API
      return await sock.sendMessage(sender, {
        audio: audioBuffer,
        mimetype: 'audio/mp4'
      });
    } catch (err) {
      return reply('❌ Impossible de récupérer la musique. Réessaie.');
    }
  }
};
