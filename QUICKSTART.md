# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Your First Post

```bash
npm run new-post
```

Follow the prompts to create a new Markdown post.

### 3. Build and Preview

```bash
npm run build
npm run dev
```

Open `http://localhost:8000` in your browser.

---

## 📝 Writing Posts

### Post Format

Posts are Markdown files in `content/posts/` with this naming convention:

```
YYYY-MM-DD-title-slug.md
```

Example: `2025-10-10-my-awesome-post.md`

### Front Matter

Every post needs YAML front matter at the top:

```markdown
---
title: "Your Post Title"
date: 2025-10-10
category: Development
tags: [JavaScript, Web Development]
excerpt_separator: <!--more-->
permalink: /posts/your-post-title
last_modified_at: 2025-10-10
hidden: false
---

Your content starts here...
```

**Subfolders:** Posts in subfolders (like `cuhk-course-review/`) automatically get the subfolder name as their category.

### Markdown Features

#### Headings
```markdown
## Heading 2
### Heading 3
```

#### Lists
```markdown
- Unordered list
- Another item

1. Ordered list
2. Another item
```

#### Code Blocks
````markdown
```javascript
const greeting = 'Hello, World!';
console.log(greeting);
```
````

#### Links and Images
```markdown
[Link text](https://example.com)
![Alt text](image-url.jpg)
```

#### Emphasis
```markdown
**Bold text**
*Italic text*
`Inline code`
```

---

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `npm start` | **🔥 Auto-rebuild + live reload** (recommended) |
| `npm run dev` | Build once and start server |
| `npm run build` | Build the static site to `dist/` |
| `npm run watch` | Watch files and auto-rebuild |
| `npm run new-post` | Create a new blog post |
| `npm run clean` | Clean the `dist/` directory |

### Development Workflow

**Option 1: Auto-rebuild with live reload (Recommended)**
```bash
npm start
```
- Automatically rebuilds when you save files
- Live reloads browser on changes
- Opens browser automatically

**Option 2: Manual rebuild**
```bash
npm run dev
```
- Builds once and starts server
- Run `npm run build` manually after changes

---

## 📁 Project Structure

```
ryanc.wtf/
├── content/posts/       ← Write Markdown posts here
├── templates/           ← HTML templates (customize design)
├── css/                 ← Stylesheets
├── js/                  ← JavaScript
├── dist/                ← Built site (deploy this)
└── build.js             ← Build system
```

---

## 🎨 Customization

### Change Theme Colors

Edit `css/style.css` and modify the CSS variables:

```css
:root {
    --primary-color: #667eea;  /* Change this */
    --text-primary: #1a202c;
    /* ... more variables */
}
```

### Modify Templates

Edit files in `templates/`:
- `home.html` - Home page layout
- `blog.html` - Blog listing page
- `post.html` - Individual post layout
- `page.html` - Static pages
- `project.html` - Project showcase

Use `{{placeholders}}` for dynamic content:
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


### Update Site Info

1. Edit `about.html` with your information
2. Update social links in templates
3. Change site name in navigation

---

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

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The `dist/` folder contains your complete static site.

### Deploy Options

**Vercel** :
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 💡 Tips

1. **Always build before deploying**: `npm run build`
2. **Test locally first**: `npm run dev`
3. **Use descriptive filenames**: `2025-10-10-descriptive-title.md`
4. **Write good excerpts**: They appear in previews and SEO
5. **Add tags**: Helps with organization and SEO
6. **Update sitemap.xml**: After adding many posts

---

## 🆘 Troubleshooting

**Build fails?**
- Check your Markdown syntax
- Ensure front matter is valid YAML
- Make sure dates are in YYYY-MM-DD format

**Posts not showing?**
- Check filename format: `YYYY-MM-DD-title.md`
- Ensure file is in `content/posts/`
- Rebuild: `npm run build`

**Styles not loading?**
- Check relative paths in templates
- Ensure CSS files are in `css/` directory
- Clear browser cache

**Content not showing?**
- Check file is in correct directory (`content/posts/`, `content/pages/`, etc.)
- Verify filename format for posts: `YYYY-MM-DD-title.md`
- Ensure front matter is valid YAML
- Run `npm run build` and check for errors

**Images/files not loading?**
- Place files in `images/` or `files/` directory
- Reference with relative paths: `/images/photo.jpg` or `/files/document.pdf`
- Rebuild after adding new files
---

## 📚 Learn More

- [Markdown Guide](https://www.markdownguide.org/)
- [YAML Syntax](https://yaml.org/)
- [Node.js Documentation](https://nodejs.org/)

---

**Happy Blogging! 🎉**
