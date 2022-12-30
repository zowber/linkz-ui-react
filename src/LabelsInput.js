import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'

export default function LabelsInput(props) {
  const [labelToAdd, setLabelToAdd] = useState('')

  const handleChange = (e) => {
    console.log(e.target.value)
    setLabelToAdd(e.target.value)
  }

  const handleAddLabelClick = (e) => {
    e.preventDefault()
    props.onAddLabel({
      id: props.labels.length + 1,
      name: labelToAdd,
    })
    setLabelToAdd('')
  }

  return (
    <TextField
      label='Label'
      margin='normal'
      fullWidth
      value={labelToAdd}
      InputProps={{
        endAdornment: <Button onClick={handleAddLabelClick}>Add</Button>,
      }}
      onChange={handleChange}
    />
  )
}