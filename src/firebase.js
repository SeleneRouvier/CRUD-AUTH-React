import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDLM6dovzV0JRVDszQFh91sJz9Nh4jKiC4",
  authDomain: "crud--react.firebaseapp.com",
  databaseURL: "https://crud--react.firebaseio.com",
  projectId: "crud--react",
  storageBucket: "crud--react.appspot.com",
  messagingSenderId: "833882539653",
  appId: "1:833882539653:web:f2f6083c78d1d4664c0bec",
  measurementId: "G-87R5NWJLRY"
};
// Initialize Firebase
app.initializeApp(firebaseConfig);


  /* con esto tenemos acceso a la configuracion de las colleciones y a la autenticacion */
  const db = app.firestore()
  const auth = app.auth()

  export {db, auth}