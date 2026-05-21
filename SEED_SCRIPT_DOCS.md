# Seed Script Documentation

## Overview

This seed script populates the UpahJe.my database with sample data for testing and development purposes. It creates:

1. **Categories** - Labour and Technical categories (already existed, now preserved)
2. **Users** - 5 sample employer users with email and name
3. **Employers** - Employer profiles linked to users
4. **Jobs** - 8 sample job postings across different categories and tracks

## Sample Data Created

### Users & Employers
| Email | Name | Company |
|-------|------|---------|
| employer1@example.com | Ahmad bin Hassan | Taman Maju Jaya |
| employer2@example.com | Siti binti Rahman | Kedai Makan Siti |
| employer3@example.com | Lim Wei Ming | Tech Solutions Sdn Bhd |
| employer4@example.com | Priya a/p Krishnan | Clean & Green Services |
| employer5@example.com | John Tan | Digital Marketing Agency |

### Jobs
1. **Potong Rumput Mingguan** (Labour - Rumah & Taman)
   - Location: Ampang, Selangor
   - Rate: RM 80-100

2. **Cuci Karpet Sofa** (Labour - Cuci Karpet & Sofa)
   - Location: Cheras, Kuala Lumpur
   - Rate: RM 150-200

3. **Website Company Profile** (Technical - Web & App Dev)
   - Location: Remote
   - Rate: RM 2000-3000

4. **Social Media Management** (Technical - Pengurusan Media Sosial)
   - Location: Kuala Lumpur
   - Rate: RM 800-1200/month

5. **Event Photography** (Labour - Fotografi Majlis)
   - Location: Putrajaya
   - Rate: RM 500-800

6. **House Cleaning Service** (Labour - Cucian & Dobi)
   - Location: Petaling Jaya, Selangor
   - Rate: RM 200-250

7. **Mobile App Development** (Technical - Web & App Dev)
   - Location: Remote
   - Rate: RM 5000-8000

8. **Food Delivery Rider** (Labour - Angkat & Hantar)
   - Location: Kuala Lumpur
   - Rate: RM 10-15 per delivery

## How to Run

### Prerequisites
1. Ensure your `.env.local` file is configured with valid database credentials
2. Database schema must be pushed (run `npx prisma db push` first)

### Running the Seed Script

```bash
cd /home/husni/projects/upahje-my
npx prisma db seed
```

### Alternative: Run directly with ts-node

```bash
cd /home/husni/projects/upahje-my
npx ts-node prisma/seed.ts
```

## Foreign Key Constraints Handling

The seed script handles foreign key constraints gracefully:

1. **Categories**: Uses `upsert` to avoid duplicates
2. **Users**: Uses `upsert` based on email to avoid duplicates
3. **Employers**: Uses `upsert` based on `userId` to avoid duplicates
4. **Jobs**: Creates new records only, but checks for valid foreign keys

### Error Handling
- If a category is missing, the job creation is skipped with a warning
- If an employer is missing, the job creation is skipped with a warning
- All operations are wrapped in try-catch blocks
- Database connection is properly closed in finally block

## Resetting Data

To reset all data and start fresh:

```bash
# Reset the database (WARNING: This deletes all data)
npx prisma db push --force-reset

# Then seed again
npx prisma db seed
```

## Verification

After running the seed script, verify the data:

```bash
# Check users
npx prisma user count

# Check employers
npx prisma employer count

# Check jobs
npx prisma job count

# Check categories
npx prisma category count

# View sample jobs
npx prisma job findMany --include employer --take 5
```

## Troubleshooting

### Issue: "Database connection failed"
**Solution**: Verify your `.env.local` file has correct `DATABASE_URL`

### Issue: "Unique constraint failed"
**Solution**: The script uses upsert operations, but if you're re-running, consider resetting the database first

### Issue: "Foreign key constraint violation"
**Solution**: This shouldn't happen with the current script, but if it does, ensure categories are created before jobs

## Files Modified
- `prisma/seed.ts` - Updated with comprehensive seeding logic
- `app/jobs/post/PostJobForm.tsx` - Fixed to create employer record if missing
