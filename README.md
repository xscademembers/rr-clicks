<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/c70da2de-f8e1-4f41-aff7-45f7ee26a354

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Copy [.env.example](.env.example) to `.env` and set:
   - `GEMINI_API_KEY` (optional, for AI features)
   - `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO` for media uploads and gallery (Dashboard)
3. Run the app: `npm run dev`

## Home page images (GitHub / static deploy)

Images in **`public/images/home/`** are committed to the repo and will render on the home page when you push to GitHub or deploy statically:

- `wedding.jpg`, `ads.jpg`, `events.jpg`, `led.jpg` – service cards
- `about.jpg` – About section

Add these files under `public/images/home/`. If a file is missing, the site falls back to placeholder images. Do **not** add `public/images` to `.gitignore` so that images are pushed and served from the repo.

## Deploy to Vercel (recommended – no server to run)

After you push to Git and deploy on Vercel, the **site and API run together**; you don’t run a server yourself.

1. Push your code to GitHub.
2. In [Vercel](https://vercel.com), import the repo and deploy (Vercel will use `vercel.json`: build = `npm run build`, output = `dist`).
3. In the project **Settings → Environment Variables**, add:
   - `GITHUB_TOKEN` – your GitHub Personal Access Token
   - `GITHUB_OWNER` – e.g. `xscademembers`
   - `GITHUB_REPO` – e.g. `rr-clicks`
4. Redeploy if you added env vars after the first deploy.

The `api/` folder runs as serverless functions on Vercel (contacts + media). Contact form and Dashboard uploads use your GitHub repo; contacts are stored in `data/contacts.json` in the repo.

## Deploy to GitHub Pages

1. Build: `npm run build`
2. Deploy the `dist/` folder (e.g. via GitHub Actions to `gh-pages` branch, or push `dist` contents to a branch that GitHub Pages serves).
3. If your site is at `https://<user>.github.io/rr-clicks/`, set `VITE_BASE=/rr-clicks/` in your env (or `.env.production`) and run `npm run build` again.
