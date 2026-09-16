"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Phone,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export default function InteractiveParticleHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let orangeParticles: Particle[] = [];
    let amberParticles: Particle[] = [];
    let textParticles: Particle[] = [];

    const mouse = {
      x: -9999,
      y: -9999,
      radius: 115,
      isHovered: false,
      lastMove: 0,
    };

    let logoBounds = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    let canvasLogicalW = 0;
    let canvasLogicalH = 0;
    let centerLogoY = 0;

    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.src = "/inventus-logo.png";

    const initParticles = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Generous canvas bleed padding so particles never clip against any rectangular boundary
      const isMobile = width < 768;
      const padX = isMobile ? 80 : 160;
      const padY = isMobile ? 60 : 120;

      canvasLogicalW = width + padX * 2;
      canvasLogicalH = height + padY * 2;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvasLogicalW * dpr;
      canvas.height = canvasLogicalH * dpr;
      canvas.style.width = `${canvasLogicalW}px`;
      canvas.style.height = `${canvasLogicalH}px`;
      canvas.style.left = `-${padX}px`;
      canvas.style.top = `-${padY}px`;
      ctx.scale(dpr, dpr);

      // Create offscreen canvas for high-density pixel sampling
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      // Scale logo significantly larger (up to 820px width) to fill the executive view
      const aspect = logoImg.height / (logoImg.width || 1);
      const maxLogoW = Math.min(width * 0.92, 820);
      const maxLogoH = Math.max(height - 12, 60);
      const targetW = Math.min(maxLogoW, maxLogoH / (aspect || 0.193));
      const targetH = targetW * aspect;

      offscreen.width = targetW;
      offscreen.height = targetH;
      offCtx.drawImage(logoImg, 0, 0, targetW, targetH);

      const imgData = offCtx.getImageData(0, 0, targetW, targetH);
      const data = imgData.data;

      // Calibrated sampling step and particle radius for visible separation & subtle gaps
      const step = width < 768 ? 3.2 : 2.4;
      particles = [];
      orangeParticles = [];
      amberParticles = [];
      textParticles = [];

      // Origin coordinates centered in the container, offset by padX and padY
      const startX = padX + (width - targetW) / 2;
      const startY = padY + (height - targetH) / 2;
      centerLogoY = startY + targetH * 0.5;

      // Active interactive boundary around the logo particles
      logoBounds = {
        minX: startX - 45,
        maxX: startX + targetW + 45,
        minY: startY - 40,
        maxY: startY + targetH + 40,
      };

      for (let y = 0; y < targetH; y += step) {
        for (let x = 0; x < targetW; x += step) {
          const idx = (Math.floor(y) * Math.floor(targetW) + Math.floor(x)) * 4;
          const alpha = data[idx + 3];

          // Capture all antialiased letter strokes of 'INVENTUS GLOBAL'
          if (alpha > 35) {
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            const originX = startX + x;
            const originY = startY + y;
            const p: Particle = {
              x: originX + (Math.random() - 0.5) * 40,
              y: originY + (Math.random() - 0.5) * 40,
              originX,
              originY,
              vx: 0,
              vy: 0,
              // Refined radius (0.95 - 1.15px) leaving a crisp ~0.4px gap between adjacent 2.4px grid points
              size: Math.random() * 0.2 + 0.95,
              color: "",
            };

            particles.push(p);

            // Categorize into fast-draw batches
            if (r > 170 && g < 120) {
              // Primary orange brand mark
              orangeParticles.push(p);
            } else if (r > 170 && g >= 120) {
              // Amber gold brand mark
              amberParticles.push(p);
            } else {
              // INVENTUS GLOBAL text letters (crisp luminous diamond off-white)
              textParticles.push(p);
            }
          }
        }
      }
      setIsLoaded(true);
    };

    logoImg.onload = () => {
      initParticles();
    };

    if (logoImg.complete) {
      initParticles();
    }

    // Autonomous Kinetic Slicing Arrow (idle dynamic cutting effect with service tags)
    const arrowServiceTags = [
      "SEO",
      "SMM",
      "WEB DEVELOPMENT",
      "DIGITAL MARKETING",
      "DESIGN",
      "PERFORMANCE ADS",
      "BRAND STRATEGY",
    ];
    let tagIndex = 0;

    const arrowState = {
      active: false,
      direction: 1, // 1: left-to-right, -1: right-to-left
      x: -390,
      y: 0,
      speed: 6.5, // Smooth, elegant glide speed allowing comfortable reading of every service tag
      radius: 88, // Generous cutting radius framing the text badge
      cooldown: 55, // Initial launch ~0.9s after load
      tag: arrowServiceTags[0],
    };

    let time = 0;
    const render = () => {
      time += 0.02;

      ctx.clearRect(0, 0, canvasLogicalW, canvasLogicalH);

      // Fast physics updates
      const pLen = particles.length;
      const isHovered = mouse.isHovered;
      const mx = mouse.x;
      const my = mouse.y;
      const radius = mouse.radius;
      const radiusSq = radius * radius;
      const waveX = Math.sin(time) * 0.35;
      const waveY = Math.cos(time * 0.8) * 0.35;

      // Check if cursor is actively hovering over the logo particles
      const isCursorOverLogo =
        mouse.isHovered &&
        mouse.x >= logoBounds.minX &&
        mouse.x <= logoBounds.maxX &&
        mouse.y >= logoBounds.minY &&
        mouse.y <= logoBounds.maxY &&
        Date.now() - mouse.lastMove < 1200;

      // Update Autonomous Arrow Slicing Beam (Always comes back when cursor moves away or is idle!)
      if (!isCursorOverLogo) {
        if (!arrowState.active) {
          arrowState.cooldown--;
          if (arrowState.cooldown <= 0) {
            arrowState.active = true;
            // Cycle to next service tag on each new arrow launch
            arrowState.tag = arrowServiceTags[tagIndex];
            tagIndex = (tagIndex + 1) % arrowServiceTags.length;

            const targetY = centerLogoY > 0 ? centerLogoY : canvasLogicalH * 0.5;
            if (arrowState.direction === 1) {
              arrowState.x = -390;
              arrowState.y = targetY + 2;
            } else {
              arrowState.x = canvasLogicalW + 390;
              arrowState.y = targetY - 2;
            }
          }
        } else {
          arrowState.x += arrowState.speed * arrowState.direction;

          // When arrow finishes cutting across the entire canvas
          if (
            (arrowState.direction === 1 && arrowState.x > canvasLogicalW + 410) ||
            (arrowState.direction === -1 && arrowState.x < -410)
          ) {
            arrowState.active = false;
            arrowState.direction = arrowState.direction === 1 ? -1 : 1; // Return back on next sweep!
            arrowState.cooldown = 110; // ~1.8 seconds interval between sweeps
          }
        }
      } else {
        // When actively hovering over the logo particles, the arrow disappears
        arrowState.active = false;
        arrowState.cooldown = 35; // Comes back just ~0.5s after cursor moves away!
      }

      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        // 1. User Cursor Repulsion (active only when cursor is actually over the logo)
        if (isCursorOverLogo) {
          const dx = mx - p.x;
          const dy = my - p.y;
          if (Math.abs(dx) < radius && Math.abs(dy) < radius) {
            const distSq = dx * dx + dy * dy;
            if (distSq < radiusSq) {
              const dist = Math.sqrt(distSq);
              const force = (radius - dist) / radius;
              const push = force * 18;
              const angle = Math.atan2(dy, dx);
              p.vx -= Math.cos(angle) * push;
              p.vy -= Math.sin(angle) * push;
            }
          }
        }

        // 2. Kinetic Arrow Cutting Shockwave (smooth parting wake allowing clear visibility)
        if (arrowState.active) {
          const adx = arrowState.x - p.x;
          const ady = arrowState.y - p.y;
          const ar = arrowState.radius;
          if (Math.abs(adx) < ar * 1.3 && Math.abs(ady) < ar) {
            const distSq = adx * adx + ady * ady;
            if (distSq < ar * ar) {
              const dist = Math.sqrt(distSq);
              const force = (ar - dist) / ar;
              // Smooth wake: gently parts particles outward perpendicularly from trajectory
              const pushY = (ady >= 0 ? -1 : 1) * force * 6.5;
              const pushX = (adx >= 0 ? -1 : 1) * force * 2.5;
              p.vy += pushY;
              p.vx += pushX;
            }
          }
        }

        // Cap velocity to prevent runaway dispersion
        const vSq = p.vx * p.vx + p.vy * p.vy;
        if (vSq > 576) {
          const factor = 24 / Math.sqrt(vSq);
          p.vx *= factor;
          p.vy *= factor;
        }

        // Elastic return force to exact origin
        p.vx += (p.originX + waveX - p.x) * 0.085;
        p.vy += (p.originY + waveY - p.y) * 0.085;

        // Friction damping
        p.vx *= 0.86;
        p.vy *= 0.86;

        p.x += p.vx;
        p.y += p.vy;

        // Boundary reflection keeping particles inside the generous canvas bleed
        if (p.x < 12) { p.vx += 2.5; p.x = 12; }
        else if (p.x > canvasLogicalW - 12) { p.vx -= 2.5; p.x = canvasLogicalW - 12; }
        if (p.y < 12) { p.vy += 2.5; p.y = 12; }
        else if (p.y > canvasLogicalH - 12) { p.vy -= 2.5; p.y = canvasLogicalH - 12; }
      }

      // 1. Draw Orange particles in single GPU batch
      const oLen = orangeParticles.length;
      if (oLen > 0) {
        ctx.fillStyle = "rgba(241, 99, 52, 0.95)";
        ctx.beginPath();
        for (let i = 0; i < oLen; i++) {
          const p = orangeParticles[i];
          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // 2. Draw Amber particles in single GPU batch
      const aLen = amberParticles.length;
      if (aLen > 0) {
        ctx.fillStyle = "rgba(245, 158, 11, 0.95)";
        ctx.beginPath();
        for (let i = 0; i < aLen; i++) {
          const p = amberParticles[i];
          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // 3. Draw INVENTUS GLOBAL text particles in single GPU batch
      const tLen = textParticles.length;
      if (tLen > 0) {
        ctx.fillStyle = "rgba(241, 245, 249, 0.95)";
        ctx.beginPath();
        for (let i = 0; i < tLen; i++) {
          const p = textParticles[i];
          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // 4. Draw Futuristic Kinetic Slicing Arrow when active (with dynamic service text tag)
      if (arrowState.active) {
        ctx.save();
        ctx.translate(arrowState.x, arrowState.y);
        const dir = arrowState.direction;
        const tag = arrowState.tag || "SEO";

        // Dynamic tail measurement with distinct character gaps
        ctx.font = "800 14.5px 'Poppins', 'DM Sans', sans-serif";
        const charGap = 3.5; // Distinct, readable gap between characters
        const wordGap = 11; // Clear separation between words
        let totalTextW = 0;
        const tagLen = tag.length;
        for (let c = 0; c < tagLen; c++) {
          if (tag[c] === " ") {
            totalTextW += wordGap;
          } else {
            totalTextW += ctx.measureText(tag[c]).width + (c < tagLen - 1 && tag[c + 1] !== " " ? charGap : 0);
          }
        }

        const pillPadX = 14;
        const pillH = 30;
        const dotRadius = 3.5;
        const dotGap = 10;
        const pillW = totalTextW + pillPadX * 2 + dotRadius * 2 + dotGap;
        const tailLen = pillW + 80;

        // Glowing plasma streak tail with vibrant chromatic spectrum (Green -> Blue -> Pink -> Yellow)
        const grad = ctx.createLinearGradient(-tailLen * dir, 0, 24 * dir, 0);
        grad.addColorStop(0, "rgba(34, 197, 94, 0)");
        grad.addColorStop(0.25, "rgba(56, 189, 248, 0.45)");
        grad.addColorStop(0.65, "rgba(236, 72, 153, 0.8)");
        grad.addColorStop(0.88, "rgba(250, 204, 21, 0.95)");
        grad.addColorStop(1, "#ffffff");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-tailLen * dir, 0);
        ctx.lineTo(20 * dir, 0);
        ctx.stroke();

        // High-tech service pill capsule positioned along the tail behind arrowhead
        // When dir === 1: arrowhead is at +28 pointing right, pill sits to the left
        // When dir === -1: arrowhead is at -28 pointing left, pill sits to the right
        const pillX = dir === 1 ? -pillW - 14 : 14;
        const pillY = -pillH / 2;

        // Chromatic gradient border matching the mixed Green, Blue, Pink & Yellow palette
        const pillBorderGrad = ctx.createLinearGradient(pillX, 0, pillX + pillW, 0);
        pillBorderGrad.addColorStop(0, "#22c55e");    // Neon Green
        pillBorderGrad.addColorStop(0.33, "#38bdf8"); // Electric Blue
        pillBorderGrad.addColorStop(0.66, "#ec4899"); // Hot Pink
        pillBorderGrad.addColorStop(1, "#facc15");    // Luminous Yellow

        // Capsule backdrop (deep obsidian luxury glassmorphism with chromatic border)
        ctx.fillStyle = "rgba(6, 9, 18, 0.94)";
        ctx.strokeStyle = pillBorderGrad;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "rgba(56, 189, 248, 0.5)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(pillX, pillY, pillW, pillH, pillH / 2);
        } else {
          ctx.rect(pillX, pillY, pillW, pillH);
        }
        ctx.fill();
        ctx.stroke();

        // Neon glowing cyan status beacon dot inside pill
        const dotX = pillX + pillPadX + dotRadius;
        const dotY = 0;
        ctx.fillStyle = "#38bdf8";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2);
        ctx.fill();

        // Mixed Multi-Color Typography: Character-by-character Green, Blue, Pink & Yellow with distinct gaps
        const charPalette = [
          "#22c55e", // Neon Green
          "#38bdf8", // Electric Blue
          "#ec4899", // Hot Pink
          "#facc15", // Luminous Yellow
        ];

        ctx.font = "800 14.5px 'Poppins', 'DM Sans', sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        let curX = dotX + dotRadius + dotGap;
        let colorIdx = 0;

        for (let c = 0; c < tagLen; c++) {
          const char = tag[c];
          if (char === " ") {
            curX += wordGap; // distinct gap between words
            continue;
          }

          const charColor = charPalette[colorIdx % charPalette.length];
          colorIdx++;

          ctx.fillStyle = charColor;
          ctx.shadowColor = charColor;
          ctx.shadowBlur = 8;
          ctx.fillText(char, curX, dotY);

          curX += ctx.measureText(char).width + charGap; // distinct gap between characters
        }

        // Neon outer glow for arrowhead
        ctx.shadowColor = "rgba(241, 99, 52, 0.95)";
        ctx.shadowBlur = 16;

        // Scaled supersonic aerodynamic arrowhead
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        if (dir === 1) {
          ctx.moveTo(28, 0);        // arrow tip
          ctx.lineTo(8, -13);       // top wing
          ctx.lineTo(13, 0);        // inner notch
          ctx.lineTo(8, 13);        // bottom wing
        } else {
          ctx.moveTo(-28, 0);       // arrow tip
          ctx.lineTo(-8, -13);      // top wing
          ctx.lineTo(-13, 0);       // inner notch
          ctx.lineTo(-8, 13);       // bottom wing
        }
        ctx.closePath();
        ctx.fill();

        // Secondary amber energy accent core
        ctx.fillStyle = "rgba(245, 158, 11, 0.95)";
        ctx.beginPath();
        if (dir === 1) {
          ctx.moveTo(20, 0);
          ctx.lineTo(10, -7);
          ctx.lineTo(13, 0);
          ctx.lineTo(10, 7);
        } else {
          ctx.moveTo(-20, 0);
          ctx.lineTo(-10, -7);
          ctx.lineTo(-13, 0);
          ctx.lineTo(-10, 7);
        }
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse & Touch Interaction Listeners tracked across the section
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isHovered = true;
      mouse.lastMove = Date.now();
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.isHovered = false;
      mouse.lastMove = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && canvas) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        mouse.isHovered = true;
        mouse.lastMove = Date.now();
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.isHovered = false;
    };

    const handleResize = () => {
      initParticles();
    };

    const targetEl = sectionRef.current || container;
    targetEl.addEventListener("mousemove", handleMouseMove, { passive: true });
    targetEl.addEventListener("mouseleave", handleMouseLeave);
    targetEl.addEventListener("touchmove", handleTouchMove, { passive: true });
    targetEl.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      targetEl.removeEventListener("mousemove", handleMouseMove);
      targetEl.removeEventListener("mouseleave", handleMouseLeave);
      targetEl.removeEventListener("touchmove", handleTouchMove);
      targetEl.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-particle-section">
      {/* Precision architectural tech grid */}
      <div className="hero-particle-grid" aria-hidden="true" />

      {/* Dual ambient aurora glows */}
      <div className="hero-particle-ambient-primary" aria-hidden="true" />
      <div className="hero-particle-ambient-secondary" aria-hidden="true" />

      {/* Luminous orbital horizon line */}
      <div className="hero-particle-horizon" aria-hidden="true" />

      <div className="container hero-particle-container">
        {/* Interactive Particle Logo Canvas (Atom Network Style) */}
        <div
          ref={containerRef}
          className="hero-particle-canvas-wrapper"
          title="Hover or drag your cursor to interact with the particle network"
        >
          {/* Holographic glowing pedestal halo behind particles */}
          <div className="hero-particle-halo" aria-hidden="true" />
          <canvas ref={canvasRef} className="hero-particle-canvas" />
        </div>

        {/* Hero Editorial Narrative & Actions */}
        <div className="hero-particle-content">
          <h1 className="hero-particle-title">
            <span className="hero-particle-title-primary">Not Just Digital Marketing.</span>
            <span className="hero-particle-title-accent">We Scale Businesses.</span>
          </h1>

          <p className="hero-particle-subtitle">
            Inventus Global is a performance-driven digital marketing agency based in Navi Mumbai, specializing in scalable growth strategies that deliver measurable results.
          </p>

          {/* Action CTA Buttons */}
          <div className="hero-particle-actions">
            <Link href="/contact" className="hero-btn-proposal">
              <span>Get a free proposal</span>
              <ArrowRight size={16} />
            </Link>

            <a href={`tel:${siteConfig.contact.primaryPhoneRaw}`} className="hero-btn-call">
              <Phone size={16} />
              <span>Call {siteConfig.contact.primaryPhone}</span>
            </a>
          </div>
        </div>

        {/* Subtle scroll down indicator */}
        <div className="hero-scroll-indicator">
          <a href="#anatomy-of-growth" aria-label="Scroll to next phase">
            <ChevronDown size={22} className="hero-scroll-bounce" />
          </a>
        </div>
      </div>

      {/* Seamless obsidian bottom transition into Phase 02 */}
      <div className="hero-particle-bottom-fade" aria-hidden="true" />
    </section>
  );
}
