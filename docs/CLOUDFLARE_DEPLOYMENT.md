# Cloudflare Deployment Guide
## Assam Muga Silk Digital Traceability & Non-Destructive Authentication (NESFIC-D-41)

The application is completely configured and optimized for zero-cost, high-speed global edge deployment on **Cloudflare Pages & Workers**.

---

### Method 1: Instant Deployment via Wrangler CLI (Recommended)

1. **Deploy using npx (No global install needed):**
   ```bash
   npm run deploy:cloudflare
   # Or directly:
   npx wrangler pages deploy apps/web/public --project-name=muga-praman
   ```
2. Follow the terminal prompt to log into your Cloudflare account (if not already authenticated).
3. Cloudflare will publish the site and provide a permanent global live URL / custom domain:
   `https://mugatrack.sascol.com` (Cloudflare Pages fallback: `https://muga-praman.pages.dev`)

---

### Method 2: Automatic Git Integration via Cloudflare Dashboard

1. Push this repository to GitHub under the repository name **`muga-praman`**.
2. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages** $\rightarrow$ **Create Application** $\rightarrow$ **Pages** $\rightarrow$ **Connect to Git**.
3. Select your repository `muga-praman` and configure the build settings:
   - **Project Name:** `muga-praman`
   - **Production Branch:** `main`
   - **Framework Preset:** `None`
   - **Build Command:** `npm test`
   - **Build Output Directory:** `apps/web/public`
   - **Root Directory:** `/`
4. Click **Save and Deploy**. Cloudflare will build and deploy your application worldwide in ~30 seconds with automatic SSL/TLS!

---

### Edge Features Configured:
- **`apps/web/public/_headers`:** Enforces HSTS, X-Frame-Options, CORS, and 24-hour browser caching for static CSS/JS assets.
- **`apps/web/public/_routes.json`:** Directs static and API requests efficiently.
- **`apps/web/functions/api/[[route]].js`:** Cloudflare Pages Function providing serverless edge API endpoints (`/api/verify/:token`, `/api/health`, `/api/batches`, `/api/analytics`, `/api/admin/gi/revoke`) across 300+ global Cloudflare data centers with <50ms latency.
- **Offline / Edge Fallback:** If internet connectivity drops, the client automatically switches to offline mode with zero disruption.
