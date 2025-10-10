# Project Structure Guide

## 📁 Complete Directory Structure

```
windsurf-project/
│
├── content/                          # All your content (Markdown files)
│   ├── posts/                        # Blog posts
│   │   ├── 2024-11-23-hello-world.md
│   │   ├── 2024-11-24-notes.md
│   │   ├── 2025-01-27-hkust-cuhk.md
│   │   └── cuhk-course-review/       # Subfolder for course reviews
│   │       ├── 2024-11-25-IERG2080.md
│   │       ├── 2024-12-25-CHEM1380.md
│   │       └── 2025-05-07-ENGG2780.md
│   │
│   ├── pages/                        # Static pages
│   │   ├── 404.md                    # Error page
│   │   ├── about.md                  # About page
│   │   ├── projects-archive.md       # Projects listing
│   │   ├── sitemap.md                # Site map
│   │   ├── tag-archive.md            # Tags listing
│   │   ├── terms.md                  # Terms & conditions
│   │   └── year-archive.md           # Posts by year
│   │
│   ├── projects/                     # Project portfolio
│   │   ├── IERG2080-Bitmap.md
│   │   └── random-name-picker.md
│   │
│   └── _draft/                       # Draft posts (not published)
│       ├── 2025-05-26-my-first-internship-mobut.md
│       └── archive-layout-with-content.md
│
├── templates/                        # HTML templates
│   ├── home.html                     # Home page template
│   ├── blog.html                     # Blog listing template
│   ├── post.html                     # Individual post template
│   ├── page.html                     # Static page template
│   └── project.html                  # Project page template
│
├── css/                              # Stylesheets
│   └── style.css                     # Main stylesheet
│
├── js/                               # JavaScript
│   └── main.js                       # Main JavaScript file
│
├── images/                           # Images & favicons
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-96x96.png
│   ├── apple-touch-icon-*.png
│   ├── android-chrome-192x192.png
│   ├── mstile-144x144.png
│   ├── icon.png
│   ├── safari.svg
│   ├── manifest.json
│   └── browserconfig.xml
│
├── files/                            # Downloadable files
│   ├── CENG3420.pdf
│   ├── CSCI1130_Final_revision.java
│   ├── CSCI2100.pdf
│   ├── ENGG2440.pdf
│   ├── ENGG2760.pdf
│   ├── ENGG2780.pdf
│   ├── ENGG2780_Midterm_Cheatsheet.pdf
│   ├── images/
│   └── proj-name-picker/
│
├── scripts/                          # Build scripts
│   └── new-post.js                   # Post generator
│
├── dist/                             # Generated site (output)
│   └── [built files]
│
├── build.js                          # Main build script
├── watch.js                          # File watcher for auto-rebuild
├── package.json                      # Dependencies
├── vercel.json                       # Vercel deployment config
├── robots.txt                        # SEO robots file
├── sitemap.xml                       # SEO sitemap
├── CNAME                             # Custom domain (optional)
├── README.md                         # Documentation
├── QUICKSTART.md                     # Quick start guide
└── STRUCTURE.md                      # This file
```

## 📝 Content Types

### 1. Blog Posts (`content/posts/`)

**Naming Convention:** `YYYY-MM-DD-title-slug.md`

**Example:**
```markdown
---
title: "My Blog Post"
date: 2025-10-10
category: Development
tags: [JavaScript, Web]
excerpt: "Brief description"
permalink: /posts/my-blog-post.html
---

Your content here...
```

**Subfolders:** Posts in subfolders (like `cuhk-course-review/`) automatically get the subfolder name as their category.

**Output:** `/posts/title-slug.html`

### 2. Static Pages (`content/pages/`)

**Naming Convention:** `page-name.md`

**Example:**
```markdown
---
title: "About Me"
description: "Learn more about me"
permalink: /about.html
---

Your page content...
```

**Output:** `/page-name.html` or custom permalink

### 3. Projects (`content/projects/`)

**Naming Convention:** `project-name.md`

**Example:**
```markdown
---
title: "My Awesome Project"
description: "Project description"
tags: [Python, AI]
permalink: /projects/my-awesome-project.html
---

Project details...
```

**Output:** `/projects/project-name.html`

### 4. Drafts (`content/_draft/`)

**Purpose:** Work-in-progress posts that won't be published

