import React from 'react'
import Link from './Link'

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
            onEditLink={props.onDeleteLink}
            onSaveLink={props.onSaveLink}
          />
        )
      })}
    </>
  )
}
