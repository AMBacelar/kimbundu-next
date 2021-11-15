import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

const firebase =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default firebase;
