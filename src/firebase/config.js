import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEI-FRdsOWD5b4fX3Nl1xOGYDU0sCmLvo",
  authDomain: "fir-tweets-crud.firebaseapp.com",
  projectId: "fir-tweets-crud",
  storageBucket: "fir-tweets-crud.appspot.com",
  messagingSenderId: "603302388240",
  appId: "1:603302388240:web:6c5cdd42e3aceb4438a095",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const refCollection = collection(db, "tweets");

export { db, refCollection };
export default app;
