/**
 * Test script for uploading non-image files (videos, documents, etc.)
 * This demonstrates that the plugin can handle any file type
 */

const fs = require('fs')
const path = require('path')
const handle = require('./src/uploader')

// Mock PicGo context for any file type
const createMockContext = (config, filePath) => {
  const fileBuffer = fs.readFileSync(filePath)
  const fileName = path.basename(filePath, path.extname(filePath))
  const extname = path.extname(filePath)

  return {
    output: [
      {
        buffer: fileBuffer,
        fileName: fileName,
        extname: extname
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
async function testFileUpload() {
  console.log('=== PicGo OBS Plugin - Multi-Format File Upload Test ===\n')

  // Load configuration
  const configPath = path.join(__dirname, 'test-config.json')
  if (!fs.existsSync(configPath)) {
    console.error('Error: test-config.json not found')
    process.exit(1)
  }

  const fullConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  const config = fullConfig.picBed['huaweicloud-obs']

  console.log('Configuration:')
  console.log('- Endpoint:', config.endpoint)
  console.log('- Bucket:', config.bucket)
  console.log('- Path:', config.path || '(root)')
  console.log()

  // Check for test file
  const testFilePath = process.argv[2]
  if (!testFilePath) {
    console.error('Error: Please provide a file path')
    console.log('Usage: node test-video.js <file-path>')
    console.log('\nExamples:')
    console.log('  node test-video.js video.mp4')
    console.log('  node test-video.js document.pdf')
    console.log('  node test-video.js presentation.pptx')
    process.exit(1)
  }

  if (!fs.existsSync(testFilePath)) {
    console.error('Error: File not found:', testFilePath)
    process.exit(1)
  }

  const stats = fs.statSync(testFilePath)
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2)
  
  console.log('Test File:', testFilePath)
  console.log('File Size:', fileSizeMB, 'MB')
  console.log('File Type:', path.extname(testFilePath))
  console.log()

  // Create mock context
  const ctx = createMockContext(config, testFilePath)

  try {
    console.log('Starting upload...\n')
    
    // Call the uploader
    const result = await handle(ctx)

    console.log('\n=== Upload Result ===')
    console.log('✅ Success! File uploaded to:')
    console.log(result.output[0].imgUrl)
    console.log()
    console.log('You can access the file at the URL above.')
    
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
  testFileUpload()
    .then(() => {
      console.log('\n✅ Test completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n❌ Test failed:', error.message)
      process.exit(1)
    })
}

module.exports = testFileUpload
