import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Frame from "./Frame"
import Login from "./Login"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Frame} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    )
  }
}

export default App
