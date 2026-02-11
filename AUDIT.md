# AUDIT.md — Software Developer AI Employee

**Date:** 2026-02-11  
**Auditor:** Subagent (claude-opus-4-6)  
**Verdict:** Solid foundation, but time-to-first-value is slow due to information overload and no connection to actual code generation.

---

## 1. First-Run Experience

**What happens:** User opens dashboard → sees stats (all zeros), a "Start Building Something" CTA, empty "Recent Projects" and "Recent Guides" sections.

**BOOTSTRAP.md flow:** The AI asks 5 questions (experience level, what to build, tech preferences, purpose/timeline, then creates first project). This is reasonable but:

- **Problem:** The 5-step conversational onboarding happens in chat, not in the UI. The dashboard gives zero guidance — it just shows an empty state with "New Project" and "Browse Templates" buttons.
- **Problem:** If the user clicks "New Project" directly (bypassing chat), they get a 5-step wizard that's disconnected from the BOOTSTRAP flow. Two competing onboarding paths.
- **Problem:** After onboarding completes, the user has... a project tracker with a checklist. **They still don't have any code.** The "first value" is a todo list, not working software.
- **Clicks to first value:** Open dashboard (1) → Click "New Project" (2) → Fill name (3) → Next through 4 more wizard steps (4-7) → Create (8). Result: a project card with checkboxes. **8 clicks for a todo list.**

**Time-to-first-value: Poor.** A user expecting an AI software developer gets a project management tool.

---

## 2. UI/UX Issues

### Good
- Clean, professional dark theme
- Responsive sidebar with mobile collapse
- Well-designed card system, badges, progress bars
- Hash-based routing works smoothly
- Toast notifications for feedback
- Empty states exist for all sections

### Bad
- **No loading states.** Every page does `await GET(...)` with no spinner or skeleton. On slow connections, the page is blank until data loads.
- **Wizard step 1 has no validation.** You can click "Next" with an empty project name and get "Untitled Project."
- **Wizard step 3 (Stack) dropdowns:** If user selects a template in step 2, the stack auto-fills on step navigation, but the dropdowns don't visually show the selected values until re-render (the `onchange` handler only updates state, doesn't trigger visual feedback).
- **Template "Use Template" button** uses `prompt()` — a browser native dialog that looks terrible and breaks the design language.
- **Feature editing in wizard (step 4):** Adding a feature appends an empty string and re-renders the whole step, losing focus. Bad for rapid entry.
- **Double-click quote syntax error** in wizard step 4: `onclick="window._wizFeatureAdd()""` has an extra quote.
- **No mobile hamburger menu.** Sidebar collapses to icon-only but there's no way to see labels on mobile.
- **Guide content rendering** uses a basic markdown parser that doesn't handle numbered lists, blockquotes, or code fences.
- **`closeModal` is exposed as `window.closeModal`** but the edit modal Cancel button uses `onclick="closeModal()"` which works, while other code uses the module-internal `closeModal`. Inconsistent but functional.
- **No confirmation after project creation** — user is redirected to detail view but there's no celebratory moment or next-step guidance.

---

## 3. Feature Completeness

### Fully Implemented
- Project CRUD (create, read, update, delete)
- Project from template
- Feature/milestone toggle (checkboxes)
- Template browsing and detail views
- Stack comparison with pros/cons
- Stack recommendation quiz
- Integration guides with code snippets
- Guide CRUD
- Config get/set
- Analytics endpoint
- Search and filtering on guides

### Stubbed / Incomplete
- **No actual code generation.** This is called "Software Developer" but it generates zero code. It's a project tracker with reference materials.
- **`marked` is in package.json but unused.** The app uses a hand-rolled markdown parser (`md()` function) that's quite limited. The proper library is installed but never imported.
- **Config page doesn't exist in the UI.** There's a `GET/PUT /api/config` endpoint and BOOTSTRAP.md saves config, but there's no settings page to view/edit it.
- **No guide creation UI.** Guides can only be created via the API (by the AI). The user has no way to write their own guide from the dashboard.
- **Stack quiz results** are hardcoded logic, not personalized. The recommendation algorithm is ~10 lines of if-statements.
- **Analytics page doesn't exist.** The `/api/analytics` endpoint works but there's no dedicated analytics view — data is only shown on the dashboard.

