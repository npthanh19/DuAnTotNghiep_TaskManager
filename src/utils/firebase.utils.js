import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
     apiKey: 'AIzaSyBaLOVCjh091l964jYlxTEC0cSDmlMT-EQ',
     authDomain: 'task-289c1.firebaseapp.com',
     projectId: 'task-289c1',
     storageBucket: 'task-289c1.appspot.com',
     messagingSenderId: '161273638646',
     appId: '1:161273638646:web:ff28fb75412e3975b186d7',
     measurementId: 'G-WK6G9YC2HZ',
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
     prompt: 'select_account ',
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// update