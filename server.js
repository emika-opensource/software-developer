const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

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

// ── TEMPLATES (read-only) ────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: 'saas-app',
    name: 'SaaS Application',
    description: 'Full-stack SaaS with authentication, billing, dashboard, and admin panel. Production-ready architecture with subscription management.',
    difficulty: 'advanced',
    recommendedStack: { frontend: 'Next.js', backend: 'Next.js API Routes', database: 'Supabase (PostgreSQL)', hosting: 'Vercel', apis: ['Stripe', 'Resend'] },
    architecture: `
┌─────────────────────────────────────────────┐
│                  Vercel CDN                  │
│              (Edge + Static)                 │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│            Next.js App Router                │
│  ┌──────────┐ ┌───────────┐ ┌────────────┐  │
│  │  Pages   │ │  Server   │ │ Middleware  │  │
│  │(RSC+Client│ │  Actions  │ │  (Auth)    │  │
│  └──────────┘ └───────────┘ └────────────┘  │
└──────────────────┬──────────────────────────┘
                   │
      ┌────────────┼────────────┐
      ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Supabase │ │  Stripe  │ │  Resend  │
│   (DB +  │ │(Billing) │ │ (Email)  │
│   Auth)  │ │          │ │          │
└──────────┘ └──────────┘ └──────────┘`,
    features: [
      'Email/password + OAuth authentication',
      'Subscription billing with Stripe Checkout',
      'Customer portal for managing subscriptions',
      'Role-based access control (admin/user)',
      'Dashboard with analytics widgets',
      'Admin panel for user management',
      'Transactional emails (welcome, invoice)',
      'Row-level security on all tables',
      'Webhook handling for Stripe events',
      'SEO-optimized landing page'
    ],
    setupSteps: [
      'npx create-next-app@latest my-saas --typescript --tailwind --app',
      'npm install @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js resend',
      'Create Supabase project at supabase.com — copy URL and anon key',
      'Create .env.local with NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY',
      'Set up Stripe account — copy STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET',
      'Create products and prices in Stripe dashboard',
      'Run Supabase migrations: profiles table, subscriptions table, RLS policies',
      'Set up Stripe webhook endpoint at /api/webhooks/stripe',
      'Deploy to Vercel — add all env vars in project settings',
      'Configure custom domain in Vercel + Supabase auth redirect URLs'
    ],
    files: [
      'app/layout.tsx — Root layout with Supabase provider',
      'app/page.tsx — Landing page',
      'app/(auth)/login/page.tsx — Login form',
      'app/(auth)/signup/page.tsx — Signup form',
      'app/(dashboard)/dashboard/page.tsx — Main dashboard',
      'app/(dashboard)/settings/page.tsx — User settings + billing',
      'app/(dashboard)/admin/page.tsx — Admin panel',
      'app/api/webhooks/stripe/route.ts — Stripe webhook handler',
      'lib/supabase/client.ts — Browser Supabase client',
      'lib/supabase/server.ts — Server Supabase client',
      'lib/stripe.ts — Stripe helpers',
      'middleware.ts — Auth middleware',
      'supabase/migrations/001_profiles.sql',
      'supabase/migrations/002_subscriptions.sql'
    ]
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'High-converting marketing landing page with sections for hero, features, pricing, testimonials, and CTA. Optimized for performance and SEO.',
    difficulty: 'beginner',
    recommendedStack: { frontend: 'Next.js', backend: 'None (static)', database: 'None', hosting: 'Vercel', apis: ['Resend'] },
    architecture: `
┌─────────────────────────────────────┐
│           Static Site (SSG)          │
│                                      │
│  ┌──────┐ ┌────────┐ ┌──────────┐   │
│  │ Hero │ │Features│ │ Pricing  │   │
│  └──────┘ └────────┘ └──────────┘   │
│  ┌────────────┐ ┌───────────────┐   │
│  │Testimonials│ │  CTA / Form   │   │
│  └────────────┘ └───────┬───────┘   │
│                         │           │
│                    ┌────▼────┐      │
│                    │ Resend  │      │
│                    │(emails) │      │
│                    └─────────┘      │
└─────────────────────────────────────┘`,
    features: [
      'Responsive hero section with CTA',
      'Feature grid with icons',
      'Pricing table (toggle monthly/yearly)',
      'Testimonial carousel',
      'Newsletter signup form',
      'SEO meta tags + Open Graph',
      'Performance score 95+',
      'Accessible (WCAG 2.1)',
      'Analytics integration ready',
      'Dark/light mode toggle'
    ],
    setupSteps: [
      'npx create-next-app@latest my-landing --typescript --tailwind --app',
      'npm install framer-motion resend',
      'Design sections in app/page.tsx',
      'Add API route for form submissions: app/api/contact/route.ts',
      'Optimize images with next/image',
      'Add meta tags in layout.tsx',
      'Deploy to Vercel'
    ],
    files: [
      'app/page.tsx — All landing page sections',
      'app/layout.tsx — Root layout with metadata',
      'app/api/contact/route.ts — Form submission handler',
      'components/Hero.tsx',
      'components/Features.tsx',
      'components/Pricing.tsx',
      'components/Testimonials.tsx',
      'components/CTA.tsx',
      'components/Footer.tsx'
    ]
  },
  {
    id: 'rest-api',
    name: 'REST API',
    description: 'Production-ready REST API with authentication, validation, rate limiting, error handling, and auto-generated documentation.',
    difficulty: 'intermediate',
    recommendedStack: { frontend: 'None', backend: 'Node.js / Express', database: 'PostgreSQL', hosting: 'Railway', apis: [] },
    architecture: `
┌─────────────────────────────────────────┐
│              Express Server              │
│                                          │
│  Request → Middleware → Router           │
│              │                           │
│      ┌───────┼────────┐                  │
│      ▼       ▼        ▼                  │
│  ┌──────┐ ┌──────┐ ┌──────┐             │
│  │Auth  │ │Rate  │ │Valid-│             │
│  │Check │ │Limit │ │ation│             │
│  └──┬───┘ └──────┘ └──┬───┘             │
│     └────────┬────────┘                  │
│              ▼                           │
│  ┌───────────────────────┐               │
│  │     Controller        │               │
│  │  (Parse + Respond)    │               │
│  └───────────┬───────────┘               │
│              ▼                           │
│  ┌───────────────────────┐               │
│  │      Service          │               │
│  │  (Business Logic)     │               │
│  └───────────┬───────────┘               │
│              ▼                           │
│  ┌───────────────────────┐               │
│  │    Repository (DB)    │               │
│  └───────────┬───────────┘               │
└──────────────┼───────────────────────────┘
               ▼
        ┌──────────────┐
        │  PostgreSQL   │
        └──────────────┘`,
    features: [
      'JWT authentication (access + refresh tokens)',
      'Input validation with Joi/Zod',
      'Rate limiting per endpoint',
      'Structured error handling',
      'Request logging (Morgan + Winston)',
      'CORS configuration',
      'Pagination, filtering, sorting',
      'API documentation with Swagger/OpenAPI',
      'Health check endpoint',
      'Docker + docker-compose setup',
      'Database migrations with Knex',
      'Unit + integration tests with Jest'
    ],
    setupSteps: [
      'mkdir my-api && cd my-api && npm init -y',
      'npm install express cors helmet morgan jsonwebtoken bcryptjs knex pg joi dotenv',
      'npm install -D jest supertest nodemon',
      'Create project structure: src/{controllers,services,repositories,middleware,routes}',
      'Set up knexfile.js for PostgreSQL connection',
      'Create initial migration: npx knex migrate:make create_users',
      'Implement auth middleware with JWT verification',
      'Build CRUD routes with validation',
      'Add error handling middleware',
      'Create Dockerfile and docker-compose.yml',
      'Write tests in __tests__/',
      'Deploy to Railway with PostgreSQL addon'
    ],
    files: [
      'src/index.js — Server entry point',
      'src/routes/auth.js — Login, register, refresh',
      'src/routes/users.js — User CRUD',
      'src/controllers/authController.js',
      'src/controllers/userController.js',
      'src/services/authService.js',
      'src/services/userService.js',
      'src/repositories/userRepository.js',
      'src/middleware/auth.js — JWT verification',
      'src/middleware/validate.js — Request validation',
      'src/middleware/rateLimit.js',
      'src/middleware/errorHandler.js',
      'knexfile.js — DB config',
      'migrations/ — Database migrations',
      'Dockerfile',
      'docker-compose.yml',
      '.env.example'
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'Complete online store with product catalog, shopping cart, checkout with Stripe, order management, and inventory tracking.',
    difficulty: 'advanced',
    recommendedStack: { frontend: 'Next.js', backend: 'Next.js API Routes', database: 'Supabase (PostgreSQL)', hosting: 'Vercel', apis: ['Stripe', 'Cloudflare Images'] },
    architecture: `
┌──────────────────────────────────────────┐
│              Next.js Frontend             │
│  ┌────────┐ ┌──────┐ ┌────────────────┐  │
│  │Catalog │ │ Cart │ │   Checkout     │  │
│  │Pages   │ │(state│ │  (Stripe)      │  │
│  └────────┘ └──────┘ └────────────────┘  │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│            API Routes                     │
│  /api/products  /api/cart  /api/orders    │
│  /api/webhooks/stripe                     │
└──────────────────┬───────────────────────┘
          ┌────────┼────────┐
          ▼        ▼        ▼
   ┌──────────┐ ┌──────┐ ┌──────────┐
   │ Supabase │ │Stripe│ │Cloudflare│
   │  (Data)  │ │(Pay) │ │ (Images) │
   └──────────┘ └──────┘ └──────────┘`,
    features: [
      'Product catalog with categories and search',
      'Product detail pages with image gallery',
      'Shopping cart with persistent state',
      'Stripe Checkout integration',
      'Order confirmation emails',
      'Order history for customers',
      'Admin: product management (CRUD)',
      'Admin: order management + fulfillment',
      'Inventory tracking',
      'SEO-optimized product pages'
    ],
    setupSteps: [
      'npx create-next-app@latest my-store --typescript --tailwind --app',
      'npm install @supabase/supabase-js stripe @stripe/stripe-js zustand',
      'Create Supabase project and set up tables: products, orders, order_items, categories',
      'Create Stripe account and set up products/prices',
      'Build product catalog pages with SSG',
      'Implement cart with Zustand (persisted to localStorage)',
      'Create Stripe Checkout session API route',
      'Set up Stripe webhook for order fulfillment',
      'Build admin pages for product and order management',
      'Deploy to Vercel'
    ],
    files: [
      'app/page.tsx — Store home with featured products',
      'app/products/page.tsx — Product catalog',
      'app/products/[slug]/page.tsx — Product detail',
      'app/cart/page.tsx — Shopping cart',
      'app/checkout/success/page.tsx — Order confirmation',
      'app/admin/products/page.tsx — Product management',
      'app/admin/orders/page.tsx — Order management',
      'app/api/checkout/route.ts — Create Stripe session',
      'app/api/webhooks/stripe/route.ts — Handle payments',
      'lib/store.ts — Zustand cart store',
      'supabase/migrations/001_products.sql',
      'supabase/migrations/002_orders.sql'
    ]
  },
  {
    id: 'blog-cms',
    name: 'Blog / CMS',
    description: 'Content management system with markdown editor, categories, tags, SEO optimization, and RSS feed. Great for personal blogs or company news.',
    difficulty: 'beginner',
    recommendedStack: { frontend: 'Next.js', backend: 'Next.js API Routes', database: 'SQLite (via Turso)', hosting: 'Vercel', apis: [] },
    architecture: `
┌────────────────────────────────────┐
│          Next.js App               │
│  ┌────────┐  ┌──────────────────┐  │
│  │ Public │  │  Admin Dashboard  │  │
│  │ Blog   │  │  (CRUD posts)    │  │
│  │ Pages  │  │  Markdown Editor  │  │
│  └───┬────┘  └────────┬─────────┘  │
│      └────────┬───────┘            │
│               ▼                    │
│        ┌─────────────┐             │
│        │  Turso/SQLite│             │
│        │  (libsql)   │             │
│        └─────────────┘             │
└────────────────────────────────────┘`,
    features: [
      'Markdown editor with live preview',
      'Categories and tags',
      'Draft / published / archived status',
      'SEO meta tags per post',
      'RSS feed generation',
      'Syntax highlighting in posts',
      'Image upload support',
      'Reading time estimation',
      'Table of contents generation',
      'Related posts suggestions'
    ],
    setupSteps: [
      'npx create-next-app@latest my-blog --typescript --tailwind --app',
      'npm install @libsql/client marked gray-matter reading-time',
      'Create Turso database: turso db create my-blog',
      'Set up schema: posts, categories, tags tables',
      'Build markdown editor component',
      'Create blog listing and post detail pages',
      'Add RSS feed at /feed.xml',
      'Deploy to Vercel with Turso connection'
    ],
    files: [
      'app/page.tsx — Blog listing',
      'app/blog/[slug]/page.tsx — Post detail',
      'app/admin/page.tsx — Post management',
      'app/admin/editor/page.tsx — Markdown editor',
      'app/feed.xml/route.ts — RSS feed',
      'lib/db.ts — Turso client',
      'lib/markdown.ts — Markdown processing',
      'components/MarkdownEditor.tsx',
      'components/PostCard.tsx'
    ]
  },
  {
    id: 'chrome-extension',
    name: 'Chrome Extension',
    description: 'Browser extension with popup UI, content scripts, background service worker, and storage. Includes hot reload for development.',
    difficulty: 'intermediate',
    recommendedStack: { frontend: 'Vanilla JS (or React)', backend: 'None', database: 'Chrome Storage API', hosting: 'Chrome Web Store', apis: [] },
    architecture: `
┌─────────────────────────────────────────┐
│           Chrome Extension               │
│                                          │
│  ┌──────────┐  ┌───────────────────┐     │
│  │  Popup   │  │ Background Worker │     │
│  │  (UI)    │  │  (Service Worker) │     │
│  │          │  │  - Event handling │     │
│  └────┬─────┘  │  - API calls     │     │
│       │        │  - Alarms        │     │
│       │        └────────┬──────────┘     │
│       │                 │                │
│       │    ┌────────────▼──────────┐     │
│       │    │   Content Scripts     │     │
│       │    │  (Injected into pages)│     │
│       │    └───────────────────────┘     │
│       │                                  │
│       └──► Chrome Storage API            │
└─────────────────────────────────────────┘`,
    features: [
      'Popup UI with settings',
      'Background service worker',
      'Content script injection',
      'Chrome Storage for persistence',
      'Context menu integration',
      'Badge notifications',
      'Options page',
      'Cross-tab messaging',
      'Hot reload in development',
      'Manifest V3 compliant'
    ],
    setupSteps: [
      'mkdir my-extension && cd my-extension',
      'Create manifest.json with Manifest V3 format',
      'Build popup HTML/CSS/JS in popup/ directory',
      'Create background service worker in background.js',
      'Write content scripts in content/ directory',
      'Go to chrome://extensions, enable Developer Mode',
      'Click "Load unpacked" and select your extension folder',
      'Test popup, content scripts, and background worker',
      'Package as .zip for Chrome Web Store submission',
      'Create developer account ($5) and submit for review'
    ],
    files: [
      'manifest.json — Extension configuration (MV3)',
      'popup/popup.html — Popup UI',
      'popup/popup.css — Popup styles',
      'popup/popup.js — Popup logic',
      'background.js — Service worker',
      'content/content.js — Content script',
      'content/content.css — Injected styles',
      'options/options.html — Settings page',
      'options/options.js — Settings logic',
      'icons/ — Extension icons (16, 48, 128px)'
    ]
  },
  {
    id: 'mobile-app',
    name: 'Mobile App (React Native)',
    description: 'Cross-platform mobile app for iOS and Android using React Native with Expo. Includes navigation, state management, and native APIs.',
    difficulty: 'intermediate',
    recommendedStack: { frontend: 'React Native (Expo)', backend: 'Supabase', database: 'Supabase (PostgreSQL)', hosting: 'Expo EAS', apis: ['Expo Push Notifications'] },
    architecture: `
┌──────────────────────────────────┐
│        Expo / React Native        │
│  ┌────────┐ ┌─────────────────┐  │
│  │Screens │ │  Navigation     │  │
│  │(Tabs + │ │  (Expo Router)  │  │
│  │ Stack) │ └─────────────────┘  │
│  └────┬───┘                      │
│       │    ┌─────────────────┐   │
│       ├───►│ State (Zustand) │   │
│       │    └─────────────────┘   │
│       │    ┌─────────────────┐   │
│       └───►│ Native APIs     │   │
│            │ Camera, Location│   │
│            └─────────────────┘   │
└──────────────┬───────────────────┘
               ▼
        ┌──────────────┐
        │   Supabase    │
        │  (Backend)    │
        └──────────────┘`,
    features: [
      'Tab and stack navigation',
      'Authentication flow',
      'Push notifications',
      'Camera and image picker',
      'Offline-first with local storage',
      'Pull-to-refresh lists',
      'Dark/light theme support',
      'Form handling with validation',
      'Splash screen and app icon',
      'OTA updates with Expo'
    ],
    setupSteps: [
      'npx create-expo-app my-app --template tabs',
      'npm install @supabase/supabase-js zustand expo-image-picker expo-camera',
      'Set up Supabase project and configure auth',
      'Create app screens in app/ directory (Expo Router)',
      'Build authentication flow (login/signup)',
      'Add push notification support with expo-notifications',
      'Configure app.json with name, icons, splash screen',
      'Test on device: npx expo start --dev-client',
      'Build with EAS: eas build --platform all',
      'Submit to App Store and Play Store'
    ],
    files: [
      'app/(tabs)/index.tsx — Home tab',
      'app/(tabs)/profile.tsx — Profile tab',
      'app/(tabs)/_layout.tsx — Tab layout',
      'app/(auth)/login.tsx — Login screen',
      'app/(auth)/signup.tsx — Signup screen',
      'app/_layout.tsx — Root layout',
      'lib/supabase.ts — Supabase client',
      'stores/authStore.ts — Auth state',
      'components/Button.tsx — Shared button',
      'app.json — Expo config'
    ]
  },
  {
    id: 'cli-tool',
    name: 'CLI Tool',
    description: 'Command-line interface tool with argument parsing, interactive prompts, progress bars, and colored output. Publishable to npm.',
    difficulty: 'intermediate',
    recommendedStack: { frontend: 'None', backend: 'Node.js', database: 'Local JSON/SQLite', hosting: 'npm registry', apis: [] },
    architecture: `
┌────────────────────────────────────┐
│            CLI Entry Point          │
│         (#!/usr/bin/env node)       │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   Argument Parser           │   │
│  │   (Commander.js)            │   │
│  └─────────┬───────────────────┘   │
│            │                        │
│  ┌─────────▼───────────────────┐   │
│  │   Commands                  │   │
│  │  init | add | list | config │   │
│  └─────────┬───────────────────┘   │
│            │                        │
│  ┌─────────▼───────────────────┐   │
│  │   Services                  │   │
│  │  (Business logic)           │   │
│  └─────────┬───────────────────┘   │
│            │                        │
│  ┌─────────▼───────────────────┐   │
│  │   Output (Chalk + Ora)      │   │
│  │   Colored text, spinners    │   │
│  └─────────────────────────────┘   │
└────────────────────────────────────┘`,
    features: [
      'Subcommands with argument parsing',
      'Interactive prompts (inquirer)',
      'Colored and formatted output',
      'Progress bars and spinners',
      'Configuration file support (~/.toolrc)',
      'Auto-update notifications',
      'Shell completions',
      'Help text generation',
      'Error handling with helpful messages',
      'Publishable to npm'
    ],
    setupSteps: [
      'mkdir my-cli && cd my-cli && npm init -y',
      'npm install commander inquirer chalk ora conf',
      'Create bin/cli.js with shebang (#!/usr/bin/env node)',
      'Add "bin" field to package.json',
      'Implement commands in src/commands/',
      'Add interactive prompts for complex commands',
      'Test locally: npm link',
      'Add --help and --version flags',
      'Write README with usage examples',
      'Publish: npm publish'
    ],
    files: [
      'bin/cli.js — Entry point with shebang',
      'src/commands/init.js — Init command',
      'src/commands/add.js — Add command',
      'src/commands/list.js — List command',
      'src/commands/config.js — Config command',
      'src/services/ — Business logic',
      'src/utils/logger.js — Colored output helper',
      'package.json — With "bin" field',
      'README.md — Usage documentation'
    ]
  },
  {
    id: 'discord-bot',
    name: 'Discord Bot',
    description: 'Feature-rich Discord bot with slash commands, event handling, embeds, button interactions, and database persistence.',
    difficulty: 'intermediate',
    recommendedStack: { frontend: 'None', backend: 'Node.js', database: 'SQLite (better-sqlite3)', hosting: 'Railway', apis: ['Discord API'] },
    architecture: `
┌────────────────────────────────────────┐
│             Discord Bot                 │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │        Discord.js Client          │  │
│  └──────────┬───────────────────────┘  │
│             │                           │
│  ┌──────────▼───────────────────────┐  │
│  │      Event Handler               │  │
│  │  ready | interactionCreate |      │  │
│  │  messageCreate | guildMemberAdd   │  │
│  └──────────┬───────────────────────┘  │
│             │                           │
│  ┌──────────▼───────────────────────┐  │
│  │      Command Handler             │  │
│  │  /ping  /help  /stats  /config    │  │
│  └──────────┬───────────────────────┘  │
│             │                           │
│  ┌──────────▼───────────────────────┐  │
│  │      Database (SQLite)            │  │
│  │  guilds | users | settings        │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘`,
    features: [
      'Slash commands with auto-complete',
      'Button and select menu interactions',
      'Rich embeds with formatting',
      'Role management commands',
      'Welcome messages for new members',
      'Moderation tools (kick, ban, mute)',
      'Custom prefix commands (legacy)',
      'Per-server configuration',
      'Cooldown system',
      'Error handling and logging'
    ],
    setupSteps: [
      'mkdir my-bot && cd my-bot && npm init -y',
      'npm install discord.js better-sqlite3 dotenv',
      'Create Discord application at discord.com/developers',
      'Copy bot token and add to .env',
      'Set up command handler in src/commands/',
      'Set up event handler in src/events/',
      'Register slash commands with Discord API',
      'Initialize SQLite database for server configs',
      'Test locally with your test server',
      'Deploy to Railway with always-on dyno'
    ],
    files: [
      'src/index.js — Bot entry point',
      'src/commands/ping.js — Ping command',
      'src/commands/help.js — Help command',
      'src/commands/stats.js — Server stats',
      'src/commands/config.js — Server config',
      'src/events/ready.js — Bot ready event',
      'src/events/interactionCreate.js — Command handler',
      'src/events/guildMemberAdd.js — Welcome message',
      'src/handlers/commandHandler.js — Load commands',
      'src/database/db.js — SQLite setup',
      'deploy-commands.js — Register slash commands',
      '.env.example — BOT_TOKEN, CLIENT_ID, GUILD_ID'
    ]
  },
  {
    id: 'dashboard',
    name: 'Dashboard / Admin Panel',
    description: 'Data-rich admin dashboard with charts, tables, filters, user management, and real-time updates. Perfect for managing any application.',
    difficulty: 'intermediate',
    recommendedStack: { frontend: 'Next.js', backend: 'Next.js API Routes', database: 'PostgreSQL (via Prisma)', hosting: 'Vercel', apis: [] },
    architecture: `
┌──────────────────────────────────────┐
│          Dashboard Frontend           │
│  ┌────────┐ ┌───────┐ ┌──────────┐  │
│  │ Charts │ │Tables │ │ Filters  │  │
│  │(Recharts│ │(tanstack│ │(search  │  │
│  └────────┘ └───────┘ │ +facets) │  │
│                        └──────────┘  │
│  ┌──────────────────────────────┐    │
│  │     Server Components        │    │
│  │  (Data fetching + streaming) │    │
│  └──────────────┬───────────────┘    │
└─────────────────┼────────────────────┘
                  ▼
           ┌────────────┐
           │   Prisma    │
           │   (ORM)     │
           └──────┬─────┘
                  ▼
           ┌────────────┐
           │ PostgreSQL  │
           └────────────┘`,
    features: [
      'Interactive charts (line, bar, pie, area)',
      'Data tables with sorting, filtering, pagination',
      'User management (create, edit, delete, roles)',
      'Activity log / audit trail',
      'Export data to CSV/JSON',
      'Search with filters and facets',
      'Responsive sidebar navigation',
      'Dark/light theme',
      'Real-time data updates',
      'Role-based page access'
    ],
    setupSteps: [
      'npx create-next-app@latest my-dashboard --typescript --tailwind --app',
      'npm install prisma @prisma/client recharts @tanstack/react-table',
      'npx prisma init — set up schema with User, Activity, Settings models',
      'npx prisma migrate dev — create database tables',
      'Build dashboard layout with sidebar navigation',
      'Create chart components with Recharts',
      'Build data table with TanStack Table',
      'Add user management CRUD pages',
      'Implement role-based middleware',
      'Deploy to Vercel with database on Supabase/Neon'
    ],
    files: [
      'app/(dashboard)/layout.tsx — Dashboard layout with sidebar',
      'app/(dashboard)/page.tsx — Overview with charts',
      'app/(dashboard)/users/page.tsx — User management',
      'app/(dashboard)/activity/page.tsx — Activity log',
      'app/(dashboard)/settings/page.tsx — App settings',
      'components/charts/LineChart.tsx',
      'components/charts/BarChart.tsx',
      'components/DataTable.tsx — Generic data table',
      'components/Sidebar.tsx — Navigation sidebar',
      'prisma/schema.prisma — Database schema',
      'lib/prisma.ts — Prisma client singleton'
    ]
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Two-sided marketplace where users can list items/services and others can browse and purchase. Includes seller dashboards and escrow payments.',
    difficulty: 'advanced',
    recommendedStack: { frontend: 'Next.js', backend: 'Next.js API Routes', database: 'Supabase (PostgreSQL)', hosting: 'Vercel', apis: ['Stripe Connect', 'Cloudflare Images'] },
    architecture: `
┌──────────────────────────────────────────┐
│             Marketplace App               │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Browse  │ │ Seller   │ │  Buyer   │  │
│  │ Catalog │ │Dashboard │ │ Orders   │  │
│  └─────────┘ └──────────┘ └──────────┘  │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│              API Layer                    │
│  listings | orders | reviews | payouts    │
└──────────────────┬───────────────────────┘
          ┌────────┼────────┐
          ▼        ▼        ▼
   ┌──────────┐ ┌──────────┐ ┌──────────┐
   │ Supabase │ │ Stripe   │ │Cloudflare│
   │  (Data)  │ │ Connect  │ │ (Images) │
   └──────────┘ └──────────┘ └──────────┘`,
    features: [
      'Seller onboarding with Stripe Connect',
      'Product/service listings with images',
      'Search with filters (category, price, location)',
      'Shopping cart and checkout',
      'Automated payouts to sellers',
      'Review and rating system',
      'Messaging between buyer and seller',
      'Seller dashboard with analytics',
      'Admin panel for moderation',
      'Category management'
    ],
    setupSteps: [
      'npx create-next-app@latest my-marketplace --typescript --tailwind --app',
      'npm install @supabase/supabase-js stripe @stripe/stripe-js zustand',
      'Set up Stripe Connect for marketplace payments',
      'Create Supabase tables: users, listings, orders, reviews, messages',
      'Build seller onboarding flow with Stripe Connect',
      'Create listing creation form with image upload',
      'Build search and browse pages',
      'Implement checkout with Stripe',
      'Build seller dashboard with sales analytics',
      'Deploy to Vercel'
    ],
    files: [
      'app/page.tsx — Marketplace home',
      'app/browse/page.tsx — Browse listings',
      'app/listing/[id]/page.tsx — Listing detail',
      'app/sell/page.tsx — Create listing',
      'app/sell/dashboard/page.tsx — Seller dashboard',
      'app/orders/page.tsx — Order history',
      'app/api/listings/route.ts — Listing CRUD',
      'app/api/checkout/route.ts — Stripe checkout',
      'app/api/webhooks/stripe/route.ts — Payment webhooks',
      'app/api/connect/route.ts — Stripe Connect onboarding',
      'lib/supabase.ts',
      'lib/stripe.ts'
    ]
  },
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot',
    description: 'Conversational AI chatbot with streaming responses, conversation history, system prompts, and multiple model support. Can be embedded anywhere.',
    difficulty: 'intermediate',
    recommendedStack: { frontend: 'Next.js', backend: 'Next.js API Routes', database: 'Supabase (PostgreSQL)', hosting: 'Vercel', apis: ['OpenAI', 'Anthropic'] },
    architecture: `
┌──────────────────────────────────────┐
│            Chat Frontend              │
│  ┌──────────────────────────────┐    │
│  │    Chat Interface            │    │
│  │  - Message bubbles           │    │
│  │  - Streaming text            │    │
│  │  - Code highlighting         │    │
│  │  - Markdown rendering        │    │
│  └──────────┬───────────────────┘    │
└─────────────┼────────────────────────┘
              │
┌─────────────▼────────────────────────┐
│          API Route                    │
│  - Stream responses (ReadableStream) │
│  - Manage conversation context       │
│  - Rate limiting                     │
└─────────────┬────────────────────────┘
       ┌──────┼──────┐
       ▼      ▼      ▼
  ┌────────┐ ┌────┐ ┌────────┐
  │OpenAI/ │ │ DB │ │ Vector │
  │Claude  │ │    │ │  Store │
  └────────┘ └────┘ └────────┘`,
    features: [
      'Streaming chat responses',
      'Conversation history persistence',
      'Multiple AI model support (GPT-4, Claude)',
      'System prompt customization',
      'Markdown + code block rendering',
      'Conversation branching/forking',
      'Token usage tracking',
      'Rate limiting per user',
      'Embeddable widget mode',
      'RAG support (upload documents)'
    ],
    setupSteps: [
      'npx create-next-app@latest my-chatbot --typescript --tailwind --app',
      'npm install ai openai @anthropic-ai/sdk @supabase/supabase-js',
      'Get API keys from OpenAI and/or Anthropic',
      'Create chat API route with streaming using Vercel AI SDK',
      'Build chat UI with message bubbles and input',
      'Add conversation persistence with Supabase',
      'Implement model selection dropdown',
      'Add system prompt configuration',
      'Build embeddable widget version',
      'Deploy to Vercel'
    ],
    files: [
      'app/page.tsx — Chat interface',
      'app/api/chat/route.ts — Streaming chat endpoint',
      'app/api/conversations/route.ts — Conversation CRUD',
      'components/ChatMessage.tsx — Message bubble',
      'components/ChatInput.tsx — Message input',
      'components/ModelSelector.tsx — Model picker',
      'lib/openai.ts — OpenAI client',
      'lib/anthropic.ts — Anthropic client',
      'lib/supabase.ts — Database client',
      'widget/embed.js — Embeddable chat widget'
    ]
  }
];

