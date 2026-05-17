# Database Setup Guide for UpahJe.my

This guide documents how to connect UpahJe.my to Supabase PostgreSQL database.

## Prerequisites

- A Supabase account (sign up at [supabase.co](https://supabase.co))
- Existing Supabase project OR ability to create a new one
- Access to the project's `.env` file

## Step 1: Create or Access Supabase Project

### Option A: Create New Supabase Project
1. Go to [supabase.co](https://supabase.co) and sign in
2. Click "New Project"
3. Fill in the details:
   - **Project Name**: `upahje-my` (or your preferred name)
   - **Organization**: Select your organization
   - **Database Password**: Create a strong password (save this securely!)
   - **Region**: Choose the closest region (recommended: Singapore for Malaysia)
4. Click "Create new project"
5. Wait for the project to be provisioned (takes 1-2 minutes)

### Option B: Use Existing Supabase Project
If you already have a Supabase project, proceed to Step 2.

## Step 2: Get PostgreSQL Connection String

1. In your Supabase project dashboard, go to **Project Settings** (gear icon)
2. Click on **Database** in the sidebar
3. Scroll down to **Connection string**
4. Copy the **URI** connection string (it looks like this):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```
5. **Important**: Replace `[YOUR-PASSWORD]` with your actual database password

## Step 3: Configure Environment Variables

### Update `.env` file

Create or update the `.env` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Database (for Prisma)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000

# Billplz Payment Gateway (optional for now)
BILLPLZ_API_KEY=your-billplz-api-key
BILLPLZ_COLLECTION_ID=your-collection-id
BILLPLZ_X_SIGNATURE_KEY=your-signature-key
```

### How to get Supabase URL and Anon Key

1. In Supabase dashboard, go to **Project Settings** → **API**
2. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Generate NextAuth Secret

Run this command in your terminal to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and paste it as the value for `NEXTAUTH_SECRET`.

## Step 4: Push Database Schema

Once your `.env` file is configured, run the following command to create all database tables:

```bash
cd /home/husni/projects/upahje-my
npx prisma db push
```

This will:
- Create all tables defined in `prisma/schema.prisma`
- Set up relationships and indexes
- Generate the Prisma Client

## Step 5: Verify Database Connection

After pushing the schema, verify that tables were created successfully:

```bash
npx prisma db execute "SELECT * FROM pg_catalog.pg_tables WHERE schemaname='public';"
```

You should see a list of tables including:
- `User`
- `Account`
- `Session`
- `Profile`
- `Talent`
- `Employer`
- `Category`
- `Job`
- `Review`
- `EscrowTransaction`
- `Payment`

## Step 6: Test the Connection

Start your development server:

```bash
npm run dev
```

Visit `http://localhost:3000` and verify that:
1. The application starts without errors
2. You can access the main pages
3. Database operations work (if you have any data operations)

## Troubleshooting

### Common Issues

**Issue**: `Error: getaddrinfo ENOTFOUND`
- **Solution**: Check that your `DATABASE_URL` is correct and includes the proper host

**Issue**: `Error: authentication failed`
- **Solution**: Verify your database password is correct in the connection string

**Issue**: `Error: relation "X" does not exist`
- **Solution**: Run `npx prisma db push` again to ensure all tables are created

**Issue**: `Error: @prisma/adapter-pg not found`
- **Solution**: Run `npm install @prisma/adapter-pg pg` to install required dependencies

### Getting Help

If you encounter issues:
1. Check the Supabase dashboard for database logs
2. Verify your connection string format is correct
3. Ensure your IP is allowed in Supabase (Settings → Database → Connection Security)

## Next Steps

After successful database connection:
1. Run `npx prisma generate` to update the Prisma Client
2. Start building your data access layer
3. Implement authentication with NextAuth
4. Set up database migrations for production

## Security Notes

- Never commit your `.env` file to version control
- Keep your database password secure
- Use environment variables for all sensitive data
- In production, use Supabase's built-in Row Level Security (RLS)

## Files Modified/Created

- `database-setup.md` (this file) - Setup guide
- `.env` - Environment configuration (create this file)
- `lib/supabase.ts` - Supabase client helper (already exists)
- `prisma/schema.prisma` - Database schema (already exists)

## References

- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [NextAuth Documentation](https://next-auth.js.org/)