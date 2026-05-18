<p align="center">
  <img src="/public/favicon.svg" width="50" alt="Akash Bhandari portfolio logo" />
</p>

<h1 align="center">Akash Bhandari Portfolio</h1>

[![Site preview](/public/site-preview.png)](https://akashbhandari.dev)

Personal portfolio for Akash Bhandari, focused on Grafana observability, AWS DevOps, telemetry, and automation work. Built with [Remix](https://remix.run/), [Cloudflare Pages](https://developers.cloudflare.com/pages/), [Three.js](https://threejs.org/), and [Framer Motion](https://www.framer.com/motion/).

## Tech Stack

- Remix 2
- React 18
- Vite
- Cloudflare Pages Functions
- Three.js
- Framer Motion
- Storybook
- FormSubmit for contact form delivery

## Requirements

Install these before running the project:

- Node.js `20` or newer
- npm `9.6.3` or newer
- A Cloudflare account for deployment
- Wrangler CLI, installed through the project dependencies

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
cp .dev.vars.example .dev.vars
```

Update `.dev.vars` with a real random secret:

```bash
ENVIRONMENT=development
SESSION_SECRET=replace-this-with-a-long-random-secret
```

Start the development server:

```bash
npm run dev
```

The Vite development server runs on:

```text
http://localhost:7777
```

## Available Scripts

```bash
npm run dev
```

Starts the local Remix/Vite development server.

```bash
npm run build
```

Creates a production build in `build/client` and `build/server`.

```bash
npm run start
```

Serves the built app locally with Cloudflare Pages emulation. Run `npm run build` first.

```bash
npm run deploy
```

Builds the app and deploys `build/client` to Cloudflare Pages using the `portfolio` project name.

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

Deploys Storybook to the `portfolio-storybook` Cloudflare Pages project.

## Production Build Check

Before deploying, verify that the app builds successfully:

```bash
npm run build
```

The expected output folders are:

```text
build/client
build/server
```

This app uses Cloudflare Pages Functions through:

```text
functions/[[path]].js
```

That function loads the Remix server build from `build/server`.

## Environment Variables

The app currently needs this variable:

| Name | Required | Used for |
| --- | --- | --- |
| `SESSION_SECRET` | Yes | Signing the session cookie used to save the selected theme |

For local development, add it to `.dev.vars`.

For Cloudflare Pages, add it in:

```text
Cloudflare Dashboard -> Workers & Pages -> portfolio -> Settings -> Environment variables
```

Use a long random string. Do not commit real secrets to Git.

## Cloudflare Pages Deployment

This app can be deployed on the Cloudflare Pages free plan.

Current build output is small enough for the free tier limits:

- Far below the `20,000` file limit
- No asset is near the `25 MiB` single-file limit
- Cloudflare Pages Functions are supported

### Option 1: Deploy From Local Machine

Log in to Cloudflare:

```bash
npx wrangler login
```

Deploy:

```bash
npm run deploy
```

This creates or updates the Cloudflare Pages project named:

```text
portfolio
```

The site will be available at a Cloudflare Pages URL similar to:

```text
https://portfolio.pages.dev
```

### Option 2: Deploy With GitHub Integration

Use this option if you want Cloudflare to deploy automatically after every push.

In the Cloudflare dashboard:

1. Go to `Workers & Pages`.
2. Select `Create application`.
3. Choose `Pages`.
4. Connect the GitHub repository.
5. Select this repository.
6. Use these build settings:

| Setting | Value |
| --- | --- |
| Framework preset | Remix, or None if configuring manually |
| Build command | `npm run build` |
| Build output directory | `build/client` |
| Root directory | `/` |
| Production branch | `main` |

Then add the production environment variable:

```text
SESSION_SECRET=<long-random-secret>
```

Cloudflare will read the Node version from `.node-version`. If you prefer to set it in the dashboard, add:

```text
NODE_VERSION=20
```

Every push to the production branch will create a production deployment. Other branches can create preview deployments.

## Cloudflare Configuration

Cloudflare Pages deployment settings are captured in:

```text
wrangler.toml
```

Current values:

| Setting | Value |
| --- | --- |
| Project name | `portfolio` |
| Compatibility date | `2026-05-18` |

The app does not require Cloudflare KV, D1, R2, or paid Workers features.

The Pages build output directory remains `build/client`. It is configured in the Cloudflare dashboard for Git deployments and in the `npm run deploy` command for local deployments.

## Custom Domain

After the first successful Pages deployment:

1. Open the `portfolio` Pages project in Cloudflare.
2. Go to `Custom domains`.
3. Add:

```text
akashbhandari.dev
```

4. Follow Cloudflare's DNS instructions.

If the domain is already managed by Cloudflare DNS, Cloudflare can usually configure the required records automatically.

## Contact Form

The contact form posts to FormSubmit and sends messages to the email value in:

```text
app/config.json
```

Current recipient:

```text
abhandari0510@gmail.com
```

FormSubmit does not require Cloudflare credentials. After the first real form submission, FormSubmit sends an activation email to the recipient inbox. Confirm that email once, then future submissions should be delivered normally.

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

Deploy Storybook to Cloudflare Pages:

```bash
npm run deploy:storybook
```

## Troubleshooting

### Build fails because Wrangler cannot connect locally

In restricted environments, Wrangler or the Remix Cloudflare proxy may fail while trying to open a local connection. Try running the build in a normal terminal outside restricted sandboxing:

```bash
npm run build
```

### Cloudflare Pages uses the wrong Node version

Confirm `.node-version` is committed with:

```text
20
```

You can also set `NODE_VERSION=20` in Cloudflare Pages environment variables.

### Theme preference does not persist

Confirm `SESSION_SECRET` is set in Cloudflare Pages environment variables for production and in `.dev.vars` for local development.

### Contact form messages do not arrive

Submit the form once in production and check the recipient inbox for the FormSubmit activation email. The form will not deliver normally until that activation is confirmed.

## License

This project is based on an open-source portfolio codebase and has been adapted for Akash Bhandari's personal portfolio. You may learn from the code and adapt patterns for your own site, but do not present Akash's personal details, assets, or project work as your own.
