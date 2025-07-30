
# YTDL - YouTube Downloader

A comprehensive Node.js package for downloading YouTube videos and audio with multiple fallback methods.

## Features

- ✅ Download YouTube videos in multiple qualities
- ✅ Download YouTube audio/music
- ✅ Support for YouTube Shorts
- ✅ Multiple API endpoints for reliability
- ✅ Auto-fallback mechanism
- ✅ Simple and easy-to-use API

## Installation

```bash
npm install YTDL
```

## Quick Start

```javascript
const { autoDownload, downloadVideo, downloadAudio } = require('YTDL');

// Auto-detect and download (recommended)
const result = await autoDownload('https://youtu.be/VIDEO_ID');

if (result.success) {
  console.log('Title:', result.data.title);
  console.log('Download links:', result.data.downloadLinks);
}
```

## API Reference

### `autoDownload(url)`

Automatically detects the best download method and provides fallback options.

**Parameters:**
- `url` (string): YouTube video URL

**Returns:** Promise\<Object>

```javascript
const result = await autoDownload('https://youtu.be/3sDfsZboq3Y');
// Returns: { success: boolean, data: {...}, source: string }
```

### `downloadVideo(url)`

Downloads video using the Vidfly API (supports multiple qualities).

**Parameters:**
- `url` (string): YouTube video URL

**Returns:** Promise\<Object>

```javascript
const result = await downloadVideo('https://youtu.be/3sDfsZboq3Y');
// Returns: { success: boolean, data: { title, cover, duration, downloadLinks }, source: 'vidfly' }
```

### `downloadAudio(url)`

Downloads audio using the Clipto API.

**Parameters:**
- `url` (string): YouTube video URL

**Returns:** Promise\<Object>

```javascript
const result = await downloadAudio('https://youtu.be/3sDfsZboq3Y');
// Returns: { success: boolean, data: {...}, source: 'clipto' }
```

## Response Format

### Successful Response

```javascript
{
  success: true,
  data: {
    title: "Video Title",
    cover: "thumbnail_url",
    duration: "120 seconds",
    downloadLinks: [
      {
        id: 1,
        quality: "720p",
        format: "mp4",
        size: "25.4MB",
        url: "download_url",
        type: "video/mp4"
      }
    ]
  },
  source: "vidfly" // or "clipto"
}
```

### Error Response

```javascript
{
  success: false,
  error: "Error message",
  source: "vidfly" // or "clipto"
}
```

## Usage Examples

### Basic Video Download

```javascript
const YTDL = require('YTDL');

async function downloadYouTubeVideo() {
  try {
    const url = 'https://youtu.be/dQw4w9WgXcQ';
    const result = await YTDL.autoDownload(url);
    
    if (result.success) {
      console.log('✅ Download successful!');
      console.log('Title:', result.data.title);
      console.log('Available formats:');
      
      result.data.downloadLinks.forEach(link => {
        console.log(`- ${link.quality} (${link.format}) - ${link.size}`);
        console.log(`  Download: ${link.url}`);
      });
    } else {
      console.error('❌ Download failed:', result.error);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

downloadYouTubeVideo();
```

### Audio-Only Download

```javascript
const YTDL = require('YTDL');

async function downloadAudio() {
  const url = 'https://youtu.be/dQw4w9WgXcQ';
  const result = await YTDL.downloadAudio(url);
  
  if (result.success) {
    console.log('Audio download data:', result.data);
  }
}
```

### Multiple URLs

```javascript
const YTDL = require('YTDL');

const urls = [
  'https://youtu.be/dQw4w9WgXcQ',
  'https://youtu.be/3sDfsZboq3Y'
];

async function downloadMultiple() {
  for (const url of urls) {
    console.log(`\nProcessing: ${url}`);
    const result = await YTDL.autoDownload(url);
    
    if (result.success) {
      console.log(`✅ ${result.data.title}`);
    } else {
      console.log(`❌ Failed: ${result.error}`);
    }
  }
}

downloadMultiple();
```

## Supported URLs

- Regular YouTube videos: `https://www.youtube.com/watch?v=VIDEO_ID`
- YouTube Shorts: `https://www.youtube.com/shorts/VIDEO_ID`
- Short URLs: `https://youtu.be/VIDEO_ID`
- URLs with parameters: `https://youtu.be/VIDEO_ID?si=SHARE_ID`

## Error Handling

The package includes comprehensive error handling:

```javascript
const result = await YTDL.autoDownload(url);

if (!result.success) {
  switch (result.source) {
    case 'vidfly':
      console.log('Video download failed:', result.error);
      break;
    case 'clipto':
      console.log('Audio download failed:', result.error);
      break;
    default:
      console.log('Both methods failed');
      console.log('Video error:', result.videoError);
      console.log('Audio error:', result.audioError);
  }
}
```

## Dependencies

- `axios`: HTTP client for API requests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the package.json file for details.

## Disclaimer

This package is for educational purposes only. Make sure you comply with YouTube's Terms of Service and respect content creators' rights. The authors are not responsible for any misuse of this package.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**Made with ❤️ for the developer community**
