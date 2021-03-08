import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAVpVDGJ4ImqU9Zmw_XdpPuN8D9mgvs11A",
  authDomain: "jed-clothing-db.firebaseapp.com",
  projectId: "jed-clothing-db",
  storageBucket: "jed-clothing-db.appspot.com",
  messagingSenderId: "731791741499",
  appId: "1:731791741499:web:75ec10dbfe08fd9907021e"
};

// Retrieves user info from firebase DB. If user is new, stores info in DB, then returns user info to the app for use
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  // Store any new user information in firebase DB
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  // Return user info so that we can use it in our own app
  return userRef;
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;