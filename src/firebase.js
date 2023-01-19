import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
   apiKey: "AIzaSyCg0khrROtUgQ6oR-LUZNuO3Ky0w_S6hZk",
   authDomain: "whatsapp-mern-56d98.firebaseapp.com",
   projectId: "whatsapp-mern-56d98",
   storageBucket: "whatsapp-mern-56d98.appspot.com",
   messagingSenderId: "638850071915",
   appId: "1:638850071915:web:328134fdf21713e08f602e"
 };

 
 const firebaseApp = firebase.initializeApp(firebaseConfig);
 const db = firebaseApp.firestore();
 const auth = firebase.auth();
 const provider = new firebase.auth.GoogleAuthProvider();

 export {auth, provider};
 export default db;