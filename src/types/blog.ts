export interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown / HTML / formatted paragraphs
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  readingTime: string;
  publishedAt: string;
  tableOfContents?: TableOfContentItem[];
}
