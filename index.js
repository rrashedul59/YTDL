
const { getYouTubeData } = require('./src/yt');
const { ytdhortdl } = require('./src/ytshort');

/**
 * YTDL - YouTube Video Downloader
 * A comprehensive YouTube downloader supporting both regular videos and shorts
 */

/**
 * Download YouTube audio using the clipto.com API
 * @param {string} url - YouTube video URL
 * @returns {Promise<Object>} Download data with audio links
 */
async function downloadAudio(url) {
  try {
    const result = await getYouTubeData(url);
    return {
      success: true,
      data: result,
      source: 'clipto'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      source: 'clipto'
    };
  }
}

/**
 * Download YouTube video/shorts using the vidfly.ai API
 * @param {string} url - YouTube video URL
 * @returns {Promise<Object>} Download data with video links
 */
async function downloadVideo(url) {
  try {
    const result = await ytdhortdl(url);
    return {
      ...result,
      source: 'vidfly'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      source: 'vidfly'
    };
  }
}

/**
 * Auto-detect and download YouTube content
 * Tries video download first, falls back to audio if needed
 * @param {string} url - YouTube video URL
 * @returns {Promise<Object>} Download data
 */
async function autoDownload(url) {
  // Try video download first
  const videoResult = await downloadVideo(url);
  
  if (videoResult.success) {
    return videoResult;
  }
  
  // Fall back to audio download
  const audioResult = await downloadAudio(url);
  
  if (audioResult.success) {
    return audioResult;
  }
  
  // Both failed
  return {
    success: false,
    error: 'Both video and audio download methods failed',
    videoError: videoResult.error,
    audioError: audioResult.error
  };
}

module.exports = {
  downloadAudio,
  downloadVideo,
  autoDownload
};

// Example usage if run directly
if (require.main === module) {
  const testUrl = 'https://youtu.be/3sDfsZboq3Y?si=mrqYnW00_fz3pyzG';
  
  console.log('YTDL - YouTube Downloader Test');
  console.log('==================================');
  
  autoDownload(testUrl)
    .then(result => {
      console.log('Result:', JSON.stringify(result, null, 2));
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
