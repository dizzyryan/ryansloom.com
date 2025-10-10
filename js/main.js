// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Smooth scroll for anchor links with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 100; // Adjust this value based on your header height
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add reading progress bar for article pages
    if (document.querySelector('.article-content')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            progressBar.style.width = progress + '%';
        });
    }
    
    // Add fade-in animation for cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply fade-in to cards
    const cards = document.querySelectorAll('.featured-card, .blog-card, .post-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add copy button to code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentElement;
        const button = document.createElement('button');
        button.className = 'copy-code-button';
        button.textContent = 'Copy';
        button.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 12px;
            background-color: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: background-color 0.2s;
        `;
        
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.addEventListener('click', async function() {
            const code = codeBlock.textContent;
            try {
                await navigator.clipboard.writeText(code);
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
        });
        
        button.addEventListener('mouseenter', function() {
            button.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
    });
    
    // Add table of contents for article pages
    const articleContent = document.querySelector('.article-content');
    const leftSidebar = document.querySelector('.left-sidebar');
    
    if (articleContent) {
        const headings = articleContent.querySelectorAll('h2, h3');
        if (headings.length > 2) {
            // Create TOC container
            const toc = document.createElement('div');
            toc.className = 'floating-toc';
            
            const tocTitle = document.createElement('div');
            tocTitle.className = 'floating-toc-title';
            tocTitle.textContent = 'Table of Contents';
            toc.appendChild(tocTitle);
            
            const tocList = document.createElement('ul');
            
            headings.forEach((heading, index) => {
                const id = `heading-${index}`;
                heading.id = id;
                
                const li = document.createElement('li');
                li.className = heading.tagName === 'H3' ? 'toc-h3' : 'toc-h2';
                
                const link = document.createElement('a');
                link.href = `#${id}`;
                link.textContent = heading.textContent;
                link.dataset.target = id;
                
                li.appendChild(link);
                tocList.appendChild(li);
            });
            
            toc.appendChild(tocList);
            
            // Place TOC in sidebar if it exists, otherwise append to body
            if (leftSidebar) {
                const sidebarTocWrapper = document.createElement('div');
                sidebarTocWrapper.className = 'sidebar-toc';
                sidebarTocWrapper.appendChild(toc);
                leftSidebar.appendChild(sidebarTocWrapper);
                leftSidebar.classList.add('has-toc');
            } else {
                document.body.appendChild(toc);
            }
            
            // Highlight active section on scroll
            const tocLinks = toc.querySelectorAll('a');
            
            function updateActiveTocLink() {
                let currentActive = null;
                const scrollPosition = window.scrollY + 150;
                
                headings.forEach((heading) => {
                    const headingTop = heading.offsetTop;
                    if (scrollPosition >= headingTop) {
                        currentActive = heading.id;
                    }
                });
                
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.target === currentActive) {
                        link.classList.add('active');
                        // Scroll TOC to show active link
                        link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                    }
                });
            }
            
            // Update on scroll with throttling
            let ticking = false;
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    window.requestAnimationFrame(function() {
                        updateActiveTocLink();
                        ticking = false;
                    });
                    ticking = true;
                }
            });
            
            // Initial update
            updateActiveTocLink();
            
            // Only show/hide if TOC is floating (not in sidebar)
            if (!leftSidebar) {
                const articleHeader = document.querySelector('.article-header');
                if (articleHeader) {
                    window.addEventListener('scroll', function() {
                        const headerBottom = articleHeader.offsetTop + articleHeader.offsetHeight;
                        if (window.scrollY > headerBottom - 100) {
                            toc.classList.remove('hidden');
                        } else {
                            toc.classList.add('hidden');
                        }
                    });
                }
            }
        }
    }
    
    // Add estimated reading time
    const articleTitle = document.querySelector('.article-title');
    if (articleTitle && articleContent) {
        const text = articleContent.textContent;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
        
        const readingTimeElement = document.createElement('span');
        readingTimeElement.textContent = `${readingTime} min read`;
        readingTimeElement.style.cssText = `
            display: inline-block;
            color: #718096;
            font-size: 0.875rem;
        `;
        
        const articleMeta = document.querySelector('.article-meta');
    }
});
