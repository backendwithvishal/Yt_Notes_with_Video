# YtEduNotes

Take timestamped notes while watching YouTube videos. Paste a video link, watch it, and export your notes as a PDF.

## Tech Stack

- React 19 + Vite 8
- TypeScript (strict)
- Tailwind CSS v4
- Zustand
- shadcn/ui components
- React Router DOM v7
- jsPDF (dynamic import)

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
# Output is in dist/
```

## Deployment on Render

### Step-by-step

1. Push your code to a GitHub (or GitLab) repository.

2. Go to [render.com](https://render.com) and sign in.

3. Click **New → Static Site**.

4. Connect your repository.

5. Configure the service:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

6. Click **Create Static Site**.

Render will automatically deploy on every push to your main branch.

### Environment Variables

Set these in the Render dashboard under **Environment**:

| Key | Description |
|-----|-------------|
| `NODE_VERSION` | Set to `20` for Node 20 |

Add any `VITE_*` prefixed variables here for runtime config — they are inlined at build time.

### SPA Routing

The `public/_redirects` file handles client-side routing:

```
/* /index.html 200
```

This is automatically copied to `dist/` during build and tells Render to serve `index.html` for all routes.

### Manual Deploy

In the Render dashboard, go to your service and click **Manual Deploy → Deploy latest commit**.

### Troubleshooting

- **Blank page after deploy:** Confirm `dist/` contains `_redirects` and `index.html`.
- **404 on page refresh:** Ensure the `_redirects` file is present in `public/`.
- **Build fails:** Check Node version is set to 20 in environment variables.
