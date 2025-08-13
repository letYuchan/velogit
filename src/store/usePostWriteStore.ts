import { DRAFT_STORAGE_KEY, MAX_SAVED } from '@/constants/write';
import { toast } from 'react-toastify';
import { create } from 'zustand';

export const usePostWriteStore = create<PostWriteState>((set, get) => ({
    title: '',
    date: '',
    tags: [],
    summary: '',
    thumbnail: '',
    category: '',
    content: '',
    setField: (key, value) => set(state => ({ ...state, [key]: value })),

    reset: () =>
        set({
            title: '',
            date: '',
            tags: [],
            summary: '',
            thumbnail: '',
            category: '',
            content: '',
        }),

    buildMarkdown: () => {
        const { title, date, category, tags, summary, thumbnail, content } = get();

        const frontMatter = [
            `---`,
            `title: '${title}'`,
            `date: '${date}'`,
            `category: '${category}'`,
            tags.length > 0 ? `tags: [${tags.map(tag => `'${tag}'`).join(', ')}]` : null,
            summary ? `summary: '${summary}'` : null,
            thumbnail ? `thumbnail: '${thumbnail}'` : null,
            `---`,
        ]
            .filter(Boolean)
            .join('\n');

        return `${frontMatter}\n\n${content}`;
    },
    saveDraftToLocal: () => {
        const { title, date, tags, summary, thumbnail, category, content } = get();
        const draft = {
            id: Date.now(),
            data: {
                title,
                date,
                tags,
                summary,
                thumbnail,
                category,
                content,
            },
        };
        try {
            const existingDrafts = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || '[]');
            const filteredDrafts = existingDrafts.filter((d: TempPost) => d.id !== draft.id);

            const updatedDrafts = [draft, ...filteredDrafts].slice(0, MAX_SAVED);
            localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(updatedDrafts));
            toast.success('saved successfully!');
        } catch (e) {
            toast.error(`Failed to save so try again. Error: ${e}`);
        }
    },

    restoreFastDraftsFromLocal: () => {
        const rawDraftsInLocalStorage = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (!rawDraftsInLocalStorage) return [];

        try {
            return JSON.parse(rawDraftsInLocalStorage) as TempPost[];
        } catch (e) {
            toast.error(`Failed to parse temp-draft from localStorage. Error: ${e}`);
            return [];
        }
    },
}));

/**
 * 블로그 글 작성 상태를 관리하는 Zustand 스토어.
 *
 * 기능:
 * 1. **상태 관리**:
 *    - 글 작성에 필요한 모든 메타데이터와 본문 상태를 저장 (title, date, tags, summary, thumbnail, category, content).
 *    - `setField`: 특정 키를 지정해 해당 필드 값 업데이트.
 *    - `reset`: 모든 필드를 초기 빈 값으로 리셋.
 *
 * 2. **마크다운 빌더**:
 *    - `buildMarkdown`: 현재 상태를 YAML Front Matter와 함께 마크다운 문자열로 변환.
 *    - 값이 있는 필드만 자동 포함 (예: tags, summary, thumbnail).
 *
 * 3. **로컬 임시 저장소 관리**:
 *    - `saveDraftToLocal`:
 *       - 현재 상태를 `localStorage`에 `DRAFT_STORAGE_KEY`라는 키로 저장.
 *       - 최대 `MAX_SAVED` 개의 임시 저장만 유지.
 *       - 저장 성공/실패 여부를 toast로 사용자에게 알림.
 *    - `restoreFastDraftsFromLocal`:
 *       - `localStorage`에서 저장된 임시 저장 목록을 가져와 파싱.
 *       - 저장된 값이 없거나 파싱에 실패하면 빈 배열 반환.
 *
 * 4. **사용되는 상수**:
 *    - `DRAFT_STORAGE_KEY`: localStorage에서 임시 저장 데이터를 관리하는 키.
 *    - `MAX_SAVED`: 저장 가능한 최대 임시 글 개수.
 *
 * 의존성:
 * - `zustand`: 스토어 생성 및 상태 관리.
 * - `react-toastify`: toast 알림으로 사용자 피드백 제공.
 */
