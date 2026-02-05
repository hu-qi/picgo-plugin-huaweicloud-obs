# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-05

### Added

- Initial release
- Support for uploading files to Huawei Cloud OBS
- GUI configuration support with Chinese and English labels
- Support for multiple file formats:
  - Images: JPG, PNG, GIF, BMP, WebP, SVG, ICO, TIFF
  - Videos: MP4, AVI, MOV, WMV, FLV, MKV, WebM, MPG
  - Audio: MP3, WAV, OGG, M4A, FLAC, AAC
  - Documents: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT
  - Archives: ZIP, RAR, 7Z, TAR, GZ
  - Code files: JSON, XML, HTML, CSS, JS, MD, CSV
- Custom storage path support
- Custom domain support
- Automatic unique filename generation
- Proper Content-Type detection for all file types
- Binary file integrity preservation

### Fixed

- Buffer corruption issue when uploading binary files
- Implemented temporary file approach for buffer uploads to ensure data integrity

### Technical Details

- Uses `esdk-obs-nodejs` SDK for OBS integration
- Writes buffers to temporary files before upload to avoid corruption
- Automatic cleanup of temporary files after upload
