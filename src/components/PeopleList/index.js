import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './PeopleList.css'

function PeopleList () {
  const [people, setPeople] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => { getPeople() }, [])

  const getPeople = async () => {
    const response = await axios.get('http://localhost:3001/people')
    setPeople(response.data)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3001/people', {
        name: e.target.name.value,
        birthdate: e.target.birthdate.value
      })
      if (response.status === 201) {
        setPeople([...people, response.data])
      }
    } catch (e) {
      setErrorMessage(e.message)
    }
  }

  return (
    <>
      <h3>All People</h3>
      <table className='PeopleList'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <tr key={person.name}>
              <td className='person-name'>{person.name}</td>
              <td className='person-birthdate'>{person.birthdate}</td>
            </tr>
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
