import React from "react";
import { auth, provider } from "./config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Auth() {
  let navigate = useNavigate();
  
  let signInGoogle = async () => {
    try {
      let results = await signInWithPopup(auth, provider);
      let authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePic: results.user.photoURL,
        isLogged: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-6">
      <div className="w-full max-w-sm bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-xl p-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome</h2>
        <p className="text-gray-200">Sign in with Google to continue</p>

        <button
          onClick={signInGoogle}
          className="mt-6 flex items-center justify-center gap-2 w-full bg-white text-black py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition-all"
        >
          <span className="font-medium">Sign In with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Auth;
