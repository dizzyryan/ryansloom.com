# ryansloom.com

A custom-built static site generator powering my personal website, built with Node.js and deployed on Vercel.

**Live site:** [ryansloom.com](https://www.ryansloom.com)

## Tech Stack

- **Build:** Node.js with [marked](https://github.com/markedjs/marked), [front-matter](https://github.com/jxson/front-matter), and [highlight.js](https://highlightjs.org/)
- **Styling:** Custom CSS with dark mode support
- **Math:** MathJax for LaTeX rendering
- **Deploy:** Vercel
- **Search:** Client-side full-text search

## Project Structure

```
├── content/
│   ├── posts/          # Blog posts (Markdown)
│   ├── pages/          # Static pages (404, sitemap, archives, etc.)
│   └── projects/       # Project showcases
├── templates/          # HTML templates (post, page, blog, project, about)
├── css/                # Stylesheets
├── js/                 # Client-side JavaScript
├── images/             # Site images
├── files/              # Downloadable files (PDFs, etc.)
├── build.js            # Static site generator
├── watch.js            # File watcher for development
└── dist/               # Generated output (gitignored)
```

## Getting Started

### Prerequisites

- Node.js (v18+)

### Install

```bash
git clone https://github.com/dizzyryan/ryansloom.com.git
cd ryansloom.com
npm install
```

### Development

```bash
# Build and serve locally at http://localhost:8000
npm run dev

# Watch for changes and auto-rebuild
npm run watch

# Watch + serve (auto-opens browser)
npm start
```

### Build

```bash
npm run build
```

Output goes to `dist/`.

## Writing Content

### Creating a New Post

```bash
npm run new-post
```

Or manually create a Markdown file in `content/posts/` with the naming convention `YYYY-MM-DD-slug.md`:

```markdown
---
title: "Post Title"
date: 2025-01-01
category: Category
tags: [Tag1, Tag2]
permalink: /posts/slug
excerpt_separator: <!--more-->
---

First paragraph shown as excerpt.<!--more-->

Rest of the post content...
```

### Front Matter Fields

| Field | Description | Required |
|-------|-------------|----------|
| `title` | Post title | Yes |
| `date` | Publish date (YYYY-MM-DD) | Yes |
| `category` | Single category string | No |
| `tags` | Array of tags | No |
| `permalink` | Custom URL path | No (auto-generated) |
| `excerpt_separator` | Marks excerpt boundary | No |
| `last_modified_at` | Update date, used for sorting | No |
| `hidden` | Hide from blog listing | No |
| `order` | Sort order for projects | No |

### Content Features

- Standard Markdown (GFM) with tables, code blocks, and images
- Syntax highlighting for code blocks
- LaTeX math via `$inline$` and `$$display$$`
- Notice blocks with `{: .notice}` suffix
- Internal links using permalink paths (e.g., `/posts/slug`)

## Deployment

The site deploys automatically to Vercel on push. Configuration is in `vercel.json`.

To deploy manually, push to the `main` branch or run `vercel` CLI.

## License

[MIT](LICENSE) &copy; Ryan Chan