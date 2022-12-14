import App from './App'

import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

import { CssBaseline } from '@mui/material'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <>
    {/* <StrictMode> */}
    <CssBaseline />
    <App />
    {/* </StrictMode> */}
  </>
)
