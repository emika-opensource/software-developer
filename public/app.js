const ideas = [
  {
    icon: '🏪',
    title: 'E-Commerce Store',
    desc: 'Product catalog with cart, checkout, order tracking, and admin dashboard.',
    tag: 'Online Business',
    color: '#f59e0b',
    prompt: 'Build me an e-commerce store with a product catalog, shopping cart, checkout flow with Stripe payments, order tracking for customers, and an admin dashboard to manage products and orders. Use SQLite for the database. Make the design clean and professional with a dark theme.'
  },
  {
    icon: '📅',
    title: 'Booking & Appointments',
    desc: 'Calendar scheduling with time slots, client bookings, reminders, and payments.',
    tag: 'Service Business',
    color: '#3b82f6',
    prompt: 'Build me a booking and appointment system. I need a calendar view with available time slots, a booking form for clients, email confirmations, automatic reminders, and the ability to accept payments for bookings. Include an admin view to manage my schedule and see upcoming appointments.'
  },
  {
    icon: '🎓',
    title: 'Online Course Platform',
    desc: 'Sell courses with video lessons, progress tracking, and student dashboards.',
    tag: 'Digital Products',
    color: '#8b5cf6',
    prompt: 'Build me an online course platform where I can create and sell courses. Each course should have modules with video lessons, text content, and quizzes. Students need a dashboard to track their progress. Include payment processing and a landing page for each course.'
  },
  {
    icon: '💼',
    title: 'Client Portal',
    desc: 'Branded portal for clients to view projects, invoices, files, and messages.',
    tag: 'Agency Tool',
    color: '#00d4aa',
    prompt: 'Build me a client portal where my clients can log in and see their project status, view and pay invoices, download shared files, and send me messages. I need an admin side to manage clients, create projects, and upload deliverables. Make it look professional with my branding.'
  },
  {
    icon: '📧',
    title: 'Email Newsletter Platform',
    desc: 'Grow a subscriber list, design campaigns, track opens and clicks.',
    tag: 'Marketing Tool',
    color: '#ec4899',
    prompt: 'Build me an email newsletter platform. I need a signup form I can embed on my website, subscriber list management with tags, a visual email editor to design campaigns, scheduling, and analytics showing open rates and click rates. Include an unsubscribe flow.'
  },
  {
    icon: '🏠',
    title: 'Property Listing Platform',
    desc: 'List properties with photos, filters, map view, and inquiry forms.',
    tag: 'Real Estate',
    color: '#06b6d4',
    prompt: 'Build me a property listing platform for real estate. I need to list properties with multiple photos, descriptions, pricing, and amenities. Visitors should be able to search and filter by price, location, bedrooms, etc. Include a map view, inquiry contact forms, and an admin panel to manage listings.'
  },
  {
    icon: '💰',
    title: 'Invoice & Payment System',
    desc: 'Create invoices, accept payments, track revenue, and send reminders.',
    tag: 'Finance Tool',
    color: '#22c55e',
    prompt: 'Build me an invoicing system where I can create professional invoices for clients, send them via email with a payment link, accept online payments, track paid/unpaid status, and see revenue reports. Include automatic payment reminders for overdue invoices.'
  },
  {
    icon: '🎫',
    title: 'Event Ticketing Platform',
    desc: 'Create events, sell tickets, QR check-in, and attendee management.',
    tag: 'Events',
    color: '#f97316',
    prompt: 'Build me an event ticketing platform. I need to create events with descriptions and ticket tiers (VIP, General, etc.), sell tickets with online payment, generate QR codes for each ticket, a check-in scanner page, and an attendee management dashboard with analytics.'
  },
  {
    icon: '📊',
    title: 'SaaS Analytics Dashboard',
    desc: 'Track MRR, churn, signups, and customer metrics in real-time.',
    tag: 'SaaS Tool',
    color: '#6366f1',
    prompt: 'Build me a SaaS analytics dashboard that tracks monthly recurring revenue (MRR), churn rate, new signups, active users, and customer lifetime value. Include charts and graphs that update in real-time, data export to CSV, and a clean dark-themed interface with KPI cards at the top.'
  },
  {
    icon: '🛒',
    title: 'Digital Product Store',
    desc: 'Sell downloads — templates, ebooks, presets — with instant delivery.',
    tag: 'Digital Products',
    color: '#a855f7',
    prompt: 'Build me a digital product store where I can sell downloadable products like templates, ebooks, design assets, and presets. Customers should be able to browse, purchase with Stripe, and get instant download links via email. Include a product management admin panel and sales analytics.'
  },
  {
    icon: '🤖',
    title: 'AI-Powered Support Chat',
    desc: 'Customer support chatbot trained on your docs with live agent fallback.',
    tag: 'Customer Support',
    color: '#14b8a6',
    prompt: 'Build me an AI-powered customer support chatbot. It should answer questions based on my knowledge base documents, handle common FAQs automatically, and escalate to a human agent when it can\'t help. Include a widget I can embed on my website, a conversation history view, and analytics on common questions.'
  },
  {
    icon: '📋',
    title: 'Freelancer CRM',
    desc: 'Track leads, proposals, projects, invoices, and client communication.',
    tag: 'Freelance Tool',
    color: '#f43f5e',
    prompt: 'Build me a CRM designed for freelancers. I need to track leads and their status, create and send proposals, manage active projects with timelines, generate invoices, and log all client communications. Include a pipeline view (kanban board) and revenue tracking dashboard.'
  },
  {
    icon: '🏋️',
    title: 'Fitness Membership Platform',
    desc: 'Sell memberships, workout plans, class bookings, and progress tracking.',
    tag: 'Health & Fitness',
    color: '#ef4444',
    prompt: 'Build me a fitness membership platform. Members can sign up for monthly plans, book classes from a schedule, follow workout plans with exercise instructions, and track their progress with charts. Include payment processing, member management for admins, and a mobile-friendly design.'
  },
  {
    icon: '🍽️',
    title: 'Restaurant Ordering System',
    desc: 'Online menu, ordering, table reservations, and kitchen display.',
    tag: 'Food & Beverage',
    color: '#f59e0b',
    prompt: 'Build me a restaurant ordering system with a beautiful online menu, online ordering for pickup and delivery, table reservation system, and a kitchen display screen showing incoming orders. Include an admin panel to manage menu items, prices, and view order history with revenue stats.'
  },
  {
    icon: '📚',
    title: 'Membership Community',
    desc: 'Gated content, discussion forums, member directory, and subscription billing.',
    tag: 'Community',
    color: '#7c3aed',
    prompt: 'Build me a membership community platform with gated content behind a paywall, discussion forums where members can post and reply, a member directory with profiles, and recurring subscription billing. Include different membership tiers with different access levels and an admin dashboard.'
  },
  {
    icon: '🎨',
    title: 'Portfolio & Lead Generator',
    desc: 'Showcase your work, capture leads, and book consultations.',
    tag: 'Personal Brand',
    color: '#d946ef',
    prompt: 'Build me a portfolio website that showcases my work with project case studies, captures leads through a contact form, lets visitors book a free consultation from my calendar, and has a blog section for content marketing. Make it visually stunning with smooth animations and a dark theme.'
  },
  {
    icon: '📦',
    title: 'Subscription Box Manager',
    desc: 'Manage subscription products, recurring billing, and shipment tracking.',
    tag: 'E-Commerce',
    color: '#0ea5e9',
    prompt: 'Build me a subscription box management platform. Customers can subscribe to monthly boxes with different tier options, manage their subscription (pause, skip, cancel), and track shipments. I need an admin panel to manage subscribers, plan box contents, print shipping labels, and see subscription analytics.'
  },
  {
    icon: '🏢',
    title: 'Co-Working Space Manager',
    desc: 'Desk and room booking, member access, billing, and occupancy tracking.',
    tag: 'Workspace',
    color: '#84cc16',
    prompt: 'Build me a co-working space management system. Members can book desks and meeting rooms from a visual floor plan, check in/out, and manage their membership. Include billing for different plans (hot desk, dedicated desk, private office), occupancy analytics, and a member directory.'
  },
];

