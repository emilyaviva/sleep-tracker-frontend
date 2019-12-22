import React, { useState, useEffect, useRef } from 'react'
import useFetch from 'use-http'

const SleepPeriodsList = ({ personId }) => {
  const [request, response] = useFetch('http://localhost:3001')
  const [sleepPeriodsList, setSleepPeriodsList] = useState([])

  const mounted = useRef(false)
  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    initializeSleepPeriodsList()
  })

  const initializeSleepPeriodsList = async () => {
    const initialSleepPeriodsList = await request.get(`/people/${personId}/sleep_periods`)
    if (response.ok) setSleepPeriodsList(initialSleepPeriodsList)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await request.post(`/people/${personId}/sleep_periods`, {
      started_at: e.target.startedAt.value,
      ended_at: e.target.endedAt.value,
      quality: e.target.quality.value,
      notes: e.target.notes.value
    })
    if (response.ok) setSleepPeriodsList([...sleepPeriodsList, response.data])
  }

  return (
    <>
      {request.loading && <div>Loading…</div>}
      <table className='SleepPeriodsList'>
        <thead>
          <tr>
            <th>Started At</th>
            <th>Ended At</th>
            <th>Quality</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {sleepPeriodsList.map(sleepPeriod => (
            <tr key={sleepPeriod.id}>
              <td>{sleepPeriod.started_at}</td>
              <td>{sleepPeriod.ended_at}</td>
              <td>{sleepPeriod.quality}</td>
              <td>{sleepPeriod.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='new-sleep-period'>
        <h3>Add New Sleep Period</h3>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Started At' name='startedAt' />
          <input type='text' placeholder='Ended At' name='endedAt' />
          <input type='text' placeholder='Quality' name='quality' />
          <input type='text' placeholder='Notes' name='notes' />
          <input type='submit' value='Add Sleep Period' />
        </form>
        {request.error && <div className='error'>{request.error}</div>}
      </div>
    </>
  )
}


export default SleepPeriodsList
