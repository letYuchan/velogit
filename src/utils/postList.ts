/*
When a file is added to the posts folder, 
vite hot reloads and returns the contents of the md file to the variable as a string.

result obj exmaple
{
  './posts/a.md': () => import('./posts/a.md'),
  './posts/b.md': () => import('./posts/b.md'),
}
*/
export const posts: PostData[] = Object.entries(
    import.meta.glob('/posts/*.md', { eager: true, as: 'raw' }),
).map(([path, content]) => {
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    // 카테고리 파싱 예시
    const title = content.match(/title:\s*['"](.*)['"]/)?.[1] ?? '';
    const date = content.match(/date:\s*['"](.*)['"]/)?.[1] ?? '';
    const summary = content.match(/summary:\s*['"](.*)['"]/)?.[1] ?? '';
    const tagsRaw = content.match(/tags:\s*\[(.*)\]/)?.[1] ?? '';
    const tags = tagsRaw.split(',').map(tag => tag.trim().replace(/['"]/g, ''));
    const category = content.match(/category:\s*['"](.*)['"]/)?.[1] ?? '';
    const thumbnail = content.match(/thumbnail:\s*['"](.*)['"]/)?.[1] ?? '';

    return {
        slug,
        title,
        date,
        summary,
        tags,
        category,
        thumbnail,
        content,
    };
});
