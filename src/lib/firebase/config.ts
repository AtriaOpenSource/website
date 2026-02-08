import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

// Connect to emulators in development
const isEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

if (isEmulator && typeof window !== 'undefined') {
    // Only connect to emulators once
    const firestoreHost = process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST || 'localhost';
    const firestorePort = parseInt(process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT || '4000');
    const authHost = process.env.NEXT_PUBLIC_AUTH_EMULATOR_HOST || 'localhost';
    const authPort = parseInt(process.env.NEXT_PUBLIC_AUTH_EMULATOR_PORT || '9099');

    try {
        // @ts-ignore - _settingsFrozen is internal but useful to check
        if (!db._settingsFrozen) {
            connectFirestoreEmulator(db, firestoreHost, firestorePort);
            console.log(`🔧 Connected to Firestore Emulator at ${firestoreHost}:${firestorePort}`);
        }
    } catch (error) {
        console.log('Firestore emulator already connected');
    }

    try {
        // @ts-ignore - config is internal but useful to check
        if (!auth.config.emulator) {
            connectAuthEmulator(auth, `http://${authHost}:${authPort}`, { disableWarnings: true });
            console.log(`🔧 Connected to Auth Emulator at ${authHost}:${authPort}`);
        }
    } catch (error) {
        console.log('Auth emulator already connected');
    }
}

export { app, db, auth };
