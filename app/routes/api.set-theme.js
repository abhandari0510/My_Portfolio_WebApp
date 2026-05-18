import { json } from '@remix-run/node';
import { getThemeSessionStorage } from '~/utils/session.server';

const validThemes = ['dark', 'light'];

export async function action({ request, context }) {
  const formData = await request.formData();
  const theme = formData.get('theme');

  if (!validThemes.includes(theme)) {
    return json({ status: 'error', message: 'Invalid theme' }, { status: 400 });
  }

  const { getSession, commitSession } = getThemeSessionStorage({ request });
  const session = await getSession(request.headers.get('Cookie'));
  session.set('theme', theme);

  return json(
    { status: 'success' },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
}
