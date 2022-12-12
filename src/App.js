import { useState, useEffect } from 'react'
import { Input } from 'semantic-ui-react'
import {
  AppBar,
  Box,
  Divider,
  List,
  Toolbar, 
  Typography,
  IconButton,
  InputBase } from '@mui/material'
import {
  Menu as MenuIcon,
  Search as SearchIcon } from '@mui/icons-material'

import Link from './Link'
import LinkForm from './LinkForm'

import * as API from './data'

export default function App(props) {

  const [linkz, setLinkz] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    API.getLinkzFromServer(res => {
      setLinkz(res)
    })
  }, [])

  const handleAddLink = link => {
    API.addLink(link, res => {
      setLinkz(linkz.concat(res))
    })
  }

  const handleUpdateLink = link => {
    API.updateLink(link, res => {
      setLinkz(linkz.map(el => el._id === res._id ? res : el))
    })
  }

  const handleDeleteLink = linkId => {
    API.deleteLinkFromServer(linkId, res => {
      setLinkz(res)
    })
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Linkz
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {linkz.length} links

      <LinkForm onSaveLink={handleAddLink} saveButtonText="Save" />

      <Input
        icon="search"
        transparent
        placeholder="Search"
        onChange={e => setFilter(e.target.value)}
      />

      <List>
        <Divider />
          {linkz ?
            linkz
              .filter(link => link.name.toLowerCase().includes(filter.toLowerCase()))
              .sort((a, b) => new Date(b.Created_date) - new Date(a.Created_date))
              .map(link => {
                return (
                  <Link
                    key={link._id}
                    id={link._id}
                    name={link.name}
                    url={link.url}
                    labels={link.labels}
                    createdDate={link.Created_date}
                    onSaveLink={handleUpdateLink}
                    onDeleteLink={handleDeleteLink}
                  />
                )
              })
            : null
          }
          </List>
  </>
  )
}