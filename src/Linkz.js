import React, {Component} from 'react'
import {Container, Segment, Header, Item, Button} from 'semantic-ui-react'

import Labels from './Labels'
import LinkForm from './LinkForm'

class Linkz extends Component {

  state = {
    linkz: []
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

  updateLink = () => {
    //...
  }

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
  
  render() {
    const linkz = this.state.linkz.sort((a, b) => {
      return new Date(b.Created_date) - new Date(a.Created_date)
    });
    const linkComponents = linkz.map((link) => {
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

    var headerStyle = { marginTop: '2em', marginBottom: '1em' }

    return (
      <Container>
        <Header as='h1' textAlign='center' style={headerStyle}>Linkz</Header>
        <Segment>
          <LinkForm onAddLink={this.handleAddLink} />
        </Segment>
        <Segment>
          <Item.Group divided>
            {linkComponents}
          </Item.Group>
        </Segment>
      </Container>
    );
  }
}

class Link extends Component {
  handleDelete = () => {
    this.props.onDeleteLink(this.props.id);
  }

  render() {
    return (
      <Item>
        <Item.Content>
          <Item.Header>{this.props.name}</Item.Header>
          <Item.Meta>
            <span>
              <a href={this.props.url}>
                {this.props.url}
              </a>
            </span>
            <span>
              {new Date(this.props.createdDate).toLocaleString('en-GB', {year: 'numeric', month: 'numeric', day: 'numeric', hour12: true, hour: 'numeric', minute: '2-digit'})}
            </span>
            <span>
              
            </span>
          </Item.Meta>
          <Item.Extra>
            <Labels labels={this.props.labels} />
            <Button
              floated='right'
              onClick={this.handleDelete}>Delete
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default Linkz