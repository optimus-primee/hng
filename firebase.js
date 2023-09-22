// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDBbeKNSE8Rcae5M2xTYcnTtv0Nl7PdQIs',
  authDomain: 'galleria-b2ce5.firebaseapp.com',
  projectId: 'galleria-b2ce5',
  storageBucket: 'galleria-b2ce5.appspot.com',
  messagingSenderId: '513183055932',
  appId: '1:513183055932:web:8a8c2af58b7c2228e28339',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
