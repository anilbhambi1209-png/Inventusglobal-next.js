"use client";

export default function ContinuousLearningMarquee() {
  const brands = [
    {
      name: "Udemy",
      svg: (
        <svg height="34" viewBox="0 0 120 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Udemy U shape */}
          <path
            d="M16.5 4C14.2 4 12.2 4.9 10.7 6.4C9.2 4.9 7.2 4 4.9 4C2.2 4 0 6.2 0 8.9V22.2C0 27.6 4.4 32 9.8 32H11.6C17 32 21.4 27.6 21.4 22.2V8.9C21.4 6.2 19.2 4 16.5 4ZM17.4 22.2C17.4 25.4 14.8 28 11.6 28H9.8C6.6 28 4 25.4 4 22.2V8.9C4 8.4 4.4 8 4.9 8C5.4 8 5.8 8.4 5.8 8.9V19.2C5.8 21.4 7.6 23.2 9.8 23.2H11.6C13.8 23.2 15.6 21.4 15.6 19.2V8.9C15.6 8.4 16 8 16.5 8C17 8 17.4 8.4 17.4 8.9V22.2Z"
            fill="#EC5252"
          />
          <text x="32" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="700" fill="#2d2f31">
            udemy
          </text>
        </svg>
      ),
    },
    {
      name: "Google Ads",
      svg: (
        <svg height="34" viewBox="0 0 135 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Google Ads icon: Blue bar, Yellow bar, Green circle */}
          <path d="M5.5 24.5L14.2 6.5C14.8 5.3 16.3 4.8 17.5 5.4C18.7 6 19.2 7.5 18.6 8.7L9.9 26.7C9.3 27.9 7.8 28.4 6.6 27.8C5.4 27.2 4.9 25.7 5.5 24.5Z" fill="#FBBC04" />
          <path d="M23.1 24.3L14.4 6.3C13.8 5.1 12.3 4.6 11.1 5.2C9.9 5.8 9.4 7.3 10 8.5L18.7 26.5C19.3 27.7 20.8 28.2 22 27.6C23.2 27 23.7 25.5 23.1 24.3Z" fill="#4285F4" />
          <circle cx="9" cy="25" r="4" fill="#34A853" />
          <text x="34" y="23" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="700" fill="#4B5563">
            Google
          </text>
          <text x="91" y="23" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="400" fill="#6B7280">
            Ads
          </text>
        </svg>
      ),
    },
    {
      name: "HubSpot",
      svg: (
        <svg height="34" viewBox="0 0 130 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontSize="21" fontWeight="800" fill="#2D3E50">
            HubSp
          </text>
          {/* Sprocket O */}
          <circle cx="78" cy="17" r="6" stroke="#FF7A59" strokeWidth="3" fill="none" />
          <circle cx="85" cy="9" r="2.5" fill="#FF7A59" />
          <circle cx="85" cy="25" r="2.5" fill="#FF7A59" />
          <line x1="82" y1="12" x2="84" y2="10" stroke="#FF7A59" strokeWidth="2" />
          <line x1="82" y1="22" x2="84" y2="24" stroke="#FF7A59" strokeWidth="2" />
          <text x="92" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontSize="21" fontWeight="800" fill="#2D3E50">
            t
          </text>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      svg: (
        <svg height="34" viewBox="0 0 120 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="700" fill="#0A66C2">
            Linked
          </text>
          <rect x="76" y="5" width="24" height="24" rx="4" fill="#0A66C2" />
          <text x="80" y="23" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="700" fill="#ffffff">
            in
          </text>
        </svg>
      ),
    },
    {
      name: "edX",
      svg: (
        <svg height="34" viewBox="0 0 90 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontSize="26" fontWeight="800" fill="#B72667">
            ed
          </text>
          <text x="34" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontSize="28" fontWeight="800" fill="#007998">
            X
          </text>
        </svg>
      ),
    },
    {
      name: "HarvardX",
      svg: (
        <svg height="34" viewBox="0 0 140 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Harvard shield */}
          <rect x="2" y="7" width="16" height="20" rx="3" fill="#A51C30" />
          <path d="M10 9V25M5 13H15M5 19H15" stroke="#ffffff" strokeWidth="1.2" />
          <text x="24" y="22" fontFamily="Georgia, serif" fontSize="17" fontWeight="700" fill="#1e293b">
            Harvard
          </text>
          <text x="96" y="22" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="800" fill="#A51C30">
            X
          </text>
          <text x="24" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7" fontWeight="600" fill="#94a3b8" letterSpacing="0.5">
            AN ONLINE LEARNING INITIATIVE
          </text>
        </svg>
      ),
    },
    {
      name: "Amazon",
      svg: (
        <svg height="34" viewBox="0 0 120 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="20" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="800" fill="#111827">
            amazon
          </text>
          {/* Amazon smile arrow */}
          <path
            d="M8 25C22 30 48 29 64 23"
            stroke="#FF9900"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M62 20L67 23L62 26"
            fill="#FF9900"
          />
        </svg>
      ),
    },
    {
      name: "Meta",
      svg: (
        <svg height="34" viewBox="0 0 110 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Meta Infinity loop */}
          <path
            d="M14 11C10.5 11 8 13.5 6 16.5C4 13.5 1.5 11 -2 11C-6 11 -9 14.5 -9 18.5C-9 22.5 -6 26 -2 26C1.5 26 4 23.5 6 20.5C8 23.5 10.5 26 14 26C18 26 21 22.5 21 18.5C21 14.5 18 11 14 11ZM-2 23C-4.5 23 -6 21 -6 18.5C-6 16 -4.5 14 -2 14C0 14 2 16 3.5 18.5C2 21 0 23 -2 23ZM14 23C12 23 10 21 8.5 18.5C10 16 12 14 14 14C16.5 14 18 16 18 18.5C18 21 16.5 23 14 23Z"
            transform="translate(10, 0)"
            fill="url(#meta-grad)"
          />
          <defs>
            <linearGradient id="meta-grad" x1="0" y1="10" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0081FB" />
              <stop offset="1" stopColor="#0064E0" />
            </linearGradient>
          </defs>
          <text x="42" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="700" fill="#111827">
            Meta
          </text>
        </svg>
      ),
    },
    {
      name: "Google Analytics",
      svg: (
        <svg height="34" viewBox="0 0 160 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Analytics Bars */}
          <rect x="4" y="20" width="5" height="8" rx="2" fill="#F9AB00" />
          <rect x="12" y="14" width="5" height="14" rx="2" fill="#E37400" />
          <rect x="20" y="8" width="5" height="20" rx="2" fill="#F9AB00" />
          <text x="32" y="22" fontFamily="system-ui, -apple-system, sans-serif" fontSize="15" fontWeight="700" fill="#475569">
            Google
          </text>
          <text x="86" y="22" fontFamily="system-ui, -apple-system, sans-serif" fontSize="15" fontWeight="400" fill="#64748b">
            Analytics
          </text>
        </svg>
      ),
    },
    {
      name: "Semrush",
      svg: (
        <svg height="34" viewBox="0 0 120 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fireball flame icon */}
          <circle cx="12" cy="17" r="7" fill="#FF642D" />
          <path d="M12 11L14 15L18 16L15 19L15 23L12 21L9 23L9 19L6 16L10 15Z" fill="#ffffff" />
          <text x="26" y="23" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="800" fill="#111827">
            semrush
          </text>
        </svg>
      ),
    },
  ];

  // Duplicate items twice to ensure endless continuous loop
  const marqueeItems = [...brands, ...brands, ...brands];

  return (
    <section id="continuous-learning" className="learning-marquee-section">
      <div className="container">
        <div className="learning-header">
          <div className="phase-badge phase-badge-neutral" style={{ margin: "0 auto 16px" }}>
            <span className="phase-pulse-dot" />
            <span>PHASE 04 // CONTINUOUS LEARNING &amp; TECH ECOSYSTEM</span>
          </div>
          <h2 className="learning-title">
            We grow by <br />
            <span>continuous learning</span>
          </h2>
          <div className="learning-accent-bar" />
          <p className="learning-subtitle">
            35+ certifications across the team, refreshed as the platforms change.
          </p>
        </div>
      </div>

      {/* Vibrant Colored Ribbon Marquee */}
      <div className="learning-marquee-ribbon">
        <div className="learning-marquee-container">
          <div className="learning-marquee-track">
            {marqueeItems.map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="learning-brand-item"
                title={brand.name}
              >
                {brand.svg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
