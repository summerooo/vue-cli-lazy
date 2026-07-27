import request from './index'
import { cosConfig } from '@/config/cos'

// 获取 COS 临时密钥凭证接口
export const getCosCredentials = () => request.get('/cos/sts')

// 生成 COS 路径格式（按日期分类）
export function generateCosKey(file, prefix = 'uploads') {
  const date = new Date()
  const dir = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
  const timestamp = date.getTime()
  const ext = file.name.split('.').pop()
  const baseName = file.name.replace(`.${ext}`, '').slice(0, 20)
  return `${prefix}/${dir}/${timestamp}_${baseName}.${ext}`
}

// 上传文件到 COS
export async function uploadFile(file, options = {}) {
  const { prefix = 'uploads', onProgress } = options

  // 动态导入 COS SDK（优化打包体积）
  const COS = (await import('cos-js-sdk-v5')).default

  const cos = new COS({
    async getAuthorization(_options, callback) {
      const credentials = await getCosCredentials()

      callback({
        TmpSecretId: credentials.tmpSecretId,
        TmpSecretKey: credentials.tmpSecretKey,
        SecurityToken: credentials.sessionToken,
        StartTime: Math.floor(Date.now() / 1000),
        ExpiredTime: credentials.expiredTime,
      })
    },
  })

  const key = generateCosKey(file, prefix)

  return new Promise((resolve, reject) => {
    cos.uploadFile(
      {
        Bucket: cosConfig.bucket,
        Region: cosConfig.region,
        Key: key,
        Body: file,
        onProgress: progressData => {
          const percent = Math.round(progressData.percent * 100)
          onProgress?.(percent)
        },
      },
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            url: `https://${data.Location}`,
            key,
          })
        }
      },
    )
  })
}
