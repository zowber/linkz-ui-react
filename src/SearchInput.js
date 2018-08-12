import React, { Component } from 'react'
import { TextField } from 'material-ui'

class SearchInput extends Component {

    handleFilterChange = (e) => {
        this.props.onFilterChange(e.target.value)
    }

    render() {
        return (
            <TextField
                placeholder='Search'
                value={this.props.filterString}
                onChange={this.handleFilterChange}
            />
        )
    }
}

export default SearchInput