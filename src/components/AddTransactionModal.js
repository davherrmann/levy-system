/* eslint-env browser */
import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Button, Form, Icon, Input, Modal, Select } from "semantic-ui-react"

const defaultPeriod = (date = new Date()) => {
  let month = date.getMonth()
  let year = date.getFullYear()

  return {
    year: month === 0 ? year - 1 : year,
    period: month === 0 ? 6 : Math.ceil(month / 2),
  }
}

class AddTransactionModal extends Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClose() {
    this.props.history.push("/transactions")
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value,
    })
  }

  handleSubmit() {
    this.handleClose()

    let period = defaultPeriod()

    this.props.addTransaction({
      sourceOffice: this.props.office,
      targetOffice: this.state.office,
      amountInCents: parseInt(this.state.amount, 10),
      category: this.state.category,
      comment: this.state.comment,
      currency: this.props.currency,
      createdAt: new Date(),
      period: period.year + "-" + period.period,
    })
  }

  render() {
    let { categories = [], offices = [], office } = this.props

    return (
      <Modal
        size="tiny"
        closeIcon
        closeOnRootNodeClick={false}
        onClose={this.handleClose}
        open={true}
      >
        <Modal.Header>Add Transaction</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              name="office"
              control={Select}
              label="Office"
              options={offices
                .filter(({ name }) => name !== office)
                .map(({ name }, key) => ({
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
              options={categories.map(({ name }, key) => ({
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

export default withRouter(AddTransactionModal)
