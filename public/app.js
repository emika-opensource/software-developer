// SVG icons by category
const icons = {
  store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l1.5-5h15L21 9"/><path d="M3 9v11a1 1 0 001 1h16a1 1 0 001-1V9"/><path d="M9 21V13h6v8"/><path d="M3 9h18"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="12" cy="15" r="1"/></svg>',
  graduation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10l-10-5L2 10l10 5 10-5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><line x1="22" y1="10" x2="22" y2="16"/></svg>',
  briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="2" y1="13" x2="22" y2="13"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-8 9 8"/><path d="M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10"/></svg>',
  dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><path d="M9 11a2 2 0 012-2h2a2 2 0 010 4h-2a2 2 0 000 4h2a2 2 0 002-2"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9V6a2 2 0 012-2h16a2 2 0 012 2v3"/><path d="M2 15v3a2 2 0 002 2h16a2 2 0 002-2v-3"/><path d="M22 9a3 3 0 00-3 3 3 3 0 003 3"/><path d="M2 9a3 3 0 013 3 3 3 0 01-3 3"/><line x1="9" y1="4" x2="9" y2="8"/><line x1="9" y1="16" x2="9" y2="20"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/><line x1="2" y1="20" x2="22" y2="20"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="2"/><circle cx="9" cy="14" r="1.5"/><circle cx="15" cy="14" r="1.5"/><path d="M12 2v4"/><circle cx="12" cy="2" r="1"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
  fitness: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5L17.5 17.5"/><path d="M20 4l-1.5 1.5"/><path d="M18.5 2.5L20 4"/><path d="M4 20l1.5-1.5"/><path d="M2.5 18.5L4 20"/><path d="M7 8L3 12"/><path d="M16 17l4-4"/><path d="M12 3l-4 4"/><path d="M21 12l-4 4"/></svg>',
  utensils: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1"/></svg>',
  palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="8" r="1.5"/><circle cx="8" cy="12" r="1.5"/><circle cx="16" cy="12" r="1.5"/><circle cx="12" cy="16" r="1.5"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><line x1="12" y1="13" x2="12" y2="21"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>',
};

const checkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

