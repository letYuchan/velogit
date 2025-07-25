import React from 'react';

export const extractTextFromReactChildren = (children: React.ReactNode): string => {
    if (typeof children === 'string' || typeof children === 'number') {
        return String(children);
    }
    if (Array.isArray(children)) {
        return children.map(extractTextFromReactChildren).join('');
    }
    if (React.isValidElement(children)) {
        const element = children as React.ReactElement<{ children?: React.ReactNode }>;
        return extractTextFromReactChildren(element.props.children);
    }
    return '';
};
