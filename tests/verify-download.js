/**
 * Verify the latest uploaded file
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

const uploadedUrl = 'https://huqi-blog.obs.cn-north-4.myhuaweicloud.com/blog/test_upload_image_1770255663062_1770261445478_tsqyk2.png'
const outputPath = path.join(__dirname, 'fixtures', 'downloaded_latest.png')
const originalPath = '/Users/huqi/.gemini/antigravity/brain/e2054abf-d21d-43a9-8857-87eb46856dd8/test_upload_image_1770255663062.png'

console.log('Downloading from:', uploadedUrl)
console.log('Saving to:', outputPath)
console.log()

https.get(uploadedUrl, (response) => {
  if (response.statusCode !== 200) {
    console.error('Failed to download. Status:', response.statusCode)
    process.exit(1)
  }

  const fileStream = fs.createWriteStream(outputPath)
  
  let totalBytes = 0
  response.on('data', (chunk) => {
    totalBytes += chunk.length
  })

  response.pipe(fileStream)

  fileStream.on('finish', () => {
    fileStream.close()
    console.log(`Download complete!`)
    console.log(`File size: ${totalBytes} bytes`)
    
    // Check file type
    const { execSync } = require('child_process')
    try {
      const fileType = execSync(`file "${outputPath}"`).toString()
      console.log(`\nFile type: ${fileType}`)
      
      // Read first few bytes
      const buffer = fs.readFileSync(outputPath)
      console.log(`\nFirst 16 bytes (hex):`)
      console.log(buffer.slice(0, 16).toString('hex'))
      
      // Check if it's a valid JPEG
      if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
        console.log(`\n✅ Valid JPEG file! Header matches: FF D8 FF`)
      } else {
        console.log(`\n❌ Invalid JPEG! Expected FF D8 FF, got: ${buffer[0].toString(16)} ${buffer[1].toString(16)} ${buffer[2].toString(16)}`)
      }
      
      // Compare with original
      if (fs.existsSync(originalPath)) {
        const originalBuffer = fs.readFileSync(originalPath)
        
        console.log(`\n=== Comparison with Original ===`)
        console.log(`Original size: ${originalBuffer.length} bytes`)
        console.log(`Downloaded size: ${buffer.length} bytes`)
        
        if (buffer.length === originalBuffer.length) {
          console.log(`✅ File size matches!`)
          
          if (buffer.equals(originalBuffer)) {
            console.log(`✅ File content matches perfectly! (byte-for-byte identical)`)
          } else {
            console.log(`❌ File content differs from original`)
            
            // Find first difference
            for (let i = 0; i < buffer.length; i++) {
              if (buffer[i] !== originalBuffer[i]) {
                console.log(`First difference at byte ${i}: downloaded=${buffer[i].toString(16)}, original=${originalBuffer[i].toString(16)}`)
                break
              }
            }
          }
        } else {
          console.log(`❌ File size differs!`)
        }
      }
      
    } catch (error) {
      console.error('Error checking file:', error.message)
    }
  })

  fileStream.on('error', (error) => {
    console.error('Error writing file:', error.message)
    fs.unlink(outputPath, () => {})
    process.exit(1)
  })
}).on('error', (error) => {
  console.error('Error downloading:', error.message)
  process.exit(1)
})
