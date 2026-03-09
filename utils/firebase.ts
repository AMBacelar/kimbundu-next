import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';

const raw = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;

let firebase: FirebaseApp | null = null;

if (raw) {
  const firebaseConfig = JSON.parse(raw);
  firebase =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
}

export default firebase as FirebaseApp;
