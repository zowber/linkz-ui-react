import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'
import LabelsInput from './LabelsInput' 

class LinkForm extends Component {
 
  state = {
    url: '',
    name: '',
    labels: []
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { url, name, labels } = this.state
    this.props.onAddLink(url, name, labels);

    // Empty out the form
    this.setState({ url: '', name: '', labels: [] });
  }

  handleAddLabel = label => {
    this.setState({ labels: this.state.labels.concat(label) })
  }

  handleRemoveLabel = labelId => {
  }

  render() {
    const { url, name, labels } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            type="text"
            name="url"
            value={url}
            placeholder="URL"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            type='text'
            name='name'
            value={name}
            placeholder="Name"
            onChange={this.handleChange}
          />
        </Form.Group>
        <LabelsInput
          labels={labels}
          onAddLabel={this.handleAddLabel}
          onRemoveLabel={this.handleRemoveLabel}
        />
        <Form.Button>Add link</Form.Button>
      </Form>
    );
  }

}

export default LinkForm