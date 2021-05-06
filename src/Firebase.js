import firebase from 'firebase';
import env from "react-dotenv";
const firebaseConfig = {
    apiKey: `${env.API_KEY}`,
    authDomain: `${env.AUTH_DOMAIN}`,
    projectId: `${env.PROJECT_ID}`,
    storageBucket: `${env.STORAGE_BUCKET}`,
    messagingSenderId: `${env.MESSAGING_SENDER_ID}`,
    appId: `${env.APP_ID}`,
    measurementId: `${env.MEASUREMENT_ID}`
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  

  export {auth, provider};
  export default db;