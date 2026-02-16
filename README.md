# Atria Summer of Code Platform

The central hub for our institution's largest open-source event - a collaboration between **Apex Community** and **OSCode**.

## Features

### 📝 Advanced Form Builder

- Google Forms-like interface
- Support for multiple field types:
  - Short Text
  - Paragraph
  - Radio (Single Choice)
  - Checkbox (Multiple Choice)
  - Dropdown (Select)
- Drag-and-drop question management
- Real-time preview
- Custom slug generation

### 🔐 Form Rendering Engine

- Google Sign-in authentication gate
- Duplicate submission prevention
- Progress bar tracking
- Responsive design
- Validation with error messages

### 📊 Analytics Dashboard

- View all form responses
- CSV export
- XLSX export with formatting
- Response statistics
- Admin whitelist protection

### 🛡️ Security

- Firebase Authentication integration
- Admin email whitelist
- Firestore security rules

### 🎨 Visual Identity & Assets

- **Brand Kit**: Dedicated page for colors, typography, and logos
- **Theme**: Retro-futuristic Risograph aesthetic
- **Assets**: Downloadable logo variations and style guidelines

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Forms**: react-hook-form
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Export**: xlsx library

## Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Configure Environment Variables**

   Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your Firebase configuration:

   ```env
   # Firebase Configuration (Production credentials)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Firebase Emulator Configuration (Development)
   NEXT_PUBLIC_USE_FIREBASE_EMULATOR="true"
   NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST="localhost"
   NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT="4000"
   NEXT_PUBLIC_AUTH_EMULATOR_HOST="localhost"
   NEXT_PUBLIC_AUTH_EMULATOR_PORT="9099"

   NEXT_PUBLIC_ADMIN_EMAILS=admin1@example.com,admin2@example.com
   ```

3. **Start Firebase Emulators (Development)**

   For local development, start the Firebase emulators:

   ```bash
   firebase emulators:start
   ```

   The emulators will run on:
   - **Firestore**: http://localhost:4000
   - **Auth**: http://localhost:9099
   - **Emulator UI**: http://localhost:8090

4. **Run Development Server**

   ```bash
   npm run dev
   ```

   The app will automatically connect to Firebase emulators when `NEXT_PUBLIC_USE_FIREBASE_EMULATOR="true"`.

5. **Build for Production**

   For production builds, ensure `.env.production` has emulators disabled:

   ```env
   NEXT_PUBLIC_USE_FIREBASE_EMULATOR="false"
   ```

   Then build:

   ```bash
   npm run build
   ```

## Development vs Production

### Development (Local)

- Uses Firebase Emulators for Auth and Firestore
- No real data is affected
- Fast iteration and testing
- Set `NEXT_PUBLIC_USE_FIREBASE_EMULATOR="true"` in `.env.local`

### Production (Deployed)

- Uses actual Firebase services
- Real user data
- Set `NEXT_PUBLIC_USE_FIREBASE_EMULATOR="false"` in `.env.production`
- Deploy Firestore rules before going live:
  ```bash
  firebase deploy --only firestore:rules
  ```

## Routes

- `/` - Landing page
- `/forms/[slug]` - Public form access
- `/admin` - Admin dashboard
- `/admin/builder` - Create/edit forms
- `/admin/responses` - View all forms
- `/admin/responses/[slug]` - View form responses

## Admin Access

Admin access is controlled via the `NEXT_PUBLIC_ADMIN_EMAILS` environment variable. Only users with whitelisted emails can access the admin dashboard.

## License

MIT License - See LICENSE file for details

## Contributing

This platform is built for Atria Summer of Code. Contributions are welcome!

---

Built with ❤️ by **Apex Community** × **OSCode**
