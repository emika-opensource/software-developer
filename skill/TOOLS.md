# Tools & Environment

## ⚠️ IMPORTANT: Port 3000

Your **Dev Workshop** web application is ALREADY RUNNING on port 3000. It starts automatically via start.sh.

- **DO NOT** kill anything on port 3000 — that is YOUR app
- **DO NOT** try to start a new server on port 3000
- The app is accessible to the user via the browser panel (iframe)
- If you need to build something for the user, deploy it on a DIFFERENT port using PM2


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
## Project Structure
```
/home/node/projects/<name>/    # your apps go here
/home/node/app/                # placeholder app (Dev Workshop)
/home/node/app/start.sh        # startup script (update when deploying)
```

## Port 3000
Your app MUST listen on port 3000. Nginx proxies this to the browser panel.

## Screenshots & File Sharing

### Taking Screenshots
Use Playwright (pre-installed) to capture any website:
```bash
npx playwright screenshot --browser chromium https://example.com /tmp/screenshot.png
```

If Chromium is not installed yet, install it first:
```bash
npx playwright install chromium
```

### Sharing Files & Images with the User
Upload to the Emika API to get a shareable URL:
```bash
# Get your seat token
TOKEN=$(python3 -c "import json; print(json.load(open('/home/node/.openclaw/openclaw.json'))['gateway']['auth']['token'])")

# Upload any file
URL=$(curl -s -X POST "http://162.55.102.58:8080/uploads/seat" \
  -H "X-Seat-Token: $TOKEN" \
  -F "file=@/tmp/screenshot.png" | python3 -c "import sys,json; print(json.load(sys.stdin)['full_url'])")

# Include the URL in your response as markdown image
echo "![Screenshot]($URL)"
```

**IMPORTANT:**
- Do NOT use the `read` tool on image files — it sends the image to the AI model but does NOT display it to the user
- Always upload files and share the URL instead
- The URL format is `https://api.emika.ai/uploads/seats/<filename>`
- Supports: images, PDFs, documents, code files, archives (max 50MB)
