/* eslint-env browser */
import React, { Component } from "react"
import { Button, Form, Icon, Input, Modal, Select } from "semantic-ui-react"

class AddTransactionModal extends Component {
  constructor(props) {
    super(props)

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

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

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value,
    })
  }

  handleSubmit() {
    this.handleClose()
    this.props.onSubmit({
      targetOffice: this.state.office,
      amountInCents: parseInt(this.state.amount, 10),
      category: this.state.category,
      comment: this.state.comment,
    })
  }

  render() {
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
            Add Transaction
          </Button>
        }
      >
        <Modal.Header>Add Transaction</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              name="office"
              control={Select}
              label="Office"
              options={this.props.offices.map(({ name }, key) => ({
                key,
                value: name,
                text: name,
              }))}
              onChange={this.handleChange}
            />
            <Form.Field
              name="amount"
              control={Input}
              label="Amount"
              placeholder="Amount"
              onChange={this.handleChange}
            />
            <Form.Field
              name="category"
              control={Select}
              label="Category"
              options={this.props.categories.map(({ name }, key) => ({
                key,
                value: name,
                text: name,
              }))}
              onChange={this.handleChange}
            />
            <Form.Field
              name="comment"
              control={Input}
              label="Comment"
              placeholder="Comment"
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

export default AddTransactionModal
