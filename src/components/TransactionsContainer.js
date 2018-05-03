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
        year = defaultPeriod().year
      }

      if (year !== this.year || period !== this.period) {
        this.year = year
        this.period = period

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
