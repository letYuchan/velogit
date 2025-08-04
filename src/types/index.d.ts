interface PostData {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    summary: string;
    thumbnail: string;
    content: string;
    category: string;
}

interface SpellCheckPayloadType {
    text: string;
    language: LanguageToolCode;
}

type LanguageToolCode =
    | 'auto'
    | 'ar'
    | 'ast-ES'
    | 'be-BY'
    | 'br-FR'
    | 'ca-ES'
    | 'ca-ES-valencia'
    | 'ca-ES-balear'
    | 'da-DK'
    | 'de'
    | 'de-AT'
    | 'de-CH'
    | 'de-DE'
    | 'de-DE-x-simple-language'
    | 'de-DE-x-simple-language-DE'
    | 'de-LU'
    | 'el-GR'
    | 'en'
    | 'en-AU'
    | 'en-CA'
    | 'en-GB'
    | 'en-NZ'
    | 'en-US'
    | 'en-ZA'
    | 'eo'
    | 'es'
    | 'es-AR'
    | 'es-ES'
    | 'fa'
    | 'fa-IR'
    | 'fr'
    | 'fr-BE'
    | 'fr-CA'
    | 'fr-CH'
    | 'fr-FR'
    | 'ga-IE'
    | 'gl-ES'
    | 'it'
    | 'it-IT'
    | 'ja-JP'
    | 'km-KH'
    | 'nb'
    | 'nl'
    | 'nl-BE'
    | 'nl-NL'
    | 'no'
    | 'pl-PL'
    | 'pt'
    | 'pt-AO'
    | 'pt-BR'
    | 'pt-MZ'
    | 'pt-PT'
    | 'ro-RO'
    | 'ru-RU'
    | 'sk-SK'
    | 'sl-SI'
    | 'sv'
    | 'sv-SE'
    | 'ta-IN'
    | 'tl-PH'
    | 'uk-UA'
    | 'zh-CN'
    | 'crh-UA';
interface SpellCheckResponseType {
    software: {
        name: string;
        version: string;
        buildDate: string;
        apiVersion: number;
        premium?: boolean;
        premiumHint?: string;
        status?: string;
    };
    warnings?: {
        incompleteResults: boolean;
    };
    language: {
        name: string;
        code: string;
        detectedLanguage?: {
            name: string;
            code: string;
            confidence: number;
            source?: string;
        };
    };
    matches: Match[];
    sentenceRanges: [number, number][];
    extendedSentenceRanges: {
        from: number;
        to: number;
        detectedLanguages: {
            language: string;
            rate: number;
        }[];
    }[];
}

interface Match {
    message: string;
    shortMessage: string;
    replacements: {
        value: string;
        shortDescription?: string;
    }[];
    offset: number;
    length: number;
    context: {
        text: string;
        offset: number;
        length: number;
    };
    sentence: string;
    type: {
        typeName: string;
    };
    rule: {
        id: string;
        subId?: string;
        sourceFile?: string;
        description: string;
        issueType: string;
        category: {
            id: string;
            name: string;
        };
        urls?: {
            value: string;
        }[];
        isPremium: boolean;
        confidence: number;
    };
    ignoreForIncompleteSentence?: boolean;
    contextForSureMatch?: number;
}
type LanguagesResponseType = LanguageToolLanguage[];

interface LanguageToolLanguage {
    name: string;
    code: string;
    longCode: string;
}
