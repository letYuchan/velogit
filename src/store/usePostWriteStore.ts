import { DRAFT_STORAGE_KEY, MAX_SAVED } from '@/constants/draft.constants';
import { create } from 'zustand';

export interface PostWriteState {
    title: string;
    date: string;
    tags: string[];
    summary: string;
    thumbnail: string;
    category: string;
    content: string;

    setField: <
        K extends keyof Omit<
            PostWriteState,
            'setField' | 'reset' | 'buildMarkdown' | 'savedDraftToLocal' | 'restoreDraftsFromLocal'
        >,
    >(
        key: K,
        value: PostWriteState[K],
    ) => void;

    reset: () => void;
    buildMarkdown: () => string;
    saveDraftToLocal: () => void;
    restoreFastDraftsFromLocal: () => TempPost[];
}

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
            alert('saved successfully!');
        } catch (e) {
            alert(`Failed to save so try again. Error: ${e}`);
        }
    },

    restoreFastDraftsFromLocal: () => {
        const rawDraftsInLocalStorage = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (!rawDraftsInLocalStorage) return [];

        try {
            return JSON.parse(rawDraftsInLocalStorage) as TempPost[];
        } catch (e) {
            alert(`Failed to parse temp-draft from localStorage. Error: ${e}`);
            return [];
        }
    },
}));
