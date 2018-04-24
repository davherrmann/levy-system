import React from "react"
import { firebase } from "../firebase"
import AuthUserContext from "./AuthUserContext"

export default function withAuthentication(Component) {
  return class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        authUser: firebase.auth().currentUser,
      }
    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }))
      })
    }

    render() {
      const { authUser } = this.state

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component />
        </AuthUserContext.Provider>
      )
    }
  }
}
