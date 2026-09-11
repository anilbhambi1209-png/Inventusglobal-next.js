"use client";

import { useEffect, useState } from "react";
import { TableOfContentItem } from "@/types/blog";
import { ListOrdered } from "lucide-react";
import styles from "./TableOfContents.module.css";

interface TOCProps {
  items: TableOfContentItem[];
}

export default function TableOfContents({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!items || items.length === 0) return;

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, [items]);

  if (!items || items.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const topOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <aside className={styles.tocSidebar} aria-label="Table of contents">
      <div className={styles.tocHeader}>
        <ListOrdered size={18} style={{ color: "var(--primary)" }} />
        <span>Table of Contents</span>
      </div>

      <nav>
        <ul className={styles.tocList}>
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`${styles.tocLink} ${isActive ? styles.active : ""} ${
                    item.level === 3 ? styles.tocLevel3 : ""
                  }`}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
