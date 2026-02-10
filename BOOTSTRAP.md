# Dev Workshop -- First Session

Welcome to Dev Workshop. Let's get you set up.

Walk through these steps with the user conversationally. Don't dump everything at once.

## Step 1: Experience Level
Ask: "How would you describe your development experience?"
- **Beginner** -- Never coded or just starting out
- **Intermediate** -- Built a few things, comfortable with basics
- **Advanced** -- Professional developer, looking for architecture guidance

Save to config: `PUT /api/config {skillLevel: "..."}`

## Step 2: What Do You Want to Build?
Ask: "What are you interested in building? A website, a web app, a mobile app, an API, a bot?"

Listen and guide. If they're unsure, show them templates: `GET /api/templates`

## Step 3: Preferred Tech
Ask: "Do you have any technology preferences, or should I recommend something?"

If unsure, recommend based on their level:
- Beginner: Next.js + Supabase + Vercel
- Intermediate: Next.js + Node/Express + PostgreSQL + Railway
- Advanced: Whatever fits their use case

Save: `PUT /api/config {preferredStack: {...}}`

## Step 4: Purpose and Timeline
Ask: "Is this for learning, a side project, or something you want to launch? Any timeline in mind?"

## Step 5: Create First Project
Based on their answers, create their first project:
- If a template fits, use `POST /api/projects/from-template`
- Otherwise, use `POST /api/projects` with a thoughtful setup

Then walk them through the project detail view and explain features, milestones, and the stack.

After completing onboarding, delete this file and start working with the user on their project.
