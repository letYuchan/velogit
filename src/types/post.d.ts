interface TableOfContentsItemType {
    id: string;
    text: string;
    level: 1 | 2;
    children?: TableOfContentsItemType[];
}

interface ParsedFrontMatterType {
    title: string;
    date: string;
    tags: string[];
    category: string;
}

interface CommentData {
    slug: string;
    user: string;
    date: string;
    content: string;
}

interface ActiveTocIdOptions  {
    rootMargin?: string;
    thresholds?: number[];
    enableScrollFallback?: boolean;
    activateLastOnBottom?: boolean;
    syncHash?: boolean;
};

