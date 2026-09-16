'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Root layout global error caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          background: '#0f172a',
          color: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '480px',
            padding: '40px 24px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(241, 99, 52, 0.15)',
              border: '1px solid rgba(241, 99, 52, 0.4)',
              color: '#f16334',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '24px',
              fontWeight: 800,
            }}
          >
            !
          </div>

          <h1
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              margin: '0 0 12px',
              letterSpacing: '-0.02em',
            }}
          >
            System Error
          </h1>

          <p
            style={{
              fontSize: '0.92rem',
              color: '#94a3b8',
              lineHeight: 1.6,
              margin: '0 0 28px',
            }}
          >
            An unexpected error occurred in the core application shell. Please try reloading or check back shortly.
          </p>

          <button
            onClick={() => reset()}
            style={{
              background: '#f16334',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.92rem',
              padding: '12px 28px',
              borderRadius: '8px',
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 4px 14px rgba(241, 99, 52, 0.3)',
            }}
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
