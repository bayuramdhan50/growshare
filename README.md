# GrowShare - SDG 2: Zero Hunger Platform

GrowShare is a highly secure web platform focused on supporting SDG 2 (Zero Hunger) initiatives through crowdfunding and community engagement. The platform allows users to create, fund, and contribute to projects addressing food security, sustainable agriculture, and nutrition worldwide.

## Key Features

- **Project Crowdfunding**: Create and fund projects aligned with SDG 2 goals
- **Secure User Authentication**: Comprehensive security with NextAuth.js
- **Dashboard**: Track projects, donations, and contributions
- **MySQL Database**: Secure data storage through Prisma ORM
- **Comprehensive Security**: Protection against common web vulnerabilities

## Tech Stack

- **Frontend**: Next.js 15.3.3, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: MySQL
- **Authentication**: NextAuth.js
- **Security Features**:
  - Content Security Policy (CSP)
  - HTTP Security Headers
  - CSRF Protection
  - Input Validation with Zod
  - Rate Limiting
  - Password Hashing with bcryptjs

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- MySQL database

### Setup

1. Clone the repository:
```bash
git clone https://github.com/bayuramdhan50/growshare.git
cd growshare
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
# Database
DATABASE_URL="mysql://username:password@localhost:3306/sdg2_zero_hunger"

# Authentication 
NEXTAUTH_SECRET="your-very-strong-secret-key-at-least-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Session
SESSION_COOKIE_NAME="sdg2-session"
SESSION_MAX_AGE=86400 # 24 hours

# Security
SECURITY_HEADERS_ENABLED=true

# CORS
ALLOWED_ORIGINS="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Application Structure

- `/app`: Main application components and pages
  - `/api`: API routes for authentication, projects, donations
  - `/components`: Reusable UI components
  - `/lib`: Utility functions, security, database access
  - `/dashboard`: User dashboard page
  - `/projects`: Project listing and detail pages
  - `/signin`, `/signup`: Authentication pages

## Security Features

1. **HTTP Security Headers**
   - Strict-Transport-Security
   - Content-Security-Policy
   - X-Content-Type-Options
   - X-Frame-Options
   - X-XSS-Protection
   - Permissions-Policy

2. **Authentication Security**
   - Secure password hashing (bcryptjs)
   - JWT-based authentication
   - Protected routes
   - Secure cookies

3. **API Protection**
   - Rate limiting
   - Input validation
   - CSRF protection

4. **Database Security**
   - Parameterized queries via Prisma ORM
   - Input sanitization
   - Error handling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
