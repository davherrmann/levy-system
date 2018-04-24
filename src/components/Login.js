import React, { Component } from "react"
import { firebase } from "../firebase"
import * as firebaseui from "firebaseui"

export default class Login extends Component {
  componentDidMount() {
    let ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start("#firebase-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true
        },
      },
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      signInSuccessUrl: "/loggedIn",
    })
  }

  render() {
    return <div id="firebase-auth-container" />
  }
}
