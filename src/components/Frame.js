import React from "react"
import { Link, Route, Switch } from "react-router-dom"

import Transactions from "./Transactions"
import Users from "./Users"

export default () => (
  <React.Fragment>
    <header>
      <nav>
        <Link to="/logout">Logout</Link>
        <Link to="/users">Users</Link>
        <Link to="/transactions">Transactions</Link>
      </nav>
    </header>
    <main>
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route exact path="/transactions" component={Transactions} />
      </Switch>
    </main>
  </React.Fragment>
)
