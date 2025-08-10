// export const comments: CommentData[] = Object.entries(
//     import.meta.glob('/comments/*.md', { eager: true, as: 'raw' }),
// ).map(([, raw]) => {
//     const slug = raw.match(/slug:\s*['"]?(.*?)['"]?\s*$/m)?.[1] ?? '';
//     const user = raw.match(/user:\s*['"]?(.*?)['"]?\s*$/m)?.[1] ?? '';
//     const date = raw.match(/date:\s*['"]?(.*?)['"]?\s*$/m)?.[1] ?? '';
//     const content = raw.replace(/^---[\s\S]*?---/, '').trim();

//     return { slug, user, date, content };
// });
