import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyA1VLCFKxLiD0fGaFIMkO9Gsxkyr9gUc3U",
    authDomain: "i-message-my.firebaseapp.com",
    projectId: "i-message-my",
    storageBucket: "i-message-my.appspot.com",
    messagingSenderId: "513236541808",
    appId: "1:513236541808:web:1a7271ba315cfc6f4eefb5",
    measurementId: "G-6T6CRMBSWB"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  

  export {auth, provider};
  export default db;