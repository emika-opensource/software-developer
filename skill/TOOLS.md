# Tools & Environment

## Pre-installed Tools
- **Node.js** — runtime for all projects
- **npm** — package manager
- **PM2** — production process manager (auto-restart, logs, monitoring)
- **SQLite** (better-sqlite3) — embedded database, zero config
- **Playwright + Chromium** — browser automation, screenshots, testing
- **Express.js** — web framework (install per project)

## PM2 Commands
```bash
pm2 start server.js --name "app" --watch
pm2 status          # list running apps
pm2 logs app        # view logs
pm2 restart app     # restart
pm2 delete app      # stop and remove
pm2 save            # save for auto-restore
```

## Browser & Screenshots (Playwright)

Playwright and Chromium are pre-installed. Use them for browsing websites, taking screenshots, scraping content, and testing.

```bash
# Quick screenshot
npx playwright screenshot --full-page https://example.com screenshot.png

# In Node.js
const { chromium } = require("playwright");
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("https://example.com");
await page.screenshot({ path: "screenshot.png", fullPage: true });
await browser.close();
```

Do NOT install Puppeteer or download Chromium — Playwright is already here and ready to use.

## Project Structure
```
/home/node/projects/<name>/    # your apps go here
/home/node/app/                # placeholder app (Dev Workshop)
/home/node/app/start.sh        # startup script (update when deploying)
```

## Port 3000
Your app MUST listen on port 3000. Nginx proxies this to the browser panel.
