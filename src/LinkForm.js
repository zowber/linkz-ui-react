import React, { Component } from 'react'
import { Box, Button, Divider, TextField } from '@mui/material'
import isURL from 'validator/lib/isURL'
import LabelsInput from './LabelsInput'
import Labels from './Labels'

class LinkForm extends Component {
  state = {
    link: {
      id: this.props.linkId || null,
      url: this.props.url || '',
      name: this.props.name || '',
      labels: this.props.labels || [],
    },
    validationErrors: {},
  }

  handleChange = (e) => {
    const link = this.state.link
    link[e.target.name] = e.target.value
    this.setState({ link })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const link = this.state.link

    // Validate input and return early if their are any errors
    const validationErrors = this.validateLink(link)
    this.setState({ validationErrors })
    if (Object.keys(validationErrors).length) return

    // Else if their are no errors then pass the link to the save handler and
    // empty the inputs
    this.props.onSaveLink(link)
    this.setState({ url: '', name: '', labels: [] })
  }

  validateLink = (link) => {
    /* Simple validation  to check that data is available for mandatory fields
    and that URL syntax is valid. Returns an empty string in the case of no
    errors or, in the case of errors, will return an object where the
    key is the name of the invalid field and the value is the error message. */
    const errors = {}
    if (!link.name) errors.name = 'Name is required'
    if (!link.url) errors.url = 'Url is required'
    if (link.url && !isURL(link.url))
      errors.url = "This doesn't look like a Url :("
    return errors
  }

  handleAddLabel = (label) => {
    this.setState({
      link: {
        ...this.state.link,
        labels: this.state.link.labels.concat(label),
      },
    })
  }

  handleRemoveLabel = (labelId) => {
    this.setState({
      link: {
        ...this.state.link,
        labels: this.state.link.labels.filter((label) => label.id !== labelId),
      },
    })
  }

  render() {
    const link = this.state.link
    return (
      <form
        error={this.state.hasErrors}
        onSubmit={this.handleSubmit}
      >
        <Box sx={{ m: 2, marginTop: 1 }}>
          <TextField
            name='url'
            value={link.url}
            label='URL'
            variant='outlined'
            placeholder='URL'
            margin='normal'
            fullWidth
            onChange={this.handleChange}
          />
          <TextField
            name='name'
            value={link.name}
            label='Name'
            variant='outlined'
            placeholder='Name'
            margin='normal'
            fullWidth
            onChange={this.handleChange}
          />
          <LabelsInput
            labels={link.labels}
            onAddLabel={this.handleAddLabel}
          />
          <Labels
            labels={link.labels}
            onRemove={this.handleRemoveLabel}
          />
        </Box>
        <Divider />
        <Box
          sx={{ m: 2 }}
          display='flex'
          justifyContent='flex-end'
          alignItems='flex-end'
        >
          <Button
            type='submit'
            variant='contained'
            size='large'
            disableElevation
          >
            {this.props.saveButtonText}
          </Button>
        </Box>
      </form>
    )
  }
}

export default LinkForm
