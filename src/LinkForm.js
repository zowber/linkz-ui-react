import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'
import isURL from 'validator/lib/isURL'

import LabelsInput from './LabelsInput'
import Labels from './Labels'

class LinkForm extends Component {
 
  state = {
    link: {
      id: this.props.linkId || null,
      url: this.props.url || '',
      name: this.props.name || '',
      labels: this.props.labels || []
    },
    validationErrors: {}
  }

  handleChange = (e) => {
    const link = this.state.link;
    link[e.target.name] = e.target.value;
    this.setState({ link });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const link = this.state.link;

    const validationErrors = this.validateFields(link);
    this.setState({ validationErrors })
    if (Object.keys(validationErrors).length) return;

    this.props.onSaveLink(link);
    this.setState({ url: '', name: '', labels: [] });
  }

  validateFields = (link) => {
    const errors = {}
    if (!link.name) errors.name = 'Name is required';
    if (!link.url) errors.url = 'Url is required';
    if (link.url && !isURL(link.url)) errors.url = 'This doesn\'t look like a Url :('

    return errors;    
  }

  handleAddLabel = label => {
    this.setState({
      link: {
        ...this.state.link,
        labels: this.state.link.labels.concat(label) 
      },
    })
  }

  handleRemoveLabel = labelId => {
    this.setState({
      link: {
        ...this.state.link,
        labels: this.state.link.labels.filter(label => (label.id !== labelId))
      },
    })
  }

  render() {
    const link = this.state.link;
    return (
      <Form error={this.state.hasErrors} onSubmit={this.handleSubmit}>
        <Form.Input
          fluid
          type="text"
          name="url"
          value={link.url}
          placeholder="URL"
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          type='text'
          name='name'
          value={link.name}
          placeholder="Name"
          onChange={this.handleChange}
        />
        <LabelsInput
          labels={link.labels}
          onAddLabel={this.handleAddLabel}
        />
        <Labels labels={link.labels} onRemove={this.handleRemoveLabel} />
        <Form.Button primary fluid>{this.props.saveButtonText}</Form.Button>
      </Form>
    );
  }

}

export default LinkForm