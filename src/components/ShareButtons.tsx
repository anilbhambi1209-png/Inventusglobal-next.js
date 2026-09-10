"use client";

import { useState } from "react";
import { Share2, Check, MessageCircle, Link2 } from "lucide-react";

interface ShareProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/blog/${slug}`;
    }
    return `https://inventusglobal.com/blog/${slug}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareToTwitter = () => {
    const url = encodeURIComponent(getUrl());
    const text = encodeURIComponent(`Check out "${title}" by @InventusGlobal:`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(getUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const shareToWhatsApp = () => {
    const url = encodeURIComponent(getUrl());
    const text = encodeURIComponent(`*${title}*\n${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="share-bar">
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600, fontSize: "0.95rem" }}>
        <Share2 size={18} style={{ color: "var(--primary)" }} />
        <span>Share article:</span>
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button onClick={shareToLinkedIn} className="share-btn" title="Share on LinkedIn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#0a66c2">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
          LinkedIn
        </button>

        <button onClick={shareToTwitter} className="share-btn" title="Share on X / Twitter">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Twitter / X
        </button>

        <button onClick={shareToWhatsApp} className="share-btn" title="Share on WhatsApp">
          <MessageCircle size={16} style={{ color: "#25d366" }} />
          WhatsApp
        </button>

        <button onClick={handleCopy} className="share-btn" title="Copy Link">
          {copied ? <Check size={16} style={{ color: "#10b981" }} /> : <Link2 size={16} />}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
