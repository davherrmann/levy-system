import React from "react"
import { Link, Redirect } from "react-router-dom"
import AuthUserContext from "./AuthUserContext"

const Frame = () => (
  <header>
    <nav>
      <Link to="/logout">Logout</Link>
    </nav>
  </header>
)

export default () => (
  <AuthUserContext.Consumer>
    {authenticated => (authenticated ? <Frame /> : <Redirect to="/login" />)}
  </AuthUserContext.Consumer>
)
