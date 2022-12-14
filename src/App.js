import React, { useState, useEffect, useMemo } from 'react'
import {
  AppBar,
  Box,
  Button,
  Divider,
  Fab,
  List,
  Modal,
  Paper,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
} from '@mui/material'
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material'
import Linkz from './Linkz'
import LinkForm from './LinkForm'
import * as API from './data'

export default function App(props) {
  const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 14,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    boxShadow: 24,
    p: 4,
  }

  const [linkz, setLinkz] = useState([])
  const [filter, setFilter] = useState('')

  const filteredSortedLinkz = useMemo(() => {
    return linkz
      .filter((link) => {
        return link.name.toLowerCase().includes(filter.toLowerCase())
      })
      .sort((a, b) => new Date(b.Created_date) - new Date(a.Created_date))
  }, [linkz, filter])

  useEffect(() => {
    API.getLinkzFromServer((res) => {
      setLinkz(res)
    })
  }, [])

  const handleAddLink = (link) => {
    console.log('handle add link')
    API.addLink(link, (res) => {
      setLinkz(linkz.concat(res))
      handleCloseModal()
    })
  }

  const handleSaveLink = (link) => {
    API.updateLink(link, (res) => {
      setLinkz(linkz.map((el) => (el._id === res._id ? res : el)))
    })
  }

  const handleDeleteLink = (linkId) => {
    API.deleteLinkFromServer(linkId, (res) => {
      console.log(res)
      //setLinkz(res)
    })
  }

  // const handleSaveLink = (link) => {
  //   props.onSaveLink(link)
  //   closeEditForm()
  // }

  const openEditForm = () => {
    setIsEditing(true)
  }

  const closeEditForm = () => {
    setIsEditing(false)
  }

  const [open, setOpen] = React.useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='sticky'>
          <Toolbar>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Linkz
            </Typography>
            <Box sx={{ p: 0, px: 1, backgroundColor: 'white' }}>
              <InputBase
                placeholder='Search'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </Box>
          </Toolbar>
        </AppBar>

        {filteredSortedLinkz ? (
          <List sx={{ paddingTop: 0 }}>
            <Linkz
              linkz={filteredSortedLinkz}
              onSaveLink={handleSaveLink}
              onDeleteLink={handleDeleteLink}
            />
          </List>
        ) : (
          'No linkz.'
        )}

        <Fab
          style={fabStyle}
          color='primary'
          aria-label='add'
          onClick={handleOpenModal}>
          <AddIcon />
        </Fab>
      </Box>

      <Modal
        open={open}
        onClose={handleCloseModal}>
        <Paper style={modalStyle}>
          <Box
            sx={{ m: 2 }}
            display='flex'
            justifyContent='space-between'
            alignItems='center'>
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'>
              Add new link
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <LinkForm
            onSaveLink={handleAddLink}
            saveButtonText='Save'
          />
        </Paper>
      </Modal>
      <Modal open={false}>
        <Button onClick={closeEditForm}>Close</Button>
        {/* <LinkForm
          onSaveLink={handleSaveLink}
          linkId={props.id}
          name={props.name}
          url={props.url}
          labels={props.labels}
          saveButtonText='Update link'
        /> */}
      </Modal>
    </>
  )
}
