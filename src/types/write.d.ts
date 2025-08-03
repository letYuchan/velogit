interface TempPost {
    id: number;
    data: Omit<
        ReturnType<typeof usePostWriteStore.getState>,
        'setField' | 'reset' | 'buildMarkdown' | 'saveDraftToLocal' | 'restoreDraftsFromLocal'
    >;
}
