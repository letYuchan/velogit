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

export const getAudioFileUrls = (): string[] => {
    const audioModules = import.meta.glob('@/assets/audio/*.mp3', {
        eager: true,
        as: 'url',
    });

    return Object.values(audioModules);
};

export const formatTime = (ms: number) => {
    const totalSec = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
};

/*

블로그 포스트, 테마 적용, 오디오 로드, 시간 포맷 유틸

─────────────────────────────
1. posts (PostData[])
─────────────────────────────
- `/posts/*.md` 경로의 마크다운 파일을 Vite `import.meta.glob`으로 한 번에 가져옴.
- `{ eager: true, as: 'raw' }` 옵션:
  - eager: 빌드 시점에 즉시 불러옴 (동적 import가 아닌 정적 import처럼 동작)
  - as: 'raw': 파일 내용을 문자열(String)로 불러옴
- 반환 예시:
  {
    './posts/a.md': () => import('./posts/a.md'),
    './posts/b.md': () => import('./posts/b.md')
  }
- 각 파일에서 frontmatter(메타데이터)를 정규식으로 추출:
  - slug: 파일명 (확장자 제거)
  - title: 제목
  - date: 날짜
  - summary: 요약
  - tags: 태그 배열
  - category: 카테고리
  - thumbnail: 썸네일 이미지 경로
  - content: 본문 내용 (문자열)
- 최종적으로 PostData 객체 배열을 반환.

─────────────────────────────
2. applyThemeClass(theme: string)
─────────────────────────────
- HTML 루트(`document.documentElement`)에 테마 클래스 적용.
- 기존 theme- 접두어를 가진 클래스를 제거 후, 새 `theme-${theme}` 클래스 추가.
- 예: theme-dark → theme-light로 변경.

─────────────────────────────
3. getAudioFileUrls()
─────────────────────────────
- `/assets/audio/*.mp3` 파일들을 Vite `import.meta.glob`으로 불러와 URL 배열 반환.
- `{ eager: true, as: 'url' }` 옵션:
  - as: 'url': 파일 경로 대신 최종 빌드된 URL 반환.
- 반환 값: 오디오 파일 경로 배열.

─────────────────────────────
4. formatTime(ms: number)
─────────────────────────────
- 밀리초 단위를 `분:초` 문자열로 변환.
- `ms` → 초 단위 변환 후:
  - m: 분 단위 (Math.floor)
  - s: 초 단위 (나머지)
  - s가 한 자리면 `padStart(2, '0')`로 0을 앞에 붙임.
- 예: 65000 → "1:05"
*/
