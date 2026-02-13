module.exports = [
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