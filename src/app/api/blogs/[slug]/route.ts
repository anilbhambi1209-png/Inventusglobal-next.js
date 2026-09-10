import { NextResponse } from "next/server";
import { getBlogBySlug, deleteBlog } from "@/utils/blogStore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error retrieving blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const success = deleteBlog(slug);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Blog not found or could not be deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error deleting blog" },
      { status: 500 }
    );
  }
}
