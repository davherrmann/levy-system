import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom"
import { firebase } from "../firebase"

import Frame from "./Frame"
import Login from "./Login"
import Logout from "./Logout"
import { connect } from "../store"

class App extends Component {
  unsubscribe = []

  componentDidMount() {
    let {
      actions: { login, logout, update },
    } = this.props

    let unsubscribe = this.unsubscribe

    // DB realtime updates
    let db = firebase.firestore()

    unsubscribe.push(
      db.collection("users").onSnapshot(querySnapshot => {
        update({ users: querySnapshot.docs.map(doc => doc.data()) })
      })
    )

    // Auth updates
    unsubscribe.push(
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          login()
        } else {
          logout()
        }
      })
    )
  }

  componentWillUnmount() {
    this.unsubscribe.forEach(unsubscribe => unsubscribe())
  }

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
