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

class App extends Component {
  constructor() {
    super()

    this.loadTransactions = this.loadTransactions.bind(this)
    this.subscribeToTransactions = this.subscribeToTransactions.bind(this)

    this.state = {
      authenticated: true,
      categories: [],
      offices: [],
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

  subscribeToTransactions() {
    if (this.cancelSourceTransactions) {
      this.cancelSourceTransactions()
    }
    if (this.cancelTargetTransactions) {
      this.cancelTargetTransactions()
    }
    this.cancelSourceTransactions = firebase
      .firestore()
      .collection("transactions")
      .where("period", "==", this.period.year + "-" + this.period.period)
      .where("sourceOffice", "==", "UK Office")
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
      .where("targetOffice", "==", "UK Office")
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

    this.subscribeToTransactions()

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
      })
    )

    this.subs = subs
  }

  componentWillUnmount() {
    this.subs.forEach(cancelSubscription => cancelSubscription())
    this.cancelSourceTransactions()
    this.cancelTargetTransactions()
  }

  addTransaction(transaction) {
    firebase
      .firestore()
      .collection("transactions")
      .add(transaction)
      .then(doc => console.log(doc))
      .catch(err => console.log(err))
  }

  render() {
    let {
      authenticated,
      categories,
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
                    categories={categories}
                    offices={offices}
                    transactions={transactions}
                  />
                </TransactionsContainer>
                <Route
                  path="/transactions/add"
                  render={() => (
                    <AddTransactionModal
                      addTransaction={this.addTransaction}
                      categories={categories}
                      offices={offices}
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
