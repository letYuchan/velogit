import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { Octokit } from '@octokit/rest';

const COMMENTS_DIR = 'comments';
const TEMP_JSON_DIR = path.resolve('scripts');
const DOWNLOADS_DIR = path.resolve(process.env.HOME || '', 'Downloads');

const [, , jsonFileName] = process.argv;
if (!jsonFileName) {
    console.error('❌ JSON file name argument is required.');
    process.exit(1);
}

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

const fileData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
const commentData = fileData['to-publish-comment'];
if (!commentData) {
    console.error('❌ Missing `to-publish-comment` key in JSON.');
    process.exit(1);
}

const {
    slug,
    user: commenterGithubName,
    date,
    comment,
    ownerGithubName,
    ownerRepoName,
    githubToken,
} = commentData;

if (
    !slug ||
    !commenterGithubName ||
    !date ||
    !comment ||
    !ownerGithubName ||
    !ownerRepoName ||
    !githubToken
) {
    console.error('❌ Missing required fields in comment data.');
    process.exit(1);
}

const mdFileName = `${slug}__${commenterGithubName}__${date}.md`;
const mdFilePath = path.join(COMMENTS_DIR, mdFileName);
const markdownContent = `---
slug: ${slug}
author: ${commenterGithubName}
date: ${date}
---

${comment.trim()}
`;
fs.writeFileSync(mdFilePath, markdownContent);
console.log(`✅ Markdown file created: ${mdFilePath}`);

execSync('git config user.name "comment-bot"');
execSync('git config user.email "comment-bot@example.com"');

const forkedRepoFullName = `${commenterGithubName}/${ownerRepoName}`;
const octokit = new Octokit({ auth: githubToken });

async function run() {
    console.log('🚀 Creating fork if not exists...');
    await octokit.rest.repos.createFork({
        owner: ownerGithubName,
        repo: ownerRepoName,
    });

    const tempDir = path.resolve('temp-repo');
    if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });

    execSync(`git clone https://github.com/${forkedRepoFullName}.git ${tempDir}`);
    process.chdir(tempDir);
    execSync(`git checkout -b comment/${slug}`);

    fs.mkdirSync(COMMENTS_DIR, { recursive: true });
    fs.writeFileSync(path.join(COMMENTS_DIR, mdFileName), markdownContent);

    execSync('git add .');
    execSync(`git commit -m "chore: add comment for ${slug}"`);
    execSync('git push origin HEAD');

    await octokit.rest.pulls.create({
        owner: ownerGithubName,
        repo: ownerRepoName,
        title: `Comment: ${slug}`,
        head: `commenterGithubName:comment/${slug}`,
        base: 'master',
        body: `Auto-generated comment PR from @${commenterGithubName}`,
    });

    console.log('✅ Pull request created.');

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
