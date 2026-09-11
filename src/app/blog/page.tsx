import type { Metadata } from "next";
import { getAllBlogs } from "@/utils/blogStore";
import BlogListing from "@/components/BlogListing";

export const metadata: Metadata = {
  title: "Marketing Insights & Playbooks | Inventus Global",
  description:
    "Step-by-step performance marketing blueprints, search engine optimization frameworks, and paid advertising analysis from Inventus Global.",
};

export default function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <div>
      {/* Blog Page Hero Header */}
      <section
        style={{
          padding: "64px 0 36px",
          borderBottom: "1px solid var(--border-hairline)",
          background: "#ffffff",
        }}
      >
        <div className="container">
          <div style={{ marginBottom: "28px" }}>
            <span className="section-tag">Marketing Publications</span>
            <h1 className="section-title blog-page-title">
              The Inventus Global <span style={{ color: "var(--primary)" }}>Journal</span>
            </h1>
            <p className="section-desc" style={{ maxWidth: "600px" }}>
              Step-by-step performance marketing blueprints, search engine optimization frameworks, and paid advertising analysis.
            </p>
          </div>

          <BlogListing initialBlogs={blogs} />
        </div>
      </section>
    </div>
  );
}
