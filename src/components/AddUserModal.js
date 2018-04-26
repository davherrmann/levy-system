import React, { Component } from "react"
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

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      modalOpen: false,
    }
  }

  handleOpen() {
    this.setState({ modalOpen: true })
  }

  handleClose() {
    this.setState({ modalOpen: false })
  }

  handleSubmit() {
    this.handleClose()
    this.props.onSubmit({
      id: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      officeid: this.state.office.split(":")[0],
      officecurrency: this.state.office.split(":")[1],
      admin: this.state.admin,
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
        open={this.state.modalOpen}
        trigger={
          <Button
            floated="right"
            icon
            labelPosition="left"
            primary
            size="small"
            onClick={this.handleOpen}
          >
            <Icon name="plus" />
            Add User
          </Button>
        }
      >
        <Modal.Header>Add User</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              control={Input}
              name="username"
              label="Username"
              placeholder="Username"
              {...h}
            />
            <Form.Field
              control={Input}
              name="firstname"
              label="First name"
              placeholder="First name"
              {...h}
            />
            <Form.Field
              control={Input}
              name="lastname"
              label="Last name"
              placeholder="Last name"
              {...h}
            />
            <Form.Field
              control={Select}
              name="office"
              label="Office"
              options={this.props.offices.map(({ name }, key) => ({
                key,
                value: name,
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

export default AddUserModal
