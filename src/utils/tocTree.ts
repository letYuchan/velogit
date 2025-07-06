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
