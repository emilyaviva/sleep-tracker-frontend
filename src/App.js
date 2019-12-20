import React from 'react'
import { Router } from '@reach/router'
import './App.css'

import AppHeader from './components/AppHeader'
import PeopleList from './components/PeopleList'
import SleepPeriodsList from './components/SleepPeriodsList'

const App = () => (
  <main className='App'>
    <AppHeader />
    <Router>
      <PeopleList path="/" />
      <SleepPeriodsList path="/people/:personId" />
    </Router>
  </main>
)

export default App
