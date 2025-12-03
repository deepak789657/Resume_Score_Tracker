import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADySOjEc5TsWX_qKaXul7UDinCjMxR-DI",
  authDomain: "mernai-538c0.firebaseapp.com",
  projectId: "mernai-538c0",
  storageBucket: "mernai-538c0.firebasestorage.app",
  messagingSenderId: "244797323134",
  appId: "1:244797323134:web:7f877f64e7319cb22be52f",
  measurementId: "G-6SQNP7TFFN"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {auth,googleProvider};