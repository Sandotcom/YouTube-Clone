// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/app'
dotenv.config()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "yt-copy-ddf02.firebaseapp.com",
  projectId: "yt-copy-ddf02",
  storageBucket: "yt-copy-ddf02.appspot.com",
  messagingSenderId: "465185694147",
  appId: "1:465185694147:web:0b7acfe6919eb86ea5dd76"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
