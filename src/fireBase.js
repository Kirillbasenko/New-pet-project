import { initializeApp } from 'firebase/app'; 
import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
   apiKey: "AIzaSyDOndLFRwPr6sjyI1Rq_8UPUREaqn6-qaI",
   authDomain: "pet-project-ae15a.firebaseapp.com",
   databaseURL: "https://pet-project-ae15a-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "pet-project-ae15a",
   storageBucket: "pet-project-ae15a.appspot.com",
   messagingSenderId: "943297888867",
   appId: "1:943297888867:web:41fb20cb44467b8f08ae56",
   measurementId: "G-QRQKM6J60F"
   };
   export const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);