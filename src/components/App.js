import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import AuthUserContext from "./AuthUserContext"
import Frame from "./Frame"
import Login from "./Login"
import Logout from "./Logout"
import withAuthentication from "./withAuthentication"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Frame} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <AuthUserContext.Consumer>
            {authUser => (authUser ? "logged in" : "logged out")}
          </AuthUserContext.Consumer>
        </div>
      </Router>
    )
  }
}

export default withAuthentication(App)
