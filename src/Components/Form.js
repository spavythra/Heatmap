/* eslint-disable no-unreachable-loop */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import ReactTooltip from 'react-tooltip'
import 'react-calendar-heatmap/dist/styles.css'
import '../App.css'
import Message from './Message'

function Form ({ commits, count, repoCommit }) {
  const [day, setDay] = useState('')
  const [showDetails, setShowDetail] = useState(false)
  console.log(count)

  // getting today's date using Date
  // coverting date to yyyy/mm/dd format
  const today = new Date().toISOString().split('T')[0]

  // function to set the date and count
  const randomValues = getRange(365).map(index => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(shiftDate(today, -index))
    }
  })
  // -----end of function---------

  // function to shift the date one by one
  function shiftDate (date, numDays) {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + numDays)
    return newDate
  }
  // -----end of function---------

  // function to create a range
  function getRange (count) {
    return Array.from({ length: count }, (_, i) => i)
  }
  // -----end of function---------

  // function to check the date from the available commit list
  // and return its count value
  function getRandomInt (date) {
    for (let i = 0; i < commits.length; i++) {
      for (let j = 0; j < count.length; j++) {
        if (count[j].date === date.toISOString().slice(0, 10)) {
          return count[j].count
        } else {
          continue
        }
      }
      return 0
    }
  }

  function handleSubmit (e) {
    setDay(e.date.toISOString().split('T')[0])
    setShowDetail(true)
  }

  return (
    <div>
        <div className='calender'>
          <CalendarHeatmap
            startDate={shiftDate(today, -365)}
            endDate={today}
            values={randomValues}
            classForValue={value => {
              if (value.count === 0) {
                return 'color-empty'
              } else if (value.count < 3) { return 'color-github-1' } else if (value.count < 6) { return 'color-github-2' } else if (value.count < 9) { return 'color-github-3' } else if (value.count >= 9) { return 'color-github-4' }
            }}
            tooltipDataAttrs={value => {
              return {
                'data-tip': `${value.date.toISOString().slice(0, 10)} has ${
                value.count
                } commits`
              }
            }}
            showWeekdayLabels={true}
            onClick={handleSubmit}
        />
        <div className='box'><p>Less </p>
        <div className='color-box1'></div>
        <div className='color-box2'></div>
        <div className='color-box3'></div>
        <div className='color-box4'></div>
        <div className='color-box5'></div><p> More</p></div>
        <ReactTooltip />
    </div>
    { showDetails && <Message day={day} repoCommit={repoCommit}/>}
  </div>
  )
}

export default Form
