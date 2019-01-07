import React from 'react'
import ReactDOM from 'react-dom'
import Linkz from './Linkz'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Linkz />, div)
})
