import React, { Component } from "react"
import { Redirect, Route, Switch, withRouter } from "react-router-dom"
import { firebase } from "../firebase"

import AddOfficeModal from "./AddOfficeModal"
import AddTransactionModal from "./AddTransactionModal"
import AddUserModal from "./AddUserModal"
import Login from "./Login"
import NavBar from "./NavBar"
import Offices from "./Offices"
import Subscriptions from "./Subscriptions"
import Transactions from "./Transactions"
import TransactionsContainer from "./TransactionsContainer"
import Users from "./Users"

const combineTransactions = (sourceTransactions, targetTransactions) =>
  []
    .concat(sourceTransactions, targetTransactions)
    .sort(({ createdAt: a }, { createdAt: b }) => {
      return a.seconds - b.seconds
    })

function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join("")
  )
}

class App extends Component {
  constructor() {
    super()

    this.update = this.update.bind(this)

    this.state = {
      authenticated: true,
      categories: [],
      offices: [],
      claims: {},
      period: {},
      sourceTransactions: [],
      targetTransactions: [],
      users: [],
    }
  }

  update(group) {
    this.setState(group)
  }

  componentDidMount() {
    let subs = []

    // DB realtime updates

    // Auth updates
    subs.push(
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ authenticated: !!user })

        if (user) {
          user
            .getIdToken()
            .then(idToken => {
              const claims = JSON.parse(b64DecodeUnicode(idToken.split(".")[1]))
              this.setState({ claims })
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    )

    this.subs = subs
  }

  componentWillUnmount() {
    this.subs.forEach(cancelSubscription => cancelSubscription())
  }

  addOffice(office) {
    firebase
      .firestore()
      .collection("offices")
      .add(office)
      .catch(err => console.log(err))
  }

  addTransaction(transaction) {
    firebase
      .firestore()
      .collection("transactions")
      .add(transaction)
      .catch(err => console.log(err))
  }

  addUser(user) {
    firebase
      .firestore()
      .collection("users")
      .add(user)
      .catch(err => console.log(err))
  }

  render() {
    let {
      authenticated,
      categories,
      claims,
      offices,
      period,
      sourceTransactions,
      targetTransactions,
      users,
    } = this.state
    let transactions = combineTransactions(
      sourceTransactions,
      targetTransactions
    )

    if (!authenticated) {
      return <Login authenticated={authenticated} />
    }

    return (
      <div style={{ margin: "0 auto", maxWidth: "60rem", padding: "1em" }}>
        <Subscriptions
          admin={claims.admin}
          office={claims.office}
          period={period}
          update={this.update}
        />
        <NavBar admin={claims.admin} />
        <Switch>
          <Route
            path="/users"
            render={() => (
              <React.Fragment>
                <Users offices={offices} users={users} />
                <Route
                  path="/users/add"
                  render={() => (
                    <AddUserModal offices={offices} onSubmit={this.addUser} />
                  )}
                />
              </React.Fragment>
            )}
          />
          <Route
            path="/offices"
            render={() => (
              <React.Fragment>
                <Offices offices={offices} />
                <Route
                  path="/offices/add"
                  render={() => <AddOfficeModal onSubmit={this.addOffice} />}
                />
              </React.Fragment>
            )}
          />
          <Route
            path="/transactions/:year?/:period?"
            render={() => (
              <React.Fragment>
                <TransactionsContainer
                  loadTransactions={period => this.setState({ period })}
                >
                  <Transactions
                    admin={claims.admin}
                    name={claims.name}
                    transactions={transactions}
                    office={claims.office}
                  />
                </TransactionsContainer>
                <Route
                  path="/transactions/add"
                  render={() => (
                    <AddTransactionModal
                      addTransaction={this.addTransaction}
                      categories={categories}
                      offices={offices}
                      office={claims.office}
                      currency={claims.currency}
                    />
                  )}
                />
              </React.Fragment>
            )}
          />
          <Redirect from="/" to="/transactions" />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
