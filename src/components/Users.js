import React, { Component } from "react"
import { firebase } from "../firebase"

export default class Users extends Component {
  constructor() {
    super()

    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    let db = firebase.firestore()

    this.unsubscribe = db.collection("users").onSnapshot(querySnapshot => {
      this.setState({ users: querySnapshot.docs.map(doc => doc.data()) })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <ul>
        {this.state.users.map((user, key) => (
          <li key={key}>{JSON.stringify(user)}</li>
        ))}
      </ul>
    )
  }
}