const templates = [
  {
    icon: 'store',
    title: 'E-Commerce Store',
    desc: 'Full-featured online store with product catalog, shopping cart, checkout, order tracking, and admin dashboard.',
    category: 'Online Business',
    color: '#f59e0b',
    features: ['Product catalog', 'Cart & checkout', 'Order tracking', 'Admin panel'],
    prompt: 'Build me an e-commerce store with a product catalog, shopping cart, checkout flow with Stripe payments, order tracking for customers, and an admin dashboard to manage products and orders. Use SQLite for the database. Make the design clean and professional with a dark theme.'
  },
  {
    icon: 'calendar',
    title: 'Booking & Appointments',
    desc: 'Calendar scheduling system with time slots, client bookings, automated reminders, and payment processing.',
    category: 'Service Business',
    color: '#3b82f6',
    features: ['Calendar view', 'Client bookings', 'Reminders', 'Payments'],
    prompt: 'Build me a booking and appointment system. I need a calendar view with available time slots, a booking form for clients, email confirmations, automatic reminders, and the ability to accept payments for bookings. Include an admin view to manage my schedule and see upcoming appointments.'
  },
  {
    icon: 'graduation',
    title: 'Online Course Platform',
    desc: 'Sell courses with video lessons, module organization, progress tracking, quizzes, and student dashboards.',
    category: 'Digital Products',
    color: '#8b5cf6',
    features: ['Video lessons', 'Progress tracking', 'Quizzes', 'Student dashboard'],
    prompt: 'Build me an online course platform where I can create and sell courses. Each course should have modules with video lessons, text content, and quizzes. Students need a dashboard to track their progress. Include payment processing and a landing page for each course.'
  },
  {
    icon: 'briefcase',
    title: 'Client Portal',
    desc: 'Branded portal for clients to view projects, pay invoices, download files, and communicate directly.',
    category: 'Agency Tool',
    color: '#00d4aa',
    features: ['Project status', 'Invoice payments', 'File sharing', 'Messaging'],
    prompt: 'Build me a client portal where my clients can log in and see their project status, view and pay invoices, download shared files, and send me messages. I need an admin side to manage clients, create projects, and upload deliverables. Make it look professional with my branding.'
  },
  {
    icon: 'mail',
    title: 'Email Newsletter Platform',
    desc: 'Subscriber management, campaign designer, scheduling engine, and open/click analytics.',
    category: 'Marketing Tool',
    color: '#ec4899',
    features: ['Subscriber lists', 'Campaign editor', 'Scheduling', 'Analytics'],
    prompt: 'Build me an email newsletter platform. I need a signup form I can embed on my website, subscriber list management with tags, a visual email editor to design campaigns, scheduling, and analytics showing open rates and click rates. Include an unsubscribe flow.'
  },
  {
    icon: 'home',
    title: 'Property Listing Platform',
    desc: 'Real estate listings with photos, advanced filters, map integration, and inquiry management.',
    category: 'Real Estate',
    color: '#06b6d4',
    features: ['Photo galleries', 'Search & filters', 'Map view', 'Inquiry forms'],
    prompt: 'Build me a property listing platform for real estate. I need to list properties with multiple photos, descriptions, pricing, and amenities. Visitors should be able to search and filter by price, location, bedrooms, etc. Include a map view, inquiry contact forms, and an admin panel to manage listings.'
  },
  {
    icon: 'dollar',
    title: 'Invoice & Payment System',
    desc: 'Professional invoicing with online payments, revenue tracking, and automated payment reminders.',
    category: 'Finance Tool',
    color: '#22c55e',
    features: ['Invoice builder', 'Online payments', 'Revenue reports', 'Reminders'],
    prompt: 'Build me an invoicing system where I can create professional invoices for clients, send them via email with a payment link, accept online payments, track paid/unpaid status, and see revenue reports. Include automatic payment reminders for overdue invoices.'
  },
  {
    icon: 'ticket',
    title: 'Event Ticketing Platform',
    desc: 'Create events, sell tiered tickets, generate QR codes, and manage attendee check-in.',
    category: 'Events',
    color: '#f97316',
    features: ['Ticket tiers', 'QR codes', 'Check-in scanner', 'Attendee mgmt'],
    prompt: 'Build me an event ticketing platform. I need to create events with descriptions and ticket tiers (VIP, General, etc.), sell tickets with online payment, generate QR codes for each ticket, a check-in scanner page, and an attendee management dashboard with analytics.'
  },
  {
    icon: 'chart',
    title: 'SaaS Analytics Dashboard',
    desc: 'Track MRR, churn, signups, active users, and customer metrics with real-time charts.',
    category: 'SaaS Tool',
    color: '#6366f1',
    features: ['MRR tracking', 'Churn analysis', 'Real-time charts', 'CSV export'],
    prompt: 'Build me a SaaS analytics dashboard that tracks monthly recurring revenue (MRR), churn rate, new signups, active users, and customer lifetime value. Include charts and graphs that update in real-time, data export to CSV, and a clean dark-themed interface with KPI cards at the top.'
  },
  {
    icon: 'download',
    title: 'Digital Product Store',
    desc: 'Sell downloadable products with instant delivery, license management, and sales analytics.',
    category: 'Digital Products',
    color: '#a855f7',
    features: ['Instant delivery', 'License keys', 'Product mgmt', 'Sales analytics'],
    prompt: 'Build me a digital product store where I can sell downloadable products like templates, ebooks, design assets, and presets. Customers should be able to browse, purchase with Stripe, and get instant download links via email. Include a product management admin panel and sales analytics.'
  },
  {
    icon: 'bot',
    title: 'AI Support Chatbot',
    desc: 'Knowledge-base trained chatbot with live agent escalation and embeddable widget.',
    category: 'Customer Support',
    color: '#14b8a6',
    features: ['Knowledge base', 'Auto-answers', 'Agent escalation', 'Embed widget'],
    prompt: 'Build me an AI-powered customer support chatbot. It should answer questions based on my knowledge base documents, handle common FAQs automatically, and escalate to a human agent when it can\'t help. Include a widget I can embed on my website, a conversation history view, and analytics on common questions.'
  },
  {
    icon: 'users',
    title: 'Freelancer CRM',
    desc: 'Lead pipeline, proposals, project tracking, invoicing, and client communication log.',
    category: 'Freelance Tool',
    color: '#f43f5e',
    features: ['Kanban pipeline', 'Proposals', 'Project tracker', 'Revenue stats'],
    prompt: 'Build me a CRM designed for freelancers. I need to track leads and their status, create and send proposals, manage active projects with timelines, generate invoices, and log all client communications. Include a pipeline view (kanban board) and revenue tracking dashboard.'
  },
  {
    icon: 'fitness',
    title: 'Fitness Membership Platform',
    desc: 'Memberships, workout plans, class bookings, progress charts, and payment processing.',
    category: 'Health & Fitness',
    color: '#ef4444',
    features: ['Memberships', 'Workout plans', 'Class booking', 'Progress charts'],
    prompt: 'Build me a fitness membership platform. Members can sign up for monthly plans, book classes from a schedule, follow workout plans with exercise instructions, and track their progress with charts. Include payment processing, member management for admins, and a mobile-friendly design.'
  },
  {
    icon: 'utensils',
    title: 'Restaurant Ordering System',
    desc: 'Digital menu, online ordering, table reservations, and kitchen display for incoming orders.',
    category: 'Food & Beverage',
    color: '#f59e0b',
    features: ['Digital menu', 'Online ordering', 'Reservations', 'Kitchen display'],
    prompt: 'Build me a restaurant ordering system with a beautiful online menu, online ordering for pickup and delivery, table reservation system, and a kitchen display screen showing incoming orders. Include an admin panel to manage menu items, prices, and view order history with revenue stats.'
  },
  {
    icon: 'lock',
    title: 'Membership Community',
    desc: 'Gated content, discussion forums, member directory, tiered subscriptions, and admin tools.',
    category: 'Community',
    color: '#7c3aed',
    features: ['Gated content', 'Forums', 'Member directory', 'Tier management'],
    prompt: 'Build me a membership community platform with gated content behind a paywall, discussion forums where members can post and reply, a member directory with profiles, and recurring subscription billing. Include different membership tiers with different access levels and an admin dashboard.'
  },
  {
    icon: 'palette',
    title: 'Portfolio & Lead Generator',
    desc: 'Showcase work with case studies, capture leads, book consultations, and publish blog content.',
    category: 'Personal Brand',
    color: '#d946ef',
    features: ['Case studies', 'Lead capture', 'Booking', 'Blog'],
    prompt: 'Build me a portfolio website that showcases my work with project case studies, captures leads through a contact form, lets visitors book a free consultation from my calendar, and has a blog section for content marketing. Make it visually stunning with smooth animations and a dark theme.'
  },
  {
    icon: 'box',
    title: 'Subscription Box Manager',
    desc: 'Recurring subscriptions, box curation, shipment tracking, and subscriber analytics.',
    category: 'E-Commerce',
    color: '#0ea5e9',
    features: ['Subscriptions', 'Box curation', 'Shipping', 'Analytics'],
    prompt: 'Build me a subscription box management platform. Customers can subscribe to monthly boxes with different tier options, manage their subscription (pause, skip, cancel), and track shipments. I need an admin panel to manage subscribers, plan box contents, print shipping labels, and see subscription analytics.'
  },
  {
    icon: 'building',
    title: 'Co-Working Space Manager',
    desc: 'Desk and room booking, visual floor plan, member access, billing, and occupancy analytics.',
    category: 'Workspace',
    color: '#84cc16',
    features: ['Floor plan', 'Desk booking', 'Memberships', 'Occupancy stats'],
    prompt: 'Build me a co-working space management system. Members can book desks and meeting rooms from a visual floor plan, check in/out, and manage their membership. Include billing for different plans (hot desk, dedicated desk, private office), occupancy analytics, and a member directory.'
  },
];

