import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import * as firebase from "firebase"

var config = {
  apiKey: "AIzaSyCqN3e3Xmi_sc7thEa3eIvDLnm0Ov9vlDA",
  authDomain: "levy-system.firebaseapp.com",
  databaseURL: "https://levy-system.firebaseio.com",
  projectId: "levy-system",
  storageBucket: "levy-system.appspot.com",
  messagingSenderId: "793947371968",
}
firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()
