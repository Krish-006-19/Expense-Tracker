import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

let firebaseConfig = {
  apiKey: "A****************************Q",
  authDomain: "expense-tracker-88d58.firebaseapp.com",
  projectId: "expense-tracker-88d58",
  storageBucket: "expense-tracker-88d58.firebasestorage.app",
  messagingSenderId: "651******",
  appId: "1***************************a",
  measurementId: "G-EM3T0K75G8"
}

let app = initializeApp(firebaseConfig)
export let auth = getAuth(app)
export let provider = new GoogleAuthProvider()
export let database = getFirestore(app)
