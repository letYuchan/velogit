import { STRETCHING_STORAGE_KEY } from '@/constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStretchingReminderStore = create<StretchingReminderState>()(
    persist(
        (set, get) => ({
            enabled: false,
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

/**
 * 스트레칭 알림 기능 상태를 관리하는 Zustand 스토어.
 *
 * 기능:
 * 1. **상태 관리**:
 *    - `enabled`: 스트레칭 알림 기능 활성/비활성 여부.
 *    - `popupInterval`: 팝업 알림 주기 (밀리초 단위, 기본값 15분).
 *    - `stretchingDuration`: 스트레칭 팝업 유지 시간 (밀리초 단위, 기본값 60초).
 *
 * 2. **설정 메서드**:
 *    - `setEnabled(on)`: 알림 기능을 켜거나 끔.
 *    - `toggleEnabled()`: 현재 상태를 반전.
 *    - `setPopupInterval(min)`: 알림 주기를 분 단위로 설정 (최소 1분).
 *    - `setStretchingDuration(sec)`: 스트레칭 지속 시간을 초 단위로 설정 (최소 1초).
 *
 * 3. **데이터 영속화**:
 *    - `zustand/middleware`의 `persist`를 사용해 `localStorage`에 상태 저장.
 *    - 저장 시 포함되는 데이터: `enabled`, `popupInterval`, `stretchingDuration`.
 *    - `STRETCHING_STORAGE_KEY`를 저장 키로 사용.
 *    - 버전 관리(`version: 1`)로 향후 마이그레이션 대비.
 *
 * 의존성:
 * - `zustand`: 전역 상태 관리.
 * - `zustand/middleware/persist`: 상태를 브라우저 스토리지에 영속화.
 */
