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
