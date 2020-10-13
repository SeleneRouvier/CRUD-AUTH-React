import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyARARB0By4MwECKNYG-C07lknbs55uDgUo",
    authDomain: "chat-react-98829.firebaseapp.com",
    databaseURL: "https://chat-react-98829.firebaseio.com",
    projectId: "chat-react-98829",
    storageBucket: "chat-react-98829.appspot.com",
    messagingSenderId: "30459671353",
    appId: "1:30459671353:web:903ff6c56727883c0f6ee8"
  };
  // Initialize Firebase
  app.initializeApp(firebaseConfig);


  /* con esto tenemos acceso a la configuracion de las colleciones y a la autenticacion */
  const db = app.firestore()
  const auth = app.auth()

  export {db, auth}