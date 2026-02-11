const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = fs.existsSync('/home/node/emika/dev-workshop')
  ? '/home/node/emika/dev-workshop'
  : path.join(__dirname, 'data');

fs.ensureDirSync(DATA_DIR);

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function dataFile(name) { return path.join(DATA_DIR, name); }
async function readJSON(name, fallback = []) {
  try { return await fs.readJSON(dataFile(name)); } catch { return fallback; }
}
async function writeJSON(name, data) {
  await fs.writeJSON(dataFile(name), data, { spaces: 2 });
}
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

// ── Input Validation Helpers ─────────────────────────────────────────────────

function pickFields(obj, allowed) {
  const result = {};
  for (const key of allowed) {
    if (obj.hasOwnProperty(key)) result[key] = obj[key];
  }
  return result;
}

function validateProject(body, partial = false) {
  const allowed = ['name', 'description', 'status', 'stack', 'architecture', 'features', 'milestones', 'notes'];
  const picked = pickFields(body, allowed);
  if (picked.name !== undefined && typeof picked.name !== 'string') picked.name = String(picked.name);
  if (picked.description !== undefined && typeof picked.description !== 'string') picked.description = String(picked.description);
  if (picked.status !== undefined) {
    const validStatuses = ['idea', 'planning', 'in-progress', 'review', 'deployed'];
    if (!validStatuses.includes(picked.status)) picked.status = 'idea';
  }
  if (picked.features !== undefined && !Array.isArray(picked.features)) picked.features = [];
  if (picked.milestones !== undefined && !Array.isArray(picked.milestones)) picked.milestones = [];
  if (picked.notes !== undefined && typeof picked.notes !== 'string') picked.notes = String(picked.notes);
  if (picked.architecture !== undefined && typeof picked.architecture !== 'string') picked.architecture = String(picked.architecture);
  if (!partial && !picked.name) return { error: 'Project name is required' };
  return { data: picked };
}

function validateGuide(body, partial = false) {
  const allowed = ['title', 'content', 'category', 'projectId', 'tags'];
  const picked = pickFields(body, allowed);
  if (picked.title !== undefined && typeof picked.title !== 'string') picked.title = String(picked.title);
  if (picked.content !== undefined && typeof picked.content !== 'string') picked.content = String(picked.content);
  if (picked.tags !== undefined && !Array.isArray(picked.tags)) picked.tags = [];
  const validCategories = ['architecture', 'database', 'api', 'frontend', 'backend', 'security', 'deployment', 'testing', 'devops', 'general'];
  if (picked.category !== undefined && !validCategories.includes(picked.category)) picked.category = 'general';
  if (!partial && !picked.title) return { error: 'Guide title is required' };
  return { data: picked };
}

function validateConfig(body) {
  const allowed = ['skillLevel', 'preferredStack', 'githubUsername', 'timeline'];
  const picked = pickFields(body, allowed);
  if (picked.skillLevel !== undefined) {
    const valid = ['beginner', 'intermediate', 'advanced'];
    if (!valid.includes(picked.skillLevel)) picked.skillLevel = 'beginner';
  }
  return { data: picked };
}

// ── Load Data Files ──────────────────────────────────────────────────────────

const TEMPLATES = require('./data/templates');
const STACKS = require('./data/stacks');
const INTEGRATIONS = require('./data/integrations');

// ── Markdown rendering endpoint ──────────────────────────────────────────────

marked.setOptions({ breaks: true, gfm: true });

app.get('/api/render-markdown', (req, res) => {
  res.json({ info: 'POST markdown content to render' });
});

