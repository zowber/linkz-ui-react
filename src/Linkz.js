import React, { Component } from 'react';
import { Container, Segment, Header, Form, Item, Button} from 'semantic-ui-react'

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

  handleAddLink = (url, name) => {
    this.addLink(url, name);
    this.getLinkzFromServer();
  }

  addLink = (url, name) => {

    fetch('http://192.168.1.127:3000/linkz', {
      method: 'post',
      body: JSON.stringify({url, name}),
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

class LinkForm extends Component {
  state = { url: '', name: '' };

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { url, name } = this.state
    this.props.onAddLink(url, name);
    this.setState({ url: '', name: '' });
  }

  render() {
    const { url, name } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input type="text" name="url" value={url} label="URL" placeholder="http://example.com/" onChange={this.handleChange}/>
          <Form.Input type="text" name="name" value={name} label="Name" placeholder="Billy's Cool Site" onChange={this.handleChange} />
        </Form.Group>
        <Form.Button>Add link</Form.Button>
      </Form>
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
          </Item.Meta>
          <Item.Extra>
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

export default Linkz;