// ── STACKS DATABASE ──────────────────────────────────────────────────────────

const STACKS = {
  frontend: [
    { name: 'React', description: 'The most popular UI library. Component-based, massive ecosystem, used by Meta, Netflix, Airbnb.', pros: ['Huge ecosystem and community', 'Tons of jobs and resources', 'React Native for mobile', 'Mature and battle-tested'], cons: ['Not a full framework (need Next.js etc.)', 'JSX learning curve', 'Frequent ecosystem changes', 'Needs additional routing/state libraries'], bestFor: 'Any web app — especially if you want maximum flexibility and job opportunities', difficulty: 'intermediate', links: ['https://react.dev', 'https://nextjs.org'] },
    { name: 'Vue.js', description: 'Progressive framework that is approachable, performant, and versatile. Great documentation.', pros: ['Easiest to learn', 'Excellent documentation', 'Single-file components', 'Built-in state management (Pinia)'], cons: ['Smaller job market than React', 'Fewer third-party libraries', 'Less corporate backing than React'], bestFor: 'Beginners who want a gentle learning curve, or teams that value clean code and good docs', difficulty: 'beginner', links: ['https://vuejs.org', 'https://nuxt.com'] },
    { name: 'Next.js', description: 'The React framework for production. Server-side rendering, API routes, file-based routing, and more — all built in.', pros: ['Full-stack in one framework', 'Server components (fast)', 'Built-in API routes', 'Vercel deployment (seamless)', 'SEO-friendly by default'], cons: ['Vercel-centric ecosystem', 'App Router complexity', 'Heavier than plain React for simple apps'], bestFor: 'Production web apps that need SEO, performance, and full-stack capabilities', difficulty: 'intermediate', links: ['https://nextjs.org'] },
    { name: 'Svelte', description: 'A radical new approach — compiles to vanilla JS at build time. No virtual DOM. Extremely fast and lightweight.', pros: ['Smallest bundle sizes', 'Fastest runtime performance', 'Simple, intuitive syntax', 'Built-in animations/transitions', 'SvelteKit for full-stack'], cons: ['Smaller ecosystem', 'Fewer jobs', 'Less third-party component libraries'], bestFor: 'Performance-critical apps, or developers who want to write less code', difficulty: 'beginner', links: ['https://svelte.dev', 'https://kit.svelte.dev'] },
    { name: 'Vanilla JS', description: 'No framework — just HTML, CSS, and JavaScript. Maximum control, zero dependencies.', pros: ['No build step needed', 'Smallest possible bundle', 'Full control', 'No framework lock-in', 'Great for learning'], cons: ['No component system', 'Manual state management', 'More boilerplate code', 'Harder to scale'], bestFor: 'Simple sites, learning fundamentals, or tiny projects where frameworks are overkill', difficulty: 'beginner', links: ['https://developer.mozilla.org/en-US/docs/Web/JavaScript'] }
  ],
  backend: [
    { name: 'Node.js / Express', description: 'JavaScript on the server. Express is the most popular Node.js web framework — minimal, flexible, huge ecosystem.', pros: ['Same language as frontend (JS)', 'Massive npm ecosystem', 'Fast I/O (event loop)', 'Easy to learn if you know JS', 'Tons of tutorials'], cons: ['Single-threaded (CPU-bound tasks)', 'Callback complexity', 'No built-in structure (flexible = chaotic)'], bestFor: 'JavaScript developers who want a unified stack, REST APIs, real-time apps', difficulty: 'beginner', links: ['https://expressjs.com', 'https://nodejs.org'] },
    { name: 'Python / FastAPI', description: 'Modern, fast Python web framework based on type hints. Auto-generates API docs. Async support built in.', pros: ['Auto-generated API documentation', 'Type validation built in', 'Async support', 'Python ecosystem (ML, data)', 'Very readable code'], cons: ['Slower than Node/Go for I/O', 'Python deployment can be tricky', 'Smaller web community than Node'], bestFor: 'APIs that need auto-docs, Python shops, ML/AI backends, data-heavy applications', difficulty: 'intermediate', links: ['https://fastapi.tiangolo.com'] },
    { name: 'Go', description: 'Compiled, statically typed language by Google. Exceptional performance, built-in concurrency, and tiny binaries.', pros: ['Extremely fast', 'Built-in concurrency (goroutines)', 'Single binary deployment', 'Strong standard library', 'Great for microservices'], cons: ['Steeper learning curve', 'Verbose error handling', 'Less web ecosystem than Node/Python', 'No generics until recently'], bestFor: 'High-performance APIs, microservices, CLI tools, infrastructure software', difficulty: 'advanced', links: ['https://go.dev', 'https://gin-gonic.com'] },
    { name: 'Ruby on Rails', description: 'Full-stack web framework that prioritizes developer happiness and convention over configuration.', pros: ['Fastest prototyping speed', 'Convention over configuration', 'Incredible developer experience', 'Mature ecosystem (gems)', 'Great for MVPs'], cons: ['Slower performance', 'Declining job market', 'Monolithic by default', 'Ruby is less popular now'], bestFor: 'Rapid prototyping, MVPs, startups that need to ship fast', difficulty: 'intermediate', links: ['https://rubyonrails.org'] }
  ],
  database: [
    { name: 'PostgreSQL', description: 'The most advanced open-source relational database. Rock-solid, feature-rich, handles everything from small apps to enterprise.', pros: ['Most feature-rich SQL database', 'JSONB for semi-structured data', 'Full-text search built in', 'Excellent performance', 'Free and open source'], cons: ['More complex setup than SQLite', 'Needs a server/service', 'Can be overkill for tiny projects'], bestFor: 'Any production application that needs reliable, structured data storage', difficulty: 'intermediate', links: ['https://postgresql.org', 'https://neon.tech', 'https://supabase.com'] },
    { name: 'MongoDB', description: 'Document database that stores data as flexible JSON-like documents. Good for unstructured or rapidly changing schemas.', pros: ['Flexible schema (no migrations)', 'Natural JSON storage', 'Horizontal scaling', 'Atlas cloud hosting is easy', 'Good for prototyping'], cons: ['No joins (denormalization needed)', 'Data consistency challenges', 'Can lead to messy data models', 'Overused where SQL would be better'], bestFor: 'Content management, IoT data, prototypes with changing requirements, document storage', difficulty: 'beginner', links: ['https://mongodb.com', 'https://mongodb.com/atlas'] },
    { name: 'SQLite', description: 'Self-contained, serverless, zero-configuration SQL database. A single file IS the database.', pros: ['Zero setup — just a file', 'Perfect for development', 'Incredibly fast for reads', 'No server needed', 'Works everywhere'], cons: ['Not great for concurrent writes', 'No network access (local only)', 'Limited to ~1TB practically'], bestFor: 'Mobile apps, CLI tools, embedded systems, prototypes, development databases', difficulty: 'beginner', links: ['https://sqlite.org', 'https://turso.tech'] },
    { name: 'Supabase', description: 'Open-source Firebase alternative built on PostgreSQL. Gives you a database, auth, storage, and real-time subscriptions.', pros: ['PostgreSQL underneath (powerful)', 'Built-in auth and storage', 'Real-time subscriptions', 'Auto-generated REST API', 'Generous free tier'], cons: ['Vendor lock-in risk', 'Less flexibility than raw PostgreSQL', 'Can get expensive at scale'], bestFor: 'Full-stack apps that need auth + database + storage in one place — great for solo developers', difficulty: 'beginner', links: ['https://supabase.com'] },
    { name: 'Firebase', description: 'Google\'s app development platform with real-time database, auth, hosting, and more. Fully managed, no server needed.', pros: ['Real-time by default', 'Auth, storage, hosting included', 'Great for mobile apps', 'Serverless (no backend needed)', 'Google scale'], cons: ['NoSQL only (Firestore)', 'Vendor lock-in (Google)', 'Pricing can spike unexpectedly', 'Complex security rules'], bestFor: 'Mobile apps, real-time apps, prototypes that need to ship fast with zero backend', difficulty: 'beginner', links: ['https://firebase.google.com'] }
  ],
  hosting: [
    { name: 'Vercel', description: 'The platform built for Next.js. Deploy frontend and serverless functions with zero configuration.', pros: ['Best Next.js experience', 'Automatic deployments from Git', 'Edge functions globally', 'Preview deployments per PR', 'Generous free tier'], cons: ['Serverless limitations (cold starts)', 'Expensive at scale', 'Best with Next.js (less ideal for others)'], bestFor: 'Next.js apps, JAMstack sites, frontend-heavy applications', difficulty: 'beginner', links: ['https://vercel.com'] },
    { name: 'Railway', description: 'Deploy anything — Node, Python, Go, Docker, databases. Simple pricing, great DX, built-in databases.', pros: ['Deploy anything (any language)', 'Built-in PostgreSQL, Redis, MongoDB', 'Simple pricing ($5/mo)', 'Great CLI and dashboard', 'Docker support'], cons: ['Newer platform (less mature)', 'No free tier anymore', 'Limited regions'], bestFor: 'Backend services, APIs, databases, Docker containers, full-stack apps', difficulty: 'beginner', links: ['https://railway.app'] },
    { name: 'Fly.io', description: 'Deploy app servers close to your users globally. Full Linux VMs, not just serverless.', pros: ['Global edge deployment', 'Full VM (not just serverless)', 'Built-in PostgreSQL', 'Docker-native', 'Great for real-time apps'], cons: ['Steeper learning curve', 'CLI-heavy workflow', 'Pricing can be confusing'], bestFor: 'Apps that need global distribution, WebSocket servers, traditional server apps', difficulty: 'intermediate', links: ['https://fly.io'] },
    { name: 'AWS', description: 'The largest cloud platform. Everything you could ever need, but complex to set up.', pros: ['Every service imaginable', 'Best for enterprise', 'Global infrastructure', 'Free tier for 12 months', 'Industry standard'], cons: ['Extremely complex', 'Billing surprises', 'Steep learning curve', 'Over-engineered for small projects'], bestFor: 'Enterprise applications, complex architectures, when you need specific AWS services', difficulty: 'advanced', links: ['https://aws.amazon.com'] },
    { name: 'DigitalOcean', description: 'Simple cloud infrastructure with predictable pricing. Virtual machines, managed databases, and app platform.', pros: ['Simple and predictable pricing', 'Great documentation', 'Managed databases', 'App Platform for easy deploys', 'Good for learning ops'], cons: ['Fewer services than AWS', 'Less enterprise features', 'Smaller global presence'], bestFor: 'Developers who want simple VPS hosting, learning DevOps, budget-friendly cloud', difficulty: 'intermediate', links: ['https://digitalocean.com'] }
  ],
  auth: [
    { name: 'Clerk', description: 'Drop-in authentication with beautiful pre-built components. User management dashboard included.', pros: ['Beautiful pre-built UI', 'User management dashboard', 'Social logins built in', 'Webhooks for sync', 'React/Next.js components'], cons: ['Expensive at scale', 'Vendor lock-in', 'Less customizable UI'], bestFor: 'Next.js apps that want auth done in minutes with zero custom UI', difficulty: 'beginner', links: ['https://clerk.com'] },
    { name: 'Auth0', description: 'Enterprise-grade identity platform. Handles every auth scenario — social, enterprise SSO, MFA, passwordless.', pros: ['Every auth method supported', 'Enterprise SSO (SAML, OIDC)', 'MFA built in', 'Extensive documentation', 'Free for 7,500 MAU'], cons: ['Complex configuration', 'Expensive at scale', 'Steep learning curve', 'Over-engineered for simple apps'], bestFor: 'Enterprise apps, apps needing SSO/SAML, complex auth requirements', difficulty: 'advanced', links: ['https://auth0.com'] },
    { name: 'Supabase Auth', description: 'Built into Supabase. Email/password, magic links, social logins, and row-level security integration.', pros: ['Free with Supabase', 'RLS integration (security)', 'Social logins', 'Magic links', 'Simple API'], cons: ['Tied to Supabase ecosystem', 'Less features than Auth0', 'No enterprise SSO'], bestFor: 'Apps already using Supabase — get auth for free with tight database integration', difficulty: 'beginner', links: ['https://supabase.com/auth'] },
    { name: 'NextAuth.js', description: 'Open-source authentication for Next.js. Self-hosted, fully customizable, supports dozens of providers.', pros: ['Free and open source', 'Self-hosted (no vendor lock-in)', 'Dozens of OAuth providers', 'Database adapters', 'Full customization'], cons: ['More setup required', 'You manage the infrastructure', 'Breaking changes between versions', 'Documentation gaps'], bestFor: 'Next.js apps where you want full control over auth and no vendor dependencies', difficulty: 'intermediate', links: ['https://next-auth.js.org'] }
  ]
};

