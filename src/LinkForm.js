import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'
import LabelsInput from './LabelsInput'
import Labels from './Labels'

class LinkForm extends Component {
 
  state = {
    id: this.props.linkId || null,
    url: this.props.url || '',
    name: this.props.name || '',
    labels: this.props.labels || []
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const link = this.state;
    this.props.onSaveLink(link);
    this.setState({ url: '', name: '', labels: [] });
  }

  handleAddLabel = label => {
    this.setState({ labels: this.state.labels.concat(label) })
  }

  handleRemoveLabel = labelId => {
    this.setState({ labels: this.state.labels.filter(label => (label.id === labelId)) })
  }

  render() {
    const { url, name, labels } = this.state;
    console.log(this.props.saveButtonText)
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          fluid
          type="text"
          name="url"
          value={url}
          placeholder="URL"
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          type='text'
          name='name'
          value={name}
          placeholder="Name"
          onChange={this.handleChange}
        />
        <LabelsInput
          labels={labels}
          onAddLabel={this.handleAddLabel}
          onRemoveLabel={this.handleRemoveLabel}
        />
        <Labels
          labels={this.state.labels}
        />
        <Form.Button primary fluid>{this.props.saveButtonText}</Form.Button>
      </Form>
    );
  }

}

export default LinkForm