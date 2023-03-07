import { initializeApp } from 'firebase/app'; 
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

   const firebaseConfig = {
      apiKey: "AIzaSyCQSl7QvMqcfbDRABJeikz3-ONJP6WCWHg",
      authDomain: "pet-project-photo.firebaseapp.com",
      projectId: "pet-project-photo",
      storageBucket: "pet-project-photo.appspot.com",
      messagingSenderId: "760309131827",
      appId: "1:760309131827:web:9c6acb7c5f6a24d14c9146",
      measurementId: "G-S2MPZKTEYQ"
   };
   export const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   const auth = getAuth(app);