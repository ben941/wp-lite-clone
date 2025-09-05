# WP Lite - Modern CMS for Accounting Professionals

A modern, performance-first content management system built with React, TypeScript, and Supabase.

## Features

- 🚀 **Performance First**: Built with Vite and optimized for speed
- 📝 **Content Management**: Full-featured blog and content management system
- 🔐 **Authentication**: Secure user authentication with Supabase Auth
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS and shadcn/ui
- 📱 **Mobile Responsive**: Works perfectly on all devices
- 🔍 **SEO Optimized**: Built-in SEO optimization and meta tag management
- 🤖 **AI Integration**: Optional AI-powered content and image generation

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd wp-lite
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API in your Supabase dashboard
3. Copy your project URL and anon key
4. Update the environment variables (see step 3)

### 3. Configure Environment Variables

Copy the example environment file and update it with your credentials:

```bash
cp .env.example .env
```

Then edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Set Up Database Schema

Run the database migrations to set up your tables:

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Initialize Supabase in your project
supabase init

# Link to your remote project
supabase link --project-ref your-project-id

# Push the database schema
supabase db push
```

Alternatively, you can run the SQL migrations manually in your Supabase dashboard:
1. Go to the SQL Editor in your Supabase dashboard
2. Copy and run the contents of `supabase/migrations/20250903034635_78f59607-0f76-488c-8fca-ccfe21d30a13.sql`
3. Copy and run the contents of `supabase/migrations/20250903054125_2d6166b7-63f8-4249-a7cd-9148adb405ba.sql`

### 5. Start Development Server

```bash
npm run dev
```

Your application will be available at `http://localhost:8080`

## Optional: AI Features Setup

To enable AI-powered content and image generation:

1. Get an OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys)
2. Add it to your Supabase project's Edge Functions secrets:
   ```bash
   supabase secrets set OPENAI_API_KEY=your-openai-api-key-here
   ```
3. Deploy the Edge Functions:
   ```bash
   supabase functions deploy generate-blog-content
   supabase functions deploy generate-blog-image
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin dashboard components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── sections/       # Page sections (Hero, Features, etc.)
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations
│   └── supabase/       # Supabase client and types
├── pages/              # Page components
├── utils/              # Utility functions
└── lib/                # Library code

supabase/
├── functions/          # Edge Functions
├── migrations/         # Database migrations
└── config.toml         # Supabase configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

This project can be deployed to any static hosting service like Vercel, Netlify, or Bolt Hosting.

### Environment Variables for Production

Make sure to set these environment variables in your hosting platform:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.