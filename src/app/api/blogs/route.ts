import { NextResponse } from "next/server";
import { getAllBlogs, saveBlog } from "@/utils/blogStore";

export async function GET() {
  try {
    const blogs = getAllBlogs();
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, excerpt, content, coverImage, category, tags, author, readingTime } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required" },
        { status: 400 }
      );
    }

    const saved = saveBlog({
      title,
      slug: body.slug || "",
      excerpt: excerpt || (content.slice(0, 160) + "..."),
      content,
      coverImage: coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      category: category || "General",
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map((t: string) => t.trim()) : ["Digital Marketing"]),
      author: author || {
        name: "Inventus Team",
        role: "Growth Specialist",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
      },
      readingTime: readingTime || "",
      publishedAt: new Date().toISOString().split("T")[0],
    });

    return NextResponse.json({ success: true, blog: saved }, { status: 201 });
  } catch (error) {
    console.error("Failed to create blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
