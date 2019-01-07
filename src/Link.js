import React, { Component } from 'react'
import { Item, Button } from 'semantic-ui-react'
import isURL from 'validator/lib/isURL'

import Labels from './Labels'
import LinkForm from './LinkForm'

class Link extends Component {
  state = {
    isEditing: false
  }

  handleEdit = () => {
    this.openEditForm()
  }

  handleClose = () => {
    this.closeEditForm()
  }

  handleDelete = () => {
    this.props.onDeleteLink(this.props.id)
  }

  handleSaveLink = link => {
    this.props.onSaveLink(link)
    this.closeEditForm()
  }

  urlToHost = url => {
    if (isURL(url)) {
      const urlObj = new URL(url)
      const host = urlObj.host.replace('www.', '')
      return host
    } else {
      return url
    }
  }

  openEditForm = () => {
    this.setState({ isEditing: true })
  }

  closeEditForm = () => {
    this.setState({ isEditing: false })
  }

  render() {
    if (this.state.isEditing) {
      return (
        <Item>
          <Item.Content>
            <Button onClick={this.handleClose}>Close</Button>
            <LinkForm
              onSaveLink={this.handleSaveLink}
              linkId={this.props.id}
              name={this.props.name}
              url={this.props.url}
              labels={this.props.labels}
              saveButtonText="Update link"
            />
          </Item.Content>
        </Item>
      )
    } else {
      return (
        <Item>
          <Item.Content>
            <Item.Header>
              <a href={this.props.url}>{this.props.name}</a>
            </Item.Header>
            <Button icon floated="right" onClick={this.handleEdit}>
              <i className="edit icon" />
            </Button>
            <Button icon floated="right" onClick={this.handleDelete}>
              <i className="trash icon" />
            </Button>
            <Item.Meta>
              <span>
                <a href={this.props.url}>{this.urlToHost(this.props.url)}</a>
              </span>
              <span>
                {new Date(this.props.createdDate).toLocaleString('en-GB', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </Item.Meta>
            <Item.Extra>
              <Labels labels={this.props.labels} />
            </Item.Extra>
          </Item.Content>
        </Item>
      )
    }
  }
}

export default Link
