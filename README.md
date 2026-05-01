# NexaStudio — Digital Agency Website

A modern, dark-themed digital agency portfolio website built with **React + Vite**. Features Three.js WebGL backgrounds, smooth scroll animations, live project previews, and a fully responsive layout.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 6 |
| 3D / WebGL | Three.js |
| Icons | Lucide React |
| Styling | Pure CSS (custom properties) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
nexa-react/
├── public/                  # Static assets
├── src/
│   ├── components/          # All UI components
│   │   ├── Navbar.jsx
│   │   ├── MobileMenu.jsx
│   │   ├── Hero.jsx         # Three.js WebGL hero
│   │   ├── Marquee.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx     # Three.js torus background
│   │   ├── Work.jsx         # Portfolio grid + filter tabs
│   │   ├── ProjectModal.jsx # Full project case study modal
│   │   ├── Process.jsx
│   │   ├── Team.jsx
│   │   ├── Testimonials.jsx
│   │   ├── CTABanner.jsx    # Three.js star field
│   │   ├── TabPreview.jsx   # Live URL iframe previewer
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Cursor.jsx
│   │   ├── Loader.jsx
│   │   └── ThemeFAB.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useTheme.js
│   │   ├── useMobileMenu.js
│   │   ├── useScrollReveal.js
│   │   ├── useCounters.js
│   │   ├── useMagneticButtons.js
│   │   ├── useNavScroll.js
│   │   └── useHeroParallax.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            # All styles (CSS custom properties)
├── index.html
├── vite.config.js
└── package.json
```

---

## ✨ Features

- **Three.js WebGL scenes** — animated particle fields and geometric meshes in Hero, Services, and CTA sections
- **Custom cursor** — dot + ring follower with blend mode effect
- **Scroll reveal animations** — elements animate in as you scroll using IntersectionObserver
- **Animated counters** — stats count up when they enter the viewport
- **Magnetic buttons** — buttons subtly follow the cursor on hover
- **Portfolio filter tabs** — filter projects by category with smooth transitions
- **Project modal** — click any project card to open a full case study with Overview and Live Preview tabs
- **Live URL previewer** — `TabPreview` component lets you load any URL in an iframe with Desktop / Tablet / Mobile device frames
- **Responsive design** — mobile-first, tested across all screen sizes
- **Page loader** — animated progress bar on first load

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
# Navigate into the project
cd nexa-react

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> ⚠️ Do not open `dist/index.html` directly — always use the dev server or a proper static host.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

1. Push the `nexa-react` folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Set **Root Directory** to `nexa-react` if you pushed the parent folder
5. Vercel auto-detects Vite — leave all settings as default
6. Click **Deploy**

Every push to `main` triggers an automatic redeploy.

---

## ✏️ Customisation

### Update company info
Edit these files with your real details:

| File | What to change |
|------|---------------|
| `src/components/Hero.jsx` | Headline, tagline, stats |
| `src/components/About.jsx` | Company description, features, highlights |
| `src/components/Services.jsx` | Service list, descriptions, tags |
| `src/components/Work.jsx` | Project cards — title, desc, liveUrl, results |
| `src/components/Team.jsx` | Team member names, roles, bios |
| `src/components/Contact.jsx` | Email, phone, address |
| `src/components/Footer.jsx` | Logo, office address, copyright |
| `index.html` | Page title and meta description |

### Add a new project
Open `src/components/Work.jsx` and add an entry to the `projects` array:

```js
{
  category: 'web',           // 'web' | 'mobile'
  c1: '#6366f1',             // gradient start colour
  c2: '#8b5cf6',             // gradient end colour
  mock: 'default',           // 'default' | 'brand' | 'wide' | 'mobile'
  cat: 'WordPress Development',
  title: 'Your Project Name',
  desc: 'Short description shown on the card.',
  fullDesc: 'Full case study text shown in the modal.',
  year: '2025',
  client: 'Client Name',
  role: 'Your Role',
  tags: ['WordPress', 'SEO'],
  techStack: ['WordPress', 'PHP', 'MySQL'],
  liveUrl: 'https://yourproject.com',  // leave '' if no live URL
  results: [
    { value: '3x',  label: 'Traffic increase' },
    { value: '#1',  label: 'Google ranking' },
    { value: '1.5s', label: 'Load time' },
  ],
},
```

### Change accent colour
Open `src/index.css` and update the `--accent` variable:

```css
:root {
  --accent: #c8f135;  /* change this to any colour */
}
```

---

## 📦 Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "three": "^0.169.0",
  "lucide-react": "^0.469.0"
}
```

---

## 📄 License

MIT — free to use and modify for personal and commercial projects.

---

## 🏢 About

Built by a Mohali-based digital studio with 5+ years of experience in WordPress, Shopify, Laravel, React, SEO, and mobile-responsive design.