### TODO / Placeholder
- No explicit TODOs in code, but the `marked` dependency being unused is effectively a TODO.

---

## 4. Error Handling

- **API errors:** Server catches errors and returns 500 with message. Client `api()` helper catches and shows toast. **Adequate.**
- **404 handling:** Templates, projects, guides all show "Not found" empty states. **Good.**
- **Empty states:** All list views have empty state messages with icons. **Good.**
- **Loading states:** **Missing entirely.** No spinners, no skeletons, no loading indicators anywhere.
- **Network failure:** If the server is down, API calls fail silently (caught, toast shown). But the page remains blank with no retry option.
- **Race conditions:** Multiple rapid clicks on feature checkboxes could cause lost updates since each toggle re-fetches all projects, toggles one, and writes all back. No optimistic updates or debouncing.
- **Data validation:** Server does zero input validation. You can POST a project with `name: 12345` (number), `features: "not-an-array"`, or any other garbage. The PUT endpoint does blind spread (`...req.body`) allowing arbitrary field injection.

---

## 5. Code Quality

### Server (server.js)
- **Massive single file (~1850 lines).** All templates, stacks, and integrations are hardcoded as giant JS objects. This should be split into separate data files.
- **No input validation whatsoever.** PUT endpoints do `{ ...existing, ...req.body }` which means anyone can inject arbitrary fields (e.g., `id`, `createdAt`).
- **No authentication/authorization.** Any client can delete all projects and guides. For a single-user AI Employee this is acceptable, but worth noting.
- **JSON file storage** with no locking. Concurrent writes will corrupt data. `readJSON` + modify + `writeJSON` is not atomic.
- **`uid()` function** uses `Date.now()` + random — adequate for this use case.
- **`marked` dependency** is installed but never used. Dead dependency.

### Client (app.js)
- **~950 lines, well-organized.** IIFE pattern, consistent structure.
- **Heavy use of `window._functionName`** for event handlers in rendered HTML. This pollutes global scope and makes cleanup impossible. Previous page's handlers persist after navigation (memory leak / stale handler risk).
- **No cleanup on route changes.** When navigating between pages, old `window._` handlers from previous pages remain. If two pages define `window._deleteGuide`, the second silently overwrites the first (fine), but the reverse navigation leaves stale references.
- **All data re-fetched on every page render.** No caching. Navigating to dashboard calls 7 parallel API requests every time.
- **`esc()` function** creates a DOM element for escaping — works but allocates DOM nodes for every string. Could use a simple replace chain.
- **Inline `onclick` handlers** with string interpolation are XSS-adjacent if `esc()` ever fails, though current implementation is safe.

### CSS (style.css)
- **Well-structured, ~500 lines.** Clean variable system, good responsive breakpoints.
- **No issues found.** Professional quality.

---

## 6. BOOTSTRAP.md Quality

**Length:** ~40 lines. Appropriate — not too long, not too short.

**Structure:** 5 clear steps with specific API calls. Good.

**Issues:**
- **Step 2** says "show them templates: `GET /api/templates`" but doesn't explain how to present them in chat vs. directing to the UI.
- **Step 5** says "delete this file" after onboarding. This means the AI loses its onboarding instructions — if a second user (hypothetically) needed onboarding, it's gone. But since this is single-user, acceptable.
- **No fallback** if the user refuses to answer questions or gives one-word answers.
- **No guidance** on what to do AFTER project creation. The AI creates a project and then... what? The BOOTSTRAP doesn't bridge to ongoing workflow.

**Verdict:** Decent for getting initial setup done. Doesn't guide toward ongoing value.

---

## 7. SKILL.md Quality

**Length:** ~150 lines. Comprehensive.

**Strengths:**
- Clear persona ("patient, knowledgeable mentor")
- 5 core principles are excellent (meet users where they are, be concrete, explain why)
- Good section on working with non-technical users
- Complete API reference with all endpoints
- Template and integration ID lists for quick reference

