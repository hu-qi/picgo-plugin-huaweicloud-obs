# Contributing to picgo-plugin-huaweicloud-obs

Thank you for your interest in contributing! Here are some guidelines to help you get started.

## Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/hu-qi/picgo-plugin-huaweicloud-obs.git
   cd picgo-plugin-huaweicloud-obs
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure test credentials**

   ```bash
   cp test-config.example.json test-config.json
   # Edit test-config.json with your OBS credentials
   ```

4. **Run tests**

   ```bash
   # Test image upload
   node tests/test.js /path/to/image.jpg

   # Test video/document upload
   node tests/test-video.js /path/to/video.mp4
   ```

## Project Structure

```
picgo-plugin-obs/
├── src/                    # Source code
│   ├── index.js           # Main plugin entry
│   ├── uploader.js        # Upload logic
│   └── config.js          # Configuration schema
├── tests/                 # Test scripts
│   ├── test.js           # Image upload test
│   ├── test-video.js     # Multi-format upload test
│   └── verify-download.js # Download verification
├── examples/              # Usage examples
├── docs/                  # Documentation
├── package.json          # NPM package config
├── README.md             # Main documentation
├── CHANGELOG.md          # Version history
└── LICENSE               # MIT License
```

## Coding Standards

- Use 2 spaces for indentation
- Add comments for complex logic
- Follow existing code style
- Test your changes before submitting

## Submitting Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Reporting Issues

When reporting issues, please include:

- Plugin version
- Node.js version
- PicGo version
- Error messages and stack traces
- Steps to reproduce

## Adding New Features

Before adding new features, please:

1. Open an issue to discuss the feature
2. Wait for feedback from maintainers
3. Implement the feature following the guidelines
4. Add tests for the new feature
5. Update documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
