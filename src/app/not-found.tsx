import Link from 'next/link';
import { ArrowRight, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        background: 'radial-gradient(circle at 50% 10%, #fff6f2 0%, #ffffff 60%)',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(241, 99, 52, 0.1)',
            border: '1px solid rgba(241, 99, 52, 0.25)',
            color: '#f16334',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            padding: '6px 14px',
            borderRadius: '9999px',
            marginBottom: '18px',
          }}
        >
          <Compass size={14} />
          <span>Page Not Found</span>
        </span>

        <h1
          style={{
            fontSize: '4.5rem',
            fontWeight: 900,
            lineHeight: 1,
            color: '#0f172a',
            margin: '0 0 16px',
            letterSpacing: '-0.04em',
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#1e293b',
            margin: '0 0 14px',
          }}
        >
          The page you are looking for has moved or does not exist.
        </h2>

        <p
          style={{
            fontSize: '0.98rem',
            color: '#64748b',
            lineHeight: 1.65,
            maxWidth: '440px',
            margin: '0 auto 32px',
          }}
        >
          Check the URL for typos, or return to our homepage to explore our performance marketing playbooks and services.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f16334',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.94rem',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(241, 99, 52, 0.25)',
            }}
          >
            <Home size={16} />
            <span>Return Home</span>
          </Link>

          <Link
            href="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #e2e8f0',
              fontWeight: 600,
              fontSize: '0.94rem',
              padding: '12px 22px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            <span>Explore Services</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
