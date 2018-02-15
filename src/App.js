import React, { Component } from 'react';
import { Grid, Container, Segment, Menu, Header, Input, Item} from 'semantic-ui-react'

import Link from './Link'
import LinkForm from './LinkForm'

import data from './data'

class App extends Component {

  state = {
    linkz: [],
    filterString: ''
  }

  componentWillMount() {
    data.getLinkzFromServer(res => 
      this.setState({ linkz: res })
    );
  }

  handleAddLink = (link) => {
    data.addLink(link, res => {
      this.setState({ linkz: this.state.linkz.concat(res) })
    });
  }

  handleUpdateLink = (link) => {
    data.updateLink(link, res => {
      this.setState({ linkz: res })
    })
  }
  

  handleDeleteLink = (linkId, res) => {
    data.deletLinkFromServer(linkId, res => {
      this.setState({ linkz: res })
    });
  }

  handleFilterStringChange = (e, {value}) => {
    this.setState({filterString: value})
  }
  
  render() {
    const linkz = this.state.linkz.sort((a, b) => {
      return new Date(b.Created_date) - new Date(a.Created_date)
    });
    const filteredLinks = linkz.filter(link => (
        link.name.toLowerCase().includes(
          this.state.filterString.toLowerCase()
        )
      )
    );

    const linkComponents = filteredLinks.map((link) => {
      return (
        <Link
          key={link._id}
          id={link._id}
          name={link.name}
          url={link.url}
          labels={link.labels}
          createdDate={link.Created_date}
          onSaveLink={this.handleUpdateLink}
          onDeleteLink={this.handleDeleteLink}
        />
      );
    }); 

    let headerStyle = { marginTop: '2em', marginBottom: '1em', textAlign: 'center' }

    return (
      <Container>
        <Grid stackable>
          <Grid.Column width={16}>
            <Header style={headerStyle} as='h1' content='Linkz' />
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              <LinkForm onSaveLink={this.handleAddLink} saveButtonText='Add link' />
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
            <Menu attached='top'>
              <Menu.Item>
                {linkComponents.length} links
              </Menu.Item>
              <Menu.Item
                position='right'
              >
                <Input
                  icon='search' 
                  transparent
                  placeholder='Search'
                  value={this.state.filterString}
                  onChange={this.handleFilterStringChange}
                />
              </Menu.Item>
            </Menu>
            <Segment attached='bottom'>
              <Item.Group divided>
                {linkComponents}
              </Item.Group>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default App