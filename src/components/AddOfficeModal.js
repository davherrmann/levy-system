import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Button, Form, Icon, Input, Modal } from "semantic-ui-react"

class AddOfficeModal extends Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClose() {
    this.props.history.push("/offices")
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value,
    })
  }

  handleSubmit() {
    this.handleClose()
    this.props.onSubmit({
      name: this.state.name,
      currency: this.state.currency,
    })
  }

  render() {
    return (
      <Modal
        size="tiny"
        closeIcon
        closeOnRootNodeClick={false}
        onClose={this.handleClose}
        open={true}
      >
        <Modal.Header>Add Office</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              name="name"
              control={Input}
              label="Name"
              placeholder="Name"
              onChange={this.handleChange}
            />
            <Form.Field
              name="currency"
              control={Input}
              label="Currency"
              placeholder="Currency"
              onChange={this.handleChange}
            />
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

export default withRouter(AddOfficeModal)
