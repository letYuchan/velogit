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

export const applyThemeClass = (theme: string) => {
    const html = document.documentElement;
    const remainedClass = Array.from(html.classList).find(c => c.startsWith('theme-'));
    if (remainedClass) html.classList.remove(remainedClass);
    html.classList.add(`theme-${theme}`);
};

export const getAudioFileNames = (): string[] => {
    return Object.keys(import.meta.glob('../../audio/*.mp3', { as: 'url', eager: true })).map(
        path => path.split('/').pop() || '',
    );
};
