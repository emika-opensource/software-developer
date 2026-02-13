module.exports = [
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