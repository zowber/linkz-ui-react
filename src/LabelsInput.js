import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'

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
    const labelToAdd = this.state.labelToAdd;

    return (
      <Form.Input
        fluid
        type='text'
        name='label'
        placeholder='Tags'
        value={labelToAdd}
        action={
          <Button
            onClick={this.handleAddLabelClick}
          >Add tag
          </Button>
        }
        onChange={this.handleChange}
      />
    );
  }
}

export default LabelsInput