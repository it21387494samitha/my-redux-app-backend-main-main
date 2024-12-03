
import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Use your Firebase service account key
});
  
  export const verifyGoogleToken = async (token) => {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      console.log("Decoded token:", decodedToken);
      return decodedToken;
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  };