import React from "react"
import { Link } from "react-router-dom"
import { connect } from "../store"

const NavBar = ({ users }) => (
  <header>
    <nav>
      <Link to="/logout">Logout</Link>
      {users.length > 0 && <Link to="/users">Users</Link>}
      <Link to="/transactions">Transactions</Link>
    </nav>
  </header>
)

export default connect(state => ({ users: state.users }))(NavBar)
