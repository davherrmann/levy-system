/* eslint-env browser */
import React, { Component } from "react"
import { Button, Form, Icon, Input, Modal, Select } from "semantic-ui-react"

const categoryOptions = [
  { key: "a", text: "Category A", value: "a" },
  { key: "b", text: "Category B", value: "b" },
  { key: "c", text: "Category C", value: "c" },
]

class AddTransactionModal extends Component {
  constructor(props) {
    super(props)

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      modalOpen: false,
      officeOptions: [],
    }
  }

  handleOpen() {
    this.setState({ modalOpen: true })
    const offices = JSON.parse(localStorage.getItem("offices"))
    this.setState({
      officeOptions: offices.map(office => ({
        key: office.id,
        value: office.id,
        text: office.id,
      })),
    })
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
      targetofficeid: this.state.office,
      amount: parseInt(this.state.amount, 10),
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
              options={this.state.officeOptions}
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
              options={categoryOptions}
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
