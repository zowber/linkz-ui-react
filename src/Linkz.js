import React, { Component } from 'react'

class Linkz extends Component {
  render() {
    const sortedLinkz = this.state.linkz.sort(
      (a, b) => new Date(b.Created_date) - new Date(a.Created_date)
    )
    const filteredLinks = sortedLinkz.filter(link =>
      link.name.toLowerCase().includes(this.state.filterString.toLowerCase())
    )

    const linkComponents = filteredLinks.map(link => {
      return (
        <Link
          key={link._id}
          id={link._id}
          name={link.name}
          url={link.url}
          labels={link.labels}
          createdDate={link.Created_date}
          onDeleteLink={this.handleDeleteLink}
        />
      )
    })

    return { linkComponents }
  }
}
