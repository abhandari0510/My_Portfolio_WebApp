import { createCookieSessionStorage } from '@remix-run/node';

export function getThemeSessionStorage({ request }) {
  const sessionSecret = process.env.SESSION_SECRET;

  if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set in Netlify environment variables.');
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
