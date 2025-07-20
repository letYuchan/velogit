import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { Octokit } from '@octokit/rest';

const COMMENTS_DIR = 'comments';
const TEMP_JSON_DIR = path.resolve('scripts');
const DOWNLOADS_DIR = path.resolve(process.env.HOME || '', 'Downloads');

const [, , jsonFileName, ownerGithubName, ownerRepoName, commenterGithubName, githubToken] =
    process.argv;

if (!jsonFileName || !ownerGithubName || !ownerRepoName || !commenterGithubName || !githubToken) {
    console.error('❌ Missing required CLI arguments.');
    process.exit(1);
}

// Locate JSON file (scripts/ or Downloads/)
const jsonPathInScripts = path.join(TEMP_JSON_DIR, jsonFileName);
const jsonPathInDownloads = path.join(DOWNLOADS_DIR, jsonFileName);

let jsonFilePath = '';
if (fs.existsSync(jsonPathInScripts)) {
    jsonFilePath = jsonPathInScripts;
} else if (fs.existsSync(jsonPathInDownloads)) {
    jsonFilePath = jsonPathInDownloads;
} else {
    console.error('❌ JSON file not found in scripts/ or Downloads/.');
    process.exit(1);
}

// Read and validate
const fileData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
const commentData = fileData['to-publish-comment'];

if (!commentData) {
    console.error('❌ Missing `to-publish-comment` key in JSON.');
    process.exit(1);
}

const { slug, user, date, comment } = commentData;

if (!slug || !user || !date || !comment) {
    console.error('❌ Missing required comment fields in JSON.');
    process.exit(1);
}

// Create matching .md file from .json filename
const mdFileName = jsonFileName.replace(/\.json$/, '.md');
const mdFilePath = path.join(COMMENTS_DIR, mdFileName);

// Markdown frontmatter
const markdownContent = `---
slug: ${slug}
user: ${user}
date: ${date}
---

${comment.trim()}
`;

// Write .md file locally
fs.mkdirSync(COMMENTS_DIR, { recursive: true });
fs.writeFileSync(mdFilePath, markdownContent);
console.log(`✅ Markdown file created: ${mdFilePath}`);

// Git config
execSync('git config user.name "comment-bot"');
execSync('git config user.email "comment-bot@example.com"');

// Create fork if needed
const octokit = new Octokit({ auth: githubToken });

async function run() {
    console.log('🚀 Creating fork...');
    await octokit.rest.repos.createFork({
        owner: ownerGithubName,
        repo: ownerRepoName,
    });

    const tempDir = path.resolve('temp-repo');
    if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });

    // Clone fork
    execSync(`git clone https://github.com/${commenterGithubName}/${ownerRepoName}.git ${tempDir}`);
    process.chdir(tempDir);

    // New branch
    const branchName = `comment/${slug}`;
    execSync(`git checkout -b ${branchName}`);

    // Write file into repo
    fs.mkdirSync(COMMENTS_DIR, { recursive: true });
    fs.writeFileSync(path.join(COMMENTS_DIR, mdFileName), markdownContent);

    // Commit & push
    execSync('git add .');
    execSync(`git commit -m "chore: add comment for ${slug}"`);
    execSync('git push origin HEAD');

    // PR
    await octokit.rest.pulls.create({
        owner: ownerGithubName,
        repo: ownerRepoName,
        title: `Comment: ${slug}`,
        head: `${commenterGithubName}:${branchName}`,
        base: 'master',
        body: `Auto-generated comment PR from @${commenterGithubName}`,
    });

    console.log('✅ Pull request created.');

    // Cleanup .json
    try {
        fs.unlinkSync(jsonPathInScripts);
    } catch {
        /* empty */
    }
    try {
        fs.unlinkSync(jsonPathInDownloads);
    } catch {
        /* empty */
    }

    console.log('🧹 Cleaned up JSON file.');
}

run().catch(err => {
    console.error('❌ Script failed:', err);
    process.exit(1);
});
