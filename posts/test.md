---
title: 'Markdown Full Test'
date: '2025-07-25'
category: 'test'
tags: ['markdown', 'test', 'all']
summary: 'This post tests all markdown components used in the renderer.'
---

# Heading Level 1

Some paragraph text under h1.  
Line breaks  
are supported.

## Heading Level 2

Still under h2 with a paragraph.

### Heading Level 3

Yet another paragraph under h3.

#### Heading Level 4

Final heading level with a short note.

---

Paragraph with **bold**, _italic_, and ~~strikethrough~~ text.  
Here's some `inline code` in a sentence.

> This is a blockquote.
> It spans multiple lines and demonstrates styling.

- Unordered list item 1
- Unordered list item 2
- Another item with a [link](https://example.com)

1. Ordered list first item
2. Ordered list second item
3. Ordered list with **bold** inside

---

![귀여운 고양이](/images/test.jpg)

---

## Code Block

```ts
// This is a TypeScript code block
type User = {
    id: number;
    name: string;
};

const greet = (user: User) => {
    return `Hello, ${user.name}`;
};
```
