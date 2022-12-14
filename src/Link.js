import { useState } from 'react'
import {
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
} from '@mui/material'
import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import isURL from 'validator/lib/isURL'
import Labels from './Labels'
import LinkForm from './LinkForm'

export default function Link(props) {
  const [isEditing, setIsEditing] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const urlToHost = (url) => {
    if (isURL(url)) {
      return new URL(url).host.replace('www.', '')
    } else {
      return url
    }
  }

  const handleDelete = () => {
    props.onDeleteLink(props.id)
    handleClose()
  }

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton
              edge='end'
              onClick={handleClick}
              aria-label='edit'>
              <MoreVertIcon />
            </IconButton>
            <Paper>
              <Menu
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}>
                <MenuItem
                  component='a'
                  href={props.url}>
                  Open link
                </MenuItem>
                <MenuItem>Edit</MenuItem>
                <Divider />
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </Paper>
          </>
        }>
        <ListItemText
          primary={`${props.name}`}
          secondary={`${urlToHost(props.url)} - ${new Date(
            props.createdDate
          ).toLocaleString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}`}
        />

        {/*       
          
          <Button icon floated="right" onClick={openEditForm}>
            <i className="edit icon" />
          </Button>
          <Button icon floated="right" onClick={handleDelete}>
            <i className="trash icon" />
          </Button>

          <Labels labels={props.labels} /> */}
      </ListItem>
      <Divider />
    </>
  )
}
