# Changelog

## [1.0.0] - 2025-10-10

### ✨ Initial Release - Custom Static Site Generator

#### Features Added

**📝 Markdown Workflow**
- Custom Node.js-based static site generator
- Write blog posts in Markdown with YAML front matter
- Automatic HTML generation from Markdown files
- Syntax highlighting for code blocks using highlight.js
- Jekyll-like workflow without Jekyll dependency

**🚀 Build System**
- `npm run build` - Build static site to `dist/`
- `npm run dev` - Build and start local server
- `npm run new-post` - Interactive post generator
- `npm run clean` - Clean build directory
- Automatic post sorting by date
- Reading time calculation
- SEO metadata generation

**🎯 Modern Features**
- Responsive design (mobile-first)
- Syntax highlighting for code blocks
- Copy-to-clipboard for code
- Reading progress bar
- Fade-in animations on scroll
- Mobile navigation menu
- SEO optimized (Open Graph, Twitter Cards, JSON-LD)
- Fast static HTML output

#### Project Structure

```
ryanc.wtf/
├── content/posts/          # Markdown blog posts
├── templates/              # HTML templates
├── css/                    # Stylesheets
├── js/                     # JavaScript
├── scripts/                # Build scripts
├── dist/                   # Generated site
├── build.js                # Main build script
└── package.json            # Dependencies
```

#### Technical Stack

- **Build**: Node.js
- **Markdown**: marked.js
- **Front Matter**: front-matter
- **Syntax Highlighting**: highlight.js
- **File System**: fs-extra
- **Glob**: glob

#### Migration from Jekyll

This replaces Jekyll with a custom static site generator while maintaining:
- Markdown-based content workflow
- YAML front matter support
- Date-based post naming (`YYYY-MM-DD-title.md`)
- Similar directory structure
- Vercel deployment compatibility

#### Deployment

- Vercel configuration included (`vercel.json`)
- Build command: `npm run build`
- Output directory: `dist/`
- Compatible with Netlify, GitHub Pages, Cloudflare Pages

---

## Future Enhancements

Potential features for future versions:
- [ ] Search functionality
- [ ] Tag/category pages
- [ ] RSS feed generation
- [ ] Image optimization
- [ ] Draft posts support
- [ ] Related posts
- [ ] Comments integration
- [ ] Dark mode toggle
- [ ] Multiple themes
