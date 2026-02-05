/**
 * Example: Upload image using the plugin
 */

const handle = require('../src/uploader')

// Mock PicGo context
const ctx = {
  output: [
    {
      buffer: require('fs').readFileSync('./example-image.jpg'),
      fileName: 'example-image',
      extname: '.jpg'
    }
  ],
  getConfig: (key) => {
    if (key === 'picBed.huaweicloud-obs') {
      return {
        endpoint: 'obs.cn-north-4.myhuaweicloud.com',
        accessKeyId: 'YOUR_ACCESS_KEY_ID',
        secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
        bucket: 'your-bucket',
        path: 'images/',
        customUrl: ''
      }
    }
  },
  log: {
    info: console.log,
    success: console.log,
    error: console.error,
    warn: console.warn
  },
  emit: (event, data) => console.log('Event:', event, data)
}

// Upload
handle(ctx)
  .then(result => {
    console.log('Upload successful!')
    console.log('URL:', result.output[0].imgUrl)
  })
  .catch(error => {
    console.error('Upload failed:', error.message)
  })
