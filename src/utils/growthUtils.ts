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
    final: 'images/devFlare.gif',
};

export const getDragonEvolutionGifByLevel = (level: number) => {
    if (level >= 1 && level < 10) return dragonEvolutionGifPathMap.egg;

    if (level >= 10 && level < 20) return dragonEvolutionGifPathMap.baby;

    if (level >= 20 && level < 40) return dragonEvolutionGifPathMap.teen;

    if (level >= 40) return dragonEvolutionGifPathMap.final;

    return dragonEvolutionGifPathMap.egg;
};
