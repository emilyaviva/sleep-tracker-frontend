import React from 'react'
import { Link } from '@reach/router'
import './PeopleListPerson.css'

const PeopleListPerson = ({ name, birthdate, personId }) => (
  <tr className='PeopleListPerson'>
    <td className='person-name'>
      <Link to={`/people/${personId}`}>
        {name}
      </Link>
    </td>
    <td className='person-birthdate'>{birthdate}</td>
  </tr>
)

export default PeopleListPerson
