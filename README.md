# Kwality Enterprise — Unified Project

Full-stack website: Marketing site + Client Portal in one Next.js app.

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

### 3. Set up database (Neon recommended)
- Create a project at neon.tech
- Copy the connection string into `DATABASE_URL` in `.env`

### 4. Run database migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the dev server
```bash
npm run dev
```

Visit http://localhost:3000

---

## Pages

### Marketing (public)
- `/` — Homepage
- `/printers` — Printer catalogue
- `/about` — About us
- `/contact` — Contact

### Auth
- `/login` — Login (email/password or Google)
- `/register` — Register new account
- `/forgot-password` — Password reset

### Client Portal (login required)
- `/clients/dashboard` — Dashboard with stats
- `/clients/new-order` — Place a new order
- `/clients/order-status` — Track orders
- `/clients/new-complaint` — File a complaint
- `/clients/complaint-status` — Track complaints
- `/clients/bills` — View invoices
- `/clients/asset-details` — Assigned printers
- `/clients/update-locations` — Manage locations

---

## Environment Variables (.env)

```
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="generate with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email (for password reset)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="noreply@kwalityenterprise.com"
```

## Deployment (Vercel)
```bash
npx vercel --prod
```
Set all env vars in Vercel dashboard. Change `NEXTAUTH_URL` to your production domain.
