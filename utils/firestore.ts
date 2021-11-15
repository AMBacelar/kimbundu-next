import admin from "firebase-admin"
const serviceAccount = JSON.parse(process.env.FIRESTORE_SERVICE_ACCOUNT_DATA);

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default admin.firestore();