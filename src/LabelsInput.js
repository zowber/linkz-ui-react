import React, { Component } from 'react'
import {
  Button,
  TextField,
} from '@mui/material'

class LabelsInput extends Component {
  state = {
    labelToAdd: ''
  }

  handleChange = (e, label) => {
    this.setState({
      labelToAdd: label.value
    })
  }

  handleAddLabelClick = e => {
    e.preventDefault()
    this.props.onAddLabel({
      id: this.props.labels.length + 1,
      name: this.state.labelToAdd
    })
    this.setState({ labelToAdd: '' })
  }

  render() {
    const labelToAdd = this.state.labelToAdd

    return (
      <TextField
        label='Tag'
        margin='normal'
        fullWidth
        value={labelToAdd}
        action={<Button onClick={this.handleAddLabelClick}>Add label</Button>}
        onChange={this.handleChange}
      />
    )
  }
}

export default LabelsInput
