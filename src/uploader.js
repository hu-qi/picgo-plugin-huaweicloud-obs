/**
 * Huawei Cloud OBS Uploader for PicGo
 */

const ObsClient = require('esdk-obs-nodejs')
const path = require('path')
const fs = require('fs')

/**
 * Get file extension from buffer or filename
 */
function getExtension(fileName, buffer) {
  if (fileName) {
    return path.extname(fileName)
  }
  // Try to detect from buffer (basic image type detection)
  if (buffer) {
    if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
      return '.jpg'
    } else if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
      return '.png'
    } else if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
      return '.gif'
    } else if (buffer[0] === 0x42 && buffer[1] === 0x4D) {
      return '.bmp'
    }
  }
  return '.jpg' // default
}

/**
 * Get MIME type from extension
 */
function getMimeType(ext) {
  const mimeTypes = {
    // Images
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.bmp': 'image/bmp',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.tiff': 'image/tiff',
    '.tif': 'image/tiff',
    
    // Videos
    '.mp4': 'video/mp4',
    '.avi': 'video/x-msvideo',
    '.mov': 'video/quicktime',
    '.wmv': 'video/x-ms-wmv',
    '.flv': 'video/x-flv',
    '.mkv': 'video/x-matroska',
    '.webm': 'video/webm',
    '.m4v': 'video/x-m4v',
    '.3gp': 'video/3gpp',
    '.mpg': 'video/mpeg',
    '.mpeg': 'video/mpeg',
    
    // Audio
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
    '.m4a': 'audio/mp4',
    '.flac': 'audio/flac',
    '.aac': 'audio/aac',
    
    // Documents
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.txt': 'text/plain',
    '.rtf': 'application/rtf',
    '.odt': 'application/vnd.oasis.opendocument.text',
    '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
    '.odp': 'application/vnd.oasis.opendocument.presentation',
    
    // Archives
    '.zip': 'application/zip',
    '.rar': 'application/x-rar-compressed',
    '.7z': 'application/x-7z-compressed',
    '.tar': 'application/x-tar',
    '.gz': 'application/gzip',
    
    // Code & Text
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.md': 'text/markdown',
    '.csv': 'text/csv'
  }
  return mimeTypes[ext.toLowerCase()] || 'application/octet-stream'
}

/**
 * Generate unique filename
 */
function generateFileName(originalName) {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const ext = path.extname(originalName)
  const basename = path.basename(originalName, ext)
  return `${basename}_${timestamp}_${random}${ext}`
}

/**
 * Upload handler for PicGo
 */
const handle = async (ctx) => {
  const config = ctx.getConfig('picBed.huaweicloud-obs')
  
  // Validate configuration
  if (!config) {
    throw new Error('请先配置 Huawei Cloud OBS')
  }
  
  if (!config.endpoint || !config.accessKeyId || !config.secretAccessKey || !config.bucket) {
    throw new Error('请完整配置 OBS 端点、访问密钥和存储桶')
  }

  // Initialize OBS client
  const obsClient = new ObsClient({
    access_key_id: config.accessKeyId,
    secret_access_key: config.secretAccessKey,
    server: config.endpoint.replace(/^https?:\/\//, '') // Remove protocol if present
  })

  const output = ctx.output
  const uploadTasks = []

  for (let i = 0; i < output.length; i++) {
    const item = output[i]
    
    uploadTasks.push((async () => {
      try {
        // Generate filename
        const fileName = item.fileName || `image_${Date.now()}`
        const ext = item.extname || getExtension(fileName, item.buffer)
        const uniqueFileName = generateFileName(fileName + ext)
        
        // Construct object key (path in bucket)
        let objectKey = uniqueFileName
        if (config.path) {
          // Ensure path ends with /
          const storagePath = config.path.endsWith('/') ? config.path : config.path + '/'
          objectKey = storagePath + uniqueFileName
        }

        // Prepare upload parameters
        const uploadParams = {
          Bucket: config.bucket,
          Key: objectKey,
          ContentType: getMimeType(ext)
        }

        // Upload using buffer or file path
        // Note: OBS SDK has issues with Buffer in Body parameter
        // We need to write to a temp file first for buffer uploads
        let tempFilePath = null
        
        if (item.buffer) {
          // Write buffer to temporary file
          const os = require('os')
          tempFilePath = path.join(os.tmpdir(), `picgo_${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`)
          fs.writeFileSync(tempFilePath, item.buffer)
          uploadParams.SourceFile = tempFilePath
        } else if (item.base64Image) {
          // Write base64 to temporary file
          const os = require('os')
          const buffer = Buffer.from(item.base64Image, 'base64')
          tempFilePath = path.join(os.tmpdir(), `picgo_${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`)
          fs.writeFileSync(tempFilePath, buffer)
          uploadParams.SourceFile = tempFilePath
        } else if (item.imgUrl && fs.existsSync(item.imgUrl)) {
          uploadParams.SourceFile = item.imgUrl
        } else {
          throw new Error(`无法获取图片数据: ${fileName}`)
        }

        // Upload to OBS
        ctx.log.info(`正在上传: ${objectKey}`)
        const result = await obsClient.putObject(uploadParams)
        
        // Clean up temp file
        if (tempFilePath && fs.existsSync(tempFilePath)) {
          try {
            fs.unlinkSync(tempFilePath)
          } catch (e) {
            // Ignore cleanup errors
          }
        }

        if (result.CommonMsg.Status < 300) {
          // Generate public URL
          let publicUrl
          if (config.customUrl) {
            // Use custom domain
            const customDomain = config.customUrl.replace(/\/$/, '')
            publicUrl = `${customDomain}/${objectKey}`
          } else {
            // Use default OBS URL format
            const endpoint = config.endpoint.replace(/^https?:\/\//, '')
            publicUrl = `https://${config.bucket}.${endpoint}/${objectKey}`
          }

          // Set URLs in output
          output[i].imgUrl = publicUrl
          output[i].url = publicUrl
          
          ctx.log.success(`上传成功: ${publicUrl}`)
        } else {
          throw new Error(`上传失败: ${result.CommonMsg.Message || '未知错误'}`)
        }
      } catch (error) {
        ctx.log.error(`上传失败: ${error.message}`)
        ctx.emit('notification', {
          title: '上传失败',
          body: error.message,
          text: ''
        })
        throw error
      }
    })())
  }

  // Wait for all uploads to complete
  await Promise.all(uploadTasks)
  
  return ctx
}

module.exports = handle
