import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

let firebaseConfig = {
  apiKey: "AIzaSyCLMY_YK3FzpHWu_EeogYJ-RuucJag5M6Q",
  authDomain: "expense-tracker-88d58.firebaseapp.com",
  projectId: "expense-tracker-88d58",
  storageBucket: "expense-tracker-88d58.firebasestorage.app",
  messagingSenderId: "651441421391",
  appId: "1:651441421391:web:b8a81a68c35fdcfd1a3e3a",
  measurementId: "G-EM3T0K75G8"
}

let app = initializeApp(firebaseConfig)
export let auth = getAuth(app)
export let provider = new GoogleAuthProvider()
export let database = getFirestore(app)