# Hamza Rizvi — Software Engineer & AI/ML Developer Portfolio

A high-performance personal developer portfolio built for **Hamza Rizvi**, showcasing full-stack applications, AI/ML systems, robotics/embedded engineering, and UX research.

Live URL: [hamzarizvi.dev](https://hamzarizvi.dev) (or your Vercel deployment domain)

---

## ⚡ Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom design system tokens
- **Animations**: [Motion](https://motion.dev/) (hardware-accelerated GPU transitions, scroll reveals, stagger variants)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/) with reduced-motion awareness
- **Typography & Icons**: Inter + JetBrains Mono via `next/font/google`, Lucide Icons
- **SEO & Discoverability**:
  - Dynamic `sitemap.xml` & `robots.txt`
  - JSON-LD Structured Data (`Person`, `WebSite`, `ProfilePage`, `ItemList`)
  - OpenGraph & Twitter Cards
  - PWA Web App Manifest (`manifest.webmanifest`)
  - Strict security headers (`CSP`, `HSTS`, `X-Frame-Options`, `Permissions-Policy`)
- **Hosting & CI/CD**: [Vercel](https://vercel.com/) with GitHub automatic deployment on `main` branch push

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or newer
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Hazmat-ai/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Building for Production

```bash
# Type check and production build
npm run build

# Preview production build locally
npm run start
```

---

## 🌐 Deploying to Vercel (Continuous Deployment)

### 1. Push to GitHub
```bash
# Stage and commit changes
git add .
git commit -m "feat: complete production portfolio"

# Push to your GitHub repository
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git branch -M main
git push -u origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
2. Click **Add New...** > **Project**.
3. Import your `Portfolio` repository.
4. Next.js preset will be automatically detected:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. *(Optional)* Add Environment Variables:
   - `NEXT_PUBLIC_SITE_URL`: `https://hamzarizvi.dev` (or your custom domain)
6. Click **Deploy**.

Every subsequent push to `main` will trigger a zero-downtime automated deployment on Vercel with preview environments on pull requests.

---

## 📁 Project Structure

```
├── public/                 # Static assets & icons
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout, fonts, metadata, JSON-LD
│   │   ├── page.tsx        # Homepage assembling all sections
│   │   ├── globals.css     # Design system, glassmorphism, scanlines
│   │   ├── sitemap.ts      # Dynamic sitemap generation
│   │   ├── robots.ts       # Robots indexing rules
│   │   ├── manifest.ts     # PWA manifest
│   │   └── projects/[slug] # Dynamic static project detail pages
│   ├── components/
│   │   ├── animations/     # FadeIn, StaggerContainer, SmoothScrollProvider
│   │   ├── layout/         # Navigation, Footer
│   │   ├── sections/       # Hero, About, Projects, Experience, Skills, Education, Contact
│   │   └── ui/             # Reusable UI icons & badges
│   └── data/               # Structured data sources
│       ├── projects.ts     # 12 detailed case studies
│       ├── experience.ts   # Work history and leadership roles
│       └── skills.ts       # Categorized skills and certifications
├── next.config.ts          # Security headers and optimization
├── tsconfig.json           # Strict TypeScript configuration
└── package.json            # Project dependencies and scripts
```

---

## 🛡️ License

MIT License. Designed and developed by Hamza Rizvi.
