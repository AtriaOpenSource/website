# Firebase Emulator Setup Guide

This project uses Firebase Emulators for local development and Firebase production services for deployment.

## Quick Start

### Development (with Emulators)

1. **Start Firebase Emulators** (in one terminal):
   ```bash
   firebase emulators:start
   ```

2. **Start Next.js Dev Server** (in another terminal):
   ```bash
   npm run dev
   ```

3. **Access the Application**:
   - **App**: http://localhost:3000
   - **Emulator UI**: http://localhost:8090
   - **Firestore Emulator**: http://localhost:4000
   - **Auth Emulator**: http://localhost:9099

## Environment Configuration

### `.env.local` (Development)
```env
# Firebase Configuration (Production credentials)
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

# Enable Firebase Emulators
NEXT_PUBLIC_USE_FIREBASE_EMULATOR="true"
NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST="localhost"
NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT="4000"
NEXT_PUBLIC_AUTH_EMULATOR_HOST="localhost"
NEXT_PUBLIC_AUTH_EMULATOR_PORT="9099"

# Admin Emails
NEXT_PUBLIC_ADMIN_EMAILS="admin@example.com"
```

### `.env.production` (Production)
```env
# Firebase Configuration (Production credentials)
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

# Disable Firebase Emulators for Production
NEXT_PUBLIC_USE_FIREBASE_EMULATOR="false"

# Admin Emails
NEXT_PUBLIC_ADMIN_EMAILS="admin@example.com"
```

## How It Works

The Firebase configuration in `src/lib/firebase/config.ts` automatically detects the environment:

- **When `NEXT_PUBLIC_USE_FIREBASE_EMULATOR="true"`**: 
  - Connects to local Firebase emulators
  - No real data is affected
  - Perfect for development and testing

- **When `NEXT_PUBLIC_USE_FIREBASE_EMULATOR="false"` or not set**: 
  - Connects to production Firebase services
  - Uses real data
  - For production deployment

## Emulator Ports

The emulator ports are configured in `firebase.json`:

```json
{
  "emulators": {
    "auth": { "port": 9099 },
    "firestore": { "port": 4000 },
    "hosting": { "port": 5000 },
    "ui": { "enabled": true, "port": 8090 }
  }
}
```

## Troubleshooting

### Emulator Connection Issues

If you see errors about connecting to emulators:

1. **Ensure emulators are running**:
   ```bash
   firebase emulators:start
   ```

2. **Check the ports are not in use**:
   ```bash
   lsof -i :4000  # Firestore
   lsof -i :9099  # Auth
   ```

3. **Verify environment variables**:
   ```bash
   cat .env.local | grep EMULATOR
   ```

### Switching Between Environments

**To use emulators** (development):
```bash
# In .env.local
NEXT_PUBLIC_USE_FIREBASE_EMULATOR="true"
```

**To use production** (deployment):
```bash
# In .env.production or .env.local
NEXT_PUBLIC_USE_FIREBASE_EMULATOR="false"
```

Then restart your dev server:
```bash
npm run dev
```

## Benefits of Using Emulators

✅ **No cost** - Emulators are completely free  
✅ **Fast iteration** - No network latency  
✅ **Safe testing** - No risk of affecting production data  
✅ **Offline development** - Work without internet  
✅ **Easy reset** - Clear data by restarting emulators  
✅ **Team collaboration** - Share emulator data exports  

## Deployment Checklist

Before deploying to production:

- [ ] Set `NEXT_PUBLIC_USE_FIREBASE_EMULATOR="false"` in production environment
- [ ] Deploy Firestore rules: `firebase deploy --only firestore:rules`
- [ ] Deploy Firestore indexes: `firebase deploy --only firestore:indexes`
- [ ] Verify all environment variables are set correctly
- [ ] Test authentication flow
- [ ] Test database operations

## Additional Resources

- [Firebase Emulator Suite Documentation](https://firebase.google.com/docs/emulator-suite)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
