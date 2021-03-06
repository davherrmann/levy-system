import React from "react"
import { Link } from "react-router-dom"
import { Button, Checkbox, Icon, Table } from "semantic-ui-react"
import { firebase } from "../firebase"

const Users = ({ offices, users }) => (
  <Table compact {...this.props}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Office</Table.HeaderCell>
        <Table.HeaderCell>Admin</Table.HeaderCell>
        <Table.HeaderCell>Enabled</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {users.map((u, key) => (
        <Table.Row key={key}>
          <Table.Cell disabled={u.disabled}>{u.email}</Table.Cell>
          <Table.Cell disabled={u.disabled}>{u.name}</Table.Cell>
          <Table.Cell disabled={u.disabled}>{u.office}</Table.Cell>
          <Table.Cell collapsing disabled={u.disabled}>
            {u.admin ? "Yes" : "No"}
          </Table.Cell>
          <Table.Cell collapsing textAlign="center">
            {firebase.auth().currentUser.email !== u.email && (
              <Checkbox
                checked={!u.disabled}
                name={u.id}
                onClick={this.handleSetDisabled}
                style={{ verticalAlign: "text-top" }}
              />
            )}
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>

    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan="5">
          <Link to="/users/add">
            <Button
              floated="right"
              icon
              labelPosition="left"
              primary
              size="small"
            >
              <Icon name="plus" />
              Add User
            </Button>
          </Link>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default Users
