import { useState, useEffect, useMemo } from 'react'
import {
  AppBar,
  Box,
  Divider,
  Fab,
  List,
  Toolbar,
  Typography,
  IconButton,
  TextField,
} from '@mui/material'
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
} from '@mui/icons-material'
import Linkz from './Linkz'
import LinkForm from './LinkForm'
import * as API from './data'

export default function App(props) {
  const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
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
    API.addLink(link, (res) => {
      setLinkz({ ...link })
    })
  }

  const handleSaveLink = (link) => {
    API.updateLink(link, (res) => {
      setLinkz(linkz.map((el) => (el._id === res._id ? res : el)))
    })
  }

  const handleDeleteLink = (linkId) => {
    API.deleteLinkFromServer(linkId, (res) => {
      setLinkz(res)
    })
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Linkz
            </Typography>
          </Toolbar>
        </AppBar>
        <LinkForm
          onSaveLink={handleAddLink}
          saveButtonText='Save'
        />
        <TextField
          placeholder='Search'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <List>
          <Divider />
          {filteredSortedLinkz ? (
            <Linkz
              linkz={filteredSortedLinkz}
              onSaveLink={handleSaveLink}
              onDeleteLink={handleDeleteLink}
            />
          ) : (
            'No linkz.'
          )}
        </List>
        {linkz.length} links
        <Fab
          style={fabStyle}
          color='primary'
          aria-label='add'>
          <AddIcon />
        </Fab>
      </Box>
    </>
  )
}
