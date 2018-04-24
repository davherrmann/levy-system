import React from "react"
import { Route, Switch } from "react-router-dom"

import NavBar from "./NavBar"
import Transactions from "./Transactions"
import Users from "./Users"

export default () => (
  <React.Fragment>
    <NavBar />
    <main>
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route exact path="/transactions" component={Transactions} />
      </Switch>
    </main>
  </React.Fragment>
)
