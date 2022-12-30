import React from 'react'
import { Chip } from '@mui/material'

export default function Labels(props) {
  
  const handleDelete = (e, label) => {
    props.onRemove(label.id)
  }

  const labels = props.labels.map((label) => (
    <Chip
      key={label.id}
      content={label.name}
    />
  ))

  const removableLabels = props.labels.map((label) => (
    <Chip
      key={label.id}
      id={label.id}
      label='Clickable Deletable'
      variant='outlined'
      onClick={handleClick}
      onDelete={handleDelete}
    />
  ))

  return <>{props.onRemove ? removableLabels : labels}</>
}
