import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider } from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNyXrw7SUKL3BPZMzd3MDldlEkeaHpo58",
  authDomain: "crwn-clothing-db-2ea7f.firebaseapp.com",
  projectId: "crwn-clothing-db-2ea7f",
  storageBucket: "crwn-clothing-db-2ea7f.appspot.com",
  messagingSenderId: "980323820836",
  appId: "1:980323820836:web:36e4e723d6c76e56167fb1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    }
      catch (error) {
        console.log('error creating user', error.message);
      }
  }

  return userDocRef;
  // if user does nto exist
  // create / set the document
}
