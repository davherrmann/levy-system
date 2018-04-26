import React, { Component } from "react"
import { firebase } from "../firebase"
import * as firebaseui from "firebaseui"

class Login extends Component {
  componentDidMount() {
    firebase.authui.start("#firebase-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true
        },
      },
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInFlow: "popup",
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
      ],
      signInSuccessUrl: "/",
    })
  }

  render() {
    return <div id="firebase-auth-container" style={{ marginTop: "5rem" }} />
  }
}

export default Login
