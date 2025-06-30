import { posts } from './postList';

export const categoryCountMap: Record<string, number> = posts.reduce(
  (acc, post) => {
    if (acc[post.category]) {
      acc[post.category]++;
    } else {
      acc[post.category] = 1;
    }
    return acc;
  },
  {} as Record<string, number>,
);
