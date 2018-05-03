import React from "react"
import { Link, withRouter } from "react-router-dom"
import { Button, Icon, Table } from "semantic-ui-react"
import { DateTime } from "luxon"

const DATE_SHORT = {
  month: "short",
  day: "numeric",
}

const defaultPeriod = (date = new Date()) => {
  let month = date.getMonth()
  let year = date.getFullYear()

  return {
    year: month === 0 ? year - 1 : year,
    period: month === 0 ? 6 : Math.ceil(month / 2),
  }
}

const AddTransactionButton = () => (
  <Link to="/transactions/add">
    <Button floated="right" icon labelPosition="left" primary size="small">
      <Icon name="plus" />
      Add Transaction
    </Button>
  </Link>
)

const calcPrevious = ({ year, period }) =>
  period === 1
    ? { year: year - 1, period: 6 }
    : { year: year, period: period - 1 }

const calcNext = ({ year, period }) =>
  period === 6
    ? { year: year + 1, period: 1 }
    : { year: year, period: period + 1 }

const periodName = ({ year, period }) =>
  ({
    1: `February – March ${year}`,
    2: `April – May ${year}`,
    3: `June – July ${year}`,
    4: `August – September ${year}`,
    5: `October – November ${year}`,
    6: `December ${year} – January ${year + 1}`,
  }[period])

const Transactions = ({
  transactions = [],
  history,
  match: {
    params: { year = defaultPeriod().year, period = defaultPeriod().period },
  },
}) => {
  if (year === "add") {
    year = defaultPeriod().year
  }

  let current = {
    year: parseInt(year, 10),
    period: parseInt(period, 10),
  }
  let previous = calcPrevious(current)
  let next = calcNext(current)

  return (
    <Table compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            colSpan="6"
            style={{
              padding: "0.5em 0.7em",
            }}
          >
            <Button.Group size="mini">
              <Button
                color="blue"
                icon
                size="mini"
                style={{ padding: "0.7em 1em" }}
                onClick={() =>
                  history.push(
                    `/transactions/${previous.year}/${previous.period}`
                  )
                }
              >
                <Icon name="chevron left" />
              </Button>
              <Button
                color="blue"
                icon
                size="mini"
                style={{ padding: "0.7em 1em" }}
                onClick={() =>
                  history.push(`/transactions/${next.year}/${next.period}`)
                }
              >
                <Icon name="chevron right" />
              </Button>
            </Button.Group>
            <span style={{ marginLeft: "1em" }}>{periodName(current)}</span>
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>From</Table.HeaderCell>
          <Table.HeaderCell>To</Table.HeaderCell>
          <Table.HeaderCell collapsing>Date</Table.HeaderCell>
          <Table.HeaderCell collapsing textAlign="right">
            Amount
          </Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell>Comment</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {transactions.map((t, key) => (
          <Table.Row key={key}>
            <Table.Cell collapsing>{t.sourceOffice}</Table.Cell>
            <Table.Cell collapsing>{t.targetOffice}</Table.Cell>
            <Table.Cell collapsing>
              {t.createdAt &&
                DateTime.fromMillis(t.createdAt.seconds * 1000).toLocaleString(
                  DATE_SHORT
                )}
            </Table.Cell>
            <Table.Cell collapsing textAlign="right">
              {(t.amountInCents / 100).toFixed(2) + " " + t.currency}
            </Table.Cell>
            <Table.Cell collapsing>{t.category}</Table.Cell>
            <Table.Cell>{t.comment}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan="6">
            <AddTransactionButton />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default withRouter(Transactions)
