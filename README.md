# Lea-Juice-App

## Description

Lea-Juice-App is an online marketplace for fresh juices, fruits, and salads. Customers can browse products, add items to a cart, checkout using integrated payment gateways, and leave reviews and comments. The project includes an admin interface for managing products, viewing sales and customers, and handling transactions.

## Features

- Two user roles: Buyer (user) and Admin
- Buyer features: browse products, add to cart, checkout, write product reviews, post comments
- Admin features: product CRUD (create, read, update, delete), view total sales per product, view customers who purchased, view total revenue, and manage incoming transactions
- Authentication with `next-auth` (Prisma adapter)
- Database management with Prisma
- Payment integration (Midtrans)
- File uploads and media handling
- Optional Supabase & Redis integrations for realtime/data storage

## Tech Stack

- Next.js (React)
- TypeScript
- Prisma (Postgres)
- NextAuth
- Supabase (optional public client)
- Upstash Redis (optional)
- Tailwind CSS and Radix UI for components
- TanStack Query for data fetching

## Installation

Clone the repository and install dependencies using `npm`:

```bash
git clone https://github.com/Glenn-Rhee/lea-juice-app
cd lea-juice-app
npm install
```

## Environment Variables

Create a `.env` file at the project root and provide the following variables (example placeholders):

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENTID=your_google_client_id
GOOGLE_CLIENTSECRET=your_google_client_secret
UPLOADTHING_TOKEN=your_uploadthing_token
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_IS_PRODUCTION=false
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do NOT commit secrets to version control. Use environment variables in your deployment platform (for example, Vercel Environment Variables).

## Database Migration

To create or run migrations during development, run:

```bash
npx prisma migrate dev --name "init"
npx prisma generate
```

(You provided: `prisma generate dev --name "name"` — the common flow is `prisma migrate dev --name "<name>"` then `prisma generate`.)

## Scripts

- `npm run dev` — Run development server
- `npm run build` — Run `prisma generate` then build for production
- `npm start` — Start the production server
- `npm run prisma:generate` — Run `prisma generate`

## Deployment

This project can be deployed anywhere that supports Node.js and Next.js. For convenience, you can deploy to Vercel (recommended by the author):

1. Push your repository to GitHub/GitLab/Bitbucket
2. Import the repository on Vercel
3. Configure environment variables on Vercel according to the list above
4. Set the build command to `npm run build` and the output directory to the default (Vercel will detect Next.js)

## Contributors & License

This project is licensed to the team "Kelompok 1". Members:

- Anisa Rahayu
- Ariel Rizki Muhtamad Bakri
- Faizh Adi Anugerah
- Muhammad Davy Wibowo
- Najwa Rahmatia Astuti
