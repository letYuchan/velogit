import { dragonEvolutionGifPathMap } from '@/data/home';
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

export const getDragonEvolutionGifByLevel = (level: number) => {
    if (level >= 1 && level < 10) return dragonEvolutionGifPathMap.egg;

    if (level >= 10 && level < 20) return dragonEvolutionGifPathMap.baby;

    if (level >= 20 && level < 40) return dragonEvolutionGifPathMap.teen;

    if (level >= 40 && level < 100) return dragonEvolutionGifPathMap.adult;

    if (level >= 100) return dragonEvolutionGifPathMap.final;

    return dragonEvolutionGifPathMap.egg;
};

/**
 * 블로그 카테고리 및 레벨, 진화 GIF 경로 관리 유틸 함수 모음
 *
 * 기능:
 * 1. **카테고리 목록 생성**
 *    - `categories`: `posts` 배열에서 `category` 값만 추출 후, `Set`으로 중복 제거하여 배열로 반환.
 *
 * 2. **카테고리별 포스트 수 집계**
 *    - `categoryCountMap`: 각 카테고리별 포스트 개수를 `Record<string, number>` 형태로 저장.
 *    - `reduce`를 사용해 카테고리별 카운트를 누적.
 *
 * 3. **블로그 레벨 계산**
 *    - `getUserBlogLevel(postCount)`: 총 포스트 수를 기반으로 레벨 계산.
 *      - 5개당 1레벨 증가 (`Math.floor(postCount / 5) + 1`).
 *
 * 4. **가장 많이 사용된 카테고리 Top 3 반환**
 *    - `getTopThreeCategories(posts)`: `PostData[]`를 받아 카테고리별 사용 횟수를 집계 후, 상위 3개 반환.
 *    - 반환 형식: `[카테고리명, 개수][]`
 *    - 빈 카테고리는 `"No Category"`로 처리.
 *
 * 5. **드래곤 진화 단계별 GIF 경로 매핑**
 *    - `dragonEvolutionGifPathMap`: 단계별 GIF 파일 경로 저장.
 *      - `egg`: 1~9레벨
 *      - `baby`: 10~19레벨
 *      - `teen`: 20~39레벨
 *      - `adult`: 40~99레벨
 *      - `final`: 100레벨 이상
 *
 * 6. **레벨 기반 GIF 경로 반환**
 *    - `getDragonEvolutionGifByLevel(level)`: 현재 레벨에 맞는 GIF 경로를 반환.
 *    - 지정된 범위 외의 경우 기본값(`egg`) 반환.
 *
 * 의존성:
 * - `posts`: 블로그 포스트 데이터 배열.
 */