**Note:** Currently not included in build (can be enabled later)

## 🎨 Templates

### Available Templates

1. **`home.html`** - Home page with featured posts
2. **`blog.html`** - Blog listing page
3. **`post.html`** - Individual blog post
4. **`page.html`** - Static pages
5. **`project.html`** - Project showcase

### Template Placeholders

Use these placeholders in your templates:

- `{{title}}` - Page/post title
- `{{description}}` - Meta description
- `{{keywords}}` - Meta keywords
- `{{category}}` - Post category
- `{{date}}` - Formatted date
- `{{datetime}}` - ISO date format
- `{{content}}` - Main content (HTML)
- `{{readingTime}}` - Estimated reading time
- `{{featuredPosts}}` - Featured posts (home page)
- `{{recentPosts}}` - Recent posts (home page)
- `{{posts}}` - All posts (blog page)

## 🚀 Build Process

### What Happens During Build

1. **Clean** - Removes old `dist/` directory
2. **Copy Assets** - Copies `css/`, `js/`, `images/`, `files/`
3. **Copy Root Files** - Copies `robots.txt`, `sitemap.xml`, `CNAME`, etc.
4. **Load Templates** - Loads HTML templates
5. **Parse Content** - Reads all Markdown files
6. **Generate HTML** - Converts Markdown to HTML
7. **Apply Templates** - Inserts content into templates
8. **Write Files** - Saves to `dist/` directory

### Output Structure

```
dist/
├── index.html                        # Home page
├── blog.html                         # Blog listing
├── about.html                        # About page (if exists)
├── posts/                            # Blog posts
│   ├── getting-started.html
│   └── ...
├── projects/                         # Projects
│   ├── project-1.html
│   └── ...
├── 404.html                          # Error page (if exists)
├── css/                              # Stylesheets
├── js/                               # JavaScript
├── images/                           # Images
├── files/                            # Files
├── robots.txt
├── sitemap.xml
└── CNAME
```

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `npm start` | **Auto-rebuild + live reload** (recommended) |
| `npm run build` | Build once |
| `npm run dev` | Build and start server |
| `npm run watch` | Watch files and auto-rebuild |
| `npm run new-post` | Create new blog post |
| `npm run clean` | Clean dist/ directory |

## 📋 Front Matter Reference

### Required Fields

```yaml
---
title: "Your Title"              # Required
---
```

### Optional Fields

```yaml
---
title: "Your Title"
date: 2025-10-10                # Auto-extracted from filename
category: Development            # Single category
tags: [tag1, tag2]              # Array of tags
excerpt: "Brief description"     # For previews
description: "SEO description"   # Meta description
permalink: /custom/path.html     # Custom URL
slug: custom-slug                # URL slug (auto-generated)
---
```

### Category from Subfolder

Posts in `content/posts/cuhk-course-review/` automatically get `category: "cuhk course review"`.

## 🎯 Features

### ✅ Implemented

- ✅ Markdown to HTML conversion
- ✅ YAML front matter support
- ✅ Multiple content types (posts, pages, projects)
- ✅ Subfolder categories
- ✅ Syntax highlighting
- ✅ Reading time calculation
- ✅ Floating table of contents
- ✅ Auto-rebuild on file changes
- ✅ Live reload
- ✅ SEO optimization
- ✅ Responsive design

### 🔜 Coming Soon

- ⏳ Draft posts support
- ⏳ Tag/category archive pages
- ⏳ Pagination
- ⏳ Search functionality
- ⏳ RSS feed
- ⏳ Related posts

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

### GitHub Pages

```bash
npm run build
cd dist
git init
git add .
git commit -m "Deploy"
git push -f git@github.com:username/username.github.io.git main
```

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`

## 🆘 Troubleshooting

### Content not showing?

- Check file is in correct directory (`content/posts/`, `content/pages/`, etc.)
- Verify filename format for posts: `YYYY-MM-DD-title.md`
- Ensure front matter is valid YAML
- Run `npm run build` and check for errors

### Images/files not loading?

- Place files in `images/` or `files/` directory
- Reference with relative paths: `/images/photo.jpg` or `/files/document.pdf`
- Rebuild after adding new files

### Build fails?

```bash
npm run clean
npm install
npm run build
```

---

**Ready to start? Run `npm start` and begin creating content!** 🚀
