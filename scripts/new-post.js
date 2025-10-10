#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

async function createPost() {
    console.log('\n📝 Create New Blog Post\n');
    
    // Get post details
    const title = await question('Post title: ');
    if (!title) {
        console.log('❌ Title is required');
        rl.close();
        return;
    }
    
    const category = await question('Category (default: Blog): ') || 'Blog';
    const tags = await question('Tags (comma-separated): ');
    const excerpt = await question('Excerpt/Description: ');
    
    // Generate metadata
    const date = new Date();
    const dateString = formatDate(date);
    const slug = slugify(title);
    const filename = `${dateString}-${slug}.md`;
    
    // Create front matter
    const frontMatter = `---
title: "${title}"
date: ${dateString}
category: ${category}
${tags ? `tags: [${tags.split(',').map(t => t.trim()).join(', ')}]` : ''}
${excerpt ? `excerpt: "${excerpt}"` : ''}
permalink: /posts/${slug}.html
---

`;
    
    // Create post content template
    const content = `${frontMatter}
Write your post content here using Markdown.

## Heading 2

Your content goes here...

### Heading 3

- List item 1
- List item 2
- List item 3

\`\`\`javascript
// Code example
console.log('Hello, World!');
\`\`\`

**Bold text** and *italic text*.

[Link text](https://example.com)
`;
    
    // Write file
    const postsDir = path.join(__dirname, '..', 'content', 'posts');
    await fs.ensureDir(postsDir);
    
    const filePath = path.join(postsDir, filename);
    
    if (await fs.pathExists(filePath)) {
        console.log(`\n⚠️  File already exists: ${filename}`);
        const overwrite = await question('Overwrite? (y/N): ');
        if (overwrite.toLowerCase() !== 'y') {
            console.log('❌ Cancelled');
            rl.close();
            return;
        }
    }
    
    await fs.writeFile(filePath, content);
    
    console.log(`\n✅ Created new post: ${filename}`);
    console.log(`📁 Location: content/posts/${filename}`);
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Edit the post: content/posts/${filename}`);
    console.log(`   2. Start dev server: npm start`);
    console.log(`      (Auto-rebuilds on save with live reload!)\n`);
    
    rl.close();
}

createPost().catch(err => {
    console.error('❌ Error:', err);
    rl.close();
    process.exit(1);
});
