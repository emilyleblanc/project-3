// firebase.js

import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase

// knit-and-pearl firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOBzZcVkfkJAf-mq8gEBqyqFDh9ux6CH0",
    authDomain: "shop-knit-and-pearl.firebaseapp.com",
    projectId: "shop-knit-and-pearl",
    storageBucket: "shop-knit-and-pearl.appspot.com",
    messagingSenderId: "545025053287",
    appId: "1:545025053287:web:cf9cafd8a7154f4c133ac2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase



