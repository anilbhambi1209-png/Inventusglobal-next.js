"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  Share2,
  Globe,
  Target,
  FileText,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

export default function OurServices() {
  const baseServices = [
    {
      id: "seo",
      accentColor: "#22c55e",
      accentRgb: "34, 197, 94",
      icon: <Search size={44} strokeWidth={1.8} />,
      title: "Leading SEO Company",
      desc: "We provide high-impact organic search optimization that boosts keyword rankings, drives targeted traffic, and delivers measurable revenue.",
      href: "/services/search-engine-optimization",
    },
    {
      id: "smm",
      accentColor: "#f16334",
      accentRgb: "241, 99, 52",
      icon: <Share2 size={44} strokeWidth={1.8} />,
      title: "Best Social Media Marketing",
      desc: "Engage target audiences, build brand authority, and turn casual followers into loyal customers with viral creative hooks and retargeting.",
      href: "/services/social-media-content",
    },
    {
      id: "webdev",
      accentColor: "#f59e0b",
      accentRgb: "245, 158, 11",
      icon: <Globe size={44} strokeWidth={1.8} />,
      title: "Competitive Website Development",
      desc: "Ultra-fast Next.js web applications engineered for sub-second speeds, frictionless UI/UX design, and maximum lead conversions.",
      href: "/services/nextjs-web-development",
    },
    {
      id: "ppc",
      accentColor: "#6366f1",
      accentRgb: "99, 102, 241",
      icon: <Target size={44} strokeWidth={1.8} />,
      title: "Targeted Paid Advertising",
      desc: "Turn your advertising budget into predictable lead volume and sales with data-driven Google & Meta campaigns and CRO funnels.",
      href: "/services/google-ads-ppc",
    },
    {
      id: "content",
      accentColor: "#06b6d4",
      accentRgb: "6, 182, 212",
      icon: <FileText size={44} strokeWidth={1.8} />,
      title: "Authority Content & Copywriting",
      desc: "Authoritative editorial content and high-converting sales copy crafted to educate prospects, build trust, and drive conversions.",
      href: "/services/conversion-rate-optimization",
    },
    {
      id: "influencer",
      accentColor: "#ec4899",
      accentRgb: "236, 72, 153",
      icon: <Sparkles size={44} strokeWidth={1.8} />,
      title: "Influencer Brand Campaigns",
      desc: "Vetted creator partnerships that deliver genuine social proof, explosive brand recognition, and trackable direct-response sales.",
      href: "/services/influencer-marketing",
    },
  ];

  // Duplicated list for seamless infinite loop
  const displayServices = [...baseServices, ...baseServices];
  const totalBase = baseServices.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1080) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return totalBase - 1;
      }
      return prev - 1;
    });
  };

  // Auto slide loop timer
  useEffect(() => {
    if (isPaused) return;

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 3800);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPaused, totalBase]);

  // Seamless jump
  useEffect(() => {
    if (currentIndex >= totalBase) {
      const resetTimeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex % totalBase);
      }, 650);
      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex, totalBase]);

  const activeDotIndex = currentIndex % totalBase;

  return (
    <section id="our-services" className="future-services-section">
      <div className="container">
        {/* Header matching reference */}
        <div className="future-services-header">
          <div className="phase-badge phase-badge-light">
            <span className="phase-pulse-dot" />
            <span>PHASE 02 // 04 CORE GROWTH ENGINES</span>
          </div>
          <h2 className="future-services-title">
            We Provide <span className="future-title-accent">Future-Proof</span> Solutions
          </h2>
          <p className="future-services-desc">
            Explore our high-impact digital marketing, search dominance, and custom web engineering services engineered to scale your revenue.
          </p>
        </div>

        {/* Carousel Viewport */}
        <div
          className="future-slider-viewport"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setHoveredIdx(null);
          }}
        >
          <div
            className="future-slider-track"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              transition: isTransitioning
                ? "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
          >
            {displayServices.map((item, idx) => {
              // Highlight middle item in desktop view (slot 1) when nothing is hovered, or when hovered
              const slotInView = idx - currentIndex;
              const isMiddleInDesktop = visibleCount === 3 && slotInView === 1;
              const isFeatured = hoveredIdx !== null ? hoveredIdx === idx : isMiddleInDesktop;

              return (
                <div
                  key={`${item.id}-${idx}`}
                  className="future-slide-item"
                  style={{
                    flex: `0 0 ${100 / visibleCount}%`,
                    maxWidth: `${100 / visibleCount}%`,
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div
                    className={`future-card ${isFeatured ? "future-card-featured" : ""}`}
                    style={
                      {
                        "--card-accent": item.accentColor,
                        "--card-accent-rgb": item.accentRgb,
                      } as React.CSSProperties
                    }
                  >
                    <div className="future-card-icon">{item.icon}</div>

                    <h3 className="future-card-title">{item.title}</h3>

                    <p className="future-card-desc">{item.desc}</p>

                    <Link href={item.href} className="future-card-btn">
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slider Navigation & Dots */}
        <div className="future-slider-controls">
          <button
            onClick={handlePrev}
            className="future-arrow-btn"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="future-slider-dots">
            {baseServices.map((srv, idx) => (
              <button
                key={srv.id}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(idx);
                }}
                className={`future-dot ${activeDotIndex === idx ? "active" : ""}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="future-pause-btn"
            aria-label={isPaused ? "Resume auto slide" : "Pause auto slide"}
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>

          <button
            onClick={handleNext}
            className="future-arrow-btn"
            aria-label="Next Slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