app.post('/api/render-markdown', (req, res) => {
  try {
    const { content } = req.body;
    if (!content || typeof content !== 'string') return res.json({ html: '' });
    const html = marked(content);
    res.json({ html });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── PROJECTS CRUD ────────────────────────────────────────────────────────────

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await readJSON('projects.json');
    res.json(projects);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { error, data } = validateProject(req.body);
    if (error) return res.status(400).json({ error });
    const projects = await readJSON('projects.json');
    const project = {
      id: uid(),
      name: data.name || 'Untitled Project',
      description: data.description || '',
      status: data.status || 'idea',
      stack: data.stack || { frontend: '', backend: '', database: '', hosting: '', apis: [] },
      architecture: data.architecture || '',
      features: data.features || [],
      milestones: data.milestones || [],
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    projects.push(project);
    await writeJSON('projects.json', projects);
    res.json(project);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const { error, data } = validateProject(req.body, true);
    if (error) return res.status(400).json({ error });
    const projects = await readJSON('projects.json');
    const idx = projects.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    projects[idx] = { ...projects[idx], ...data, updatedAt: new Date().toISOString() };
    await writeJSON('projects.json', projects);
    res.json(projects[idx]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    let projects = await readJSON('projects.json');
    projects = projects.filter(p => p.id !== req.params.id);
    await writeJSON('projects.json', projects);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/projects/from-template', async (req, res) => {
  try {
    const { templateId, name } = req.body;
    if (!templateId || typeof templateId !== 'string') return res.status(400).json({ error: 'templateId is required' });
    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) return res.status(404).json({ error: 'Template not found' });

    const projects = await readJSON('projects.json');
    const project = {
      id: uid(),
      name: (typeof name === 'string' && name.trim()) ? name.trim() : template.name,
      description: template.description,
      status: 'planning',
      stack: { ...template.recommendedStack },
      architecture: template.architecture,
      features: template.features.map(f => ({ name: f, done: false })),
      milestones: [
        { id: uid(), name: 'Setup & Configuration', status: 'todo', tasks: template.setupSteps.slice(0, 4).map(s => ({ name: s, done: false })) },
        { id: uid(), name: 'Core Development', status: 'todo', tasks: template.setupSteps.slice(4).map(s => ({ name: s, done: false })) },
        { id: uid(), name: 'Testing & Polish', status: 'todo', tasks: [{ name: 'Write tests', done: false }, { name: 'Fix bugs', done: false }, { name: 'Performance optimization', done: false }] },
        { id: uid(), name: 'Launch', status: 'todo', tasks: [{ name: 'Deploy to production', done: false }, { name: 'Set up monitoring', done: false }, { name: 'Create documentation', done: false }] }
      ],
      notes: 'Created from template: ' + template.name,
      templateId: template.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    projects.push(project);
    await writeJSON('projects.json', projects);
    res.json(project);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── TEMPLATES (read-only) ────────────────────────────────────────────────────

app.get('/api/templates', (req, res) => res.json(TEMPLATES));
app.get('/api/templates/:id', (req, res) => {
  const t = TEMPLATES.find(t => t.id === req.params.id);
  t ? res.json(t) : res.status(404).json({ error: 'Not found' });
});

// ── STACKS ───────────────────────────────────────────────────────────────────

app.get('/api/stacks', (req, res) => {
  const { category } = req.query;
  if (category && STACKS[category]) return res.json({ [category]: STACKS[category] });
  res.json(STACKS);
});

// ── INTEGRATIONS ─────────────────────────────────────────────────────────────

app.get('/api/integrations', (req, res) => res.json(INTEGRATIONS));
app.get('/api/integrations/:id', (req, res) => {
  const i = INTEGRATIONS.find(i => i.id === req.params.id);
  i ? res.json(i) : res.status(404).json({ error: 'Not found' });
});

// ── GUIDES CRUD ──────────────────────────────────────────────────────────────

app.get('/api/guides', async (req, res) => {
  try {
    const guides = await readJSON('guides.json');
    const { category, projectId, search } = req.query;
    let filtered = guides;
    if (category) filtered = filtered.filter(g => g.category === category);
    if (projectId) filtered = filtered.filter(g => g.projectId === projectId);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(g => g.title.toLowerCase().includes(q) || (g.tags || []).some(t => t.toLowerCase().includes(q)));
    }
    res.json(filtered);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/guides', async (req, res) => {
  try {
    const { error, data } = validateGuide(req.body);
    if (error) return res.status(400).json({ error });
    const guides = await readJSON('guides.json');
    const guide = {
      id: uid(),
      title: data.title || 'Untitled Guide',
      content: data.content || '',
      category: data.category || 'general',
      projectId: data.projectId || null,
      tags: data.tags || [],
      createdAt: new Date().toISOString()
    };
    guides.push(guide);
    await writeJSON('guides.json', guides);
    res.json(guide);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/guides/:id', async (req, res) => {
  try {
    const { error, data } = validateGuide(req.body, true);
    if (error) return res.status(400).json({ error });
    const guides = await readJSON('guides.json');
    const idx = guides.findIndex(g => g.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    guides[idx] = { ...guides[idx], ...data };
    await writeJSON('guides.json', guides);
    res.json(guides[idx]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/guides/:id', async (req, res) => {
  try {
    let guides = await readJSON('guides.json');
    guides = guides.filter(g => g.id !== req.params.id);
    await writeJSON('guides.json', guides);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── CONFIG ───────────────────────────────────────────────────────────────────

app.get('/api/config', async (req, res) => {
  const config = await readJSON('config.json', { skillLevel: 'beginner', preferredStack: {}, githubUsername: '', timeline: '' });
  res.json(config);
});

app.put('/api/config', async (req, res) => {
  try {
    const { data } = validateConfig(req.body);
    const config = await readJSON('config.json', {});
    const updated = { ...config, ...data };
    await writeJSON('config.json', updated);
    res.json(updated);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── ANALYTICS ────────────────────────────────────────────────────────────────

app.get('/api/analytics', async (req, res) => {
  try {
    const projects = await readJSON('projects.json');
    const guides = await readJSON('guides.json');
    const byStatus = {};
    projects.forEach(p => { byStatus[p.status] = (byStatus[p.status] || 0) + 1; });

    const totalFeatures = projects.reduce((sum, p) => sum + (p.features || []).length, 0);
    const doneFeatures = projects.reduce((sum, p) => sum + (p.features || []).filter(f => f.done).length, 0);

    res.json({
      totalProjects: projects.length,
      byStatus,
      totalGuides: guides.length,
      totalFeatures,
      completedFeatures: doneFeatures,
      featureProgress: totalFeatures ? Math.round((doneFeatures / totalFeatures) * 100) : 0,
      recentProjects: projects.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5)
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── SPA fallback ─────────────────────────────────────────────────────────────

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`Dev Workshop running on port ${PORT}`));
