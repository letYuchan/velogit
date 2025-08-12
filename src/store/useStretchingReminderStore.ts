import { STRETCHING_STORAGE_KEY } from '@/constants/stretching.constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStretchingReminderStore = create<StretchingReminderState>()(
    persist(
        (set, get) => ({
            enabled: true,
            popupInterval: 15 * 60 * 1000,
            stretchingDuration: 60 * 1000,

            setEnabled: on => set({ enabled: on }),
            toggleEnabled: () => set({ enabled: !get().enabled }),

            setPopupInterval: min => {
                const m = Math.max(1, Math.floor(min));
                set({ popupInterval: m * 60 * 1000 });
            },

            setStretchingDuration: sec => {
                const s = Math.max(1, Math.floor(sec));
                set({ stretchingDuration: s * 1000 });
            },
        }),
        {
            name: STRETCHING_STORAGE_KEY,
            version: 1,
            partialize: s => ({
                enabled: s.enabled,
                popupInterval: s.popupInterval,
                stretchingDuration: s.stretchingDuration,
            }),
        },
    ),
);
