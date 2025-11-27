const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');
const fm = require('front-matter');
const { marked } = require('marked');
const hljs = require('highlight.js');

// Configure marked with syntax highlighting
marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(code, { language: lang }).value;
            } catch (err) {}
        }
        return code;
    },
    breaks: false,
    gfm: true,
    tables: true,
    sanitize: false
});

// Custom renderer for notice blocks
const renderer = new marked.Renderer();
const originalParagraph = renderer.paragraph;
renderer.paragraph = function(text) {
    // Handle notice blocks: {: .notice}
    if (text.includes('{: .notice}')) {
        const content = text.replace(/\s*\{:\s*\.notice\s*\}\s*$/, '');
        return `<div class="notice">${content}</div>\n`;
    }
    return originalParagraph.call(this, text);
};

marked.setOptions({ renderer });

// Paths
const CONTENT_DIR = path.join(__dirname, 'content');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');
const PAGES_DIR = path.join(CONTENT_DIR, 'pages');
const PROJECTS_DIR = path.join(CONTENT_DIR, 'projects');
const DRAFTS_DIR = path.join(CONTENT_DIR, '_draft');
const TEMPLATES_DIR = path.join(__dirname, 'templates');
const DIST_DIR = path.join(__dirname, 'dist');
const ASSETS_DIRS = ['css', 'js', 'images', 'files'];

// Load templates
function loadTemplate(name) {
    return fs.readFileSync(path.join(TEMPLATES_DIR, `${name}.html`), 'utf-8');
}

// Parse markdown file with front matter
function parseMarkdownFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { attributes, body } = fm(content);
    const html = marked(body);
    
    // Handle excerpt_separator
    let excerpt = attributes.excerpt || '';
    if (attributes.excerpt_separator && !excerpt) {
        const parts = body.split(attributes.excerpt_separator);
        if (parts.length > 1) {
            // Convert the excerpt part to HTML and strip tags for plain text
            const excerptHtml = marked(parts[0]);
            excerpt = excerptHtml.replace(/<[^>]*>/g, '').trim();
        }
    }
    
    return {
        ...attributes,
        content: html,
        excerpt: excerpt,
        filePath
    };
}

// Get all posts sorted by date
async function getAllPosts() {
    if (!fs.existsSync(POSTS_DIR)) return { allPosts: [], visiblePosts: [] };
    
    const postFiles = await glob('**/*.md', { cwd: POSTS_DIR });
    
    const posts = postFiles.map(file => {
        const post = parseMarkdownFile(path.join(POSTS_DIR, file));
        
        // Extract date from filename (YYYY-MM-DD-title.md) or use front matter
        const dateMatch = path.basename(file).match(/^(\d{4}-\d{2}-\d{2})/);
        if (dateMatch && !post.date) {
            post.date = dateMatch[1];
        }
        
        // Generate slug from filename if not provided
        if (!post.slug) {
            post.slug = path.basename(file, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
        }
        
        // Generate permalink if not provided
        if (!post.permalink) {
            post.permalink = `/posts/${post.slug}`;
        }
        
        // Extract category from subfolder (e.g., cuhk-course-review)
        const subfolder = path.dirname(file);
        if (subfolder !== '.' && !post.category) {
            post.category = subfolder.split('/')[0].replace(/-/g, ' ');
        }
        
        // Use last_modified_at for sorting if available, otherwise use date
        post.sortDate = post.last_modified_at || post.date;
        
        return post;
    });
    
    // Sort all posts by sortDate (newest first)
    posts.sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));
    
    // Filter out hidden posts for listings
    const visiblePosts = posts.filter(post => !post.hidden);
    
    return { allPosts: posts, visiblePosts };
}

// Get all pages
async function getAllPages() {
    if (!fs.existsSync(PAGES_DIR)) return [];
    
    const pageFiles = await glob('**/*.md', { cwd: PAGES_DIR });
    
    return pageFiles.map(file => {
        const page = parseMarkdownFile(path.join(PAGES_DIR, file));
        
        // Generate permalink if not provided
        if (!page.permalink) {
            const slug = path.basename(file, '.md');
            page.permalink = slug === 'index' ? '/' : `/${slug}`;
        }
        
        page.slug = page.slug || path.basename(file, '.md');
        
        return page;
    });
}

