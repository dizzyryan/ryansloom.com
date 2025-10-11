const chokidar = require('chokidar');
const { spawn } = require('child_process');
const path = require('path');

console.log('👀 Watching for changes...\n');

let isBuilding = false;
let buildQueued = false;

function build() {
    if (isBuilding) {
        buildQueued = true;
        return;
    }
    
    isBuilding = true;
    console.log('🔨 Building...');
    
    const buildProcess = spawn('node', ['build.js'], {
        stdio: 'inherit',
        cwd: __dirname
    });
    
    buildProcess.on('close', (code) => {
        isBuilding = false;
        
        if (code === 0) {
            console.log('✅ Build complete!\n');
            console.log('👀 Watching for changes...\n');
        } else {
            console.error('❌ Build failed!\n');
        }
        
        if (buildQueued) {
            buildQueued = false;
            setTimeout(build, 100);
        }
    });
}

// Initial build
build();

// Watch for changes
const watcher = chokidar.watch([
    'content/posts/**/*.md',
    'content/pages/**/*.md',
    'content/projects/**/*.md',
    'content/_draft/**/*.md',
    'templates/**/*.html',
    'css/**/*.css',
    'js/**/*.js',
    'build.js'
], {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});

watcher
    .on('change', (filePath) => {
        console.log(`📝 Changed: ${path.relative(__dirname, filePath)}`);
        build();
    })
    .on('add', (filePath) => {
        console.log(`➕ Added: ${path.relative(__dirname, filePath)}`);
        build();
    })
    .on('unlink', (filePath) => {
        console.log(`🗑️  Removed: ${path.relative(__dirname, filePath)}`);
        build();
    });
