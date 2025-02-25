import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBfB0r4nqCoyLA9CbXc-2OVobunYoJHNQo",
    authDomain: "la-compra-saludable.firebaseapp.com",
    projectId: "la-compra-saludable",
    storageBucket: "la-compra-saludable.firebasestorage.app",
    messagingSenderId: "68006965166",
    appId: "1:68006965166:web:092c45a5f31b1e7a5c223f",
    measurementId: "G-FDXJHREFMY"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app); 