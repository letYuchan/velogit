import { type ReactElement, type ReactNode } from 'react';

export const buildTocTree = (flatArray: TableOfContentsItemType[]) => {
    const tocTree: TableOfContentsItemType[] = [];
    let currentParent: TableOfContentsItemType | null = null;

    flatArray.forEach(item => {
        if (item.level === 1) {
            currentParent = { ...item, children: [] };
            tocTree.push(currentParent);
        } else if (item.level === 2 && currentParent) {
            currentParent.children!.push(item);
        }
    });

    return tocTree;
};

export const extractTextFromReactChildren = (children: ReactNode): string => {
    if (typeof children === 'string' || typeof children === 'number') {
        return String(children);
    }

    if (Array.isArray(children)) {
        return children.map(extractTextFromReactChildren).join(' ');
    }

    if (isReactElement(children) && children.props?.children) {
        return extractTextFromReactChildren(children.props.children);
    }

    return '';
};

const isReactElement = (node: ReactNode): node is ReactElement<{ children?: ReactNode }> => {
    return typeof node === 'object' && node !== null && 'props' in node;
};
export const generateHeadingId = (children: ReactNode): string => {
    const rawText = extractTextFromReactChildren(children);
    return encodeURIComponent(rawText.trim().replace(/\s+/g, '-'));
};

export const flattenToc = (tree: TableOfContentsItemType[]) =>
    tree.flatMap(h1 => [h1, ...(h1.children ?? [])]);
