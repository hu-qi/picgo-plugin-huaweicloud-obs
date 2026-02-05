/**
 * Configuration schema for PicGo GUI
 */

const config = (ctx) => {
  const userConfig = ctx.getConfig('picBed.huaweicloud-obs') || {}
  
  return [
    {
      name: 'endpoint',
      type: 'input',
      default: userConfig.endpoint || 'obs.cn-north-4.myhuaweicloud.com',
      required: true,
      message: 'OBS Endpoint (e.g., obs.cn-north-4.myhuaweicloud.com)',
      alias: 'OBS 端点'
    },
    {
      name: 'accessKeyId',
      type: 'input',
      default: userConfig.accessKeyId || '',
      required: true,
      message: 'Access Key ID',
      alias: '访问密钥 ID'
    },
    {
      name: 'secretAccessKey',
      type: 'password',
      default: userConfig.secretAccessKey || '',
      required: true,
      message: 'Secret Access Key',
      alias: '访问密钥'
    },
    {
      name: 'bucket',
      type: 'input',
      default: userConfig.bucket || '',
      required: true,
      message: 'Bucket Name',
      alias: '存储桶名称'
    },
    {
      name: 'path',
      type: 'input',
      default: userConfig.path || '',
      required: false,
      message: 'Storage Path (e.g., blog/images/)',
      alias: '存储路径'
    },
    {
      name: 'customUrl',
      type: 'input',
      default: userConfig.customUrl || '',
      required: false,
      message: 'Custom Domain (optional, e.g., https://cdn.example.com)',
      alias: '自定义域名'
    }
  ]
}

module.exports = config
