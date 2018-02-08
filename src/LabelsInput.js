import React, {Component} from 'react'
import {Form, Button, Input} from 'semantic-ui-react'
import Labels from './Labels'

class LabelsInput extends Component {

  state = {
    labelToAdd: '',
  }

  handleChange = (e, label) => {
    this.setState({
      labelToAdd: label.value
    })
  }

  handleAddLabelClick = (e) => {
    e.preventDefault()
    this.setState({labelToAdd: ''})
    this.props.onAddLabel({
      id: this.props.labels.length + 1,
      name: this.state.labelToAdd
    })
  }

  render() {
    const labelToAdd = this.state.labelToAdd

    return (
      <Form.Group>
        <Form.Input
          type='text'
          name='label'
          placeholder='Tags'
          value={labelToAdd}
          onChange={this.handleChange} />
        <Button
          onClick={this.handleAddLabelClick}
        >Add label
        </Button>
        
        <Labels
          labels={this.props.labels}
        />
      </Form.Group>
    )
  }

}

export default LabelsInput