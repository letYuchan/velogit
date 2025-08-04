import { getAvailableLanguages, postSpellCheck } from '@/services/spellCheck.apis';
import { useMutation, useQuery } from '@tanstack/react-query';

// available language, /v2/languages
export const useGetAllAvailableLanguages = () => {
    return useQuery({
        queryKey: ['languages'],
        queryFn: () => getAvailableLanguages(),
        staleTime: Infinity,
        gcTime: Infinity,
        refetchInterval: 1000 * 60 * 60 * 24,
        refetchIntervalInBackground: false,
    });
};

// spell check, /v2/check, method: POST
export const useSpellCheckMutation = () => {
    const mutation = useMutation({
        mutationFn: (payload: SpellCheckPayloadType) => postSpellCheck(payload),
        onSuccess: () => {
            alert('Spell check completed successfully.');
        },
        onError: error => {
            console.error('Spell check failed:', error);
            alert('Spell check failed. Please try again later.');
        },
    });

    return mutation;
};
