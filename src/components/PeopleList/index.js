import React, { useEffect, useState, useRef } from 'react'
import useFetch from 'use-http'
import './PeopleList.css'

import PeopleListPerson from '../PeopleListPerson'

function PeopleList () {
  const [request, response] = useFetch('http://localhost:3001')
  const [loading, setLoading] = useState(false)
  const [peopleList, setPeopleList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const mounted = useRef(false)
  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    initializePeopleList()
  })

  const initializePeopleList = async () => {
    try {
      setLoading(true)
      const initialPeopleList = await request.get('/people')
      if (response.ok) setPeopleList(initialPeopleList)
    } catch (e) {
      setErrorMessage(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const newPerson = await request.post('/people', {
        name: e.target.name.value,
        birthdate: e.target.birthdate.value
      })
      if (response.ok) setPeopleList([...peopleList, newPerson])
    } catch (e) {
      setErrorMessage(e.message)
    }
  }

  return (
    <>
      <h3>All People</h3>
      {loading && <div>Loading…</div>}
      <table className='PeopleList'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody>
          {peopleList.map(person => (
            <PeopleListPerson
              key={person.id}
              personId={person.id}
              name={person.name}
              birthdate={person.birthdate}
            />
          ))}
        </tbody>
      </table>
      <div className='new-person'>
        <h3>Add New Person</h3>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Name (required)' name='name' />
          <input type='text' placeholder='Birthdate (optional)' name='birthdate' />
          <input type='submit' value='Add Person' />
        </form>
        {errorMessage && <div className='error'>{errorMessage}</div>}
      </div>
    </>
  )
}

export default PeopleList