// Extract unique categories
const categories = [...new Set(templates.map(t => t.category))];

let currentCategory = 'all';
let currentSearch = '';
let currentView = 'grid';

function init() {
  renderCategoryNav();
  renderTemplates();
  bindEvents();
}

function renderCategoryNav() {
  const nav = document.getElementById('category-nav');
  const catButtons = categories.map(cat =>
    `<button class="cat-btn" data-cat="${cat}">${cat}</button>`
  ).join('');
  nav.innerHTML = `<button class="cat-btn active" data-cat="all">All</button>${catButtons}`;

  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    nav.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.cat;
    renderTemplates();
  });
}

function getFiltered() {
  return templates.filter(t => {
    const matchesCat = currentCategory === 'all' || t.category === currentCategory;
    const matchesSearch = !currentSearch ||
      t.title.toLowerCase().includes(currentSearch) ||
      t.desc.toLowerCase().includes(currentSearch) ||
      t.category.toLowerCase().includes(currentSearch) ||
      t.features.some(f => f.toLowerCase().includes(currentSearch));
    return matchesCat && matchesSearch;
  });
}

function renderTemplates() {
  const grid = document.getElementById('templates-grid');
  const filtered = getFiltered();

  document.getElementById('results-count').textContent =
    `${filtered.length} template${filtered.length !== 1 ? 's' : ''}`;

  if (currentView === 'list') {
    grid.classList.add('list-view');
  } else {
    grid.classList.remove('list-view');
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <p>No templates match your search</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map((t, i) => {
    const realIndex = templates.indexOf(t);
    const featureHtml = t.features.map(f =>
      `<span class="template-feature">${checkIcon} ${f}</span>`
    ).join('');

    if (currentView === 'list') {
      return `
        <div class="template-card" onclick="openModal(${realIndex})">
          <div class="template-card-top">
            <div class="template-icon" style="background: ${t.color}12; color: ${t.color}">${icons[t.icon]}</div>
          </div>
          <div class="template-content">
            <h3>${t.title}<span class="template-list-cat">${t.category}</span></h3>
            <p>${t.desc}</p>
            <div class="template-features">${featureHtml}</div>
          </div>
        </div>`;
    }

    return `
      <div class="template-card" onclick="openModal(${realIndex})">
        <div class="template-card-top">
          <div class="template-icon" style="background: ${t.color}12; color: ${t.color}">${icons[t.icon]}</div>
          <span class="template-category" style="background: ${t.color}12; color: ${t.color}">${t.category}</span>
        </div>
        <h3>${t.title}</h3>
        <p>${t.desc}</p>
        <div class="template-features">${featureHtml}</div>
      </div>`;
  }).join('');
}

function openModal(index) {
  const t = templates[index];
  const existing = document.getElementById('prompt-modal');
  if (existing) existing.remove();

  const featuresHtml = t.features.map(f =>
    `<div class="modal-feature-item" style="color: ${t.color}">${checkIcon} <span style="color: var(--text)">${f}</span></div>`
  ).join('');

  const modal = document.createElement('div');
  modal.id = 'prompt-modal';
  modal.className = 'modal-overlay';
  modal.onclick = (e) => { if (e.target === modal) closeModal(); };
  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-top">
        <div class="modal-header">
          <div class="modal-icon" style="background: ${t.color}12; color: ${t.color}">${icons[t.icon]}</div>
          <div class="modal-header-text">
            <h2>${t.title}</h2>
            <div class="modal-cat">${t.category}</div>
          </div>
        </div>
        <button class="modal-close" onclick="closeModal()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <p class="modal-desc">${t.desc}</p>
        <div class="modal-features-grid">${featuresHtml}</div>
      </div>
      <div class="modal-bottom">
        <div class="modal-prompt-label">Prompt</div>
        <div class="modal-prompt-text">${t.prompt}</div>
        <div class="modal-actions">
          <button class="btn-primary" style="background: ${t.color}" onclick="copyPrompt(this, ${index})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            Copy Prompt
          </button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('visible'));
  document.addEventListener('keydown', escHandler);
}

function closeModal() {
  const modal = document.getElementById('prompt-modal');
  if (modal) {
    modal.classList.remove('visible');
    setTimeout(() => modal.remove(), 200);
  }
  document.removeEventListener('keydown', escHandler);
}

function escHandler(e) {
  if (e.key === 'Escape') closeModal();
}

function copyPrompt(btn, index) {
  const text = templates[index].prompt;
  navigator.clipboard.writeText(text).then(() => {
    btn.innerHTML = `${checkIcon} Copied!`;
    setTimeout(() => {
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy Prompt`;
    }, 2000);
  });
}

function bindEvents() {
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase().trim();
    renderTemplates();
  });

  document.getElementById('grid-view-btn').addEventListener('click', () => {
    currentView = 'grid';
    document.getElementById('grid-view-btn').classList.add('active');
    document.getElementById('list-view-btn').classList.remove('active');
    renderTemplates();
  });

  document.getElementById('list-view-btn').addEventListener('click', () => {
    currentView = 'list';
    document.getElementById('list-view-btn').classList.add('active');
    document.getElementById('grid-view-btn').classList.remove('active');
    renderTemplates();
  });
}

init();
