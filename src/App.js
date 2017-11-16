import React, { Component } from 'react';
import jQuery from 'jquery';

class App extends Component {
  render() {
    return (
      <LinkzList/>
    );
  }
}

class LinkzList extends Component {

  constructor() {
    super();
    this.state = {
      linkz: []
    };
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

  _addLink (name, url) {
    const link = {
      name,
      url
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

  componentWillMount() {
    jQuery.ajax({
      url: "http://192.168.1.127:3000/linkz",
      type: "get",
      success: (res) => {
        this.setState({ linkz: res })
      }
    });
  }
  
  render() {
    const linkz = this._getLinkz();
    return (
      <div className="linkz-list">
        <LinkForm addLink={this._addLink.bind(this)} />
        <p>{linkz.length} links</p>
        {linkz}
      </div>
    );
  }
}

class LinkForm extends Component {
  render() {
    return (
        <form className="link-form" onSubmit={this._handleSubmit.bind(this)}>
          <input type="text" id="url" name="url" placeholder="URL" ref={(url) => this._url = url} />
          <input type="text" id="name" name="name" placeholder="Name" ref={(name) => this._name = name }/>
          <button type="submit">Add link</button>
        </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    let name = this._name;
    let url = this._url;

    this.props.addLink(name.value, url.value);
  }
}

class Link extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>Name: {this.props.name}</li>
          <li>Url: <a href={this.props.url}>{this.props.url}</a></li>
          <li>Created: {this.props.created}</li>
          <li><a href={this.props.id} onClick={this._handleDelete.bind(this)}>Delete</a></li>
        </ul>
      </div>
    );
  }

  _handleDelete(event) {
    event.preventDefault();
    this.props.onDelete(this.props.id);
  }
}

export default App;
