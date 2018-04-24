import React, { Component } from "react"
import { Redirect } from "react-router-dom"

import { firebase } from "../firebase"

export default class Logout extends Component {
  componentDidMount() {
    firebase.auth().signOut()
  }

  render() {
    return <Redirect to="/" />
  }
}
