import fs from "fs";
import path from "path";
import { BlogPost, TableOfContentItem } from "@/types/blog";

const dataFilePath = path.join(process.cwd(), "src", "data", "blogs.json");

// Helper to extract Table of Contents headings from markdown content
export function extractTableOfContents(content: string): TableOfContentItem[] {
  const lines = content.split("\n");
  const items: TableOfContentItem[] = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("### ")) {
      const title = trimmed.replace("### ", "").trim();
      const id = slugify(title);
      items.push({ id, title, level: 3 });
    } else if (trimmed.startsWith("## ")) {
      const title = trimmed.replace("## ", "").trim();
      const id = slugify(title);
      items.push({ id, title, level: 2 });
    }
  });

  return items;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllBlogs(): BlogPost[] {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const rawData = fs.readFileSync(dataFilePath, "utf-8");
    const blogs: BlogPost[] = JSON.parse(rawData);

    // Ensure table of contents is populated for each blog
    return blogs.map((blog) => {
      if (!blog.tableOfContents || blog.tableOfContents.length === 0) {
        return {
          ...blog,
          tableOfContents: extractTableOfContents(blog.content),
        };
      }
      return blog;
    });
  } catch (error) {
    console.error("Error reading blogs file:", error);
    return [];
  }
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const blogs = getAllBlogs();
  return blogs.find((b) => b.slug === slug);
}

export function saveBlog(newPost: Omit<BlogPost, "id" | "tableOfContents">): BlogPost {
  const blogs = getAllBlogs();
  
  const id = `blog-${Date.now()}`;
  const slug = newPost.slug || slugify(newPost.title);
  const tableOfContents = extractTableOfContents(newPost.content);
  const readingTime = newPost.readingTime || calculateReadingTime(newPost.content);

  const fullPost: BlogPost = {
    ...newPost,
    id,
    slug,
    readingTime,
    publishedAt: newPost.publishedAt || new Date().toISOString().split("T")[0],
    tableOfContents,
  };

  // Prepend new post so latest is at the top
  const updatedBlogs = [fullPost, ...blogs.filter((b) => b.slug !== slug)];

  fs.writeFileSync(dataFilePath, JSON.stringify(updatedBlogs, null, 2), "utf-8");
  return fullPost;
}

export function deleteBlog(idOrSlug: string): boolean {
  const blogs = getAllBlogs();
  const filtered = blogs.filter((b) => b.id !== idOrSlug && b.slug !== idOrSlug);
  if (filtered.length === blogs.length) {
    return false;
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
