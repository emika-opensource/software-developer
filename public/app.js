// ── Dev Workshop SPA ─────────────────────────────────────────────────────────
// Single-page application client for the Dev Workshop skill.
// Hash-based routing: #dashboard, #projects, #templates, #stacks, #integrations, #guides

(function () {
  'use strict';

  // ── State ────────────────────────────────────────────────────────────────
  const state = {
    projects: [],
    templates: [],
    stacks: {},
    integrations: [],
    guides: [],
    analytics: {},
    config: {},
    currentPage: 'dashboard',
    currentDetail: null,
  };

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];
  const container = $('#page-container');
  const modalOverlay = $('#modal-overlay');
  const modalEl = $('#modal');

  // ── Icons (SVG) ──────────────────────────────────────────────────────────
  const icons = {
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    chevDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>',
    chevRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
  };

  // ── API helpers ──────────────────────────────────────────────────────────
  async function api(url, opts) {
    try {
      const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...opts });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return res.json();
    } catch (e) { toast(e.message, 'error'); throw e; }
  }
  const GET = url => api(url);
  const POST = (url, body) => api(url, { method: 'POST', body: JSON.stringify(body) });
  const PUT = (url, body) => api(url, { method: 'PUT', body: JSON.stringify(body) });
  const DELETE = url => api(url, { method: 'DELETE' });

  // ── Toast ────────────────────────────────────────────────────────────────
  function toast(msg, type = 'success') {
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.textContent = msg;
    $('#toast-container').appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 3000);
  }

  // ── Modal ────────────────────────────────────────────────────────────────
  function openModal(html) {
    modalEl.innerHTML = html;
    modalEl.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
  }
  function closeModal() {
    modalEl.classList.add('hidden');
    modalOverlay.classList.add('hidden');
  }
  modalOverlay.addEventListener('click', closeModal);

  // ── Markdown (minimal) ───────────────────────────────────────────────────
  function md(text) {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, m => '<ul>' + m + '</ul>')
      .replace(/\n{2,}/g, '</p><p>')
      .replace(/\n/g, '<br>');
    return '<p>' + html + '</p>';
  }

  // ── Syntax highlighting (basic) ──────────────────────────────────────────
  function highlight(code, lang) {
    let s = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // comments
    s = s.replace(/(\/\/.*)/g, '<span class="syn-cm">$1</span>');
    // strings
    s = s.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="syn-str">$1</span>');
    s = s.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="syn-str">$1</span>');
    s = s.replace(/(`(?:[^`\\]|\\.)*`)/g, '<span class="syn-str">$1</span>');
    // keywords
    s = s.replace(/\b(const|let|var|function|async|await|return|if|else|switch|case|break|try|catch|throw|new|class|import|export|from|require|default|for|of|in|while|do)\b/g, '<span class="syn-kw">$1</span>');
    // numbers
    s = s.replace(/\b(\d+)\b/g, '<span class="syn-num">$1</span>');
    return s;
  }

  function codeBlock(code, lang, label) {
    return `<div class="code-block">
      <div class="code-block-header">
        <span>${label || ''}</span>
        <span class="code-block-lang">${lang || ''}</span>
        <button class="code-copy-btn" onclick="this.closest('.code-block').querySelector('code').textContent && navigator.clipboard.writeText(this.closest('.code-block').querySelector('code').textContent).then(()=>{this.textContent='Copied!'})">Copy</button>
      </div>
      <pre><code>${highlight(code, lang)}</code></pre>
    </div>`;
  }

  // ── Difficulty badge ─────────────────────────────────────────────────────
  function badge(difficulty) {
    return `<span class="badge badge-${difficulty}">${difficulty}</span>`;
  }
  function statusBadge(status) {
    const s = (status || 'idea').replace(/[_\s]/g, '-');
    return `<span class="badge badge-${s}">${status}</span>`;
  }

  // ── Router ───────────────────────────────────────────────────────────────
  function navigate(hash) {
    window.location.hash = hash;
  }

  function parseHash() {
    const raw = window.location.hash.slice(1) || 'dashboard';
    const [page, ...rest] = raw.split('/');
    return { page, detail: rest.join('/') };
  }

  async function route() {
    const { page, detail } = parseHash();
    state.currentPage = page;
    state.currentDetail = detail || null;

    // Update nav
    $$('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === page);
    });

    switch (page) {
      case 'dashboard': await renderDashboard(); break;
      case 'projects':
        if (detail === 'new') await renderProjectWizard();
        else if (detail) await renderProjectDetail(detail);
        else await renderProjects();
        break;
      case 'templates':
        if (detail) await renderTemplateDetail(detail);
        else await renderTemplates();
        break;
      case 'stacks': await renderStacks(); break;
      case 'integrations':
        if (detail) await renderIntegrationDetail(detail);
        else await renderIntegrations();
        break;
      case 'guides':
        if (detail) await renderGuideDetail(detail);
        else await renderGuides();
        break;
      default: await renderDashboard();
    }
  }

  // ── Data loading ─────────────────────────────────────────────────────────
  async function loadAll() {
    const [projects, templates, stacks, integrations, guides, analytics, config] = await Promise.all([
      GET('/api/projects').catch(() => []),
      GET('/api/templates').catch(() => []),
      GET('/api/stacks').catch(() => ({})),
      GET('/api/integrations').catch(() => []),
      GET('/api/guides').catch(() => []),
      GET('/api/analytics').catch(() => ({})),
      GET('/api/config').catch(() => ({})),
    ]);
    Object.assign(state, { projects, templates, stacks, integrations, guides, analytics, config });
  }

  // ── DASHBOARD ────────────────────────────────────────────────────────────
  async function renderDashboard() {
    await loadAll();
    const a = state.analytics;
    const recentProjects = (a.recentProjects || []).slice(0, 4);
    const recentGuides = state.guides.slice(-4).reverse();

    container.innerHTML = `
      <div class="page-header">
        <h1>Dashboard</h1>
        <p>Your software development command center</p>
      </div>

      <div class="quick-start">
        <h2>Start Building Something</h2>
        <p>Create a new project from scratch or pick a template to get started fast.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary btn-lg" onclick="location.hash='#projects/new'">${icons.plus} New Project</button>
          <button class="btn btn-secondary btn-lg" onclick="location.hash='#templates'">${icons.layers} Browse Templates</button>
        </div>
      </div>

      <div class="grid grid-4" style="margin-bottom:24px">
        <div class="card stat-card"><div class="stat-value">${a.totalProjects || 0}</div><div class="stat-label">Projects</div></div>
        <div class="card stat-card"><div class="stat-value">${a.totalGuides || 0}</div><div class="stat-label">Guides</div></div>
        <div class="card stat-card"><div class="stat-value">${a.totalFeatures || 0}</div><div class="stat-label">Features</div></div>
        <div class="card stat-card"><div class="stat-value">${a.featureProgress || 0}%</div><div class="stat-label">Completion</div></div>
      </div>

      ${a.totalFeatures ? `
      <div class="card" style="margin-bottom:24px">
        <div class="progress-label"><span>Overall Feature Progress</span><span>${a.completedFeatures || 0} / ${a.totalFeatures}</span></div>
        <div class="progress-bar"><div class="progress-fill" style="width:${a.featureProgress}%"></div></div>
      </div>` : ''}

      <div class="grid grid-2">
        <div>
          <h2 style="font-size:18px;margin-bottom:12px">Recent Projects</h2>
          ${recentProjects.length ? recentProjects.map(p => `
            <div class="card card-clickable" style="margin-bottom:8px" onclick="location.hash='#projects/${p.id}'">
              <div class="card-header">
                <span class="card-title">${esc(p.name)}</span>
                ${statusBadge(p.status)}
              </div>
              <div class="card-desc">${esc(p.description || '').slice(0, 100)}</div>
            </div>
          `).join('') : '<div class="empty-state"><p>No projects yet. Create one to get started.</p></div>'}
        </div>
        <div>
          <h2 style="font-size:18px;margin-bottom:12px">Recent Guides</h2>
          ${recentGuides.length ? recentGuides.map(g => `
            <div class="card card-clickable" style="margin-bottom:8px" onclick="location.hash='#guides/${g.id}'">
              <div class="card-header">
                <span class="card-title">${esc(g.title)}</span>
                <span class="badge badge-intermediate">${esc(g.category)}</span>
              </div>
            </div>
          `).join('') : '<div class="empty-state"><p>No guides yet. Your AI assistant will create guides as you work.</p></div>'}
        </div>
      </div>
    `;
  }

  // ── PROJECTS LIST ────────────────────────────────────────────────────────
  async function renderProjects() {
    state.projects = await GET('/api/projects').catch(() => []);
    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-row">
          <div><h1>Projects</h1><p>All your software projects in one place</p></div>
          <button class="btn btn-primary" onclick="location.hash='#projects/new'">${icons.plus} New Project</button>
        </div>
      </div>
      ${state.projects.length ? `<div class="grid grid-2">${state.projects.map(p => `
        <div class="card card-clickable" onclick="location.hash='#projects/${p.id}'">
          <div class="card-header">
            <span class="card-title">${esc(p.name)}</span>
            ${statusBadge(p.status)}
          </div>
          <div class="card-desc">${esc(p.description || '').slice(0, 140)}</div>
          ${p.stack && p.stack.frontend ? `<div class="template-stack">${[p.stack.frontend, p.stack.backend, p.stack.database].filter(Boolean).map(s => `<span class="stack-tag">${esc(s)}</span>`).join('')}</div>` : ''}
          ${p.features && p.features.length ? (() => {
            const done = p.features.filter(f => f.done).length;
            const pct = Math.round(done / p.features.length * 100);
            return `<div style="margin-top:12px"><div class="progress-label"><span>Features</span><span>${done}/${p.features.length}</span></div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div></div>`;
          })() : ''}
        </div>
      `).join('')}</div>` : `
        <div class="empty-state">
          ${icons.folder}
          <h3>No projects yet</h3>
          <p>Create your first project or start from a template.</p>
          <button class="btn btn-primary" onclick="location.hash='#projects/new'">${icons.plus} Create Project</button>
        </div>
      `}
    `;
  }

  // ── PROJECT DETAIL ───────────────────────────────────────────────────────
  async function renderProjectDetail(id) {
    const [projects] = await Promise.all([GET('/api/projects').catch(() => [])]);
    const project = projects.find(p => p.id === id);
    if (!project) { container.innerHTML = '<div class="empty-state"><h3>Project not found</h3></div>'; return; }

    const features = project.features || [];
    const doneFeat = features.filter(f => f.done).length;
    const featPct = features.length ? Math.round(doneFeat / features.length * 100) : 0;

    container.innerHTML = `
      <a href="#projects" class="detail-back">${icons.back} Back to Projects</a>
      <div class="detail-header">
        <div>
          <h1>${esc(project.name)}</h1>
          <div style="margin-top:6px;display:flex;gap:8px;align-items:center">${statusBadge(project.status)}
            <select class="form-select" style="width:auto;padding:4px 30px 4px 10px;font-size:12px" onchange="window._updateProjectStatus('${project.id}',this.value)">
              ${['idea','planning','in-progress','review','deployed'].map(s => `<option value="${s}" ${project.status === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-ghost btn-sm" onclick="window._editProject('${project.id}')">${icons.edit} Edit</button>
          <button class="btn btn-danger btn-sm" onclick="window._deleteProject('${project.id}')">${icons.trash} Delete</button>
        </div>
      </div>

      ${project.description ? `<div class="card" style="margin-bottom:20px"><div class="card-desc">${esc(project.description)}</div></div>` : ''}

      ${project.stack && project.stack.frontend ? `
      <div class="detail-section">
        <h2>${icons.layers} Tech Stack</h2>
        <div class="grid grid-3">
          ${['frontend','backend','database','hosting'].map(k => project.stack[k] ? `
            <div class="card"><div style="font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">${k}</div><div style="font-weight:600">${esc(project.stack[k])}</div></div>
          ` : '').join('')}
          ${(project.stack.apis || []).length ? `<div class="card"><div style="font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">APIs</div><div class="template-stack">${project.stack.apis.map(a => `<span class="stack-tag">${esc(a)}</span>`).join('')}</div></div>` : ''}
        </div>
      </div>` : ''}

      ${project.architecture ? `
      <div class="detail-section">
        <h2>${icons.code} Architecture</h2>
        <div class="arch-diagram">${esc(project.architecture)}</div>
      </div>` : ''}

      ${features.length ? `
      <div class="detail-section">
        <h2>${icons.check} Features (${doneFeat}/${features.length})</h2>
        <div class="progress-bar" style="margin-bottom:12px"><div class="progress-fill" style="width:${featPct}%"></div></div>
        <ul class="checklist" id="features-list">
          ${features.map((f, i) => `
            <li class="checklist-item ${f.done ? 'done' : ''}" onclick="window._toggleFeature('${project.id}',${i})">
              <div class="check-box"></div>
              <span class="check-text">${esc(f.name || f)}</span>
            </li>
          `).join('')}
        </ul>
      </div>` : ''}

      ${(project.milestones || []).length ? `
      <div class="detail-section">
        <h2>${icons.target} Milestones</h2>
        ${project.milestones.map((m, mi) => {
          const tasks = m.tasks || [];
          const doneT = tasks.filter(t => t.done).length;
          return `
          <div class="milestone">
            <div class="milestone-header" onclick="this.nextElementSibling.classList.toggle('hidden')">
              <span class="milestone-name">${esc(m.name)}</span>
              <span style="font-size:12px;color:var(--text-dim)">${doneT}/${tasks.length}</span>
            </div>
            <div class="milestone-body">
              <ul class="milestone-tasks">
                ${tasks.map((t, ti) => `
                  <li class="milestone-task checklist-item ${t.done ? 'done' : ''}" onclick="window._toggleMilestoneTask('${project.id}',${mi},${ti})">
                    <div class="check-box"></div>
                    <span class="check-text">${esc(t.name || t)}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>`;
        }).join('')}
      </div>` : ''}

      ${project.notes ? `
      <div class="detail-section">
        <h2>${icons.file} Notes</h2>
        <div class="card"><div class="guide-content">${md(project.notes)}</div></div>
      </div>` : ''}
    `;
  }

  // Project actions
  window._updateProjectStatus = async (id, status) => {
    await PUT(`/api/projects/${id}`, { status });
    toast('Status updated');
    route();
  };

  window._toggleFeature = async (id, idx) => {
    const projects = await GET('/api/projects');
    const p = projects.find(x => x.id === id);
    if (!p) return;
    p.features[idx].done = !p.features[idx].done;
    await PUT(`/api/projects/${id}`, { features: p.features });
    route();
  };

  window._toggleMilestoneTask = async (id, mi, ti) => {
    const projects = await GET('/api/projects');
    const p = projects.find(x => x.id === id);
    if (!p) return;
    p.milestones[mi].tasks[ti].done = !p.milestones[mi].tasks[ti].done;
    await PUT(`/api/projects/${id}`, { milestones: p.milestones });
    route();
  };

  window._deleteProject = async (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    await DELETE(`/api/projects/${id}`);
    toast('Project deleted');
    navigate('#projects');
  };

  window._editProject = async (id) => {
    const projects = await GET('/api/projects');
    const p = projects.find(x => x.id === id);
    if (!p) return;
    openModal(`
      <div class="modal-title">Edit Project</div>
      <div class="form-group"><label class="form-label">Name</label><input class="form-input" id="edit-name" value="${esc(p.name)}"></div>
      <div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea" id="edit-desc">${esc(p.description || '')}</textarea></div>
      <div class="form-group"><label class="form-label">Notes</label><textarea class="form-textarea" id="edit-notes">${esc(p.notes || '')}</textarea></div>
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window._saveProject('${id}')">Save</button>
      </div>
    `);
  };

  window._saveProject = async (id) => {
    const name = $('#edit-name').value;
    const description = $('#edit-desc').value;
    const notes = $('#edit-notes').value;
    await PUT(`/api/projects/${id}`, { name, description, notes });
    closeModal();
    toast('Project updated');
    route();
  };

  // ── PROJECT WIZARD ───────────────────────────────────────────────────────
  async function renderProjectWizard() {
    await loadAll();
    const wizardState = { step: 0, name: '', description: '', templateId: null, stack: {}, features: [] };

    function renderStep() {
      const totalSteps = 5;
      const dots = Array.from({ length: totalSteps }, (_, i) => `<div class="wizard-step-dot ${i === wizardState.step ? 'active' : i < wizardState.step ? 'done' : ''}"></div>`).join('');

      let body = '';
      switch (wizardState.step) {
        case 0: // What are you building?
          body = `
            <div class="wizard-title">What are you building?</div>
            <div class="wizard-subtitle">Give your project a name and tell us about it.</div>
            <div class="form-group"><label class="form-label">Project Name</label><input class="form-input" id="wiz-name" value="${esc(wizardState.name)}" placeholder="My Awesome App"></div>
            <div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea" id="wiz-desc" placeholder="What does this project do?">${esc(wizardState.description)}</textarea></div>
          `;
          break;
        case 1: // Template
          body = `
            <div class="wizard-title">Choose a Template</div>
            <div class="wizard-subtitle">Start from a proven blueprint, or skip to go custom.</div>
            <button class="wizard-option ${wizardState.templateId === null ? 'selected' : ''}" onclick="window._wizSelectTemplate(null)">
              <div class="wizard-option-title">Start from Scratch</div>
              <div class="wizard-option-desc">No template, full freedom</div>
            </button>
            ${state.templates.map(t => `
              <button class="wizard-option ${wizardState.templateId === t.id ? 'selected' : ''}" onclick="window._wizSelectTemplate('${t.id}')">
                <div class="wizard-option-title">${esc(t.name)} ${badge(t.difficulty)}</div>
                <div class="wizard-option-desc">${esc(t.description).slice(0, 90)}</div>
              </button>
            `).join('')}
          `;
          break;
        case 2: // Stack
          body = `
            <div class="wizard-title">Pick Your Stack</div>
            <div class="wizard-subtitle">${wizardState.templateId ? 'The template suggests a stack. Customize if you want.' : 'Select the technologies for your project.'}</div>
            ${['frontend','backend','database','hosting'].map(cat => `
              <div class="form-group">
                <label class="form-label">${cat.charAt(0).toUpperCase() + cat.slice(1)}</label>
                <select class="form-select" id="wiz-stack-${cat}" onchange="window._wizStackChange('${cat}',this.value)">
                  <option value="">-- Select --</option>
                  ${(state.stacks[cat] || []).map(s => `<option value="${esc(s.name)}" ${wizardState.stack[cat] === s.name ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}
                </select>
              </div>
            `).join('')}
          `;
          break;
        case 3: // Features
          body = `
            <div class="wizard-title">Key Features</div>
            <div class="wizard-subtitle">What should your project include? Add features you plan to build.</div>
            <div id="wiz-features-list">
              ${wizardState.features.map((f, i) => `<div style="display:flex;gap:8px;margin-bottom:6px"><input class="form-input" value="${esc(f)}" onchange="window._wizFeatureChange(${i},this.value)"><button class="btn btn-ghost btn-sm" onclick="window._wizFeatureRemove(${i})">${icons.trash}</button></div>`).join('')}
            </div>
            <button class="btn btn-secondary btn-sm" onclick="window._wizFeatureAdd()"">${icons.plus} Add Feature</button>
          `;
          break;
        case 4: // Review
          body = `
            <div class="wizard-title">Review & Create</div>
            <div class="wizard-subtitle">Here is what we will create.</div>
            <div class="card" style="margin-bottom:12px">
              <div class="card-title">${esc(wizardState.name || 'Untitled Project')}</div>
              <div class="card-desc" style="margin-top:6px">${esc(wizardState.description || '')}</div>
              ${wizardState.templateId ? `<div style="margin-top:8px;font-size:12px;color:var(--text-dim)">Template: ${esc(state.templates.find(t => t.id === wizardState.templateId)?.name || '')}</div>` : ''}
              <div class="template-stack" style="margin-top:8px">${Object.values(wizardState.stack).filter(Boolean).map(s => `<span class="stack-tag">${esc(s)}</span>`).join('')}</div>
              ${wizardState.features.length ? `<div style="margin-top:8px;font-size:13px;color:var(--text-muted)">${wizardState.features.length} features planned</div>` : ''}
            </div>
          `;
          break;
      }

      container.innerHTML = `
        <a href="#projects" class="detail-back">${icons.back} Back to Projects</a>
        <div class="wizard">
          <div class="wizard-steps">${dots}</div>
          ${body}
          <div class="wizard-actions">
            ${wizardState.step > 0 ? `<button class="btn btn-secondary" onclick="window._wizPrev()">Back</button>` : '<div></div>'}
            ${wizardState.step < totalSteps - 1 ? `<button class="btn btn-primary" onclick="window._wizNext()">Next</button>` : `<button class="btn btn-primary btn-lg" onclick="window._wizCreate()">Create Project</button>`}
          </div>
        </div>
      `;
    }

    window._wizNext = () => {
      if (wizardState.step === 0) {
        wizardState.name = ($('#wiz-name') || {}).value || wizardState.name;
        wizardState.description = ($('#wiz-desc') || {}).value || wizardState.description;
      }
      wizardState.step++;
      if (wizardState.step === 2 && wizardState.templateId) {
        const t = state.templates.find(x => x.id === wizardState.templateId);
        if (t && t.recommendedStack) {
          wizardState.stack = { ...t.recommendedStack };
          if (!wizardState.name) wizardState.name = t.name;
          if (!wizardState.description) wizardState.description = t.description;
          if (!wizardState.features.length) wizardState.features = [...(t.features || [])];
        }
      }
      renderStep();
    };
    window._wizPrev = () => { wizardState.step--; renderStep(); };
    window._wizSelectTemplate = (id) => { wizardState.templateId = id; renderStep(); };
    window._wizStackChange = (cat, val) => { wizardState.stack[cat] = val; };
    window._wizFeatureAdd = () => { wizardState.features.push(''); renderStep(); };
    window._wizFeatureRemove = (i) => { wizardState.features.splice(i, 1); renderStep(); };
    window._wizFeatureChange = (i, val) => { wizardState.features[i] = val; };

    window._wizCreate = async () => {
      try {
        let project;
        if (wizardState.templateId) {
          project = await POST('/api/projects/from-template', { templateId: wizardState.templateId, name: wizardState.name || undefined });
          if (wizardState.description) await PUT(`/api/projects/${project.id}`, { description: wizardState.description, stack: wizardState.stack });
        } else {
          project = await POST('/api/projects', {
            name: wizardState.name || 'Untitled Project',
            description: wizardState.description,
            stack: wizardState.stack,
            features: wizardState.features.filter(Boolean).map(f => ({ name: f, done: false })),
          });
        }
        toast('Project created');
        navigate(`#projects/${project.id}`);
      } catch (e) { /* toast already shown */ }
    };

    renderStep();
  }

  // ── TEMPLATES ────────────────────────────────────────────────────────────
  async function renderTemplates() {
    state.templates = await GET('/api/templates').catch(() => []);
    container.innerHTML = `
      <div class="page-header">
        <h1>Templates</h1>
        <p>Proven blueprints to jumpstart your project</p>
      </div>
      <div class="grid grid-3">
        ${state.templates.map(t => `
          <div class="card card-clickable template-card" onclick="location.hash='#templates/${t.id}'">
            <div class="card-header">
              <span class="card-title">${esc(t.name)}</span>
              ${badge(t.difficulty)}
            </div>
            <div class="card-desc">${esc(t.description).slice(0, 120)}</div>
            <div class="template-stack">${Object.values(t.recommendedStack).flat().filter(Boolean).slice(0, 5).map(s => `<span class="stack-tag">${esc(s)}</span>`).join('')}</div>
            <div class="template-feature-count">${t.features.length} features included</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ── TEMPLATE DETAIL ──────────────────────────────────────────────────────
  async function renderTemplateDetail(id) {
    const t = (await GET('/api/templates').catch(() => [])).find(x => x.id === id);
    if (!t) { container.innerHTML = '<div class="empty-state"><h3>Template not found</h3></div>'; return; }

    container.innerHTML = `
      <a href="#templates" class="detail-back">${icons.back} Back to Templates</a>
      <div class="detail-header">
        <div>
          <h1>${esc(t.name)}</h1>
          <div style="margin-top:6px">${badge(t.difficulty)}</div>
        </div>
        <button class="btn btn-primary btn-lg" onclick="window._useTemplate('${t.id}')">${icons.play} Use Template</button>
      </div>
      <div class="card" style="margin-bottom:20px"><div class="card-desc">${esc(t.description)}</div></div>

      <div class="detail-section">
        <h2>${icons.layers} Recommended Stack</h2>
        <div class="grid grid-3">
          ${Object.entries(t.recommendedStack).map(([k, v]) => {
            const val = Array.isArray(v) ? v.join(', ') : v;
            return val ? `<div class="card"><div style="font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">${k}</div><div style="font-weight:600">${esc(val)}</div></div>` : '';
          }).join('')}
        </div>
      </div>

      ${t.architecture ? `
      <div class="detail-section">
        <h2>${icons.code} Architecture</h2>
        <div class="arch-diagram">${esc(t.architecture)}</div>
      </div>` : ''}

      <div class="detail-section">
        <h2>${icons.check} Features (${t.features.length})</h2>
        <ul class="checklist">
          ${t.features.map(f => `<li class="checklist-item"><div class="check-box"></div><span class="check-text">${esc(f)}</span></li>`).join('')}
        </ul>
      </div>

      <div class="detail-section">
        <h2>${icons.zap} Setup Steps</h2>
        <div class="steps">
          ${t.setupSteps.map(s => `<div class="step-item"><div class="step-num"></div><div class="step-content">${esc(s).replace(/`([^`]+)`/g, '<code>$1</code>')}</div></div>`).join('')}
        </div>
      </div>

      <div class="detail-section">
        <h2>${icons.file} Project Files</h2>
        <ul class="file-list">
          ${t.files.map(f => {
            const [name, ...desc] = f.split(' — ');
            return `<li class="file-item"><span class="file-icon">${icons.file}</span><span class="file-name">${esc(name)}</span>${desc.length ? `<span class="file-desc">${esc(desc.join(' — '))}</span>` : ''}</li>`;
          }).join('')}
        </ul>
      </div>
    `;
  }

  window._useTemplate = async (templateId) => {
    const name = prompt('Project name:');
    if (!name) return;
    try {
      const project = await POST('/api/projects/from-template', { templateId, name });
      toast('Project created from template');
      navigate(`#projects/${project.id}`);
    } catch (e) { /* toast shown */ }
  };

  // ── STACKS ───────────────────────────────────────────────────────────────
  async function renderStacks() {
    state.stacks = await GET('/api/stacks').catch(() => ({}));
    const categories = Object.keys(state.stacks);
    let activeTab = categories[0] || 'frontend';
    let showQuiz = false;

    function render() {
      const items = state.stacks[activeTab] || [];
      container.innerHTML = `
        <div class="page-header">
          <div class="page-header-row">
            <div><h1>Tech Stacks</h1><p>Explore and compare technologies for your project</p></div>
            <button class="btn btn-secondary" onclick="window._stackQuiz()">${icons.target} Recommend Me a Stack</button>
          </div>
        </div>
        <div class="tab-bar">
          ${categories.map(c => `<button class="tab-btn ${c === activeTab ? 'active' : ''}" onclick="window._stackTab('${c}')">${c.charAt(0).toUpperCase() + c.slice(1)}</button>`).join('')}
        </div>
        <div class="comparison-grid grid grid-2">
          ${items.map(s => `
            <div class="card comparison-card">
              <div class="card-title">${esc(s.name)}</div>
              <div class="card-desc" style="margin-top:6px">${esc(s.description)}</div>
              <div style="margin-top:8px">${badge(s.difficulty)}</div>
              <div class="pros-cons">
                <div class="pros"><h4>Pros</h4><ul>${s.pros.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>
                <div class="cons"><h4>Cons</h4><ul>${s.cons.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>
              </div>
              <div style="font-size:12px;color:var(--text-dim);margin-top:8px"><strong>Best for:</strong> ${esc(s.bestFor)}</div>
              ${s.links && s.links.length ? `<div class="links-list">${s.links.map(l => `<a href="${esc(l)}" target="_blank" class="link-tag">${icons.ext} ${esc(l.replace(/https?:\/\/(www\.)?/, '').split('/')[0])}</a>`).join('')}</div>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }

    window._stackTab = (cat) => { activeTab = cat; render(); };
    window._stackQuiz = () => { renderStackQuiz(); };
    render();
  }

  function renderStackQuiz() {
    const questions = [
      { q: 'What is your experience level?', opts: [{ label: 'Beginner', val: 'beginner' }, { label: 'Intermediate', val: 'intermediate' }, { label: 'Advanced', val: 'advanced' }] },
      { q: 'What are you building?', opts: [{ label: 'Website / Landing Page', val: 'website' }, { label: 'Web Application (SaaS)', val: 'webapp' }, { label: 'API / Backend Service', val: 'api' }, { label: 'Mobile App', val: 'mobile' }] },
      { q: 'What matters most?', opts: [{ label: 'Speed of development', val: 'speed' }, { label: 'Performance', val: 'performance' }, { label: 'Simplicity', val: 'simplicity' }, { label: 'Job market / career', val: 'career' }] },
    ];
    let step = 0;
    const answers = [];

    function renderQ() {
      const q = questions[step];
      container.innerHTML = `
        <a href="#stacks" class="detail-back">${icons.back} Back to Stacks</a>
        <div class="wizard">
          <div class="wizard-steps">${questions.map((_, i) => `<div class="wizard-step-dot ${i === step ? 'active' : i < step ? 'done' : ''}"></div>`).join('')}</div>
          <div class="quiz-question">${q.q}</div>
          <div class="quiz-options">
            ${q.opts.map(o => `<button class="wizard-option" onclick="window._quizAnswer('${o.val}')"><div class="wizard-option-title">${o.label}</div></button>`).join('')}
          </div>
        </div>
      `;
    }

    window._quizAnswer = (val) => {
      answers.push(val);
      step++;
      if (step >= questions.length) {
        showQuizResult(answers);
      } else {
        renderQ();
      }
    };

    renderQ();
  }

  function showQuizResult(answers) {
    const [level, type, priority] = answers;
    let rec = { frontend: 'Next.js', backend: 'Node.js / Express', database: 'Supabase', hosting: 'Vercel' };
    if (level === 'beginner') {
      rec.frontend = 'Next.js'; rec.database = 'Supabase';
    }
    if (type === 'api') { rec.frontend = 'None'; rec.backend = 'Node.js / Express'; rec.database = 'PostgreSQL'; rec.hosting = 'Railway'; }
    if (type === 'mobile') { rec.frontend = 'React Native (Expo)'; rec.backend = 'Supabase'; rec.database = 'Supabase'; rec.hosting = 'Expo EAS'; }
    if (priority === 'performance') { rec.frontend = 'Svelte'; rec.backend = 'Go'; }
    if (priority === 'simplicity' && level === 'beginner') { rec.frontend = 'Vue.js'; rec.backend = 'Node.js / Express'; rec.database = 'SQLite'; }

    container.innerHTML = `
      <a href="#stacks" class="detail-back">${icons.back} Back to Stacks</a>
      <div class="wizard">
        <div class="wizard-title">Your Recommended Stack</div>
        <div class="wizard-subtitle">Based on your answers, here is what we suggest.</div>
        <div class="grid grid-2" style="margin-bottom:24px">
          ${Object.entries(rec).map(([k, v]) => `<div class="card"><div style="font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">${k}</div><div style="font-weight:600;color:var(--accent)">${esc(v)}</div></div>`).join('')}
        </div>
        <div style="text-align:center">
          <button class="btn btn-primary btn-lg" onclick="location.hash='#projects/new'">Start a Project with This Stack</button>
        </div>
      </div>
    `;
  }

  // ── INTEGRATIONS ─────────────────────────────────────────────────────────
  async function renderIntegrations() {
    state.integrations = await GET('/api/integrations').catch(() => []);
    const cats = [...new Set(state.integrations.map(i => i.category))];
    let activeFilter = 'all';

    function render() {
      const filtered = activeFilter === 'all' ? state.integrations : state.integrations.filter(i => i.category === activeFilter);
      container.innerHTML = `
        <div class="page-header">
          <h1>Integrations</h1>
          <p>Step-by-step guides for popular APIs and services</p>
        </div>
        <div class="tab-bar">
          <button class="tab-btn ${activeFilter === 'all' ? 'active' : ''}" onclick="window._intFilter('all')">All</button>
          ${cats.map(c => `<button class="tab-btn ${activeFilter === c ? 'active' : ''}" onclick="window._intFilter('${c}')">${c.charAt(0).toUpperCase() + c.slice(1)}</button>`).join('')}
        </div>
        <div class="grid grid-3">
          ${filtered.map(i => `
            <div class="card card-clickable integration-card" onclick="location.hash='#integrations/${i.id}'">
              <div class="card-header">
                <span class="card-title">${esc(i.name)}</span>
                ${icons.settings}
              </div>
              <div class="card-desc">${esc(i.description).slice(0, 100)}</div>
              <div class="env-vars">${(i.envVars || []).slice(0, 3).map(v => `<span class="env-var">${esc(v)}</span>`).join('')}</div>
              <span class="badge badge-intermediate">${esc(i.category)}</span>
            </div>
          `).join('')}
        </div>
      `;
    }
    window._intFilter = (cat) => { activeFilter = cat; render(); };
    render();
  }

  // ── INTEGRATION DETAIL ───────────────────────────────────────────────────
  async function renderIntegrationDetail(id) {
    const integration = (await GET('/api/integrations').catch(() => [])).find(i => i.id === id);
    if (!integration) { container.innerHTML = '<div class="empty-state"><h3>Integration not found</h3></div>'; return; }

    container.innerHTML = `
      <a href="#integrations" class="detail-back">${icons.back} Back to Integrations</a>
      <div class="detail-header">
        <div>
          <h1>${esc(integration.name)}</h1>
          <span class="badge badge-intermediate" style="margin-top:6px">${esc(integration.category)}</span>
        </div>
      </div>
      <div class="card" style="margin-bottom:20px"><div class="card-desc">${esc(integration.description)}</div></div>

      <div class="detail-section">
        <h2>${icons.zap} Environment Variables</h2>
        <div class="env-vars">${integration.envVars.map(v => `<span class="env-var">${esc(v)}</span>`).join('')}</div>
      </div>

      <div class="detail-section">
        <h2>${icons.target} Setup Steps</h2>
        <div class="steps">
          ${integration.setupSteps.map(s => `<div class="step-item"><div class="step-num"></div><div class="step-content">${esc(s)}</div></div>`).join('')}
        </div>
      </div>

      <div class="detail-section">
        <h2>${icons.code} Code Examples</h2>
        ${integration.codeSnippets.map(s => codeBlock(s.code, s.language, s.label)).join('')}
      </div>

      ${integration.links && integration.links.length ? `
      <div class="detail-section">
        <h2>${icons.ext} Resources</h2>
        <div class="links-list">${integration.links.map(l => `<a href="${esc(l)}" target="_blank" class="link-tag">${icons.ext} ${esc(l.replace(/https?:\/\/(www\.)?/, ''))}</a>`).join('')}</div>
      </div>` : ''}
    `;
  }

  // ── GUIDES ───────────────────────────────────────────────────────────────
  async function renderGuides() {
    state.guides = await GET('/api/guides').catch(() => []);
    const cats = ['all', ...new Set(state.guides.map(g => g.category).filter(Boolean))];
    let activeFilter = 'all';
    let searchQuery = '';

    function render() {
      let filtered = activeFilter === 'all' ? state.guides : state.guides.filter(g => g.category === activeFilter);
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(g => g.title.toLowerCase().includes(q) || (g.tags || []).some(t => t.toLowerCase().includes(q)));
      }
      container.innerHTML = `
        <div class="page-header">
          <div class="page-header-row">
            <div><h1>Guides</h1><p>AI-created guides for your development journey</p></div>
            <div class="search-box">${icons.search}<input placeholder="Search guides..." value="${esc(searchQuery)}" oninput="window._guideSearch(this.value)"></div>
          </div>
        </div>
        <div class="tab-bar">
          ${cats.map(c => `<button class="tab-btn ${activeFilter === c ? 'active' : ''}" onclick="window._guideFilter('${c}')">${c.charAt(0).toUpperCase() + c.slice(1)}</button>`).join('')}
        </div>
        ${filtered.length ? `<div class="grid grid-2">
          ${filtered.map(g => `
            <div class="card card-clickable" onclick="location.hash='#guides/${g.id}'">
              <div class="card-header">
                <span class="card-title">${esc(g.title)}</span>
                <span class="badge badge-intermediate">${esc(g.category || 'general')}</span>
              </div>
              ${g.tags && g.tags.length ? `<div class="template-stack">${g.tags.map(t => `<span class="stack-tag">${esc(t)}</span>`).join('')}</div>` : ''}
              <div style="font-size:11px;color:var(--text-dim);margin-top:8px">${new Date(g.createdAt).toLocaleDateString()}</div>
            </div>
          `).join('')}
        </div>` : `
          <div class="empty-state">
            ${icons.book}
            <h3>No guides yet</h3>
            <p>Your AI assistant will create guides as you discuss topics and ask questions about development.</p>
          </div>
        `}
      `;
    }
    window._guideFilter = (cat) => { activeFilter = cat; render(); };
    window._guideSearch = (q) => { searchQuery = q; render(); };
    render();
  }

  // ── GUIDE DETAIL ─────────────────────────────────────────────────────────
  async function renderGuideDetail(id) {
    const guides = await GET('/api/guides').catch(() => []);
    const guide = guides.find(g => g.id === id);
    if (!guide) { container.innerHTML = '<div class="empty-state"><h3>Guide not found</h3></div>'; return; }

    container.innerHTML = `
      <a href="#guides" class="detail-back">${icons.back} Back to Guides</a>
      <div class="detail-header">
        <div>
          <h1>${esc(guide.title)}</h1>
          <div style="margin-top:6px;display:flex;gap:8px;align-items:center">
            <span class="badge badge-intermediate">${esc(guide.category || 'general')}</span>
            <span style="font-size:12px;color:var(--text-dim)">${new Date(guide.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <button class="btn btn-danger btn-sm" onclick="window._deleteGuide('${guide.id}')">${icons.trash} Delete</button>
      </div>
      ${guide.tags && guide.tags.length ? `<div class="template-stack" style="margin-bottom:16px">${guide.tags.map(t => `<span class="stack-tag">${esc(t)}</span>`).join('')}</div>` : ''}
      <div class="card"><div class="guide-content">${md(guide.content)}</div></div>
    `;
  }

  window._deleteGuide = async (id) => {
    if (!confirm('Delete this guide?')) return;
    await DELETE(`/api/guides/${id}`);
    toast('Guide deleted');
    navigate('#guides');
  };

  // ── Utility ──────────────────────────────────────────────────────────────
  function esc(str) {
    if (typeof str !== 'string') return '';
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // expose closeModal globally for inline onclick
  window.closeModal = closeModal;

  // ── Init ─────────────────────────────────────────────────────────────────
  window.addEventListener('hashchange', route);
  route();
})();
