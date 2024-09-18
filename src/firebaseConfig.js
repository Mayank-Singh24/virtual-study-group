import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBoSLOytEL1unBqZAZbPEZrJ9Zth4P60W8",
    authDomain: "virtual-study-group-33b96.firebaseapp.com",
    projectId: "virtual-study-group-33b96",
    storageBucket: "virtual-study-group-33b96.appspot.com",
    messagingSenderId: "577410462794",
    appId: "1:577410462794:web:66d02a2894f9b18d6be2b3",
    measurementId: "G-Z846FGKWYL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
