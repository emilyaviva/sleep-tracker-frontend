import React from 'react'
import { Router } from '@reach/router'
import './App.scss'

import AppHeader from './components/AppHeader'
import PeopleList from './components/PeopleList'
import SleepPeriodsList from './components/SleepPeriodsList'
import NotFound from './components/NotFound'

const App = () => (
  <main className='App'>
    <AppHeader />
    <Router>
      <PeopleList path="/" />
      <SleepPeriodsList path="/people/:personId" />
      <NotFound default />
    </Router>
  </main>
)

export default App
