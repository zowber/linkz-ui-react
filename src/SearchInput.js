import { TextField } from 'semantic-ui-react'

export default function SearchInput(props) {
  handleFilterChange = e => {
    props.onFilterChange(e.target.value)
  }

  return (
    <TextField
      placeholder="Search"
      value={props.filterString}
      onChange={handleFilterChange}
    />
  )
}