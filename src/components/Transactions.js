import React from "react"
import { Link } from "react-router-dom"
import { Button, Icon, Table } from "semantic-ui-react"
import { DateTime } from "luxon"

const DATE_SHORT = {
  month: "short",
  day: "numeric",
}

export default ({ transactions = [] }) => (
  <Table compact>
    <Table.Header>
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
          <Link to="/transactions/add">
            <Button
              floated="right"
              icon
              labelPosition="left"
              primary
              size="small"
            >
              <Icon name="plus" />
              Add Transaction
            </Button>
          </Link>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)
