# Dev Workshop

A personal software development mentor and project management tool. Built as an OpenClaw skill with a full web UI.

## What It Does

- **Project Management** -- Create and track software projects with features, milestones, and architecture diagrams
- **Templates** -- 12 production-ready project blueprints (SaaS, REST API, E-commerce, mobile app, etc.)
- **Tech Stack Explorer** -- Compare technologies with pros/cons, difficulty ratings, and a recommendation quiz
- **Integration Guides** -- Step-by-step setup for 16 popular APIs (Stripe, OpenAI, Supabase, etc.) with copy-paste code
- **AI Guides** -- Your AI assistant creates and saves development guides as you work together

## Stack

- **Backend**: Node.js / Express
- **Frontend**: Vanilla JS SPA (no build step)
- **Storage**: JSON files on disk
- **Styling**: Custom CSS, DM Sans font, dark theme (#06060a), teal accent (#00d4aa)

## Running

```bash
npm install
npm start
# or
./start.sh
```

Server runs on port 3000.

## File Structure

```
server.js              Express API server
public/
  index.html           HTML shell
  style.css            All styles
  app.js               SPA client (hash routing)
skill/
  SKILL.md             AI instructions
  TOOLS.md             API reference
data/                  JSON data files (auto-created)
  projects.json
  guides.json
  config.json
```

## API

See `skill/TOOLS.md` for the full endpoint reference.
