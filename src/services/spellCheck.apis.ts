import axios from 'axios';
import qs from 'qs';

// default axios instance for languageTool
const languageToolApi = axios.create({
    baseURL: 'https://api.languagetool.org/v2',
    timeout: 4000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// default axios instance for hanspell
const bareunApi = axios.create({
    baseURL: 'http://127.0.0.1:4000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// available language, /languages, method: GET
export const getAllAvailableLanguages = async (): Promise<LanguagesResponseType> => {
    const response = await languageToolApi.get('/languages');
    return response.data;
};

// spell check, /check, method: POST
export const postMultilingualSpellCheck = async (
    payload: MultilingualSpellCheckPayloadType,
): Promise<MultilingualSpellCheckResponseType> => {
    const response = await languageToolApi.post('/check', qs.stringify(payload), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return response.data;
};

// korean spell check, /check, method: POST
export const postKoreanSpellCheck = async (
    payload: KoreanSpellCheckPayloadType,
): Promise<KoreanSpellCheckResponse> => {
    const response = await bareunApi.post('/check', payload);
    return response.data;
};
