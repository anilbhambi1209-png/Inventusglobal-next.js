'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App-level error boundary caught:', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        background: '#fafafa',
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#fff1f2',
            color: '#e11d48',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <AlertCircle size={32} />
        </div>

        <span
          style={{
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#f16334',
            background: '#fff5f1',
            padding: '4px 12px',
            borderRadius: '9999px',
            marginBottom: '12px',
          }}
        >
          Something Went Wrong
        </span>

        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#0f172a',
            margin: '0 0 12px',
            letterSpacing: '-0.02em',
          }}
        >
          Application Error
        </h1>

        <p
          style={{
            fontSize: '0.94rem',
            color: '#64748b',
            lineHeight: 1.6,
            margin: '0 0 28px',
          }}
        >
          We encountered an unexpected issue while loading this page. Our team has been notified.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => reset()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f16334',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.92rem',
              padding: '11px 22px',
              borderRadius: '8px',
              cursor: 'pointer',
              border: 'none',
              transition: 'background 0.2s ease',
            }}
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #e2e8f0',
              fontWeight: 600,
              fontSize: '0.92rem',
              padding: '11px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            <Home size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
