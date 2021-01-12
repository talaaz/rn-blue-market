/*
https://www.chatkitty.com/blog/posts/building-a-chat-app-with-react-native-and-firebase-part-1/
*/

import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

// Replace this with your Firebase SDK config snippet
const firebaseConfig = {
  apiKey: "AIzaSyCItqyZiHzbQjEJMjh7YwYT0A5j-MNm2fI",
  authDomain: "blue-market-1a247.firebaseapp.com",
  databaseURL: "https://blue-market-1a247-default-rtdb.firebaseio.com",
  projectId: "blue-market-1a247",
  storageBucket: "blue-market-1a247.appspot.com",
  messagingSenderId: "243551499844",
  appId: "1:243551499844:web:5005511083bfb250d7ae11",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
