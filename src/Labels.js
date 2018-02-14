import React from 'react'
import {Label} from 'semantic-ui-react'

class Labels extends React.Component {
  render () {
    if (this.props.labels.length === 0) return null

    const labels = this.props.labels.map(
      label => (
        <Label key={label.id}>{label.name}</Label>
      )
    );
    return (
      <Label.Group size='small'>
        {labels}
      </Label.Group>
    )
  }
}

export default Labels