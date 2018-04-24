import * as firebase from "firebase"
import * as firebaseui from "firebaseui"

var config = {
  apiKey: "AIzaSyCqN3e3Xmi_sc7thEa3eIvDLnm0Ov9vlDA",
  authDomain: "levy-system.firebaseapp.com",
  databaseURL: "https://levy-system.firebaseio.com",
  projectId: "levy-system",
  storageBucket: "levy-system.appspot.com",
  messagingSenderId: "793947371968",
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

let auth = firebase.auth
let authui = new firebaseui.auth.AuthUI(auth())

export { auth, authui }
