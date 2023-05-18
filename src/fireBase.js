import { initializeApp } from 'firebase/app'; 
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyBTPjw5_uC_zo67Vtsn5K-npfI_B3Vkah4",
   authDomain: "pet-project-79d1c.firebaseapp.com",
   projectId: "pet-project-79d1c",
   storageBucket: "pet-project-79d1c.appspot.com",
   messagingSenderId: "586431060714",
   appId: "1:586431060714:web:4b0086938e508da0f21593",
   measurementId: "G-LE9RYTZDE1"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);