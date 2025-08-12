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

/*

마크다운 Table of Contents(TOC) 유틸

─────────────────────────────
1. buildTocTree(flatArray)
─────────────────────────────
- 평면(1차원) TOC 배열을 계층형 구조로 변환.
- 입력: TableOfContentsItemType[] (각 item은 level 값 가짐)
  - level === 1 → h1: 상위 항목으로 추가.
  - level === 2 → h2: 가장 최근의 h1의 children에 추가.
- 출력: 계층형 TOC 배열 (h1 → children(h2...))

─────────────────────────────
2. extractTextFromReactChildren(children)
─────────────────────────────
- ReactNode(children)에서 순수 텍스트만 추출.
- 동작:
  1) 문자열/숫자 → String으로 변환.
  2) 배열 → 재귀 호출 후 공백으로 join.
  3) ReactElement → props.children에서 재귀 호출.
  4) 그 외 → 빈 문자열 반환.
- 목적: heading 요소 내 텍스트만 뽑아 ID 생성 등에서 사용.

─────────────────────────────
3. isReactElement(node)
─────────────────────────────
- 주어진 node가 ReactElement인지 타입 가드로 판별.
- 조건:
  - typeof node === 'object'
  - null이 아님
  - 'props' 속성이 있음

─────────────────────────────
4. generateHeadingId(children)
─────────────────────────────
- heading 요소(children)에서 텍스트 추출 후 ID 생성.
- 과정:
  1) extractTextFromReactChildren으로 텍스트 추출.
  2) trim() 후 공백을 '-'로 변환.
  3) encodeURIComponent로 URL-safe하게 변환.
- 출력 예시: "Hello World!" → "Hello-World%21"

─────────────────────────────
5. flattenToc(tree)
─────────────────────────────
- 계층형 TOC를 1차원 배열로 평탄화.
- h1과 해당 children(h2 등)을 순서대로 포함.
- 출력: [h1, h2, h2, h1, h2 ...] 형태.
*/
