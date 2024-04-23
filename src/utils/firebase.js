// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0GdpMwNx_jpz-O4pbSDRXufnMVpDEVmA",
  authDomain: "netflixgpt-a99ab.firebaseapp.com",
  projectId: "netflixgpt-a99ab",
  storageBucket: "netflixgpt-a99ab.appspot.com",
  messagingSenderId: "778586421585",
  appId: "1:778586421585:web:243a26ee47091f484c7b70",
  measurementId: "G-H8GJLM6WJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);
export const auth=getAuth();