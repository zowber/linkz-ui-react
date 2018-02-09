import React, {Component} from 'react'
import {Item, Button} from 'semantic-ui-react'

import Labels from './Labels'

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

  export default Link