import React from "react"
import { Link } from "react-router-dom"
import { Button, Checkbox, Icon, Table } from "semantic-ui-react"

const Offices = ({ offices }) => (
  <Table compact {...this.props}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Currency</Table.HeaderCell>
        <Table.HeaderCell>Enabled</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {offices.map((t, key) => (
        <Table.Row key={key}>
          <Table.Cell disabled={t.disabled}>{t.name}</Table.Cell>
          <Table.Cell disabled={t.disabled}>{t.currency}</Table.Cell>
          <Table.Cell collapsing textAlign="center">
            <Checkbox
              name={t.id}
              checked={!t.disabled}
              onClick={this.handleSetDisabled}
              style={{ verticalAlign: "text-top" }}
            />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>

    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan="4">
          <Link to="/offices/add">
            <Button
              floated="right"
              icon
              labelPosition="left"
              primary
              size="small"
              onClick={this.handleOpen}
            >
              <Icon name="plus" />
              Add Office
            </Button>
          </Link>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default Offices
