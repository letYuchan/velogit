import fs from 'fs';
import os from 'os';
import path from 'path';
import { execSync } from 'child_process';

const POST_KEY = 'to-publish-post';

// Step 1: 인자로 파일명 받기
const inputJsonName = process.argv[2];
if (!inputJsonName) {
    console.error('❌ Usage: npx tsx scripts/publishPost.ts <filename-without-ext>');
    process.exit(1);
}

const fileNameOnly = inputJsonName.replace(/\s+/g, '-');
const fileNameWithExt = `${fileNameOnly}.json`;

// Step 2: 다운로드 폴더 경로 구하기
const downloadsDir =
    process.platform === 'darwin' || process.platform === 'win32'
        ? path.join(os.homedir(), 'Downloads')
        : path.join(os.homedir(), 'downloads');

const downloadedJsonPath = path.join(downloadsDir, fileNameWithExt);
const scriptsJsonPath = path.join(process.cwd(), 'scripts', fileNameWithExt);

// Step 3: 파일 존재 여부 확인
if (!fs.existsSync(downloadedJsonPath)) {
    console.error(`❌ File not found in Downloads: ${downloadedJsonPath}`);
    process.exit(1);
}

// Step 4: scripts/로 복사
fs.copyFileSync(downloadedJsonPath, scriptsJsonPath);
console.log(`📥 Copied to scripts/: ${fileNameWithExt}`);

// Step 5: JSON 읽고 마크다운 추출
const rawStorage = fs.readFileSync(scriptsJsonPath, 'utf-8');
const parsed = JSON.parse(rawStorage);
const markdown = parsed[POST_KEY];

if (!markdown) {
    console.error('❌ No markdown found in JSON.');
    process.exit(1);
}

// Step 6: posts/에 .md 저장
const postsDir = path.join(process.cwd(), 'posts');
const markdownFileName = `${fileNameOnly}.md`;
const fullMarkdownPath = path.join(postsDir, markdownFileName);

fs.mkdirSync(postsDir, { recursive: true });
fs.writeFileSync(fullMarkdownPath, markdown, 'utf-8');
console.log(`✅ Saved Markdown: posts/${markdownFileName}`);

// Step 7-1: Git commit & push
try {
    const relativePath = path.relative(process.cwd(), fullMarkdownPath);
    execSync(`git add ${relativePath}`, { cwd: process.cwd() });

    const gitDiff = execSync(`git diff --cached --name-only`, {
        cwd: process.cwd(),
        encoding: 'utf-8',
    }).trim();

    if (gitDiff) {
        execSync(`git commit -m "chore: publish ${markdownFileName}"`, { cwd: process.cwd() });
        execSync(`git push origin master`, { cwd: process.cwd() });
        console.log('✅ Git push complete.');
    } else {
        console.log('⚠️ No changes to commit.');
    }
} catch (err) {
    console.error('❌ Git error:', err);
    process.exit(1);
}

// Step 7-2: build, publish to githubPages
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

// Step 8: Cleanup - POST_KEY 삭제 후 JSON 저장
delete parsed[POST_KEY];
fs.writeFileSync(scriptsJsonPath, JSON.stringify(parsed, null, 2));

// Step 9: scripts/와 Downloads/에서 JSON 삭제
try {
    fs.unlinkSync(scriptsJsonPath);
    fs.unlinkSync(downloadedJsonPath);
    console.log(`🧹 Cleanup complete: Deleted both JSON files.`);
} catch (err) {
    console.warn(`⚠️ Failed to delete one of the JSON files:`, err);
}
