import React, { Component } from "react"
import { Redirect, Route, Switch, withRouter } from "react-router-dom"
import { firebase } from "../firebase"

import Login from "./Login"
import NavBar from "./NavBar"
import Transactions from "./Transactions"
import Users from "./Users"

class App extends Component {
  constructor() {
    super()

    this.state = {
      authenticated: true,
      offices: [],
      transactions: [],
      users: [],
    }
  }

  componentDidMount() {
    let subs = []

    // DB realtime updates
    subs.push(
      firebase
        .firestore()
        .collection("users")
        .onSnapshot(
          querySnapshot => {
            this.setState({ users: querySnapshot.docs.map(doc => doc.data()) })
          },
          err => console.log("users:", err)
        )
    )

    subs.push(
      firebase
        .firestore()
        .collection("transactions")
        .onSnapshot(
          querySnapshot => {
            this.setState({
              transactions: querySnapshot.docs.map(doc => doc.data()),
            })
          },
          err => console.log("transactions:", err)
        )
    )

    subs.push(
      firebase
        .firestore()
        .collection("offices")
        .onSnapshot(
          querySnapshot => {
            this.setState({
              offices: querySnapshot.docs.map(doc => doc.data()),
            })
          },
          err => console.log("offices:", err)
        )
    )

    // Auth updates
    subs.push(
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ authenticated: !!user })
      })
    )

    this.subs = subs
  }

  componentWillUnmount() {
    this.subs.forEach(cancelSubscription => cancelSubscription())
  }

  render() {
    let { authenticated, offices, transactions, users } = this.state

    if (!authenticated) {
      return <Login authenticated={authenticated} />
    }

    return (
      <div style={{ margin: "0 auto", maxWidth: "60rem", padding: "1em" }}>
        <NavBar users={users} />
        <Switch>
          <Route
            exact
            path="/users"
            render={() => <Users offices={offices} users={users} />}
          />
          <Route
            exact
            path="/transactions"
            render={() => (
              <Transactions offices={offices} transactions={transactions} />
            )}
          />
          <Redirect from="/" to="/transactions" />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
