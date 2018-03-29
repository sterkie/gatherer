import * as firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyDMvIkB_8jtXc303MFt16yCpPbSGWDXANQ",
  authDomain: "gatherer-b0f8d.firebaseapp.com",
  databaseURL: "https://gatherer-b0f8d.firebaseio.com",
  projectId: "gatherer-b0f8d",
  storageBucket: "gatherer-b0f8d.appspot.com",
  messagingSenderId: "270952306348"
});

export default firebase;
export const db = firebase.database();
export const auth = firebase.auth();
