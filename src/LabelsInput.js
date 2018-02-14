import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
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
          action={
            <Button
              onClick={this.handleAddLabelClick}
            >Add label
            </Button>
          }
          onChange={this.handleChange} />
        
        <Labels
          labels={this.props.labels}
        />
      </Form.Group>
    )
  }

}

export default LabelsInput