import React from 'react'
import { Link } from '@reach/router'
import './AppHeader.scss'

const AppHeader = () => (
  <Link to='/'>
    <h1 className='AppHeader'>Sleep Tracker</h1>
  </Link>
)

export default AppHeader