**Weaknesses:**
- **No guidance on code generation.** The AI is told to create projects, save guides, recommend stacks — but never told to actually write code. For something called "Software Developer," this is a critical gap.
- **No examples of conversation flow.** How should the AI handle "build me a landing page"? Should it write code? Create a project? Both?
- **No mention of the web UI.** The AI doesn't know to tell users "check the dashboard" or "click on the Templates tab."
- **Workflow section** is purely API-driven. It should include guidance on when to reference the UI vs. when to handle things in chat.

**Verdict:** Good reference doc, but the AI will act as a project tracker assistant, not a software developer.

---

## 8. Specific Improvements (Ranked by Impact)

### Critical — Directly affects time-to-first-value

1. **Add code generation guidance to SKILL.md.** The AI should actually write code when users ask "build me X." Currently it only creates project tracker entries. The AI should use `exec` to scaffold projects, write files, and run commands. This is the single biggest gap — the product promises a Software Developer but delivers a project tracker.

2. **Add a "Quick Start" that generates something in < 30 seconds.** On first visit, offer: "Tell me what to build and I'll create it." One message from user → AI generates a real project with code files. Skip the 5-step wizard for the chat-driven path.

3. **Add loading states.** Show a skeleton/spinner while API calls are in flight. The blank-page-then-content pattern feels broken.

4. **Remove the `marked` dead dependency or actually use it.** The hand-rolled `md()` parser doesn't handle numbered lists, code fences, blockquotes, or nested markdown. Import `marked` (already in package.json) and use it for guide content rendering.

### High — Significantly improves experience

5. **Create a Settings/Config page in the UI.** The config endpoint exists but has no UI. Users should be able to set their skill level and preferred stack from the dashboard.

6. **Add input validation on the server.** At minimum: validate types, required fields, and sanitize the PUT spread to only allow known fields.

7. **Replace `prompt()` in "Use Template" with a proper modal.** The native browser prompt breaks the design language.

8. **Add next-step guidance after project creation.** After creating a project, show "Here's what to do next: 1) Set up your development environment, 2) Ask me to generate the starter code, 3) ..." instead of just dumping the user on a project detail page.

9. **Fix the wizard feature-add double-quote bug** (`onclick="window._wizFeatureAdd()""`) — extra quote in the HTML.

10. **Add a guide creation button in the Guides UI.** Let users write their own guides, not just the AI.

### Medium — Quality of life

11. **Split server.js data into separate files.** Move TEMPLATES, STACKS, and INTEGRATIONS into `data/templates.js`, `data/stacks.js`, `data/integrations.js`. Server.js should be ~200 lines, not 1850.

12. **Add client-side caching.** Don't re-fetch all 7 API endpoints every time the user navigates to dashboard. Cache with a short TTL.

13. **Clean up global window handlers.** Use event delegation on `#page-container` instead of `window._functionName` patterns to prevent handler leaks.

14. **Add optimistic updates for checkbox toggles.** Currently each toggle does: fetch all → toggle one → write all → re-render page. Should toggle locally immediately and sync in background.

15. **Improve the stack recommendation quiz.** The hardcoded if-statements give mediocre recommendations. At minimum, use a scoring matrix.

16. **Add BOOTSTRAP.md post-onboarding guidance.** After the initial 5 steps, tell the AI how to transition into ongoing development workflow.

17. **Update SKILL.md to reference the UI.** Tell the AI to direct users to the Templates tab, Stacks comparison, etc. when appropriate.

18. **Add data backup/export.** A single JSON file corruption loses all projects. Add an export button or periodic backup.

---

## Summary

| Area | Grade | Notes |
|------|-------|-------|
| First-Run Experience | C- | Two competing paths, result is a todo list not code |
| UI/UX | B | Clean design, missing loading states and validation |
| Feature Completeness | C | Project tracker is done; code generation is absent |
| Error Handling | C+ | Basic error handling, no loading states, no validation |
| Code Quality | B- | Well-structured but massive single files, no validation |
| BOOTSTRAP.md | B- | Clear steps, no post-onboarding bridge |
| SKILL.md | B | Good reference, missing code generation guidance |