// ── INTEGRATIONS ─────────────────────────────────────────────────────────────

const INTEGRATIONS = [
  {
    id: 'stripe',
    name: 'Stripe Payments',
    description: 'Accept payments with Stripe Checkout. Supports one-time payments and subscriptions.',
    category: 'payments',
    setupSteps: [
      'Create Stripe account at stripe.com',
      'Install the Stripe SDK: npm install stripe',
      'Copy your secret key from the Stripe Dashboard',
      'Add STRIPE_SECRET_KEY to your .env file',
      'Create a Checkout Session on your server',
      'Redirect the user to the Checkout URL',
      'Set up a webhook to handle payment events',
      'Test with Stripe test card: 4242 4242 4242 4242'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'Create Checkout Session (Node.js)',
        code: `const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// One-time payment
app.post('/api/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'My Product' },
        unit_amount: 2000, // $20.00
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://yoursite.com/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://yoursite.com/cancel',
  });
  res.json({ url: session.url });
});`
      },
      {
        language: 'javascript',
        label: 'Handle Webhook Events',
        code: `const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send('Webhook Error: ' + err.message);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // Fulfill the purchase — grant access, send email, etc.
      console.log('Payment successful:', session.id);
      break;
    case 'invoice.paid':
      // Subscription renewed
      break;
    case 'customer.subscription.deleted':
      // Subscription cancelled — revoke access
      break;
  }
  res.json({ received: true });
});`
      }
    ],
    envVars: ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'STRIPE_PUBLISHABLE_KEY'],
    links: ['https://stripe.com/docs', 'https://stripe.com/docs/checkout/quickstart', 'https://stripe.com/docs/webhooks']
  },
  {
    id: 'openai',
    name: 'OpenAI / ChatGPT API',
    description: 'Add AI-powered text generation, chat, embeddings, and image generation to your app.',
    category: 'ai',
    setupSteps: [
      'Create account at platform.openai.com',
      'Generate API key in Settings → API Keys',
      'Install SDK: npm install openai',
      'Add OPENAI_API_KEY to .env',
      'Create a chat completion request',
      'Handle streaming responses for real-time output',
      'Set up token usage monitoring'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'Chat Completion (Node.js)',
        code: `const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      ...messages
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });

  res.json({
    reply: completion.choices[0].message.content,
    usage: completion.usage,
  });
});`
      },
      {
        language: 'javascript',
        label: 'Streaming Response',
        code: `app.post('/api/chat/stream', async (req, res) => {
  const { messages } = req.body;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) {
      res.write('data: ' + JSON.stringify({ content }) + '\\n\\n');
    }
  }
  res.write('data: [DONE]\\n\\n');
  res.end();
});`
      }
    ],
    envVars: ['OPENAI_API_KEY'],
    links: ['https://platform.openai.com/docs', 'https://platform.openai.com/docs/api-reference/chat']
  },
  {
    id: 'claude',
    name: 'Anthropic Claude API',
    description: 'Integrate Claude AI for intelligent conversations, analysis, and content generation with advanced reasoning.',
    category: 'ai',
    setupSteps: [
      'Create account at console.anthropic.com',
      'Generate API key',
      'Install SDK: npm install @anthropic-ai/sdk',
      'Add ANTHROPIC_API_KEY to .env',
      'Create a message request',
      'Handle streaming for real-time responses'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'Claude Message (Node.js)',
        code: `const Anthropic = require('@anthropic-ai/sdk');
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: 'You are a helpful assistant.',
    messages: messages,
  });

  res.json({ reply: message.content[0].text });
});`
      }
    ],
    envVars: ['ANTHROPIC_API_KEY'],
    links: ['https://docs.anthropic.com', 'https://docs.anthropic.com/claude/reference/messages_post']
  },
  {
    id: 'twilio',
    name: 'Twilio SMS',
    description: 'Send and receive SMS messages programmatically. Perfect for notifications, 2FA, and alerts.',
    category: 'messaging',
    setupSteps: [
      'Create Twilio account at twilio.com',
      'Get a phone number from the Twilio console',
      'Copy Account SID and Auth Token',
      'Install SDK: npm install twilio',
      'Send your first SMS',
      'Set up webhook for incoming messages'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'Send SMS (Node.js)',
        code: `const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/api/send-sms', async (req, res) => {
  const { to, body } = req.body;

  const message = await client.messages.create({
    body: body,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: to, // '+1234567890'
  });

  res.json({ sid: message.sid, status: message.status });
});`
      }
    ],
    envVars: ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_PHONE_NUMBER'],
    links: ['https://www.twilio.com/docs/sms', 'https://www.twilio.com/docs/sms/quickstart/node']
  },
  {
    id: 'sendgrid',
    name: 'SendGrid Email',
    description: 'Send transactional and marketing emails at scale. Templates, analytics, and deliverability tools.',
    category: 'email',
    setupSteps: [
      'Create SendGrid account at sendgrid.com',
      'Verify sender email or domain',
      'Create API key with Mail Send permission',
      'Install SDK: npm install @sendgrid/mail',
      'Send your first email',
      'Create email templates in the dashboard'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'Send Email (Node.js)',
        code: `const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/send-email', async (req, res) => {
  const { to, subject, html } = req.body;

  await sgMail.send({
    to: to,
    from: 'you@yourdomain.com', // Verified sender
    subject: subject,
    html: html,
  });

  res.json({ success: true });
});`
      }
    ],
    envVars: ['SENDGRID_API_KEY'],
    links: ['https://docs.sendgrid.com', 'https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs']
  },
  {
    id: 'resend',
    name: 'Resend Email',
    description: 'Modern email API built for developers. Simple API, React Email templates, great deliverability.',
    category: 'email',
    setupSteps: [
      'Create account at resend.com',
      'Add and verify your domain',
      'Create API key',
      'Install SDK: npm install resend',
      'Send your first email'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'Send Email (Node.js)',
        code: `const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/send-email', async (req, res) => {
  const { to, subject, html } = req.body;

  const { data, error } = await resend.emails.send({
    from: 'Your App <hello@yourdomain.com>',
    to: [to],
    subject: subject,
    html: html,
  });

  if (error) return res.status(400).json({ error });
  res.json({ id: data.id });
});`
      }
    ],
    envVars: ['RESEND_API_KEY'],
    links: ['https://resend.com/docs', 'https://resend.com/docs/send-with-nodejs']
  },
  {
    id: 'aws-s3',
    name: 'AWS S3 File Storage',
    description: 'Store and serve files (images, documents, backups) with Amazon S3. Scalable, durable, and cost-effective.',
    category: 'storage',
    setupSteps: [
      'Create AWS account',
      'Create S3 bucket in AWS Console',
      'Create IAM user with S3 permissions',
      'Install SDK: npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner',
      'Configure bucket CORS for browser uploads',
      'Generate presigned URLs for secure uploads'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'Upload File to S3',
        code: `const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Generate presigned upload URL (for browser uploads)
app.post('/api/upload-url', async (req, res) => {
  const { filename, contentType } = req.body;
  const key = 'uploads/' + Date.now() + '-' + filename;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  res.json({ uploadUrl: url, key });
});`
      }
    ],
    envVars: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'S3_BUCKET'],
    links: ['https://docs.aws.amazon.com/s3/', 'https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/']
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare (DNS + CDN)',
    description: 'CDN, DDoS protection, DNS management, and edge computing. Free tier covers most needs.',
    category: 'infrastructure',
    setupSteps: [
      'Create Cloudflare account',
      'Add your domain and update nameservers',
      'Enable SSL/TLS (Full Strict)',
      'Set up page rules or redirect rules',
      'Install Wrangler CLI for Workers: npm install -g wrangler',
      'Create API token for programmatic access'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'Cloudflare Worker (Edge Function)',
        code: `// wrangler.toml: name = "my-worker"
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Simple API gateway / proxy
    if (url.pathname.startsWith('/api/')) {
      const response = await fetch('https://your-backend.com' + url.pathname, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
      return response;
    }

    return new Response('Hello from the edge!', {
      headers: { 'content-type': 'text/plain' },
    });
  },
};`
      }
    ],
    envVars: ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ZONE_ID'],
    links: ['https://developers.cloudflare.com', 'https://developers.cloudflare.com/workers/']
  },
  {
    id: 'google-oauth',
    name: 'Google OAuth',
    description: 'Let users sign in with their Google account. The most popular social login provider.',
    category: 'auth',
    setupSteps: [
      'Go to console.cloud.google.com',
      'Create a new project',
      'Enable "Google+ API" or "People API"',
      'Go to Credentials → Create OAuth 2.0 Client ID',
      'Set authorized redirect URIs',
      'Install passport-google-oauth20 or use your auth library',
      'Handle the OAuth callback and create user session'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'Google OAuth with Passport.js',
        code: `const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    // Find or create user in your database
    let user = await db.users.findByGoogleId(profile.id);
    if (!user) {
      user = await db.users.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0].value,
      });
    }
    return done(null, user);
  }
));

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/dashboard')
);`
      }
    ],
    envVars: ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
    links: ['https://developers.google.com/identity/protocols/oauth2', 'https://www.passportjs.org/packages/passport-google-oauth20/']
  },
  {
    id: 'github-api',
    name: 'GitHub API',
    description: 'Access GitHub repositories, issues, pull requests, and user data. Build developer tools and integrations.',
    category: 'developer',
    setupSteps: [
      'Create a GitHub Personal Access Token (Settings → Developer Settings)',
      'Or create a GitHub App for OAuth',
      'Install Octokit: npm install @octokit/rest',
      'Authenticate with your token',
      'Make API requests to repos, issues, PRs'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'GitHub API with Octokit',
        code: `const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// List repositories
app.get('/api/repos', async (req, res) => {
  const { data } = await octokit.repos.listForAuthenticatedUser({
    sort: 'updated',
    per_page: 10,
  });
  res.json(data.map(r => ({
    name: r.name,
    url: r.html_url,
    description: r.description,
    stars: r.stargazers_count,
    language: r.language,
  })));
});

// Create an issue
app.post('/api/repos/:owner/:repo/issues', async (req, res) => {
  const { title, body, labels } = req.body;
  const { data } = await octokit.issues.create({
    owner: req.params.owner,
    repo: req.params.repo,
    title, body, labels,
  });
  res.json({ number: data.number, url: data.html_url });
});`
      }
    ],
    envVars: ['GITHUB_TOKEN'],
    links: ['https://docs.github.com/en/rest', 'https://github.com/octokit/rest.js']
  },
  {
    id: 'slack-webhooks',
    name: 'Slack Webhooks',
    description: 'Send notifications and messages to Slack channels. Perfect for alerts, deploy notifications, and monitoring.',
    category: 'messaging',
    setupSteps: [
      'Go to api.slack.com/apps and create an app',
      'Enable Incoming Webhooks',
      'Add webhook to a channel',
      'Copy the webhook URL',
      'Send a POST request with your message'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'Send Slack Notification',
        code: `const fetch = require('node-fetch');

async function sendSlackNotification(text, blocks) {
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text, // Fallback text
      blocks: blocks || [
        {
          type: 'section',
          text: { type: 'mrkdwn', text: text }
        }
      ],
    }),
  });
}

// Example: Deploy notification
app.post('/api/deploy-notify', async (req, res) => {
  await sendSlackNotification(
    ':rocket: *Deploy successful!*\\nVersion 1.2.3 deployed to production.',
    [{
      type: 'section',
      text: { type: 'mrkdwn', text: ':rocket: *Deploy successful!*' }
    }, {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: '*Version:*\\n1.2.3' },
        { type: 'mrkdwn', text: '*Environment:*\\nProduction' },
      ]
    }]
  );
  res.json({ sent: true });
});`
      }
    ],
    envVars: ['SLACK_WEBHOOK_URL'],
    links: ['https://api.slack.com/messaging/webhooks', 'https://api.slack.com/block-kit']
  },
  {
    id: 'notion-api',
    name: 'Notion API',
    description: 'Read and write Notion pages and databases. Build integrations that sync data with Notion workspaces.',
    category: 'productivity',
    setupSteps: [
      'Go to notion.so/my-integrations and create integration',
      'Copy the Internal Integration Token',
      'Share your Notion database/page with the integration',
      'Install SDK: npm install @notionhq/client',
      'Query databases and create pages'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'Query Notion Database',
        code: `const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_TOKEN });

app.get('/api/notion/tasks', async (req, res) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: 'Status',
      select: { equals: 'In Progress' },
    },
    sorts: [{ property: 'Created', direction: 'descending' }],
  });

  const tasks = response.results.map(page => ({
    id: page.id,
    title: page.properties.Name.title[0]?.plain_text,
    status: page.properties.Status.select?.name,
    assignee: page.properties.Assignee.people[0]?.name,
  }));

  res.json(tasks);
});`
      }
    ],
    envVars: ['NOTION_TOKEN', 'NOTION_DATABASE_ID'],
    links: ['https://developers.notion.com', 'https://developers.notion.com/docs/getting-started']
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Open-source Firebase alternative. PostgreSQL database, authentication, storage, and real-time subscriptions in one platform.',
    category: 'backend',
    setupSteps: [
      'Create project at supabase.com',
      'Copy project URL and anon key from Settings → API',
      'Install SDK: npm install @supabase/supabase-js',
      'Create tables in the Table Editor or with SQL',
      'Enable Row Level Security (RLS) policies',
      'Use the client to query data'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'Supabase Client Setup + CRUD',
        code: `const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Read
const { data: posts } = await supabase
  .from('posts')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(10);

// Create
const { data, error } = await supabase
  .from('posts')
  .insert({ title: 'Hello', content: 'World', author_id: userId })
  .select()
  .single();

// Update
await supabase.from('posts').update({ title: 'Updated' }).eq('id', postId);

// Delete
await supabase.from('posts').delete().eq('id', postId);

// Auth
const { data: { user } } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
});`
      }
    ],
    envVars: ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'],
    links: ['https://supabase.com/docs', 'https://supabase.com/docs/reference/javascript']
  },
  {
    id: 'firebase',
    name: 'Firebase',
    description: 'Google\'s app platform with Firestore database, authentication, cloud functions, and hosting.',
    category: 'backend',
    setupSteps: [
      'Create project at console.firebase.google.com',
      'Enable Firestore Database',
      'Enable Authentication providers you need',
      'Install SDK: npm install firebase firebase-admin',
      'Initialize Firebase in your app',
      'Set up security rules for Firestore'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'Firebase Firestore CRUD',
        code: `const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, query, where, orderBy } = require('firebase/firestore');

const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = getFirestore(app);

// Create document
const docRef = await addDoc(collection(db, 'posts'), {
  title: 'Hello Firebase',
  content: 'This is a post',
  createdAt: new Date(),
});

// Query documents
const q = query(
  collection(db, 'posts'),
  where('author', '==', userId),
  orderBy('createdAt', 'desc')
);
const snapshot = await getDocs(q);
const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));`
      }
    ],
    envVars: ['FIREBASE_API_KEY', 'FIREBASE_AUTH_DOMAIN', 'FIREBASE_PROJECT_ID'],
    links: ['https://firebase.google.com/docs', 'https://firebase.google.com/docs/firestore']
  },
  {
    id: 'upstash-redis',
    name: 'Upstash Redis',
    description: 'Serverless Redis with REST API. Perfect for caching, rate limiting, sessions, and real-time leaderboards.',
    category: 'database',
    setupSteps: [
      'Create account at upstash.com',
      'Create a Redis database',
      'Copy REST URL and token',
      'Install SDK: npm install @upstash/redis',
      'Use for caching, rate limiting, or sessions'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'Upstash Redis Caching + Rate Limiting',
        code: `const { Redis } = require('@upstash/redis');
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Simple caching
async function getCached(key, fetchFn, ttl = 3600) {
  const cached = await redis.get(key);
  if (cached) return cached;
  const fresh = await fetchFn();
  await redis.set(key, JSON.stringify(fresh), { ex: ttl });
  return fresh;
}

// Rate limiting
async function rateLimit(ip, limit = 10, window = 60) {
  const key = 'rate:' + ip;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, window);
  return count <= limit;
}`
      }
    ],
    envVars: ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
    links: ['https://upstash.com/docs/redis', 'https://upstash.com/docs/redis/sdks/ts/overview']
  },
  {
    id: 'vercel-deploy',
    name: 'Vercel Deploy',
    description: 'Deploy your app to Vercel with zero configuration. Automatic deployments from Git, preview URLs, and edge functions.',
    category: 'deployment',
    setupSteps: [
      'Install Vercel CLI: npm install -g vercel',
      'Run vercel login to authenticate',
      'Run vercel in your project directory',
      'Or connect your GitHub repo at vercel.com/new',
      'Configure environment variables in the dashboard',
      'Set up custom domain'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        label: 'vercel.json Configuration',
        code: `// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "DATABASE_URL": "@database-url",
    "API_KEY": "@api-key"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "s-maxage=60, stale-while-revalidate" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" }
  ]
}`
      },
      {
        language: 'bash',
        label: 'Deploy Commands',
        code: `# First deploy
vercel

# Deploy to production
vercel --prod

# Set environment variable
vercel env add DATABASE_URL production

# View deployments
vercel ls

# View logs
vercel logs your-app.vercel.app`
      }
    ],
    envVars: ['VERCEL_TOKEN'],
    links: ['https://vercel.com/docs', 'https://vercel.com/docs/cli']
  }
];

