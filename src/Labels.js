import React from 'react'
import { Label } from 'semantic-ui-react'

class Labels extends React.Component {
  handleOnRemove = (e, label) => {
    this.props.onRemove(label.id)
  }

  render() {
    if (this.props.labels.length === 0) return null

    const labels = this.props.labels.map(label => (
      <Label key={label.id} content={label.name} />
    ))

    const removableLabels = this.props.labels.map(label => (
      <Label
        key={label.id}
        id={label.id}
        onRemove={this.handleOnRemove}
        content={label.name}
      />
    ))

    return (
      <Label.Group size="small">
        {this.props.onRemove ? removableLabels : labels}
      </Label.Group>
    )
  }
}

export default Labels
