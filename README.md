# Portfolio — Usama Rabie

A modern, custom-designed MERN-stack portfolio built with Next.js and Firebase, featuring a full CRUD dashboard with Cloudinary image upload, WhatsApp contact, and drag-and-drop reordering. Deployed as a static export on Netlify.

## Live Site

[https://portfolio-usamarabie.netlify.app](https://portfolio-usamarabie.netlify.app)

## Features

### Site
- **Hero** — Typing animation with dynamic subtitle array
- **About** — Profile image, bio, info cards (Email, Phone, Location, Birthday, Degree, Working Remotely), activities, facts, LinkedIn/GitHub links, CV download
- **Skills** — Dynamic categories with grouped skill cards and visual icon picker
- **Resume** — Timeline layout with Summary, Education, and Experience sections
- **Portfolio** — Project grid with icon registry (130+ choices), Live Demo / Source buttons (hidden when URL is `"#"`)
- **Contact** — WhatsApp-only form (name + message, no email)
- **Footer** — Social links, copyright, credits
- **Sidebar** — Profile image, navigation links with icons, social links, theme toggle (light/dark), CV download, responsive hamburger menu
- **Dark/Light mode** — Default dark mode, toggle in sidebar

### Dashboard (`/dashboard`)
- **Password-protected** login (client-side comparison)
- **Personal** — Edit name, title, email, phone, location, birthday, degree, Working Remotely, bio, subtitle, profile image (Cloudinary upload), CV URL
- **Social** — Add/edit/delete social links
- **Activities** — Add/edit/delete activity items
- **Facts** — Add/edit/delete fact cards (icon, value, label)
- **Skills** — Dynamic categories (add, rename, delete, reorder with arrows), per-category drag-and-drop reordering, visual icon grid picker (50+ icons)
- **Resume** — Edit titles, add/edit/delete summary items, education items, experience items with drag-and-drop reordering
- **Projects** — Add/edit/delete projects with visual icon grid picker (130+ icons), drag-and-drop reordering
- **Contact** — Edit email, phone, location
- **Auto-save** — Every add/edit/delete saves immediately with toast notifications and delete confirmation dialogs

### Data Persistence
- All data stored in **Firebase Realtime Database**
- Edits from the dashboard are written to Firebase and visible to all visitors in real-time
- Falls back to localStorage, then bundled JSON defaults

## Technologies

| Tech | Purpose |
|------|---------|
| [Next.js 16](https://nextjs.org/) (App Router) | Static site generation & routing |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Firebase Realtime Database](https://firebase.google.com/) | Data persistence across visitors |
| [Cloudinary](https://cloudinary.com/) | Image upload & hosting |
| [lucide-react](https://lucide.dev/) | UI icons |
| [react-icons](https://react-icons.github.io/react-icons/) | Skill & project icon registries |
| [Netlify](https://www.netlify.com/) | Static hosting & deployment |

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Cloudinary (for image upload in dashboard)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Firebase (for data persistence)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Install & Run

```bash
npm install
npm run dev     # Development server at http://localhost:3000
npm run build   # Static export to /out
```

### Deploy to Netlify

```bash
netlify deploy --prod --dir=out
```

Set the same environment variables in Netlify via `netlify env:set` or the Netlify dashboard.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main portfolio page (client component, fetches Firebase data)
│   ├── layout.tsx            # Root layout with metadata & favicon
│   └── dashboard/
│       ├── page.tsx          # Dashboard with all CRUD sections
│       └── login/page.tsx    # Password-protected login
├── components/
│   ├── Sidebar.tsx           # Main navigation sidebar
│   ├── Hero.tsx              # Hero section with typing animation
│   ├── About.tsx             # About section with info cards & social links
│   ├── Skills.tsx            # Skills section with dynamic categories
│   ├── Resume.tsx            # Timeline resume section
│   ├── Portfolio.tsx         # Project grid with icons
│   ├── Contact.tsx           # WhatsApp-only contact form
│   ├── Footer.tsx            # Footer with social links
│   ├── ThemeToggle.tsx       # Light/dark mode toggle
│   ├── ImageUploader.tsx     # Cloudinary image upload component
│   └── dashboard/
│       ├── Modal.tsx         # Reusable modal dialog
│       ├── ConfirmDialog.tsx # Delete confirmation dialog
│       ├── Toast.tsx         # Toast notification system
│       └── DnDSortable.tsx   # HTML5 drag-and-drop sortable list
├── lib/
│   ├── data.ts               # Data layer (Firebase read/write, defaults)
│   ├── firebase.ts           # Firebase initialization
│   ├── icons.tsx             # Skill icon registry (50+ icons)
│   └── projectIcons.tsx      # Project icon registry (130+ icons)
├── data/
│   └── portfolio.json        # Default portfolio data
├── types/
│   └── index.ts              # TypeScript type definitions
└── public/
    ├── favicon.svg           # Custom briefcase favicon
    └── cv.pdf                # Downloadable CV
```

## Dashboard Access

- URL: `/dashboard`
- Password: Set via client-side comparison (currently hardcoded — change in `login/page.tsx`)

## Data Model

The portfolio data is a single JSON object stored in Firebase at `/portfolio/data`:

- `personal` — Name, title, subtitle[], email, phone, location, birthday, degree, freelance, bio, profileImage, cvUrl
- `social` — Array of { platform, url, icon }
- `activities` — Array of strings
- `facts` — Array of { icon, value, label }
- `skills` — Array of { name, level, category, icon? }
- `skillCategories` — Array of category strings (dynamic)
- `resume` — { summary: { title, items[] }, education: { title, items[] }, experience: { title, items[] } }
- `projects` — Array of { id, title, description, image, category, demoUrl, githubUrl, icon? }
- `contact` — { email, phone, location }

## License

MIT
