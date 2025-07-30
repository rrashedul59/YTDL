
const axios = require('axios');

async function ytdhortdl(youtubeUrl) {
  try {
    const apiUrl = `https://api.vidfly.ai/api/media/youtube/download?url=${encodeURIComponent(youtubeUrl)}`;

    const response = await axios.get(apiUrl, {
      headers: {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'priority': 'u=1, i',
        'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'x-app-name': 'vidfly-web',
        'x-app-version': '1.0.0',
        'Referer': 'https://vidfly.ai/'
      }
    });

    const res = response.data;

    if (res.code === 0 && res.data) {
      const { title, cover, duration, items } = res.data;

      return {
        success: true,
        data: {
          title,
          cover,
          duration: duration + ' seconds',
          downloadLinks: items.map((item, index) => ({
            id: index + 1,
            quality: item.quality || 'Unknown',
            format: item.format || 'Unknown',
            size: item.size || 'Unknown',
            url: item.url,
            type: item.mime || 'video/mp4'
          }))
        }
      };
    } else {
      return {
        success: false,
        error: 'Failed to fetch video data'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
}

module.exports = { ytdhortdl };
