import axios from 'axios';
import qs from 'qs';

// default axios instance
const languageToolApi = axios.create({
    baseURL: 'https://api.languagetool.org/v2',
    timeout: 4000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// available language, /v2/languages
export const getAvailableLanguages = async (): Promise<LanguagesResponseType> => {
    const response = await languageToolApi.get('/languages');
    return response.data;
};

// spell check, /v2/check, method: POST
export const postSpellCheck = async (
    payload: SpellCheckPayloadType,
): Promise<SpellCheckResponseType> => {
    const response = await languageToolApi.post('/check', qs.stringify(payload), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return response.data;
};
