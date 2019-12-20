import React from 'react'
import { Link } from '@reach/router'
import './PersonSummary.css'

const PersonSummary = ({ name, birthdate, personId }) => (
  <tr className='PersonSummary'>
    <td className='person-name'>
      <Link to={`/people/${personId}`}>
        {name}
      </Link>
    </td>
    <td className='person-birthdate'>{birthdate}</td>
  </tr>
)

export default PersonSummary
