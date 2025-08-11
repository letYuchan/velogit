import {
    getAllAvailableLanguages,
    postKoreanSpellCheck,
    postMultilingualSpellCheck,
} from '@/services/spellCheck.apis';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// available language, /languages, method: GET
export const useGetAllAvailableLanguagesQuery = () => {
    return useQuery({
        queryKey: ['languages'],
        queryFn: () => getAllAvailableLanguages(),
        staleTime: Infinity,
        gcTime: Infinity,
        refetchInterval: 1000 * 60 * 60 * 24,
        refetchIntervalInBackground: false,
    });
};

// spell check, /check, method: POST
export const useMultilingualSpellCheckMutation = () => {
    const mutation = useMutation({
        mutationFn: (payload: MultilingualSpellCheckPayloadType) =>
            postMultilingualSpellCheck(payload),
        onSuccess: () => {
            toast.success('Spell check completed successfully!');
        },
        onError: error => {
            console.error('Spell check failed:', error);
            toast.error('Spell check failed. Please try again later.');
        },
    });

    return mutation;
};

// korean spell check, /correct-error, method: POST
export const useKoreanSpellCheckMutation = () => {
    const mutation = useMutation({
        mutationFn: (payload: KoreanSpellCheckPayloadType) => postKoreanSpellCheck(payload),
        onSuccess: () => {
            toast.success('한국어 맞춤법 교정 성공!');
        },
        onError: error => {
            console.error('맞춤법 교정 실패:', error);
            toast.error('한국어 맞춤법 교정 실패. 잠시 후 다시 시도해주세요.');
        },
    });

    return mutation;
};
