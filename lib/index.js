const COS = require('cos-nodejs-sdk-v5')
const fs = require('fs')

module.exports = {
  init(providerOptions) {
    const { bucket, region, secretId, secretKey } = providerOptions

    const cos = new COS({
      SecretId: secretId,
      SecretKey: secretKey,
      ...providerOptions
    })

    const upload = (file, customParams = {}) => {
      return new Promise((resolve, reject) => {
        const path = file.path ? `${file.path}/` : ''
        cos.putObject(
          {
            Bucket: bucket,
            Region: region,
            ContentType: file.mime,
            Key: `${path}${file.hash}${file.ext}`,
            StorageClass: 'STANDARD',
            Body: file.stream || Buffer.from(file.buffer, 'binary')
          },
          function (err, data) {
            if (err) {
              return reject(err)
            }
            file.url = 'https://' + data.Location
            resolve()
          }
        )
      })
    }

    return {
      upload(file, customParams = {}) {
        return upload(file, customParams)
      },
      uploadStream(file, customParams = {}) {
        return upload(file, customParams)
      },
      delete(file, customParams = {}) {
        return new Promise((resolve, reject) => {
          const path = file.path ? `${file.path}/` : ''
          cos.deleteObject(
            {
              Bucket: bucket,
              Region: region,
              Key: `${path}${file.hash}${file.ext}`
            },
            function (err, data) {
              if (err) {
                return reject(err)
              }
              resolve()
            }
          )
        })
      }
    }
  }
}
