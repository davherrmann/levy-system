import { Component } from "react"
import { withRouter } from "react-router-dom"

const defaultPeriod = (date = new Date()) => {
  let month = date.getMonth()
  let year = date.getFullYear()

  return {
    year: month === 0 ? year - 1 : year,
    period: month === 0 ? 6 : Math.ceil(month / 2),
  }
}

export default withRouter(
  class TransactionsContainer extends Component {
    componentDidMount() {
      let year = this.props.match.params.year
      let period = this.props.match.params.period

      this.props.loadTransactions({
        year,
        period,
      })
    }

    componentWillReceiveProps({
      match: {
        params: {
          year = defaultPeriod().year,
          period = defaultPeriod().period,
        },
      },
    }) {
      if (year === "add") {
        return
      }

      let lastYear = this.props.match.params.year
      let lastPeriod = this.props.match.params.period

      if (year !== lastYear || period !== lastPeriod) {
        this.props.loadTransactions({
          year,
          period,
        })
      }
    }

    render() {
      return this.props.children
    }
  }
)
