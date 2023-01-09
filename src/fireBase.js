import { initializeApp } from 'firebase/app'; 
import { getFirestore } from "firebase/firestore";

   /*const firebaseConfig = {
   apiKey: "AIzaSyDOndLFRwPr6sjyI1Rq_8UPUREaqn6-qaI",
   authDomain: "pet-project-ae15a.firebaseapp.com",
   databaseURL: "https://pet-project-ae15a-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "pet-project-ae15a",
   storageBucket: "pet-project-ae15a.appspot.com",
   messagingSenderId: "943297888867",
   appId: "1:943297888867:web:41fb20cb44467b8f08ae56",
   measurementId: "G-QRQKM6J60F"
   };
   const firebaseConfig = {
      apiKey: "AIzaSyBV-oIP-JRm9UV8aaoTTG1LYI92bydLiUc",
      authDomain: "pet-data-47fd2.firebaseapp.com",
      projectId: "pet-data-47fd2",
      storageBucket: "pet-data-47fd2.appspot.com",
      messagingSenderId: "422171693587",
      appId: "1:422171693587:web:da01e6b3942b660a23e5e6",
      measurementId: "G-7HE93CR5GW"
   };*/
   const firebaseConfig = {
      apiKey: "AIzaSyDsXkkAjdcJr-AIEYmc7T71L93Nyn6CyVw",
      authDomain: "pet-project3.firebaseapp.com",
      projectId: "pet-project3",
      storageBucket: "pet-project3.appspot.com",
      messagingSenderId: "663385819578",
      appId: "1:663385819578:web:7f44a67589825796bb7583",
      measurementId: "G-LBQLQM9ENP"
   };
   export const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);