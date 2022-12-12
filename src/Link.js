import { useState } from 'react'

import { Item } from 'semantic-ui-react'
import { Button, Divider, IconButton, ListItem, ListItemText } from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'


import isURL from 'validator/lib/isURL'

import Labels from './Labels'
import LinkForm from './LinkForm'

export default function Link(props) {

  const [isEditing, setIsEditing] = useState(false)

  const handleDelete = () => {
    props.onDeleteLink(props.id)
  }

  const handleSaveLink = link => {
    props.onSaveLink(link)
    closeEditForm()
  }

  const openEditForm = () => {
    setIsEditing(true)
  }

  const closeEditForm = () => {
    setIsEditing(false)
  }

  const urlToHost = url => {
    if (isURL(url)) {
      return (new URL(url).host.replace('www.', ''))
    } else {
      return url
    }
  }

  return (
    <>
      {isEditing ?
        <Item>
          <Item.Content>
            <Button onClick={closeEditForm}>Close</Button>
            <LinkForm
              onSaveLink={handleSaveLink}
              linkId={props.id}
              name={props.name}
              url={props.url}
              labels={props.labels}
              saveButtonText="Update link"
            />
          </Item.Content>
        </Item>
        :
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="edit">
              <EditIcon />
            </IconButton>
          }
        >
          <ListItemText
            primary={`${props.name}`}
            secondary={`${urlToHost(props.url)} - ${new Date(props.createdDate).toLocaleString('en-GB',
              {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}`} />

          {/*       
          
          <Button icon floated="right" onClick={openEditForm}>
            <i className="edit icon" />
          </Button>
          <Button icon floated="right" onClick={handleDelete}>
            <i className="trash icon" />
          </Button>

          <Labels labels={props.labels} /> */}
          
        </ListItem>
      }
      <Divider />
    </>
  )
}