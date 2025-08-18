interface TempPost {
    id: number;
    data: Omit<
        ReturnType<typeof usePostWriteStore.getState>,
        'setField' | 'reset' | 'buildMarkdown' | 'saveDraftToLocal' | 'restoreDraftsFromLocal'
    >;
}

interface ArrowIndexNavOptions {
    enabled?: boolean;
    total: number;
    currentIndex: number;
    setCurrentIndex: (updater: (prev: number) => number) => void;
    loop?: boolean;
    ignoreWhenTyping?: boolean;
    preventDefault?: boolean;
    withHomeEnd?: boolean;
    withPageKeys?: boolean;
    pageStep?: number;
}

interface ConfirmOnBackOptions {
    when: boolean;
    message?: string;
    askOnce?: boolean;
    guardBeforeUnload?: boolean;
}

interface ToolItem {
    name: string;
    icon: LucideIcon;
    label?: string;
    insert: string;
    marker: string;
}

interface SpanLike {
    offset: number;
    length: number;
}

type HighlightMapped = SpanLike & { tooltip?: string };

type MapToHighlight<T> = (item: T, index: number) => HighlightMapped;

interface Classes {
    base?: string;
    focus?: string;
}
