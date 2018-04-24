import React from "react"
import { firebase } from "../firebase"
import AuthUserContext from "./AuthUserContext"

export default function withAuthentication(Component) {
  return class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        authenticated: true,
      }
    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authenticated: true })
          : this.setState({ authenticated: false })
      })
    }

    render() {
      const { authenticated } = this.state

      return (
        <AuthUserContext.Provider value={authenticated}>
          <Component />
        </AuthUserContext.Provider>
      )
    }
  }
}