// Get all projects
async function getAllProjects() {
    if (!fs.existsSync(PROJECTS_DIR)) return [];
    
    const projectFiles = await glob('**/*.md', { cwd: PROJECTS_DIR });
    
    const projects = projectFiles.map(file => {
        const project = parseMarkdownFile(path.join(PROJECTS_DIR, file));
        
        // Generate permalink if not provided
        if (!project.permalink) {
            const slug = path.basename(file, '.md');
            project.permalink = `/projects/${slug}`;
        }
        
        project.slug = project.slug || path.basename(file, '.md');
        
        // Set order to a high number if not specified (will appear last)
        project.order = project.order || 999;
        
        return project;
    });
    
    // Sort by order field (ascending)
    projects.sort((a, b) => a.order - b.order);
    
    return projects;
}

// Calculate reading time
function calculateReadingTime(content) {
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    return readingTime;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
}

// Group posts by year and render HTML for the Year Archive page
function generateYearArchiveHtml(posts) {
    // Group posts by year (descending) - use display date for grouping
    const groups = posts.reduce((acc, post) => {
        const displayDate = post.last_modified_at || post.date;
        const year = new Date(displayDate).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(post);
        return acc;
    }, {});

    const years = Object.keys(groups)
        .map(y => parseInt(y, 10))
        .sort((a, b) => b - a);

    // Sort each year's posts by display date desc
    years.forEach(year => {
        groups[year].sort((a, b) => {
            const dateA = new Date(a.last_modified_at || a.date);
            const dateB = new Date(b.last_modified_at || b.date);
            return dateB - dateA;
        });
    });

    // Build HTML
    let html = '';
    years.forEach(year => {
        html += `\n<h2>${year}</h2>\n\n<ul>`;
        groups[year].forEach(post => {
            const displayDate = post.last_modified_at || post.date;
            const formatted = formatDate(displayDate);
            const href = post.permalink; // already clean url
            html += `\n  <li><a href="${href}">${post.title}</a> <span class="card-date">- ${formatted}</span></li>`;
        });
        html += `\n</ul>\n`;
    });

    return html;
}

// Generate tag archive HTML
function generateTagArchiveHtml(posts) {
    // Collect all tags and group posts by tag
    const postsByTag = {};
    const tagCounts = {};
    
    posts.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach(tag => {
                const normalizedTag = tag.trim();
                if (!postsByTag[normalizedTag]) {
                    postsByTag[normalizedTag] = [];
                    tagCounts[normalizedTag] = 0;
                }
                postsByTag[normalizedTag].push(post);
                tagCounts[normalizedTag]++;
            });
        }
    });

    // Sort tags by count (most popular first), then alphabetically
    const sortedTags = Object.keys(postsByTag).sort((a, b) => {
        const countDiff = tagCounts[b] - tagCounts[a];
        if (countDiff !== 0) return countDiff;
        return a.localeCompare(b);
    });

    if (sortedTags.length === 0) {
        return '<p>No tags found.</p>';
    }

    let html = '<h2>Popular Tags</h2>\n<div class="tag-cloud">\n';
    
    // Generate tag cloud with post counts
    sortedTags.forEach(tag => {
        const count = tagCounts[tag];
        const size = Math.min(Math.max(count, 1), 5); // Scale 1-5 for CSS sizing
        html += `  <a href="#tag-${tag.toLowerCase().replace(/\s+/g, '-')}" class="tag-link tag-size-${size}">${tag} (${count})</a>\n`;
    });
    
    html += '</div>\n\n<h2>Posts by Tag</h2>\n';

    // Generate posts grouped by tag
    sortedTags.forEach(tag => {
        const tagId = tag.toLowerCase().replace(/\s+/g, '-');
        html += `<h3 id="tag-${tagId}">${tag} <span class="tag-count">(${tagCounts[tag]} posts)</span></h3>\n<ul>\n`;
        
        // Sort posts within tag by display date (newest first)
        const tagPosts = postsByTag[tag].sort((a, b) => {
            const dateA = new Date(a.last_modified_at || a.date);
            const dateB = new Date(b.last_modified_at || b.date);
            return dateB - dateA;
        });
        tagPosts.forEach(post => {
            const displayDate = post.last_modified_at || post.date;
            const formattedDate = formatDate(displayDate);
            html += `  <li><a href="${post.permalink}">${post.title}</a> <span class="card-date">- ${formattedDate}</span></li>\n`;
        });
        html += `</ul>\n\n`;
    });

    return html;
}

