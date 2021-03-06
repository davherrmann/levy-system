import { Component } from "react"
import { firebase } from "../firebase"

const collection = group => firebase.firestore().collection(group)

export default class Subscriptions extends Component {
  subscribeTo(ref, group) {
    return ref.onSnapshot(
      snap => {
        this.props.update({
          [group]: snap.docs.map(doc => doc.data()),
        })
      },
      err => console.log(group, err)
    )
  }

  subscribeToTransactions() {
    let {
      admin,
      office,
      period: { year, period },
    } = this.props

    if (!period || (!office && !admin)) {
      return () => {}
    }

    if (admin) {
      return this.subscribeTo(
        collection("transactions")
          .where("period", "==", year + "-" + period)
          .orderBy("createdAt"),
        "sourceTransactions"
      )
    }

    let transactions = [
      this.subscribeTo(
        collection("transactions")
          .where("period", "==", year + "-" + period)
          .where("sourceOffice", "==", office)
          .orderBy("createdAt"),
        "sourceTransactions"
      ),
      this.subscribeTo(
        collection("transactions")
          .where("period", "==", year + "-" + period)
          .where("targetOffice", "==", office)
          .orderBy("createdAt"),
        "targetTransactions"
      ),
    ]

    return () => transactions.forEach(cancel => cancel())
  }

  componentDidMount() {
    // add subscriptions
    this.subscriptions = {
      categories: this.subscribeTo(collection("categories"), "categories"),
      offices: this.subscribeTo(collection("offices"), "offices"),
      transactions: this.subscribeToTransactions(),
    }
  }

  componentDidUpdate({
    admin: prevAdmin,
    office: prevOffice,
    period: prevPeriod,
  }) {
    // change subscriptions
    let { admin, office, period } = this.props

    if (admin === prevAdmin && period === prevPeriod && office === prevOffice) {
      return
    }

    if (admin) {
      this.subscriptions.users && this.subscriptions.users()
      this.subscriptions.users = this.subscribeTo(collection("users"), "users")
    }

    this.subscriptions.transactions()
    this.subscriptions.transactions = this.subscribeToTransactions()
  }

  componentWillUnmount() {
    // cancel subscriptions
    Object.values(this.subscriptions).forEach(cancel => cancel())
  }

  render() {
    return null
  }
}
