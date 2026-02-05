# Publishing Guide

This guide will help you publish the plugin to npm and make it available for PicGo users.

## Prerequisites

1. **npm account**: Create one at [npmjs.com](https://www.npmjs.com/)
2. **npm login**: Run `npm login` and enter your credentials
3. **GitHub repository**: Push code to https://github.com/hu-qi/picgo-plugin-huaweicloud-obs

## Pre-Publishing Checklist

- [x] All code is tested and working
- [x] README.md is complete and accurate
- [x] CHANGELOG.md is updated with version 1.0.0
- [x] package.json has correct metadata
- [x] LICENSE file is present (MIT)
- [x] .gitignore excludes unnecessary files
- [x] GitHub repository is set up

## Publishing Steps

### 1. Push to GitHub

```bash
# Make sure you're in the project directory
cd /Users/huqi/Develop/aigc/vibe-coding/picgo-plugin-obs

# Create initial commit (if not done)
git add .
git commit -m "Initial commit: PicGo Huawei Cloud OBS Plugin v1.0.0"

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2. Publish to npm

```bash
# Login to npm (if not already logged in)
npm login

# Verify package.json
npm run test  # Run tests to ensure everything works

# Publish to npm
npm publish

# If this is your first publish and you want to make it public
npm publish --access public
```

### 3. Verify Publication

After publishing, verify:

1. **npm package page**: https://www.npmjs.com/package/picgo-plugin-huaweicloud-obs
2. **Installation test**:
   ```bash
   # In a different directory
   npm install -g picgo
   picgo install huaweicloud-obs
   ```

### 4. Submit to Awesome-PicGo

Create a PR to add your plugin to the [Awesome-PicGo](https://github.com/PicGo/Awesome-PicGo) list:

1. Fork the repository
2. Add your plugin to the list:
   ```markdown
   - [picgo-plugin-huaweicloud-obs](https://github.com/hu-qi/picgo-plugin-huaweicloud-obs) - Upload files to Huawei Cloud OBS
   ```
3. Submit a pull request

## Post-Publishing

### Update README badges

Add badges to your README.md:

```markdown
[![npm version](https://badge.fury.io/js/picgo-plugin-huaweicloud-obs.svg)](https://www.npmjs.com/package/picgo-plugin-huaweicloud-obs)
[![downloads](https://img.shields.io/npm/dm/picgo-plugin-huaweicloud-obs.svg)](https://www.npmjs.com/package/picgo-plugin-huaweicloud-obs)
[![license](https://img.shields.io/npm/l/picgo-plugin-huaweicloud-obs.svg)](https://github.com/hu-qi/picgo-plugin-huaweicloud-obs/blob/main/LICENSE)
```

### Monitor and Maintain

- Watch for issues on GitHub
- Respond to user feedback
- Plan future updates based on user needs

## Version Updates

For future versions:

1. Update version in `package.json`
2. Update `CHANGELOG.md` with changes
3. Commit changes
4. Create a git tag: `git tag v1.x.x`
5. Push tag: `git push --tags`
6. Publish: `npm publish`

## Troubleshooting

### "Package name already exists"

- The package name might be taken
- Try a different name or contact npm support

### "You must be logged in"

- Run `npm login` and enter credentials
- Verify with `npm whoami`

### "403 Forbidden"

- You might not have permission
- Use `npm publish --access public` for scoped packages

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [PicGo Plugin Development](https://picgo.github.io/PicGo-Core-Doc/zh/dev-guide/cli.html)
- [Semantic Versioning](https://semver.org/)
