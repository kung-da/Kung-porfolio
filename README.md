# Welcome to your Lovable project

## ✨ Portfolio with Admin Panel

This is a modern portfolio website with a built-in admin panel for managing projects. Features include:

- 🎨 Beautiful portfolio showcase
- 🔐 Password-protected admin panel
- 📝 Create, Edit, Delete projects
- 💾 Dual storage support: Supabase (cloud) or LocalStorage (offline)
- 🚀 Ready to deploy on Vercel

---

## ⚡ Quick Start

### Option 1: Just Run It (Fastest)
```sh
npm install
npm run dev
```
→ Visit http://localhost:8080/admin (password: `admin123`)

### Option 2: Deploy Now (10 minutes)
```sh
git push  # Push to GitHub
# Then import to Vercel → Deploy → Done!
```

### Option 3: Full Setup with Supabase (30 minutes)
See **[QUICKSTART.md](./QUICKSTART.md)** for detailed guide

---

## 📚 Documentation

| File | Description |
|------|-------------|
| **[QUICKSTART.md](./QUICKSTART.md)** | ⚡ Fast start guide |
| **[OVERVIEW.md](./OVERVIEW.md)** | 📋 System overview |
| **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)** | 🔧 Admin panel usage |
| **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** | 🗄️ Database setup |
| **[VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)** | 🚀 Deployment guide |

---

## 🗄️ Storage Options

### LocalStorage (Default - No Setup)
- ✅ Works immediately
- ✅ No config needed
- ⚠️ Data per browser only

### Supabase (Recommended - 30 min setup)
- ✅ Cloud database
- ✅ Sync all devices
- ✅ 500MB free forever
- 📖 See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

---

## � Features

- Portfolio sections: Hero, About, Projects, Contact
- Admin panel at `/admin` (password: `admin123`)
- CRUD operations for projects
- Automatic fallback: Supabase → LocalStorage
- Responsive design
- Toast notifications
- Form validation
- Smooth animations

---

## 🚀 Deploy to Vercel

### Without Supabase (Simplest)
```sh
npm run build
# Deploy to Vercel → Works instantly!
```

### With Supabase (Best)
1. Follow [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
2. Add env vars in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy!

Full guide: [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)

---

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Framer Motion
- Supabase (optional)
- React Router

---

## 🆘 Need Help?

**Can't login?** → Password is `admin123`
**Data lost?** → You're using LocalStorage, setup Supabase
**Deploy error?** → Run `npm run build` locally first
**More help?** → Check [QUICKSTART.md](./QUICKSTART.md)

---

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c879c093-59b9-4428-9933-396f3fb8b24d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c879c093-59b9-4428-9933-396f3fb8b24d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
