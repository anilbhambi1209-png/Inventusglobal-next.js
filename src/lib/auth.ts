export const ADMIN_COOKIE_NAME = 'admin_session';
export const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

function getSecretKey(): string {
  return (
    process.env.ADMIN_JWT_SECRET ||
    'inventus_fallback_secret_key_change_in_env_local_production_2026'
  );
}

function base64UrlEncode(data: Uint8Array | string): string {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export interface SessionPayload {
  username: string;
  iat: number;
  exp: number;
}

/**
 * Creates a cryptographically signed HMAC-SHA256 session token
 */
export async function createSessionToken(username: string): Promise<string> {
  const secret = getSecretKey();
  const key = await getCryptoKey(secret);

  const header = { alg: 'HS256', typ: 'JWT' };
  const payload: SessionPayload = {
    username,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const dataToSign = `${headerB64}.${payloadB64}`;

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(dataToSign)
  );

  const signatureB64 = base64UrlEncode(new Uint8Array(signature));
  return `${dataToSign}.${signatureB64}`;
}

/**
 * Verifies the session token signature and expiration
 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token || typeof token !== 'string') {
    return null;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }

  const [headerB64, payloadB64, signatureB64] = parts;

  try {
    const secret = getSecretKey();
    const key = await getCryptoKey(secret);
    const dataToVerify = `${headerB64}.${payloadB64}`;
    const signatureBytes = base64UrlDecode(signatureB64);

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes as unknown as BufferSource,
      new TextEncoder().encode(dataToVerify)
    );

    if (!isValid) {
      return null;
    }

    const payloadJson = new TextDecoder().decode(base64UrlDecode(payloadB64));
    const payload: SessionPayload = JSON.parse(payloadJson);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Validates admin credentials against environment variables
 */
export function validateAdminCredentials(username?: string, password?: string): boolean {
  const expectedUser = (process.env.ADMIN_USERNAME || 'admin').replace(/^["']|["']$/g, '').trim();
  const rawExpectedPassword = process.env.ADMIN_PASSWORD;

  if (!rawExpectedPassword) {
    console.error('CRITICAL: ADMIN_PASSWORD environment variable is not configured.');
    return false;
  }

  const expectedPassword = rawExpectedPassword.replace(/^["']|["']$/g, '').trim();

  if (!username || !password) {
    return false;
  }

  return username.trim() === expectedUser && password.trim() === expectedPassword;
}

/**
 * Extracts and verifies the admin session from a Request cookie header or NextRequest
 */
export async function isAuthenticated(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [key, ...v] = c.trim().split('=');
      return [key, v.join('=')];
    })
  );

  const token = cookies[ADMIN_COOKIE_NAME];
  if (!token) return false;

  const session = await verifySessionToken(token);
  return session !== null;
}
