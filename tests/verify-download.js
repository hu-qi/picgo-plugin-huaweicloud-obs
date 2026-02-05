/**
 * Verify the newly uploaded file
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

const uploadedUrl = 'https://huqi-blog.obs.cn-north-4.myhuaweicloud.com/blog/test_upload_image_1770255663062_1770259117745_8ss8fz.png'
const outputPath = path.join(__dirname, 'downloaded_fixed.png')

console.log('Downloading fixed upload from:', uploadedUrl)
console.log('Saving to:', outputPath)

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
    console.log(`\nDownload complete!`)
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
      const originalPath = '/Users/huqi/.gemini/antigravity/brain/e2054abf-d21d-43a9-8857-87eb46856dd8/test_upload_image_1770255663062.png'
      const originalBuffer = fs.readFileSync(originalPath)
      
      if (buffer.length === originalBuffer.length) {
        console.log(`\n✅ File size matches original: ${buffer.length} bytes`)
        
        if (buffer.equals(originalBuffer)) {
          console.log(`✅ File content matches original perfectly!`)
        } else {
          console.log(`❌ File content differs from original`)
        }
      } else {
        console.log(`\n⚠️  File size differs: Downloaded ${buffer.length} bytes, Original ${originalBuffer.length} bytes`)
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
