# Testing Guide

This document outlines testing procedures for the Student Activity Record Portal.

## 🧪 Testing Strategy

### Manual Testing Checklist

#### Homepage Testing
- [ ] Page loads correctly with all sections
- [ ] Navigation menu works on all screen sizes  
- [ ] Hero section displays properly
- [ ] Statistics section shows correct numbers
- [ ] Feature cards are clickable and informative
- [ ] Footer links work correctly
- [ ] Call-to-action buttons redirect properly

#### Authentication Testing
- [ ] Sign-up process works correctly
- [ ] Sign-in functionality validates users
- [ ] User roles (Student/Admin) are properly assigned
- [ ] Password reset functionality works
- [ ] Social login integration functions
- [ ] Session management works correctly

#### Student Dashboard Testing
- [ ] Profile completion wizard displays
- [ ] Sidebar navigation works correctly
- [ ] All dashboard sections are accessible
- [ ] Real-time profile completion percentage updates
- [ ] Theme toggle functions properly
- [ ] Responsive design works on mobile/tablet

#### Profile Management Testing
- [ ] Profile form validation works
- [ ] Dynamic updates without page refresh
- [ ] Image upload functionality works
- [ ] Profile completion tracking accurate
- [ ] Social links validation
- [ ] Academic information saves correctly

#### Certificate Management Testing
- [ ] File upload accepts correct formats
- [ ] Certificate categorization works
- [ ] Verification status tracking
- [ ] Search and filter functionality
- [ ] Certificate details display correctly
- [ ] Delete functionality works safely

#### Skills & Achievements Testing
- [ ] Skill addition with proficiency levels
- [ ] Achievement creation with verification
- [ ] Progress tracking displays correctly
- [ ] Category filtering works
- [ ] Timeline view functions properly
- [ ] Edit/delete capabilities work

#### Jobs & Internships Testing
- [ ] Experience addition form works
- [ ] Timeline view displays chronologically
- [ ] Job/Internship categorization
- [ ] Experience details are comprehensive
- [ ] Verification status tracking
- [ ] Export functionality works

#### AI Assistant Testing
- [ ] Career guidance provides relevant suggestions
- [ ] Skill recommendations are accurate
- [ ] Integration with user profile data
- [ ] Response time is acceptable
- [ ] Error handling for API failures

#### Admin Dashboard Testing
- [ ] Admin authentication works
- [ ] Verification queue displays correctly
- [ ] Bulk verification actions function
- [ ] Analytics display accurate data
- [ ] User management capabilities work
- [ ] Export functionality for reports

#### E-Portfolio Testing
- [ ] Portfolio generation works correctly
- [ ] PDF export functionality
- [ ] Template customization options
- [ ] Content accuracy from user profile
- [ ] Download and sharing capabilities

### Browser Compatibility Testing

Test on the following browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)  
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Testing

#### Core Web Vitals
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] First Input Delay (FID) < 100ms
- [ ] Cumulative Layout Shift (CLS) < 0.1

#### Load Testing
```bash
# Using Artillery for load testing
npm install -g artillery
artillery quick --count 10 --num 5 http://localhost:3001
```

#### Lighthouse Audit
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3001 --output=html --output-path=./lighthouse-report.html
```

### Security Testing

#### Authentication Security
- [ ] JWT tokens properly validated
- [ ] Session management secure
- [ ] Role-based access control works
- [ ] Password policies enforced
- [ ] SQL injection protection

#### Data Security
- [ ] Input validation on all forms
- [ ] XSS protection implemented
- [ ] CSRF protection active
- [ ] File upload security measures
- [ ] Database query sanitization

### Accessibility Testing

#### WCAG 2.1 Compliance
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast meets standards
- [ ] Alt text for images
- [ ] Focus indicators visible
- [ ] Semantic HTML structure

#### Testing Tools
```bash
# Install axe-core for accessibility testing
npm install @axe-core/cli -g

# Run accessibility audit
axe http://localhost:3001
```

### Database Testing

#### Data Integrity
- [ ] CRUD operations work correctly
- [ ] Foreign key constraints enforced
- [ ] Data validation at database level
- [ ] Backup and restore procedures
- [ ] Migration scripts work properly

#### Performance
- [ ] Query optimization
- [ ] Index effectiveness
- [ ] Connection pooling
- [ ] Database monitoring

### API Testing

#### Endpoint Testing
```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Test authenticated endpoints (with bearer token)
curl -H "Authorization: Bearer <token>" http://localhost:3001/api/profile
```

### Error Handling Testing

#### Expected Errors
- [ ] 404 pages display correctly
- [ ] Form validation errors show properly
- [ ] Network error handling
- [ ] Database connection failures
- [ ] File upload errors

#### Error Boundaries
- [ ] React error boundaries catch errors
- [ ] Graceful degradation works
- [ ] Error reporting to monitoring service

## 🔧 Testing Tools Setup

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
}
```

### Playwright Setup
```bash
npm install @playwright/test
npx playwright install
```

### Testing Scripts
Add to package.json:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:accessibility": "axe http://localhost:3001"
  }
}
```

## 📊 Test Reports

### Coverage Goals
- Unit tests: > 80% coverage
- Integration tests: Critical paths covered
- E2E tests: Main user journeys covered

### Continuous Integration
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run test:e2e
```

## 🚨 Bug Reporting

### Issue Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment**
- Browser: [e.g. Chrome, Safari]
- Version: [e.g. 22]
- Device: [e.g. iPhone6]
```

### Priority Levels
- **P0**: Critical - Application unusable
- **P1**: High - Core functionality broken
- **P2**: Medium - Important feature affected
- **P3**: Low - Minor issue or enhancement

## ✅ Test Sign-off

Before deployment, ensure:
- [ ] All critical paths tested
- [ ] Performance benchmarks met
- [ ] Security audit passed
- [ ] Accessibility compliance verified
- [ ] Cross-browser compatibility confirmed
- [ ] Mobile responsiveness validated
- [ ] Error handling verified
- [ ] Database integrity confirmed