# Personal Blog - Custom Static Site Generator

A modern, SEO-optimized static blog with **Markdown support** and a custom build system. Write posts in Markdown, build to static HTML.

## Features

### 📝 Markdown-Based Workflow
- Write posts in Markdown (`.md` files)
- YAML front matter for metadata
- Automatic HTML generation
- Syntax highlighting for code blocks
- Jekyll-like workflow without Jekyll

### 🎨 Modern Design
- Clean, professional interface with gradient accents
- Responsive design that works on all devices
- Reader-friendly typography using Inter and Merriweather fonts
- Smooth animations and transitions
- Mobile-first approach

### 🚀 SEO Optimized
- Semantic HTML5 structure
- Comprehensive meta tags (Open Graph, Twitter Cards)
- Structured data (JSON-LD) for rich snippets
- XML sitemap for search engines
- Optimized page titles and descriptions
- Fast loading times

### 📱 Multi-Page Structure
- **Home Page** - Featured and recent posts
- **Blog Page** - All blog posts in grid layout
- **About Page** - Personal information
- **Individual Post Pages** - Full article content with SEO metadata

### ✨ Interactive Features
- Mobile navigation menu
- Reading progress bar on article pages
- Smooth scroll navigation
- Fade-in animations on scroll
- Copy-to-clipboard for code blocks
- Auto-generated table of contents for long articles
- Estimated reading time calculation

## Project Structure

```
windsurf-project/
├── content/
│   └── posts/              # Markdown blog posts
│       ├── 2025-10-01-getting-started-with-web-development.md
│       └── 2025-09-25-seo-best-practices.md
├── templates/              # HTML templates
│   ├── home.html          # Home page template
│   ├── blog.html          # Blog listing template
│   └── post.html          # Individual post template
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── main.js            # JavaScript functionality
├── scripts/
│   └── new-post.js        # Post generator script
├── dist/                  # Built site (generated)
├── build.js               # Build system
├── package.json           # Node.js dependencies
├── about.html             # Static about page
├── sitemap.xml            # XML sitemap
├── robots.txt             # Robots.txt
└── README.md              # This file
```

## Getting Started

### Installation

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)

2. **Install dependencies**:
   ```bash
   cd /Users/ryanc/Downloads/ryanc.wtf/CascadeProjects/windsurf-project
   npm install
   ```

### Writing Posts

#### Create a New Post

Use the post generator script:

```bash
npm run new-post
```

This will prompt you for:
- Post title
- Category
- Tags
- Excerpt/Description

It automatically creates a Markdown file with proper front matter in `content/posts/`.

#### Manual Post Creation

Create a file in `content/posts/` with the format: `YYYY-MM-DD-title.md`

Example: `2025-10-10-my-new-post.md`

```markdown
---
title: "My New Post"
date: 2025-10-10
category: Blog
tags: [tag1, tag2]
excerpt: "A brief description of the post"
permalink: /posts/my-new-post.html
---

Your content here in **Markdown** format.

## Headings

- Lists
- Work great

\`\`\`javascript
// Code blocks with syntax highlighting
console.log('Hello, World!');
\`\`\`
```

### Building the Site

Build the static site:

```bash
npm run build
```

This generates the complete site in the `dist/` directory.

### Local Development

Build and preview:

```bash
npm run dev
```

Then open `http://localhost:8000` in your browser

### Customization

#### Update Personal Information

1. **Replace placeholder text** in all HTML files:
   - Change `[Ryan Chan]` to your actual name
   - Update `yourdomain.com` to your actual domain
   - Replace social media links with your profiles
   - Update email addresses

2. **Customize colors** in `css/style.css`:
   - Edit CSS variables in the `:root` section
   - Primary color: `--primary-color`
   - Text colors: `--text-primary`, `--text-secondary`

3. **Add your content**:
   - Create new blog posts in the `posts/` directory
   - Use existing posts as templates
   - Update `blog.html` and `index.html` to link to new posts
   - Update `sitemap.xml` with new URLs

#### SEO Configuration

1. **Update meta tags** in each HTML file:
   - Page titles and descriptions
   - Open Graph images
   - Canonical URLs
   - Structured data (JSON-LD)

2. **Configure sitemap.xml**:
   - Update domain URLs
   - Add new pages as you create them
   - Update lastmod dates

3. **Setup robots.txt**:
   - Customize crawl rules if needed
   - Update sitemap URL

## Deployment

### Static Hosting Options

This site can be deployed to any static hosting service:

1. **GitHub Pages**
   - Push to GitHub repository
   - Enable GitHub Pages in repository settings
   - Access via `username.github.io/repository-name`

2. **Netlify**
   - Drag and drop the project folder
   - Or connect to Git repository
   - Automatic deployments on push

3. **Vercel**
   - Import from Git repository
   - Zero configuration needed
   - Automatic HTTPS

4. **Cloudflare Pages**
   - Connect to Git repository
   - Fast global CDN
   - Free SSL certificate

### Before Deploying

- [ ] Update all placeholder text
- [ ] Replace `yourdomain.com` with actual domain
- [ ] Add real social media links
- [ ] Update meta images (create og-image.jpg)
- [ ] Test all links
- [ ] Validate HTML/CSS
- [ ] Test on multiple devices
- [ ] Check page load speed
- [ ] Verify sitemap.xml URLs

## SEO Checklist

- [x] Semantic HTML structure
- [x] Meta descriptions on all pages
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Structured data (JSON-LD)
- [x] XML sitemap
- [x] robots.txt
- [x] Canonical URLs
- [x] Alt text for images
- [x] Mobile-responsive design
- [x] Fast loading times
- [x] Readable URLs
- [x] Internal linking

## Performance Tips

1. **Optimize images** before uploading:
   - Use WebP format when possible
   - Compress images (TinyPNG, ImageOptim)
   - Use appropriate dimensions

2. **Minimize files**:
   - Minify CSS and JavaScript for production
   - Remove unused code

3. **Use CDN**:
   - Consider using a CDN for assets
   - Already using Google Fonts CDN

4. **Enable caching**:
   - Configure server caching headers
   - Use service workers for offline support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available for personal and commercial use.

## Credits

- Fonts: Google Fonts (Inter, Merriweather)
- Icons: Can be added using Font Awesome or similar
- Design: Custom modern design

## Support

For questions or issues, please open an issue on the repository or contact via the social links in the About page.

---

**Happy Blogging! 🚀**
