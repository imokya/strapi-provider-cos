# strapi-provider-upload-cos
在strapi中使用腾讯云cos对象存储

## Installation
```javascript
npm install strapi-provider-cos --save
```
## Usage
```javascript
module.exports = ({ env }) => {
  return {
    upload: {
      config: {
        provider: 'strapi-provider-cos',
        providerOptions: {
          secretId: env('COS_SECRET_ID'),
          secretKey: env('COS_SECRET_KEY'),
          appId: env('COS_APP_ID'),
          region: env('COS_REGION'),
          bucket: env('COS_BUCKET')
        }
      }
    }
  }
}
```