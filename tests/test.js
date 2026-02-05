/**
 * Test script for PicGo Huawei Cloud OBS Plugin
 * This script simulates PicGo's context and tests the upload functionality
 */

const fs = require('fs')
const path = require('path')
const handle = require('../src/uploader')

// Mock PicGo context
const createMockContext = (config, imagePath) => {
  const imageBuffer = fs.readFileSync(imagePath)
  const fileName = path.basename(imagePath, path.extname(imagePath))
  const extname = path.extname(imagePath)

  return {
    output: [
      {
        buffer: imageBuffer,
        fileName: fileName,
        extname: extname,
        width: 1024,
        height: 1024
      }
    ],
    getConfig: (key) => {
      if (key === 'picBed.huaweicloud-obs') {
        return config
      }
      return null
    },
    log: {
      info: (msg) => console.log('[INFO]', msg),
      success: (msg) => console.log('[SUCCESS]', msg),
      error: (msg) => console.error('[ERROR]', msg),
      warn: (msg) => console.warn('[WARN]', msg)
    },
    emit: (event, data) => {
      console.log('[EVENT]', event, data)
    }
  }
}

// Main test function
async function testUpload() {
  console.log('=== PicGo Huawei Cloud OBS Plugin Test ===\n')

  // Load configuration
  const configPath = path.join(__dirname, '..', 'test-config.json')
  if (!fs.existsSync(configPath)) {
    console.error('Error: test-config.json not found')
    console.log('Please create test-config.json with your OBS credentials')
    process.exit(1)
  }

  const fullConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  const config = fullConfig.picBed['huaweicloud-obs']

  console.log('Configuration:')
  console.log('- Endpoint:', config.endpoint)
  console.log('- Bucket:', config.bucket)
  console.log('- Path:', config.path || '(root)')
  console.log('- Custom URL:', config.customUrl || '(none)')
  console.log()

  // Check for test image
  const testImagePath = process.argv[2]
  if (!testImagePath) {
    console.error('Error: Please provide a test image path')
    console.log('Usage: node test.js <image-path>')
    process.exit(1)
  }

  if (!fs.existsSync(testImagePath)) {
    console.error('Error: Test image not found:', testImagePath)
    process.exit(1)
  }

  console.log('Test Image:', testImagePath)
  console.log()

  // Create mock context
  const ctx = createMockContext(config, testImagePath)

  try {
    console.log('Starting upload...\n')
    
    // Call the uploader
    const result = await handle(ctx)

    console.log('\n=== Upload Result ===')
    console.log('Success! Image uploaded to:')
    console.log(result.output[0].imgUrl)
    console.log()
    console.log('You can access the image at the URL above.')
    
    return result
  } catch (error) {
    console.error('\n=== Upload Failed ===')
    console.error('Error:', error.message)
    console.error('\nStack trace:')
    console.error(error.stack)
    process.exit(1)
  }
}

// Run test
if (require.main === module) {
  testUpload()
    .then(() => {
      console.log('\n✅ Test completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n❌ Test failed:', error.message)
      process.exit(1)
    })
}

module.exports = testUpload