// ── PROJECTS CRUD ────────────────────────────────────────────────────────────

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await readJSON('projects.json');
    res.json(projects);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/projects', async (req, res) => {
  try {
    const projects = await readJSON('projects.json');
    const project = {
      id: uid(),
      name: req.body.name || 'Untitled Project',
      description: req.body.description || '',
      status: req.body.status || 'idea',
      stack: req.body.stack || { frontend: '', backend: '', database: '', hosting: '', apis: [] },
      architecture: req.body.architecture || '',
      features: req.body.features || [],
      milestones: req.body.milestones || [],
      notes: req.body.notes || '',
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
    const projects = await readJSON('projects.json');
    const idx = projects.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    projects[idx] = { ...projects[idx], ...req.body, updatedAt: new Date().toISOString() };
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
    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) return res.status(404).json({ error: 'Template not found' });

    const projects = await readJSON('projects.json');
    const project = {
      id: uid(),
      name: name || template.name,
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
    const guides = await readJSON('guides.json');
    const guide = {
      id: uid(),
      title: req.body.title || 'Untitled Guide',
      content: req.body.content || '',
      category: req.body.category || 'architecture',
      projectId: req.body.projectId || null,
      tags: req.body.tags || [],
      createdAt: new Date().toISOString()
    };
    guides.push(guide);
    await writeJSON('guides.json', guides);
    res.json(guide);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/guides/:id', async (req, res) => {
  try {
    const guides = await readJSON('guides.json');
    const idx = guides.findIndex(g => g.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    guides[idx] = { ...guides[idx], ...req.body };
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
    const config = await readJSON('config.json', {});
    const updated = { ...config, ...req.body };
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
