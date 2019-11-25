import React from 'react'
import './PersonSummary.css'

const PersonSummary = ({ name, birthdate }) => (
  <tr className='PersonSummary'>
    <td className='person-name'>{name}</td>
    <td className='person-birthdate'>{birthdate}</td>
  </tr>
)

export default PersonSummary
