import React, { Component } from "react"
import { Redirect, Route, Switch, withRouter } from "react-router-dom"
import { firebase } from "../firebase"

import AddTransactionModal from "./AddTransactionModal"
import Login from "./Login"
import NavBar from "./NavBar"
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

    this.loadTransactions = this.loadTransactions.bind(this)
    this.subscribeToTransactions = this.subscribeToTransactions.bind(this)
    this.unsubscribeFromTransactions = this.unsubscribeFromTransactions.bind(
      this
    )

    this.state = {
      authenticated: true,
      categories: [],
      offices: [],
      claims: {},
      sourceTransactions: [],
      targetTransactions: [],
      users: [],
    }
  }

  loadTransactions({ year, period }) {
    this.period = { year, period }

    if (!this.cancelSourceTransactions || !this.cancelTargetTransactions) {
      return
    }

    this.subscribeToTransactions()
  }

  unsubscribeFromTransactions() {
    if (this.cancelSourceTransactions) {
      this.cancelSourceTransactions()
    }
    if (this.cancelTargetTransactions) {
      this.cancelTargetTransactions()
    }
  }

  subscribeToTransactions() {
    this.unsubscribeFromTransactions()
    if (!this.period) {
      return
    }

    if (this.state.claims.admin) {
      this.cancelSourceTransactions = firebase
        .firestore()
        .collection("transactions")
        .where("period", "==", this.period.year + "-" + this.period.period)
        .orderBy("createdAt")
        .onSnapshot(
          querySnapshot => {
            this.setState({
              sourceTransactions: querySnapshot.docs.map(doc => doc.data()),
            })
          },
          err => console.log("source transactions:", err)
        )
      return
    }

    this.cancelSourceTransactions = firebase
      .firestore()
      .collection("transactions")
      .where("period", "==", this.period.year + "-" + this.period.period)
      .where("sourceOffice", "==", this.state.claims.office)
      .orderBy("createdAt")
      .onSnapshot(
        querySnapshot => {
          this.setState({
            sourceTransactions: querySnapshot.docs.map(doc => doc.data()),
          })
        },
        err => console.log("source transactions:", err)
      )

    this.cancelTargetTransactions = firebase
      .firestore()
      .collection("transactions")
      .where("period", "==", this.period.year + "-" + this.period.period)
      .where("targetOffice", "==", this.state.claims.office)
      .orderBy("createdAt")
      .onSnapshot(
        querySnapshot => {
          this.setState({
            targetTransactions: querySnapshot.docs.map(doc => doc.data()),
          })
        },
        err => console.log("target transactions:", err)
      )
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

    subs.push(
      firebase
        .firestore()
        .collection("categories")
        .onSnapshot(
          querySnapshot => {
            this.setState({
              categories: querySnapshot.docs.map(doc => doc.data()),
            })
          },
          err => console.log("categories:", err)
        )
    )

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
              this.subscribeToTransactions()
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
    this.unsubscribeFromTransactions()

    this.cancelSourceTransactions = undefined
    this.cancelTargetTransactions = undefined
  }

  addTransaction(transaction) {
    firebase
      .firestore()
      .collection("transactions")
      .add(transaction)
      .catch(err => console.log(err))
  }

  render() {
    let {
      authenticated,
      categories,
      claims,
      offices,
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
        <NavBar users={users} />
        <Switch>
          <Route
            exact
            path="/users"
            render={() => <Users offices={offices} users={users} />}
          />
          <Route
            path="/transactions/:year?/:period?"
            render={() => (
              <React.Fragment>
                <TransactionsContainer loadTransactions={this.loadTransactions}>
                  <Transactions
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
