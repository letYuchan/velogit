import { posts } from './postList';

export const categories = Array.from(new Set(posts.map(post => post.category)));
