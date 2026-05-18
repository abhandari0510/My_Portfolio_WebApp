<p align="center">
  <img src="/public/favicon.svg" width="50" alt="Akash Bhandari portfolio logo" />
</p>

<h1 align="center">Akash Bhandari Portfolio</h1>

[![Site preview](/public/site-preview.png)](https://akashbhandari.dev)

Personal portfolio for Akash Bhandari, focused on Grafana observability, AWS DevOps, telemetry, and automation work. Built with [Remix](https://remix.run/), [Netlify](https://www.netlify.com/), [Three.js](https://threejs.org/), and [Framer Motion](https://www.framer.com/motion/).

## Tech Stack

- Remix 2
- React 18
- Vite
- Netlify Functions
- Three.js
- Framer Motion
- Storybook
- FormSubmit for contact form delivery

## Requirements

Install these before running the project:

- Node.js `20` or newer
- npm `9.6.3` or newer
- A Netlify account for deployment

Check your versions:

```bash
node --version
npm --version
```

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Update `.env` with a real random secret:

```bash
ENVIRONMENT=development
SESSION_SECRET=replace-this-with-a-long-random-secret
```

Start the Remix development server:

```bash
npm run dev
```

The Remix development server runs on:

```text
http://localhost:7777
```

To run through Netlify's local proxy instead:

```bash
npm run start
```

Netlify serves the app at:

```text
http://localhost:8888
```

## Available Scripts

```bash
npm run dev
```

Starts the local Remix/Vite development server.

```bash
npm run build
```

Creates a production build for Netlify.

```bash
npm run start
```

Runs `netlify serve`, which serves the app locally using Netlify's routing and function behavior.

```bash
npm run deploy
```

Builds and deploys the production site to Netlify.

```bash
npm run dev:storybook
```

Starts Storybook on port `6006`.

```bash
npm run build:storybook
```

Builds Storybook into `storybook-static`.

```bash
npm run deploy:storybook
```

Builds and deploys Storybook to the currently linked Netlify site.

## Production Build Check

Before deploying, verify that the app builds successfully:

```bash
npm run build
```

The expected public output folder is:

```text
build/client
```

The Netlify Remix adapter also prepares the server function output that Netlify needs during deployment.

## Environment Variables

The app currently needs this variable:

| Name | Required | Used for |
| --- | --- | --- |
| `SESSION_SECRET` | Yes | Signing the session cookie used to save the selected theme |

For local development, add it to `.env`.

For Netlify, add it in:

```text
Netlify Dashboard -> Site configuration -> Environment variables
```

Use a long random string. Do not commit real secrets to Git.

## Netlify Deployment

This app can be deployed on Netlify's free plan.

The important Netlify settings are already captured in:

```text
netlify.toml
```

Current values:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `build/client` |
| Node version | `20` |
| Local Netlify port | `8888` |
| Local Remix target port | `7777` |

### Option 1: Deploy With GitHub Integration

Use this option if you want Netlify to deploy automatically after every push.

In the Netlify dashboard:

1. Select `Add new site`.
2. Choose `Import an existing project`.
3. Connect GitHub.
4. Select this repository.
5. Confirm these build settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `build/client` |
| Base directory | Leave blank |
| Production branch | `main` |

Then add the production environment variable:

```text
SESSION_SECRET=<long-random-secret>
```

Netlify will read the Node version from `netlify.toml`. Each push to `main` creates a production deployment, and pull requests can create preview deployments.

### Option 2: Deploy From Local Machine

Log in to Netlify:

```bash
npx netlify login
```

Link this repo to a Netlify site:

```bash
npx netlify init
```

Deploy to production:

```bash
npm run deploy
```

The first deploy will give you a Netlify URL similar to:

```text
https://your-site-name.netlify.app
```

## Custom Domain

After the first successful Netlify deployment:

1. Open the site in Netlify.
2. Go to `Domain management`.
3. Add:

```text
akashbhandari.dev
```

4. Follow Netlify's DNS instructions.

If your DNS is managed somewhere else, add the records Netlify provides. If you move DNS to Netlify, update your domain's nameservers at the registrar.

## Contact Form

The contact form posts to FormSubmit and sends messages to the email value in:

```text
app/config.json
```

Current recipient:

```text
abhandari0510@gmail.com
```

FormSubmit does not require Netlify credentials. After the first real form submission, FormSubmit sends an activation email to the recipient inbox. Confirm that email once, then future submissions should be delivered normally.

## Site Configuration

Most personal details live in:

```text
app/config.json
```

Update this file when changing:

- Name
- Role
- Disciplines
- Site URL
- Email
- Phone
- LinkedIn username
- GitHub username
- Repository URL

If the production domain changes, update `url` in `app/config.json` so canonical links and metadata remain correct.

## Assets

Main image, video, model, font, and shader assets live in:

```text
app/assets
public
```

Public static files such as icons, `robots.txt`, `sitemap.xml`, and social preview images live in:

```text
public
```

## Storybook

Run Storybook locally:

```bash
npm run dev:storybook
```

Build Storybook:

```bash
npm run build:storybook
```

Deploy Storybook to the currently linked Netlify site:

```bash
npm run deploy:storybook
```

If you want Storybook as a separate Netlify site, run `npx netlify init` from the repo and choose or create a separate site before deploying Storybook.

## Troubleshooting

### Netlify Uses the Wrong Node Version

Confirm `netlify.toml` contains:

```toml
[build.environment]
  NODE_VERSION = "20"
```

You can also set `NODE_VERSION=20` in Netlify environment variables.

### Theme Preference Does Not Persist

Confirm `SESSION_SECRET` is set in Netlify environment variables for production and in `.env` for local development.

### Local Netlify Server Cannot Find the Site

Run:

```bash
npx netlify init
```

Choose the existing Netlify site or create a new one, then run:

```bash
npm run start
```

### Contact Form Messages Do Not Arrive

Submit the form once in production and check the recipient inbox for the FormSubmit activation email. The form will not deliver normally until that activation is confirmed.

## License

This project is based on an open-source portfolio codebase and has been adapted for Akash Bhandari's personal portfolio. You may learn from the code and adapt patterns for your own site, but do not present Akash's personal details, assets, or project work as your own.
