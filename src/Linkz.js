import React, { Component } from 'react';
import { Grid, Container, Segment, Menu, Header, Form, Input, Item, Button} from 'semantic-ui-react'

import Link from './Link'
import LinkForm from './LinkForm'

class Linkz extends Component {

  state = {
    linkz: [],
    filterString: ''
  }

  componentWillMount() {
    this.getLinkzFromServer(linkz => 
      this.setState({ linkz: linkz })
    )
  }

  getLinkzFromServer = (success) => {    
    fetch('http://192.168.1.127:3000/linkz')
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.statusText))
        }
      })
      .then(response => response.json())
      .then(success)
      .catch(error => console.log(error))
  }

  handleAddLink = (url, name, labels) => {
    this.addLink(url, name, labels);
    this.getLinkzFromServer();
  }

  handleEditClick = (e, props) => {
    console.log(e, props)
  }

  addLink = (url, name, labels) => {

    fetch('http://192.168.1.127:3000/linkz', {
      method: 'post',
      body: JSON.stringify({url, name, labels}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.statusText))
        }
      })
      .then(response => response.json())
      .then(link => this.setState({linkz : this.state.linkz.concat(link)}))
      .catch(error => console.log(error))
  };

  handleDeleteLink = (linkId) => {
    this.deleteLink(linkId);
  }

  deleteLink = (linkId) => {
    this.deletLinkFromServer(linkId);
    this.setState({
      linkz: this.state.linkz.filter(link => link._id !== linkId)
    })
  }

  deletLinkFromServer = (linkId) => {    
    fetch('http://192.168.1.127:3000/linkz/' + linkId, {
      method:'delete',
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(new Error(response.statusText))
      }
    })
    .then(response => response.json())
    .then(linkId)
    .catch(error => console.log(error))   
  };

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
          onDeleteLink={this.handleDeleteLink}
        />
      );
    }); 

    let headerStyle = { marginTop: '2em', marginBottom: '1em', textAlign: 'center' }

    return (
      <Container>
        <Grid>
          <Grid.Column width={16}>
            <Header style={headerStyle} as='h1' content='Linkz' />
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              <LinkForm onAddLink={this.handleAddLink} />
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

export default Linkz