import fs from 'fs';
import os from 'os';
import path from 'path';
import { execSync } from 'child_process';

const POST_KEY = 'to-publish-post';

// Step 1: 인자 처리
const newName = process.argv[2];
const oldSlug = process.argv[3];

if (!newName || !oldSlug) {
    console.error('❌ Usage: npx tsx scripts/autoEdit.ts <newName> <oldSlug>');
    process.exit(1);
}

const newSlug = newName.replace(/\s+/g, '-');
const newJsonName = `${newSlug}.json`;
const newMarkdownName = `${newSlug}.md`;
const oldMarkdownName = `${oldSlug}.md`;

console.log(`📦 newSlug: ${newSlug}`);
console.log(`📦 newJsonName: ${newJsonName}`);
console.log(`📦 newMarkdownName: ${newMarkdownName}`);
console.log(`📦 oldMarkdownName: ${oldMarkdownName}`);

// Step 2: 다운로드 폴더 경로
const downloadsDir =
    process.platform === 'darwin' || process.platform === 'win32'
        ? path.join(os.homedir(), 'Downloads')
        : path.join(os.homedir(), 'downloads');

const downloadedJsonPath = path.join(downloadsDir, newJsonName);
const scriptsJsonPath = path.join(process.cwd(), 'scripts', newJsonName);

console.log(`📂 Looking for JSON at: ${downloadedJsonPath}`);

if (!fs.existsSync(downloadedJsonPath)) {
    console.error(`❌ File not found in Downloads: ${downloadedJsonPath}`);
    process.exit(1);
}

// Step 3: JSON 복사
fs.copyFileSync(downloadedJsonPath, scriptsJsonPath);
console.log(`📥 Copied JSON to scripts/: ${newJsonName}`);

// Step 4: JSON 읽기 및 마크다운 추출
const rawStorage = fs.readFileSync(scriptsJsonPath, 'utf-8');
const parsed = JSON.parse(rawStorage);
const markdown = parsed[POST_KEY];

if (!markdown) {
    console.error('❌ No markdown found in JSON.');
    process.exit(1);
}

console.log(`📝 Markdown content length: ${markdown.length}`);

const postsDir = path.join(process.cwd(), 'posts');
fs.mkdirSync(postsDir, { recursive: true });

const newMarkdownPath = path.join(postsDir, newMarkdownName);
const oldMarkdownPath = path.join(postsDir, oldMarkdownName);

// Step 5: 파일 처리
if (newMarkdownName === oldMarkdownName) {
    console.log('✏️ Overwriting the same markdown file.');
    fs.writeFileSync(newMarkdownPath, markdown, 'utf-8');
    console.log(`✅ Overwritten: posts/${newMarkdownName}`);
} else {
    if (fs.existsSync(oldMarkdownPath)) {
        fs.unlinkSync(oldMarkdownPath);
        console.log(`🗑️ Deleted old file: posts/${oldMarkdownName}`);
    } else {
        console.log(`⚠️ Old markdown file not found: posts/${oldMarkdownName}`);
    }
    fs.writeFileSync(newMarkdownPath, markdown, 'utf-8');
    console.log(`✅ Created new markdown file: posts/${newMarkdownName}`);
}

// Step 6-1: Git add, commit, push
try {
    execSync(`git add posts/${newMarkdownName}`, { cwd: process.cwd() });

    const gitDiff = execSync(`git diff --cached --name-only`, {
        cwd: process.cwd(),
        encoding: 'utf-8',
    }).trim();

    if (gitDiff) {
        execSync(`git commit -m "chore: edit ${newMarkdownName}"`, { cwd: process.cwd() });
        execSync(`git push origin master`, { cwd: process.cwd() });
        console.log('🚀 Git push complete.');
    } else {
        console.log('⚠️ No changes detected for git commit.');
    }
} catch (err) {
    console.error('❌ Git error:', err);
    process.exit(1);
}

// Step 6-2: build, publish to githubPages
try {
    console.log('🏗️ Building project...');
    execSync(`pnpm run build`, { cwd: process.cwd(), stdio: 'inherit' });

    console.log('🚀 Deploying to GitHub Pages...');
    execSync(`pnpm run deploy`, { cwd: process.cwd(), stdio: 'inherit' });

    console.log('✅ Build and deploy complete.');
} catch (err) {
    console.error('❌ Build/Deploy error:', err);
    process.exit(1);
}

// Step 7: JSON 정리 후 삭제
delete parsed[POST_KEY];
fs.writeFileSync(scriptsJsonPath, JSON.stringify(parsed, null, 2));

try {
    fs.unlinkSync(scriptsJsonPath);
    fs.unlinkSync(downloadedJsonPath);
    console.log('🧹 Cleaned up temporary JSON files.');
} catch (err) {
    console.warn('⚠️ Failed to delete one of the JSON files:', err);
}
