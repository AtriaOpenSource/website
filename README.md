# OSAtria Platform

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
- Protected admin routes

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
   
   Update `.env.local` with your Firebase configuration and admin emails:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   NEXT_PUBLIC_ADMIN_EMAILS=admin1@example.com,admin2@example.com
   ```

3. **Deploy Firestore Rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
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

This platform is built for OSAtria events. Contributions are welcome!

---

Built with ❤️ by **Apex Community** × **OSCode**
