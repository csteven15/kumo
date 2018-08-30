import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyDi5AneOGnbY0mYgCtphIPfO4_SVQDW3N0",
  authDomain: "kumo-5aa27.firebaseapp.com",
  databaseURL: "https://kumo-5aa27.firebaseio.com",
  projectId: "kumo-5aa27",
  storageBucket: "kumo-5aa27.appspot.com",
  messagingSenderId: "630046378499"
};
var fire = firebase.initializeApp(config);
export default fire;
