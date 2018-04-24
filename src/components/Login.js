import React, { Component } from "react"
import { firebase } from "../firebase"
import * as firebaseui from "firebaseui"
import { Redirect } from "react-router-dom"

import { connect } from "../store"

class Login extends Component {
  componentDidMount() {
    if (this.props.authenticated) {
      return
    }

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
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      signInSuccessUrl: "/",
    })
  }

  render() {
    if (this.props.authenticated) {
      return <Redirect to="/" />
    }

    return <div id="firebase-auth-container" />
  }
}

export default connect(state => ({ authenticated: state.authenticated }))(Login)
