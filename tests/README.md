# Tests

This directory contains test scripts for the PicGo Huawei Cloud OBS plugin.

## Test Scripts

### test.js

Basic image upload test script.

**Usage:**

```bash
node tests/test.js /path/to/image.jpg
```

### test-video.js

Multi-format file upload test (videos, documents, etc.).

**Usage:**

```bash
# Upload video
node tests/test-video.js /path/to/video.mp4

# Upload document
node tests/test-video.js /path/to/document.pdf

# Upload PowerPoint
node tests/test-video.js /path/to/presentation.pptx
```

### verify-download.js

Download and verify uploaded files to ensure integrity.

**Usage:**

```bash
node tests/verify-download.js
```

## Configuration

Before running tests, create a `test-config.json` file in the project root:

```bash
cp test-config.example.json test-config.json
```

Then edit `test-config.json` with your OBS credentials:

```json
{
  "picBed": {
    "current": "huaweicloud-obs",
    "huaweicloud-obs": {
      "endpoint": "obs.cn-north-4.myhuaweicloud.com",
      "accessKeyId": "YOUR_ACCESS_KEY_ID",
      "secretAccessKey": "YOUR_SECRET_ACCESS_KEY",
      "bucket": "your-bucket-name",
      "path": "test/",
      "customUrl": ""
    }
  }
}
```

## Running Tests

```bash
# Using npm scripts
npm test                    # Run basic image test
npm run test:video          # Run multi-format test
npm run verify              # Verify downloaded files

# Direct execution
node tests/test.js image.jpg
node tests/test-video.js video.mp4
```

## Test Results

Successful uploads will display:

- Upload progress
- Generated URL
- Success confirmation

Example output:

```
=== PicGo Huawei Cloud OBS Plugin Test ===

Configuration:
- Endpoint: obs.cn-north-4.myhuaweicloud.com
- Bucket: huqi-blog
- Path: blog/

Starting upload...

[INFO] 正在上传: blog/image_1234567890_abc123.jpg
[SUCCESS] 上传成功: https://huqi-blog.obs.cn-north-4.myhuaweicloud.com/blog/image_1234567890_abc123.jpg

✅ Test completed successfully!
```
