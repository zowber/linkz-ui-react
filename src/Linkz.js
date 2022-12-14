import React from 'react'
import Link from './Link'
import {
  ListItem,
  ListItemText,
} from '@mui/material'

export default function Linkz(props) {
  return (
    <>
      {props.linkz.map((link) => {
        return (
          <Link
            key={link._id}
            id={link._id}
            name={link.name}
            url={link.url}
            labels={link.labels}
            createdDate={link.Created_date}
            onOpenEdit={props.onOpenEdit}
            onDeleteLink={props.onDeleteLink}
            onSaveLink={props.onSaveLink}
          />
        )
      })}
      <ListItem>
        <ListItemText sx={{textAlign: 'center'}} primary={`${props.linkz.length} Linkz`} />
      </ListItem>
    </>
  )
}