function render() {
  const grid = document.getElementById('ideas-grid');
  grid.innerHTML = ideas.map((idea, i) => `
    <div class="idea-card" style="--card-color: ${idea.color}" onclick="openModal(${i})">
      <div class="idea-card-icon" style="background: ${idea.color}15; color: ${idea.color}">${idea.icon}</div>
      <h3>${idea.title}</h3>
      <p>${idea.desc}</p>
      <span class="idea-tag" style="background: ${idea.color}18; color: ${idea.color}">${idea.tag}</span>
    </div>
  `).join('');
}

function openModal(index) {
  const idea = ideas[index];
  const existing = document.getElementById('prompt-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'prompt-modal';
  modal.className = 'modal-overlay';
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  modal.innerHTML = `
    <div class="modal-card" style="--card-color: ${idea.color}">
      <div class="modal-header">
        <div class="modal-icon" style="background: ${idea.color}15; color: ${idea.color}">${idea.icon}</div>
        <div>
          <h2>${idea.title}</h2>
          <span class="idea-tag" style="background: ${idea.color}18; color: ${idea.color}">${idea.tag}</span>
        </div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
      </div>
      <p class="modal-desc">${idea.desc}</p>
      <div class="modal-prompt-section">
        <div class="modal-prompt-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>
          Copy this prompt and send it to your AI employee
        </div>
        <div class="modal-prompt-text">${idea.prompt}</div>
        <button class="modal-copy-btn" style="background: ${idea.color}" onclick="copyPrompt(this, ${index})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy Prompt
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('visible'));
}

function copyPrompt(btn, index) {
  const text = ideas[index].prompt;
  navigator.clipboard.writeText(text).then(() => {
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      Copied!
    `;
    setTimeout(() => {
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        Copy Prompt
      `;
    }, 2000);
  });
}

render();
