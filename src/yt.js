
const axios = require('axios');

async function getYouTubeData(url) {
  const options = {
    method: 'POST',
    url: 'https://www.clipto.com/api/youtube',
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json',
      'priority': 'u=1, i',
      'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'cookie': 'NEXT_LOCALE=en; uu=cb76fec88e574494b55a0055a001e7a9; traffic-source=stripe-web-ytd-seo; md-mp3=default_second; bucket=12; country=BD; ip=103.115.254.242; mac-download=default; youtube-downloader-download-app=show; media-download-api=clipto; md-promotion=default; _ga=GA1.1.954271757.1753793373; _gcl_au=1.1.1044233383.1753793374; _uetsid=7b211a706c7a11f0a54cdb1c31687dd0; _uetvid=7b213c706c7a11f0b68477956829d770; _clck=52dkcp%7C2%7Cfy0%7C0%7C2036; _clsk=10wn9te%7C1753793377885%7C1%7C1%7Ck.clarity.ms%2Fcollect; newpath=newpath; _ga_ZVDHSR45N6=GS2.1.s1753793372$o1$g0$t1753793412$j20$l0$h0; XSRF-TOKEN=BNYQHPUg-xsDWiBuPESnMiIcceV0DNzI-_N0',
      'Referer': 'https://www.clipto.com/media-downloader/youtube-audio-downloader'
    },
    data: {
      url: url
    }
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
}

module.exports = { getYouTubeData };