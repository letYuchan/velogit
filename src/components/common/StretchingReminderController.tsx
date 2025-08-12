import StretchingReminderModal from '@/components/common/StretchingReminderModal';
import { useStretchingReminderStore } from '@/store/useStretchingReminderStore';
import { useEffect, useRef, useState, useCallback } from 'react';

const StretchingReminderController = () => {
    const enabled = useStretchingReminderStore(s => s.enabled);
    const intervalMs = useStretchingReminderStore(s => s.popupInterval);
    const durationMs = useStretchingReminderStore(s => s.stretchingDuration);

    const [isStretchingReminderOpen, setIsStretchingReminderOpen] = useState(false);
    const waitRef = useRef<number | null>(null);
    const showRef = useRef<number | null>(null);

    const loop = useCallback(() => {
        if (!enabled) return;
        waitRef.current = window.setTimeout(() => {
            setIsStretchingReminderOpen(true);
            showRef.current = window.setTimeout(() => {
                setIsStretchingReminderOpen(false);
                loop();
            }, durationMs);
        }, intervalMs);
    }, [enabled, intervalMs, durationMs]);

    const clearAll = () => {
        if (waitRef.current) {
            clearTimeout(waitRef.current);
            waitRef.current = null;
        }
        if (showRef.current) {
            clearTimeout(showRef.current);
            showRef.current = null;
        }
    };

    useEffect(() => {
        clearAll();
        if (enabled) loop();
        return clearAll;
    }, [enabled, loop]);

    return (
        <StretchingReminderModal
            isStretchingReminderModalOpen={isStretchingReminderOpen}
            handleCloseModal={() => setIsStretchingReminderOpen(false)}
        />
    );
};

export default StretchingReminderController;

/**
 * StretchingReminderController
 * --------------------------
 * 기능:
 * - 설정된 간격마다 스트레칭 알림 모달을 자동으로 띄우는 컨트롤러 컴포넌트
 * - 지정된 표시 시간(durationMs) 동안 모달 표시 후 자동 닫기
 * - 사용자가 알림 기능을 끄면 루프 중단
 *
 * 주요 상태(state):
 * - isStretchingReminderOpen: boolean → 스트레칭 모달 표시 여부
 *
 * 주요 ref:
 * - waitRef: number | null → 다음 알림까지 대기 타이머 ID
 * - showRef: number | null → 알림 표시 지속 타이머 ID
 *
 * 주요 로직:
 * - loop():
 *   → intervalMs(대기 시간) 후 모달 표시
 *   → durationMs(표시 시간) 경과 후 모달 닫고 loop() 재호출
 * - clearAll():
 *   → 모든 타이머(watiRef, showRef) 초기화 및 중단
 * - useEffect:
 *   → enabled 상태 변화 시 기존 타이머 정리 후 다시 루프 시작
 *
 * props:
 * - 없음 (Zustand store에서 직접 상태 구독)
 *
 * UI 요소:
 * - StretchingReminderModal (isStretchingReminderModalOpen / handleCloseModal props 전달)
 *
 * 동작 흐름:
 * 1) enabled=true → loop() 시작
 * 2) intervalMs 대기 후 모달 표시
 * 3) durationMs 동안 표시
 * 4) 닫고 loop() 재실행
 * 5) enabled=false → 모든 타이머 취소
 */
