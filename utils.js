const axios = require('axios');

exports.getAudioFromUrl = async (query) => {
  const apiKey = 'lol'; // remplace par ta clé lolhuman si tu en as une
  const url = `https://api.lolhuman.xyz/api/ytplay?apikey=${apiKey}&query=${encodeURIComponent(query)}`;

  const res = await axios.get(url);
  const downloadUrl = res.data.result.audio;

  const audioRes = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
  return Buffer.from(audioRes.data);
};
