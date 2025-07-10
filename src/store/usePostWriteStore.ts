import { create } from 'zustand';

interface PostWriteState {
  title: string;
  date: string;
  tags: string[];
  summary: string;
  thumbnail?: string;
  category: string;
  content: string;

  setField: <K extends keyof Omit<PostWriteState, 'setField' | 'reset'>>(
    key: K,
    value: PostWriteState[K],
  ) => void;
  reset: () => void;
}

export const usePostWriteStore = create<PostWriteState>(set => ({
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
}));
