import {
    getAllAvailableLanguages,
    postKoreanSpellCheck,
    postMultilingualSpellCheck,
} from '@/services/spellCheck.apis';
import { useMutation, useQuery } from '@tanstack/react-query';

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
            alert('Spell check completed successfully.');
        },
        onError: error => {
            console.error('Spell check failed:', error);
            alert('Spell check failed. Please try again later.');
        },
    });

    return mutation;
};

// korean spell check, /correct-error, method: POST
export const useKoreanSpellCheckMutation = () => {
    const mutation = useMutation({
        mutationFn: (payload: KoreanSpellCheckPayloadType) => postKoreanSpellCheck(payload),
        onSuccess: () => {
            alert('한국어 맞춤법 교정이 성공적으로 완료됐습니다.');
        },
        onError: error => {
            console.error('맞춤법 교정 실패:', error);
            alert('한국어 맞춤법 교정 실패. 잠시 후 다시 시도해주세요.');
        },
    });

    return mutation;
};
