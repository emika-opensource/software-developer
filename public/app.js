const ideas = [
  {
    icon: '🏪',
    title: 'E-Commerce Store',
    desc: 'A product catalog with cart, checkout flow, and order management dashboard.',
    tag: 'Full-Stack App',
    color: '#f59e0b'
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    desc: 'Real-time charts, KPI cards, and data tables with filtering and export.',
    tag: 'Dashboard',
    color: '#3b82f6'
  },
  {
    icon: '🤖',
    title: 'AI Chatbot Widget',
    desc: 'Embeddable chat widget that connects to OpenAI or Claude for customer support.',
    tag: 'AI Integration',
    color: '#8b5cf6'
  },
  {
    icon: '📋',
    title: 'Project Tracker',
    desc: 'Kanban board with drag-and-drop, task assignments, deadlines, and status tracking.',
    tag: 'Productivity',
    color: '#00d4aa'
  },
  {
    icon: '📧',
    title: 'Email Campaign Builder',
    desc: 'Design email templates, manage subscriber lists, and schedule sends.',
    tag: 'Marketing Tool',
    color: '#ec4899'
  },
  {
    icon: '🔗',
    title: 'URL Shortener',
    desc: 'Short link generator with click analytics, QR codes, and custom slugs.',
    tag: 'Utility',
    color: '#06b6d4'
  },
  {
    icon: '📝',
    title: 'Blog Platform',
    desc: 'Markdown editor, post management, categories, tags, and SEO metadata.',
    tag: 'CMS',
    color: '#f43f5e'
  },
  {
    icon: '💰',
    title: 'Invoice Generator',
    desc: 'Create professional invoices, track payments, and export to PDF.',
    tag: 'Finance Tool',
    color: '#22c55e'
  },
  {
    icon: '🗓️',
    title: 'Booking System',
    desc: 'Calendar-based scheduling with availability slots, reminders, and confirmations.',
    tag: 'SaaS App',
    color: '#f97316'
  },
  {
    icon: '🔐',
    title: 'Password Manager',
    desc: 'Encrypted vault for credentials with search, categories, and secure sharing.',
    tag: 'Security Tool',
    color: '#6366f1'
  },
  {
    icon: '📦',
    title: 'Inventory System',
    desc: 'Track stock levels, suppliers, purchase orders, and low-stock alerts.',
    tag: 'Business Tool',
    color: '#14b8a6'
  },
  {
    icon: '🎨',
    title: 'Color Palette Generator',
    desc: 'Generate harmonious color schemes, preview on UI mockups, export CSS variables.',
    tag: 'Design Tool',
    color: '#a855f7'
  },
  {
    icon: '⚡',
    title: 'API Status Monitor',
    desc: 'Ping endpoints on a schedule, track uptime, latency graphs, and alert on downtime.',
    tag: 'DevOps',
    color: '#eab308'
  },
  {
    icon: '🧮',
    title: 'Expense Tracker',
    desc: 'Log expenses, categorize spending, monthly budgets, and visual breakdowns.',
    tag: 'Finance Tool',
    color: '#10b981'
  },
  {
    icon: '🎯',
    title: 'Landing Page Builder',
    desc: 'Drag-and-drop sections, hero templates, CTA buttons, and mobile preview.',
    tag: 'Marketing Tool',
    color: '#ef4444'
  },
  {
    icon: '📡',
    title: 'Webhook Relay',
    desc: 'Receive, inspect, transform, and forward webhooks between services.',
    tag: 'Integration',
    color: '#0ea5e9'
  },
  {
    icon: '🗺️',
    title: 'Store Locator',
    desc: 'Interactive map with location search, directions, hours, and contact info.',
    tag: 'Business Tool',
    color: '#84cc16'
  },
  {
    icon: '🎮',
    title: 'Quiz Game',
    desc: 'Trivia game with categories, scoring, leaderboards, and multiplayer mode.',
    tag: 'Fun Project',
    color: '#d946ef'
  },
  {
    icon: '📰',
    title: 'RSS Feed Reader',
    desc: 'Aggregate feeds, categorize sources, mark favorites, and read-later queue.',
    tag: 'Utility',
    color: '#f97316'
  },
  {
    icon: '🔄',
    title: 'Workflow Automator',
    desc: 'Visual flow builder connecting triggers and actions across services.',
    tag: 'Automation',
    color: '#7c3aed'
  },
  {
    icon: '💬',
    title: 'Feedback Widget',
    desc: 'Embeddable feedback form with screenshots, sentiment analysis, and admin panel.',
    tag: 'SaaS App',
    color: '#06b6d4'
  },
  {
    icon: '🧾',
    title: 'Receipt Scanner',
    desc: 'Upload receipts, OCR extraction, expense categorization, and monthly reports.',
    tag: 'AI Integration',
    color: '#f59e0b'
  },
  {
    icon: '🏋️',
    title: 'Fitness Tracker',
    desc: 'Log workouts, track progress, set goals, and visualize stats over time.',
    tag: 'Health App',
    color: '#ef4444'
  },
  {
    icon: '🌐',
    title: 'Multi-Language CMS',
    desc: 'Content management with translations, locale switching, and SEO per language.',
    tag: 'CMS',
    color: '#3b82f6'
  },
];

function render() {
  const grid = document.getElementById('ideas-grid');
  grid.innerHTML = ideas.map(idea => `
    <div class="idea-card" style="--card-color: ${idea.color}">
      <div class="idea-card-icon" style="background: ${idea.color}15; color: ${idea.color}">${idea.icon}</div>
      <h3>${idea.title}</h3>
      <p>${idea.desc}</p>
      <span class="idea-tag" style="background: ${idea.color}18; color: ${idea.color}">${idea.tag}</span>
    </div>
  `).join('');
}

render();
