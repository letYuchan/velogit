import { posts } from '@/utils';

export const categories = Array.from(new Set(posts.map(post => post.category)));

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

export const getUserBlogLevel = (postCount: number) => {
    return Math.floor(postCount / 5) + 1;
};

export const getTopThreeCategories = (posts: PostData[]): [string, number][] => {
    const categoryMap: Record<string, number> = {};

    posts.forEach(post => {
        const category = post.category?.trim() || 'No Category';
        categoryMap[category] = (categoryMap[category] || 0) + 1;
    });

    return Object.entries(categoryMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
};

const dragonEvolutionGifPathMap = {
    egg: 'images/egg.gif',
    baby: 'images/babyDragon.gif',
    teen: 'images/youngDragon.gif',
    adult: 'images/devFlare.gif',
    final: 'images/devnity.gif',
};

export const getDragonEvolutionGifByLevel = (level: number) => {
    if (level >= 1 && level < 10) return dragonEvolutionGifPathMap.egg;

    if (level >= 10 && level < 20) return dragonEvolutionGifPathMap.baby;

    if (level >= 20 && level < 40) return dragonEvolutionGifPathMap.teen;

    if (level >= 40 && level < 100) return dragonEvolutionGifPathMap.adult;

    if (level >= 100) return dragonEvolutionGifPathMap.final;

    return dragonEvolutionGifPathMap.egg;
};
