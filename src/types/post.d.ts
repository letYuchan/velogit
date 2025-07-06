interface TableOfContentsItemType {
  id: string;
  text: string;
  level: 1 | 2;
  children?: TableOfContentsItemType[];
}

interface FrontMatterType {
  title: string;
  date: string;
  tags: string[];
  category: string;
}
