import React from 'react'
import {Label} from 'semantic-ui-react'

class Labels extends React.Component {
  render () {
    if (this.props.labels.length === 0) return null

    const labels = this.props.labels.map((label) => {
        return <Label key={label.id} tag>{label.name}</Label>
      }
    )
    return (<div>{labels}</div>)
  }
}

export default Labels