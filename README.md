# picgo-plugin-huaweicloud-obs

> A PicGo plugin for uploading images to Huawei Cloud OBS (Object Storage Service)

[![npm version](https://badge.fury.io/js/picgo-plugin-huaweicloud-obs.svg)](https://badge.fury.io/js/picgo-plugin-huaweicloud-obs)
[![license](https://img.shields.io/github/license/hu-qi/picgo-plugin-huaweicloud-obs.svg)](https://github.com/hu-qi/picgo-plugin-huaweicloud-obs/blob/main/LICENSE)

## Features

- ✅ Upload files to Huawei Cloud OBS
- ✅ Support for custom storage paths
- ✅ Support for custom domains
- ✅ GUI configuration support
- ✅ Automatic unique filename generation
- ✅ Support for multiple file formats:
  - **Images**: JPG, PNG, GIF, BMP, WebP, SVG, ICO, TIFF
  - **Videos**: MP4, AVI, MOV, WMV, FLV, MKV, WebM, MPG
  - **Audio**: MP3, WAV, OGG, M4A, FLAC, AAC
  - **Documents**: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT
  - **Archives**: ZIP, RAR, 7Z, TAR, GZ
  - **And more**: JSON, XML, HTML, CSS, JS, MD, CSV

## Installation

### Via PicGo GUI

1. Open PicGo
2. Go to **Plugin Settings**
3. Search for `huaweicloud-obs`
4. Click **Install**

### Via PicGo CLI

```bash
picgo install huaweicloud-obs
```

### Manual Installation (for development)

```bash
git clone https://github.com/hu-qi/picgo-plugin-huaweicloud-obs.git
cd picgo-plugin-huaweicloud-obs
npm install
npm link
picgo install /path/to/picgo-plugin-huaweicloud-obs
```

## Configuration

### Required Settings

| Field                 | Description                    | Example                            |
| --------------------- | ------------------------------ | ---------------------------------- |
| **Endpoint**          | OBS endpoint URL               | `obs.cn-north-4.myhuaweicloud.com` |
| **Access Key ID**     | Huawei Cloud Access Key ID     | `YOUR_ACCESS_KEY_ID`               |
| **Secret Access Key** | Huawei Cloud Secret Access Key | `YOUR_SECRET_ACCESS_KEY`           |
| **Bucket**            | OBS bucket name                | `huqi-blog`                        |

### Optional Settings

| Field          | Description                       | Example                   |
| -------------- | --------------------------------- | ------------------------- |
| **Path**       | Storage path prefix in bucket     | `blog/images/`            |
| **Custom URL** | Custom domain for uploaded images | `https://cdn.example.com` |

### Configuration via GUI

1. Open PicGo
2. Go to **Image Hosting Settings**
3. Select **Huawei Cloud OBS**
4. Fill in the required fields
5. Click **Confirm**

### Configuration via CLI

Edit PicGo config file (`~/.picgo/config.json`):

```json
{
  "picBed": {
    "current": "huaweicloud-obs",
    "huaweicloud-obs": {
      "endpoint": "obs.cn-north-4.myhuaweicloud.com",
      "accessKeyId": "YOUR_ACCESS_KEY_ID",
      "secretAccessKey": "YOUR_SECRET_ACCESS_KEY",
      "bucket": "your-bucket-name",
      "path": "blog/",
      "customUrl": ""
    }
  }
}
```

## Usage

### Upload via GUI

1. Configure the plugin (see above)
2. Drag and drop images to PicGo
3. Images will be automatically uploaded to OBS
4. URLs will be copied to clipboard

### Upload via CLI

```bash
# Upload single image
picgo upload /path/to/image.jpg

# Upload multiple images
picgo upload /path/to/image1.jpg /path/to/image2.png
```

## OBS Endpoint List

Common Huawei Cloud OBS endpoints:

| Region     | Endpoint                               |
| ---------- | -------------------------------------- |
| Beijing 1  | `obs.cn-north-1.myhuaweicloud.com`     |
| Beijing 4  | `obs.cn-north-4.myhuaweicloud.com`     |
| Shanghai 1 | `obs.cn-east-3.myhuaweicloud.com`      |
| Guangzhou  | `obs.cn-south-1.myhuaweicloud.com`     |
| Hong Kong  | `obs.ap-southeast-1.myhuaweicloud.com` |

For a complete list, see [Huawei Cloud OBS Endpoints](https://developer.huaweicloud.com/endpoint?OBS).

## Getting Access Keys

1. Log in to [Huawei Cloud Console](https://console.huaweicloud.com/)
2. Click your username in the top right corner
3. Select **My Credentials**
4. Go to **Access Keys** tab
5. Click **Create Access Key**
6. Download and save your Access Key ID and Secret Access Key

## Troubleshooting

### Upload fails with "Access Denied"

- Verify your Access Key ID and Secret Access Key are correct
- Ensure your account has permission to write to the bucket
- Check if the bucket exists and is in the correct region

### Images not accessible after upload

- Verify bucket permissions (should allow public read)
- Check if the generated URL is correct
- If using custom domain, ensure DNS is configured correctly

### Plugin not showing in PicGo

- Restart PicGo after installation
- Check if the plugin is enabled in Plugin Settings
- Try reinstalling the plugin

## Development

```bash
# Clone repository
git clone https://github.com/hu-qi/picgo-plugin-huaweicloud-obs.git
cd picgo-plugin-huaweicloud-obs

# Install dependencies
npm install

# Link for local testing
npm link
picgo install /path/to/picgo-plugin-huaweicloud-obs
```

## License

MIT © [huqi](https://github.com/hu-qi)

## Related Links

- [PicGo](https://github.com/Molunerfinn/PicGo)
- [PicGo-Core](https://github.com/PicGo/PicGo-Core)
- [Huawei Cloud OBS](https://www.huaweicloud.com/product/obs.html)
- [OBS Node.js SDK](https://github.com/huaweicloud/huaweicloud-sdk-nodejs-obs)

## Changelog

### 1.0.0

- Initial release
- Support for basic OBS upload functionality
- GUI configuration support
- Custom domain support
