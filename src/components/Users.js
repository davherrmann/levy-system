import React from "react"
import { connect } from "../store"

const Users = ({ users }) => (
  <ul>{users.map((user, key) => <li key={key}>{JSON.stringify(user)}</li>)}</ul>
)

export default connect(state => ({ users: state.users }))(Users)
