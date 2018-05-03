import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import {
  Button,
  Checkbox,
  Form,
  Header,
  Icon,
  Input,
  Modal,
  Segment,
  Select,
} from "semantic-ui-react"

class AddUserModal extends Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClose() {
    this.props.history.push("/users")
  }

  handleSubmit() {
    this.handleClose()

    let { name: officeName, currency } = JSON.parse(this.state.office)

    this.props.onSubmit({
      email: this.state.email,
      name: this.state.name,
      office: officeName,
      currency: currency,
      admin: !!this.state.admin,
    })
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const h = {
      onChange: this.handleChange,
    }

    return (
      <Modal
        size="tiny"
        closeIcon
        closeOnRootNodeClick={false}
        onClose={this.handleClose}
        open={true}
      >
        <Modal.Header>Add User</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              control={Input}
              name="email"
              label="Email"
              placeholder="Email"
              {...h}
            />
            <Form.Field
              control={Input}
              name="name"
              label="Name"
              placeholder="Name"
              {...h}
            />
            <Form.Field
              control={Select}
              name="office"
              label="Office"
              options={this.props.offices.map(({ name, currency }, key) => ({
                key,
                value: JSON.stringify({ name, currency }),
                text: name,
              }))}
              {...h}
            />
            <Segment color="red">
              <Header as="h5">Please be careful here</Header>
              <Form.Field
                name="admin"
                control={Checkbox}
                label="User is an Administrator"
                {...h}
              />
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleSubmit}>
            <Icon name="checkmark" />
            Add
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withRouter(AddUserModal)