**Bottom line:** This is a well-built project management dashboard with great reference materials (templates, stacks, integrations). But it's branded as a "Software Developer" AI Employee and it doesn't develop software. The AI creates tracker entries, not code. Fix #1 (code generation guidance) alone would transform this from a B- to an A-.

---

## Fixes Applied

**Date:** 2026-02-11

### Critical Fixes
1. **Code generation guidance added to SKILL.md** — Added a "Code Generation — Your Primary Value" section explaining that the AI should actually write code using `exec`, not just create project tracker entries. Includes a workflow for code generation and a quick-start pattern.

2. **Unified onboarding paths** — Rewrote BOOTSTRAP.md to reduce 5 steps to 2-3 questions, added post-onboarding guidance, edge case handling, and explicit instruction to generate code (not just tracker entries). The chat onboarding now complements rather than competes with the UI wizard.

3. **Loading states added throughout** — Every page render now calls `showLoading()` before async data fetches. Added CSS spinner animation (`.loading-state`, `.loading-spinner`).

4. **`marked` library now used** — Server imports `marked` and exposes `POST /api/render-markdown` endpoint. Guide detail pages render content through server-side `marked` for proper markdown (code fences, blockquotes, numbered lists, tables). Client-side `md()` improved as fallback with code fence and blockquote support.

### High Fixes
5. **Settings/Config page added** — New `#settings` route with full UI for experience level, GitHub username, timeline, and preferred stack (frontend/backend/database/hosting). Added Settings nav item to sidebar.

6. **Input validation on server** — Added `pickFields()`, `validateProject()`, `validateGuide()`, and `validateConfig()` helpers. PUT endpoints no longer do blind `{...req.body}` spread — only allowed fields are accepted. Type checking for strings, arrays, and enum validation for status/category fields.

7. **Replaced `prompt()` with proper modal** — "Use Template" now opens a styled modal with form input instead of native `prompt()` dialog.

8. **Next-step guidance after project creation** — New projects show a "Project Created! Here's What to Do Next" card with 3 actionable steps (review stack, ask AI to generate code, work through features). Styled with `.next-steps-card` CSS.

9. **Fixed wizard feature-add double-quote bug** — Removed the extra quote from `onclick="window._wizFeatureAdd()""`

10. **Guide creation UI added** — New `#guides/new` route with full editor (title, category dropdown, tags, markdown content textarea). Guide edit button added to guide detail view. "New Guide" button on guides list page.

11. **Wizard step 1 validation** — Cannot proceed past step 1 without entering a project name. Shows error toast.

### Medium Fixes
12. **Server data split into separate files** — TEMPLATES, STACKS, and INTEGRATIONS moved to `data/templates.js`, `data/stacks.js`, `data/integrations.js`. Server.js reduced from ~1850 lines to ~320 lines.

13. **Improved stack recommendation quiz** — Replaced hardcoded if-statements with a scoring matrix system. Each answer adds weighted scores across categories, and the top scorer per category wins. Much more nuanced recommendations.

14. **Error handling on client API calls** — All `window._` action handlers now have try/catch blocks. API helper improved to parse error messages from response body.

15. **`esc()` function improved** — Replaced DOM-based escaping with efficient string replace chain (no DOM allocation per call). Also escapes quotes for attribute safety.

16. **SKILL.md updated with UI references** — Added section directing AI to reference Templates tab, Stacks comparison, Integrations, Settings page, and Guides in conversations.

17. **BOOTSTRAP.md post-onboarding guidance** — Added "After Onboarding" section with 5 specific ongoing behaviors (generate code, save guides, track progress, recommend integrations, be proactive).

18. **Feature add focus** — When adding a feature in the wizard, the new input auto-focuses after render.

19. **Guide detail edit functionality** — Added edit button and modal for editing existing guides (title, category, content).

20. **Client-side markdown improved** — Added code fence support, blockquote support, and numbered list handling to the fallback `md()` parser.
