  <h1>ANNAS.DEV — Next-Gen Dynamic Portfolio</h1>

  <p>
    An interactive, highly polished developer portfolio featuring dynamic content synchronization, fluid UI animations, an embedded AI Assistant, and a fully functional Admin Dashboard.
  </p>

  <p>
    <strong>🌍 Live Demo:</strong>
    <a href="https://iam-annas.web.id">iam-annas.web.id</a>
  </p>

  <p>
    <a href="#features"><strong>Features</strong></a> ·
    <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
    <a href="#project-architecture"><strong>Architecture</strong></a> ·
    <a href="#getting-started"><strong>Getting Started</strong></a> ·
    <a href="#content-management--admin-access"><strong>Admin Panel</strong></a>
  </p>
</div>

---

# ✨ Features

- ⚡ **Dynamic Real-Time CMS Synchronization:** Powered by Firebase Firestore, ensuring that projects, professional experiences, skills, and about sections sync globally in real time without triggering rebuilds.

- 🤖 **Integrated AI Assistant Widget:** Implements the native `@google/genai` SDK to offer an interactive chatbot directly on the landing page, capable of answering visitor inquiries regarding professional background and experience.

- 🎨 **Highly Polished UI/UX:** Custom micro-interactions engineered with Framer Motion and Tailwind CSS, complete with custom cursors, fluid backdrop physics, scroll-linked navigation pills, and an engaging interactive "Sticker Wall".

- 🔒 **Secure Admin Portal:** Seamless in-app management interface allowing rapid additions of projects, media assets, credentials, and real-time updates directly to remote file buckets via Supabase Storage.

- 📱 **Responsive & Accessible:** Optimized seamlessly across touch devices, wide desktop displays, and mobile views.

---

# 🛠️ Tech Stack

## Frontend Core

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router v7

## Backend Services & Cloud Storage

- **Database:** Firebase Firestore (NoSQL Document Store)
- **Asset Storage:** Supabase Storage Buckets (`portfolio` bucket)
- **AI Engine:** Google Gemini API via `@google/genai` SDK

---

# 📁 Project Architecture

```bash
├── components/          # Reusable, standalone feature components (Chat, Hero, Screens)
├── screen/              # Root-level interface views
│   ├── PortfolioScreen  # Public dynamic frontend landing interface
│   ├── AdminScreen      # Complete admin dashboard routing engine
│   └── admin/           # Dedicated management views for specific portfolio entities
├── services/            # Client handlers for cloud integrations
│   ├── portfolioService # Global Firestore subscriptions and document seeding
│   ├── geminiService    # Interaction wrappers handling API payloads for the chatbot
│   └── supabase         # Dedicated instances managing object and asset storage
├── types.ts             # Strict global TypeScript interfaces for documents and views
├── constants.ts         # Immutable default fallback payloads and structured seed state
├── populate-initial-data.mjs  # Manual script to seed Firestore with dummy content
├── updated.json         # Snapshot of production portfolio data for restore
└── firebase-applet-config.json  # Firebase client SDK configuration
```

---

# 🚀 Getting Started

## Prerequisites

- Node.js (`v20+` recommended)
- A Firebase project configured with Firestore Database access AND Firebase Authentication (Email/Password enabled)
- A Supabase project configured with a public storage bucket named `portfolio`
- A Google Gemini API Key

---

## 1. Installation

Clone the repository and install all required local workspace dependencies:

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
npm install
```

---

## 2. Configuration & Environment Variables

### Firebase Setup
Update the `firebase-applet-config.json` file at the root of the directory with your Firebase client configuration:

```json
{
  "projectId": "your_firebase_project_id",
  "appId": "your_firebase_app_id",
  "apiKey": "your_firebase_api_key",
  "authDomain": "your_firebase_auth_domain",
  "firestoreDatabaseId": "your_firestore_database_id",
  "storageBucket": "your_firebase_storage_bucket",
  "messagingSenderId": "your_messaging_sender_id",
  "measurementId": ""
}
```

### Environment Variables
Create a `.env.local` or `.env` file at the root of the directory containing the remaining necessary keys:

```env
# Gemini API Setup
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Storage Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

---

## 3. Local Execution

Spin up the hot-reloading development build server:

```bash
npm run dev
```

Navigate to `http://localhost:5173/` to inspect the active application locally.

The app will display a loading state until portfolio data exists in Firestore. To populate your Firestore database with initial dummy content, run:

```bash
node populate-initial-data.mjs
```

This script writes seed data to the `content/main` document only if it does not already exist, preventing accidental overwrites of live data. To restore from a production snapshot instead, temporarily modify the script to remove the existence check.

---

# 🔐 Content Management & Admin Access

The application is secured via **Firebase Authentication** to ensure that your database and configuration files remain completely safe to expose publicly on GitHub.

To update content, view records, or push new files dynamically:

1. **Prerequisite:** Create an admin user account in your Firebase Console under the **Authentication** tab.
2. **Accessing the Portal:** Navigate directly to `/admin`, or invoke the admin access modal by typing the secret command (default: `open admin`) directly into the AI Chat assistant.
3. **Authentication:** Log in using the email and password you configured in your Firebase Console.
4. **Data Management:** Add, modify, or sync item descriptions, project metrics, media links, and resume payloads directly into real-time production modules.
5. **Dynamic Configuration:** The AI chat secret trigger phrase can be customized securely on-the-fly directly from the **Configuration** tab within the Admin Dashboard!

---

# 📜 License

This project is proprietary and intended for professional portfolio demonstration.

Feel free to inspect the architecture and reference layout configurations.
