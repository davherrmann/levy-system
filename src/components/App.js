import React, { Component } from "react"
import { Redirect, Route, Switch, withRouter } from "react-router-dom"
import { firebase } from "../firebase"

import Login from "./Login"
import Logout from "./Logout"
import NavBar from "./NavBar"
import Transactions from "./Transactions"
import Users from "./Users"

class App extends Component {
  constructor() {
    super()

    this.state = {
      authenticated: true,
      transactions: [],
      users: [],
    }
  }

  componentDidMount() {
    // DB realtime updates
    firebase
      .firestore()
      .collection("users")
      .onSnapshot(
        querySnapshot => {
          this.setState({ users: querySnapshot.docs.map(doc => doc.data()) })
        },
        err => console.log(err)
      )

    firebase
      .firestore()
      .collection("transactions")
      .onSnapshot(
        querySnapshot => {
          this.setState({
            transactions: querySnapshot.docs.map(doc => doc.data()),
          })
        },
        err => console.log(err)
      )

    // Auth updates
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ authenticated: !!user })
    })
  }

  render() {
    let { authenticated, transactions, users } = this.state

    if (!authenticated) {
      return <Login authenticated={authenticated} />
    }

    return (
      <div style={{ margin: "0 auto", maxWidth: "60rem", padding: "1em" }}>
        <NavBar users={users} />
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route exact path="/users" render={() => <Users users={users} />} />
          <Route
            exact
            path="/transactions"
            render={() => <Transactions transactions={transactions} />}
          />
          <Redirect from="/" to="/transactions" />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
