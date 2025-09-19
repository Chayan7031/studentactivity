# Deployment Guide

This guide covers different deployment scenarios for the Student Activity Record Portal.

## 🚀 Quick Deployment (Vercel)

### Prerequisites
- GitHub account with repository
- Vercel account
- PostgreSQL database (recommended: Supabase or Neon)

### Steps

1. **Prepare Repository**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Database Setup**
   - Create a PostgreSQL database (Supabase/Neon recommended)
   - Note the connection string

3. **Vercel Deployment**
   - Visit [vercel.com](https://vercel.com)
   - Connect GitHub repository
   - Configure environment variables:
     ```
     DATABASE_URL=your_postgresql_connection_string
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
     CLERK_SECRET_KEY=your_clerk_secret
     OPENAI_API_KEY=your_openai_key
     ```

4. **Deploy**
   - Click Deploy
   - Vercel will automatically build and deploy

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/student_records
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=student_records
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## ☁️ Cloud Platform Deployments

### AWS Deployment

#### Using AWS Amplify
1. **Setup**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   amplify init
   ```

2. **Database**
   ```bash
   amplify add storage
   amplify add api
   ```

3. **Deploy**
   ```bash
   amplify push
   amplify publish
   ```

#### Using AWS ECS/Fargate
1. Build Docker image
2. Push to ECR
3. Create ECS service
4. Configure load balancer
5. Setup RDS for database

### Google Cloud Platform

#### Using Cloud Run
1. **Build & Deploy**
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/student-records
   gcloud run deploy --image gcr.io/PROJECT_ID/student-records
   ```

2. **Database**
   - Use Cloud SQL for PostgreSQL
   - Configure connection through Cloud SQL Proxy

### Azure Deployment

#### Using Azure Container Apps
1. **Build & Push**
   ```bash
   az acr build --image student-records:latest --registry myregistry .
   ```

2. **Deploy**
   ```bash
   az containerapp create \
     --name student-records \
     --resource-group myResourceGroup \
     --image myregistry.azurecr.io/student-records:latest
   ```

## 🗄️ Database Migration

### Production Database Setup

1. **Create Database**
   ```bash
   createdb student_records_prod
   ```

2. **Run Migrations**
   ```bash
   DATABASE_URL="your_production_url" npx prisma db push
   DATABASE_URL="your_production_url" npx prisma generate
   ```

3. **Seed Data (Optional)**
   ```bash
   DATABASE_URL="your_production_url" npx prisma db seed
   ```

## 🔐 Security Configuration

### Environment Variables
```env
# Required
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Optional but recommended
OPENAI_API_KEY=
WEBHOOK_SECRET=
SENTRY_DSN=
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Security Headers
Add to `next.config.js`:
```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

## 📊 Monitoring & Analytics

### Essential Monitoring
1. **Error Tracking**: Sentry integration
2. **Performance**: Vercel Analytics or Google Analytics
3. **Uptime**: UptimeRobot or similar
4. **Database**: PostgreSQL monitoring

### Setup Sentry
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Build application
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Errors**
   - Check environment variables
   - Verify database connection
   - Ensure all dependencies are installed

2. **Database Connection**
   ```bash
   # Test connection
   npx prisma db pull
   ```

3. **Performance Issues**
   - Enable production mode
   - Check database query optimization
   - Monitor Core Web Vitals

### Health Checks
Create `/api/health` endpoint:
```typescript
export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    
    return Response.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    })
  } catch (error) {
    return Response.json({ 
      status: 'unhealthy',
      error: error.message 
    }, { status: 500 })
  }
}
```

## 📋 Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Database migrations completed
- [ ] Authentication working
- [ ] All environment variables set
- [ ] SSL certificate active
- [ ] Domain configured
- [ ] Monitoring tools setup
- [ ] Backup strategy implemented
- [ ] Performance metrics baseline established
- [ ] Error tracking configured

## 🔗 Useful Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [Clerk Production Checklist](https://clerk.com/docs/deployments/overview)