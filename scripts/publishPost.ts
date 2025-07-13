import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Creates and saves a markdown file.
 * @param markdown The markdown content to save
 * @returns The full path of the saved file (used for Git commit)
 */
export const createMarkdownPost = (markdown: string): string | null => {
    const repoPath = process.cwd(); // Current project root
    const folderPath = path.join(repoPath, 'src', 'posts'); // Path: ./src/posts
    const fileNameInput = prompt('Enter filename (without .md):', '');

    if (!fileNameInput || !fileNameInput.trim()) {
        alert('Invalid file name.');
        return null;
    }

    const fileName = `${fileNameInput.trim()}.md`;
    const fullPath = path.join(folderPath, fileName);

    fs.mkdirSync(folderPath, { recursive: true }); // Create folder if it doesn't exist
    fs.writeFileSync(fullPath, markdown, 'utf-8'); // Save markdown content to file

    return fullPath;
};

/**
 * Commits and pushes the created markdown file to Git.
 * @param filePath The full file path returned by createMarkdownPost
 */
export const commitMarkdownFile = (filePath: string) => {
    const repoPath = process.cwd(); // Git root = current project root
    const relativePath = path.relative(repoPath, filePath); // Relative path for Git commands

    try {
        execSync(`git add ${relativePath}`, { cwd: repoPath });
        execSync(`git commit -m "chore: publish ${path.basename(filePath)}"`, { cwd: repoPath });
        execSync(`git push origin main`, { cwd: repoPath });

        alert('Push and publish successfully');
    } catch (e) {
        alert(`Failed to create markdown file. error message: ${e}`);
    }
};
