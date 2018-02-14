import React, {Component} from 'react'
import {Item, Button} from 'semantic-ui-react'

import Labels from './Labels'

class Link extends Component {
    handleDelete = () => {
      this.props.onDeleteLink(this.props.id);
    }

    urlToHost = (url) => {
      const urlObj = new URL(url);
      const host = urlObj.host.replace('www.', '')
      return host
    };
  
    render() {
      return (
        <Item>
          <Item.Content>
            <Item.Header>
              <a href={this.props.url}>{this.props.name}</a>
            </Item.Header>
            <Button
              icon
              floated='right'
              onClick={this.handleDelete}
            >
              <i className='trash icon' />
            </Button>
            <Item.Meta>
              <span>
                <a href={this.props.url}>
                  {this.urlToHost(this.props.url)}
                </a>
              </span>
              <span>
                {new Date(this.props.createdDate).toLocaleString('en-GB', {year: 'numeric', month: 'short', day: 'numeric'})}
              </span>
            </Item.Meta>
            <Item.Extra>
              <Labels labels={this.props.labels} />
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    }
  }

  export default Link