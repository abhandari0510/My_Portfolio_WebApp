import { createCookieSessionStorage } from '@remix-run/cloudflare';

export function getThemeSessionStorage({ context, request }) {
  const sessionSecret = context.cloudflare?.env?.SESSION_SECRET;

  if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set in Cloudflare Pages environment variables.');
  }

  return createCookieSessionStorage({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 604_800,
      path: '/',
      sameSite: 'lax',
      secrets: [sessionSecret],
      secure: new URL(request.url).protocol === 'https:',
    },
  });
}
