import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom"

import Frame from "./Frame"
import Login from "./Login"
import Logout from "./Logout"
import { connect } from "../store"

class App extends Component {
  render() {
    let { authenticated } = this.props

    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route
            path="/"
            render={() =>
              authenticated ? <Frame /> : <Redirect to="/login" />
            }
          />
        </Switch>
      </Router>
    )
  }
}

export default connect(state => ({ authenticated: state.authenticated }))(App)
