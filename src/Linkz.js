import React, { Component } from 'react';
import jQuery from 'jquery';
import { Container, Segment, Divider, Header, Form, Item, Button} from 'semantic-ui-react'

class Linkz extends Component {

  constructor() {
    super();
    this.state = {
      linkz: []
    };
  }

  componentWillMount() {
    jQuery.ajax({
      url: "http://192.168.1.127:3000/linkz",
      type: "get",
      success: (res) => {
        this.setState({ linkz: res.reverse() })
      }
    });
  }
  
  _getLinkz() {  
    return this.state.linkz.map((link) => {
      return(
          <Link
            key={link._id}
            id={link._id}
            name={link.name}
            url={link.url}
            created={link.Created_date}
            onDelete={this._deleteLink.bind(this)} />
      );
    });  
  }

  _addLink (url, name) {
    const link = {
      url,
      name
    };
    jQuery.ajax({
      url: "http://192.168.1.127:3000/linkz",
      type: "post",
      data: link,
      success: (res) => {
        this.setState({ linkz: this.state.linkz.concat([res]) });
      }
    });
  }

  _deleteLink(id) {
    jQuery.ajax({
      url: "http://192.168.1.127:3000/linkz/" + id,
      type: "delete",
      success: "TODO: Update state after delete."
    });
  }
  
  render() {
    const linkz = this._getLinkz();

    var headerStyle = { marginTop: '2em', marginBottom: '1em' }

    return (
      <Container>
        <Header as='h1' textAlign='center' style={headerStyle}>Linkz</Header>
        <Segment>
          <LinkForm addLink={this._addLink.bind(this)} />
        </Segment>
        <Segment>
          <Item.Group divided>
            {linkz}
          </Item.Group>
        </Segment>
      </Container>
    );
  }
}

class LinkForm extends Component {
  state = { url: '', name: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { url, name } = this.state
    this.props.addLink(url, name);
    this.setState({ url: '', name: '' })
  }

  render() {
    const { url, name } = this.state

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
    this.props.onDelete(this.props.id);
  }

  render() {
    return (
      <Item>
        <Item.Content>
          <Item.Header>{this.props.name}</Item.Header>
          <Item.Meta>
            <span><a href={this.props.url}>{this.props.url}</a></span>
          </Item.Meta>
          <Item.Extra>
            <Button floated='right' onClick={this.handleDelete}>Delete</Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default Linkz;
