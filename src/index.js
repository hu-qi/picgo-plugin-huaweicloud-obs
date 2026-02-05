/**
 * PicGo Plugin for Huawei Cloud OBS
 * 
 * This plugin enables PicGo to upload images to Huawei Cloud Object Storage Service (OBS)
 */

const handle = require('./uploader')
const config = require('./config')

module.exports = (ctx) => {
  const register = () => {
    ctx.helper.uploader.register('huaweicloud-obs', {
      name: 'Huawei Cloud OBS',
      handle: handle,
      config: config
    })
  }

  return {
    register,
    uploader: 'huaweicloud-obs',
    // GUI menu configuration
    guiMenu: (ctx) => {
      return [
        {
          label: '打开 OBS 控制台',
          async handle (ctx, guiApi) {
            const config = ctx.getConfig('picBed.huaweicloud-obs')
            if (config && config.endpoint) {
              const region = config.endpoint.match(/obs\.([^.]+)\./)?.[1] || 'cn-north-4'
              const consoleUrl = `https://console.huaweicloud.com/obs/?region=${region}#/obs/manager/buckets`
              guiApi.showNotification({
                title: 'OBS 控制台',
                body: '正在打开 Huawei Cloud OBS 控制台...'
              })
              require('electron').shell.openExternal(consoleUrl)
            } else {
              guiApi.showNotification({
                title: '提示',
                body: '请先配置 OBS 信息'
              })
            }
          }
        }
      ]
    }
  }
}