// Generate search index
function generateSearchIndex(posts, projects) {
    const searchData = [];
    
    // Add posts to search index
    posts.forEach(post => {
        // Strip HTML tags from content for search
        const plainContent = post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        
        searchData.push({
            title: post.title,
            excerpt: post.excerpt || post.description || '',
            content: plainContent.substring(0, 500), // Limit content length
            url: post.permalink,
            category: post.category || 'Blog',
            tags: post.tags || [],
            date: post.last_modified_at || post.date,
            type: 'post'
        });
    });
    
    // Add projects to search index
    projects.forEach(project => {
        const plainContent = project.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        
        searchData.push({
            title: project.title,
            excerpt: project.excerpt || project.description || '',
            content: plainContent.substring(0, 500),
            url: project.permalink,
            category: 'Project',
            tags: project.tags || [],
            date: project.date || '',
            type: 'project'
        });
    });
    
    return searchData;
}

// Generate sitemap.xml
function generateSitemap(posts, pages, baseUrl = 'https://www.ryansloom.com') {
    const currentDate = new Date().toISOString().split('T')[0];
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add homepage
    xml += '    <url>\n';
    xml += `        <loc>${baseUrl}/</loc>\n`;
    xml += `        <lastmod>${currentDate}</lastmod>\n`;
    xml += '        <changefreq>weekly</changefreq>\n';
    xml += '        <priority>1.0</priority>\n';
    xml += '    </url>\n';
    
    // Add main pages
    const mainPages = [
        { url: '/post', priority: '0.9', changefreq: 'weekly' },
        { url: '/about', priority: '0.7', changefreq: 'monthly' },
        { url: '/year-archive', priority: '0.8', changefreq: 'weekly' },
        { url: '/tag-archive', priority: '0.8', changefreq: 'weekly' },
        { url: '/projects-archive', priority: '0.8', changefreq: 'weekly' }
    ];
    
    mainPages.forEach(page => {
        xml += '    <url>\n';
        xml += `        <loc>${baseUrl}${page.url}</loc>\n`;
        xml += `        <lastmod>${currentDate}</lastmod>\n`;
        xml += `        <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `        <priority>${page.priority}</priority>\n`;
        xml += '    </url>\n';
    });
    
    // Add all posts (including hidden ones)
    posts.forEach(post => {
        const postDate = post.last_modified_at || post.date;
        // Convert date to ISO format (YYYY-MM-DD)
        const formattedPostDate = new Date(postDate).toISOString().split('T')[0];
        xml += '    <url>\n';
        xml += `        <loc>${baseUrl}${post.permalink}</loc>\n`;
        xml += `        <lastmod>${formattedPostDate}</lastmod>\n`;
        xml += '        <changefreq>monthly</changefreq>\n';
        xml += '        <priority>0.8</priority>\n';
        xml += '    </url>\n';
    });
    
    // Add other pages
    pages.forEach(page => {
        // Skip pages already added in mainPages
        if (!['/year-archive', '/tag-archive', '/projects-archive', '/'].includes(page.permalink)) {
            xml += '    <url>\n';
            xml += `        <loc>${baseUrl}${page.permalink}</loc>\n`;
            xml += `        <lastmod>${currentDate}</lastmod>\n`;
            xml += '        <changefreq>monthly</changefreq>\n';
            xml += '        <priority>0.6</priority>\n';
            xml += '    </url>\n';
        }
    });
    
    xml += '</urlset>\n';
    return xml;
}

// Render post page
function renderPost(post, template) {
    const readingTime = calculateReadingTime(post.content);
    // Use last_modified_at for display if available, otherwise use date
    const displayDate = post.last_modified_at || post.date;
    const formattedDate = formatDate(displayDate);
    
    let html = template
        .replace(/{{title}}/g, post.title)
        .replace(/{{description}}/g, post.description || post.excerpt || '')
        .replace(/{{keywords}}/g, post.tags ? post.tags.join(', ') : '')
        .replace(/{{category}}/g, post.category || 'Blog')
        .replace(/{{date}}/g, formattedDate)
        .replace(/{{datetime}}/g, displayDate)
        .replace(/{{content}}/g, post.content)
        .replace(/{{readingTime}}/g, readingTime);
    
    return html;
}

// Render blog listing page
function renderBlogPage(posts, template) {
    const postsHtml = posts.map(post => {
        const readingTime = calculateReadingTime(post.content);
        // Use last_modified_at for display if available, otherwise use date
        const displayDate = post.last_modified_at || post.date;
        const formattedDate = formatDate(displayDate);
        const excerpt = post.excerpt || post.description || '';
        
        return `
            <article class="blog-card">
                <a href="${post.permalink}" class="card-link">
                    <div class="card-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
                    <div class="card-content">
                        <div class="card-meta">
                            <span class="card-category">${post.category || 'Blog'}</span>
                            <time class="card-date" datetime="${displayDate}">${formattedDate}</time>
                        </div>
                        <h2 class="card-title">${post.title}</h2>
                        <p class="card-excerpt">${excerpt}</p>
                        <div class="card-footer">
                            <span class="read-time">${readingTime} min read</span>
                        </div>
                    </div>
                </a>
            </article>
        `;
    }).join('\n');
    
    return template.replace('{{posts}}', postsHtml);
}

// Render projects listing page
function renderProjectsPage(projects, template) {
    const projectsHtml = projects.map(project => {
        const excerpt = project.excerpt || project.description || '';
        
        return `
            <article class="blog-card">
                <a href="${project.permalink}" class="card-link">
                    <div class="card-image" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);"></div>
                    <div class="card-content">
                        <div class="card-meta">
                            <span class="card-category">Project</span>
                        </div>
                        <h2 class="card-title">${project.title}</h2>
                        <p class="card-excerpt">${excerpt}</p>
                    </div>
                </a>
            </article>
        `;
    }).join('\n');
    
    return template.replace('{{projects}}', projectsHtml);
}

// Render about page with posts (now used as homepage)
function renderAboutHomePage(posts, template) {
    const featuredPosts = posts.slice(0, 3);
    const recentPosts = posts.slice(0, 6);
    
    const featuredHtml = featuredPosts.map(post => {
        const readingTime = calculateReadingTime(post.content);
        // Use last_modified_at for display if available, otherwise use date
        const displayDate = post.last_modified_at || post.date;
        const formattedDate = formatDate(displayDate);
        const excerpt = post.excerpt || post.description || '';
        
        return `
            <article class="featured-card">
                <a href="${post.permalink}" class="card-link">
                    <div class="card-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
                    <div class="card-content">
                        <div class="card-meta">
                            <span class="card-category">${post.category || 'Blog'}</span>
                            <time class="card-date" datetime="${displayDate}">${formattedDate}</time>
                        </div>
                        <h3 class="card-title">${post.title}</h3>
                        <p class="card-excerpt">${excerpt}</p>
                        <div class="card-footer">
                            <span class="read-time">${readingTime} min read</span>
                        </div>
                    </div>
                </a>
            </article>
        `;
    }).join('\n');
    
    const recentHtml = recentPosts.slice(3).map(post => {
        // Use last_modified_at for display if available, otherwise use date
        const displayDate = post.last_modified_at || post.date;
        const formattedDate = formatDate(displayDate);
        const excerpt = post.excerpt || post.description || '';
        
        return `
            <article class="post-item">
                <a href="${post.permalink}" class="post-link">
                    <div class="post-content">
                        <div class="post-meta">
                            <span class="post-category">${post.category || 'Blog'}</span>
                            <time class="post-date" datetime="${displayDate}">${formattedDate}</time>
                        </div>
                        <h3 class="post-title">${post.title}</h3>
                        <p class="post-excerpt">${excerpt}</p>
                    </div>
                </a>
            </article>
        `;
    }).join('\n');
    
    return template
        .replace('{{featuredPosts}}', featuredHtml)
        .replace('{{recentPosts}}', recentHtml);
}

// Main build function
async function build() {
    console.log('🚀 Starting build...\n');
    
    // Clean dist directory
    await fs.emptyDir(DIST_DIR);
    console.log('✓ Cleaned dist directory');
    
    // Copy static assets
    for (const dir of ASSETS_DIRS) {
        if (await fs.pathExists(dir)) {
            await fs.copy(path.join(__dirname, dir), path.join(DIST_DIR, dir));
            console.log(`✓ Copied ${dir}/`);
        }
    }
    
    // Copy root static files (excluding sitemap.xml which will be generated)
    const rootFiles = ['robots.txt', 'CNAME', 'favicon.ico'];
    for (const file of rootFiles) {
        if (await fs.pathExists(file)) {
            await fs.copy(file, path.join(DIST_DIR, file));
            console.log(`✓ Copied ${file}`);
        }
    }
    
    console.log('');
    
    // Load templates
    const postTemplate = loadTemplate('post');
    const pageTemplate = loadTemplate('page') || postTemplate;
    const projectTemplate = loadTemplate('project') || postTemplate;
    const blogTemplate = loadTemplate('blog');
    const projectsTemplate = loadTemplate('projects');
    const aboutTemplate = loadTemplate('about');
    console.log('✓ Loaded templates');
    
    // Get all content
    const { allPosts, visiblePosts } = await getAllPosts();
    const pages = await getAllPages();
    const projects = await getAllProjects();
    console.log(`✓ Found ${allPosts.length} posts (${visiblePosts.length} visible), ${pages.length} pages, ${projects.length} projects\n`);
    
    // Generate individual post pages (including hidden ones)
    for (const post of allPosts) {
        const html = renderPost(post, postTemplate);
        // Generate posts as .html files (no trailing slash)
        const outputPath = path.join(DIST_DIR, post.permalink + '.html');
        await fs.ensureDir(path.dirname(outputPath));
        await fs.writeFile(outputPath, html);
        console.log(`  ✓ Generated ${post.permalink}${post.hidden ? ' (hidden)' : ''}`);
    }
    
    if (allPosts.length > 0) console.log('');
    
    // Generate pages
    for (const page of pages) {
        // Inject auto-generated content for year archive (all posts including hidden)
        if (page.permalink === '/year-archive') {
            page.content = generateYearArchiveHtml(allPosts);
        }
        
        // Inject auto-generated content for tag archive (all posts including hidden)
        if (page.permalink === '/tag-archive') {
            page.content = generateTagArchiveHtml(allPosts);
        }
        
        // Note: projects-archive uses content from the markdown file directly
        // No auto-generation needed

        const html = renderPost(page, pageTemplate);
        // Generate pages as .html files (no trailing slash)
        let outputPath;
        if (page.permalink === '/') {
            outputPath = path.join(DIST_DIR, 'index.html');
        } else if (page.permalink.endsWith('.html')) {
            outputPath = path.join(DIST_DIR, page.permalink);
        } else {
            outputPath = path.join(DIST_DIR, page.permalink + '.html');
        }
        await fs.ensureDir(path.dirname(outputPath));
        await fs.writeFile(outputPath, html);
        console.log(`  ✓ Generated ${page.permalink}`);
    }
    
    if (pages.length > 0) console.log('');
    
    // Generate projects
    for (const project of projects) {
        const html = renderPost(project, projectTemplate);
        // If permalink doesn't end with .html, create a directory with index.html
        let outputPath;
        if (project.permalink.endsWith('.html')) {
            outputPath = path.join(DIST_DIR, project.permalink);
        } else {
            outputPath = path.join(DIST_DIR, project.permalink, 'index.html');
        }
        await fs.ensureDir(path.dirname(outputPath));
        await fs.writeFile(outputPath, html);
        console.log(`  ✓ Generated ${project.permalink}`);
    }
    
    if (projects.length > 0) console.log('');
    
    // Generate post listing page (only visible posts)
    if (blogTemplate) {
        const blogHtml = renderBlogPage(visiblePosts, blogTemplate);
        const blogOutput = path.join(DIST_DIR, 'post.html');
        await fs.writeFile(blogOutput, blogHtml);
        console.log('✓ Generated /post.html');
    }
    
    // Generate projects listing page
    if (projectsTemplate) {
        const projectsHtml = renderProjectsPage(projects, projectsTemplate);
        const projectsOutput = path.join(DIST_DIR, 'project.html');
        await fs.writeFile(projectsOutput, projectsHtml);
        console.log('✓ Generated /project.html');
    }
    
    // Generate homepage using about template with posts (only visible posts)
    if (aboutTemplate) {
        const homeHtml = renderAboutHomePage(visiblePosts, aboutTemplate);
        await fs.writeFile(path.join(DIST_DIR, 'index.html'), homeHtml);
        console.log('✓ Generated index.html');
    }
    
    // Generate sitemap.xml (all posts including hidden)
    const sitemapXml = generateSitemap(allPosts, pages);
    await fs.writeFile(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);
    console.log('✓ Generated sitemap.xml');
    
    // Generate search index (all posts including hidden)
    const searchIndex = generateSearchIndex(allPosts, projects);
    await fs.writeFile(path.join(DIST_DIR, 'search-index.json'), JSON.stringify(searchIndex));
    console.log('✓ Generated search-index.json');
    
    console.log('\n✨ Build complete! Output in dist/\n');
}

// Run build
build().catch(err => {
    console.error('❌ Build failed:', err);
    process.exit(1);
});
