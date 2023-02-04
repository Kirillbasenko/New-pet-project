import { initializeApp } from 'firebase/app'; 
import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
   apiKey: "AIzaSyAU0eWZE-xFBOYMwF2FFSBkUtVhleqidtM",
   authDomain: "pet-project1-d9ab0.firebaseapp.com",
   projectId: "pet-project1-d9ab0",
   storageBucket: "pet-project1-d9ab0.appspot.com",
   messagingSenderId: "770478192740",
   appId: "1:770478192740:web:c2202a55939fb2a47e8771",
   measurementId: "G-2QVBBZYLFP"
   };
   export const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);