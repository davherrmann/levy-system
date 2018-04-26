import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./index.css"
import App from "./components/App"
import Logout from "./components/Logout"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/logout" component={Logout} />
      <Route path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById("root")
)
registerServiceWorker()
