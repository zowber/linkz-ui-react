import { useState, useLayoutEffect, useEffect } from 'react'
import {
  Grid,
  Container,
  Segment,
  Menu,
  Header,
  Input,
  Item
} from 'semantic-ui-react'

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
      setLinkz( linkz.concat(res) )
    })
  }

  const handleUpdateLink = link => {
    API.updateLink(link, res => {
      setLinkz( linkz.map( el => el._id === res._id ? res : el ) ) 
    })
  }

  const handleDeleteLink = linkId => {
    API.deleteLinkFromServer(linkId, res => {
      setLinkz( res )
    })
  }

  return (
    <Container style={{ paddingTop: '1em' }}>
      <Grid stackable>
        <Grid.Column width={4}>
          <Segment>
            <Header as="h4" content="Add a link" />
            <LinkForm onSaveLink={handleAddLink} saveButtonText="Save" />
          </Segment>
        </Grid.Column>
        <Grid.Column width={12}>
          <Menu attached="top">
            <Menu.Item>{linkz.length} links</Menu.Item>
            <Menu.Item position="right">
              <Input
                icon="search"
                transparent
                placeholder="Search"
                onChange={e => setFilter(e.target.value)}
              />
            </Menu.Item>
          </Menu>
          <Segment attached="bottom">
            <Item.Group divided>
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
            </Item.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  )
}