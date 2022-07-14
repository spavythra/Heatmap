import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';

function Form({commits,count}) {
    console.log(count)
//getting today's date using Date 
//coverting date to yyyy/mm/dd format
const today = new Date().toISOString().split("T")[0];

//function to set the date and count
const randomValues = getRange(365).map(index => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(shiftDate(today, -index)),
    };
  });
  // -----end of function---------
  
  //function to shift the date one by one
  function shiftDate(date, numDays) 
  {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }
  // -----end of function---------
  
  //function to create a range
  function getRange(count) 
  {
    return Array.from({ length: count }, (_, i) => i);
  }
  // -----end of function---------
  
  
  //function to check the date from the available commit list
        //and return its count value
        function getRandomInt(date) 
        {
          for(var i=0; i<commits.length; i++)
          {
            for (var j=0; j<count.length; j++)
            {
              if(count[j].date === date.toISOString().slice(0, 10))
              {
                return count[j].count ;
              } 
              else
              {
                continue
              }
            }
            return 0;
          }
            
        }
  

  return (
    <div><CalendarHeatmap
    startDate={shiftDate(today, -365)}
    endDate={today}
    values={randomValues}
    classForValue={value => {
      
      if (value.count===0) {
        return 'color-empty';
      }else if(value.count<3) {return `color-github-1`}
      else if(value.count<6) {return `color-github-2`}
      else if(value.count<9) {return `color-github-3`}
      else if(value.count>=9)  {return `color-github-4`}
      
    }}
    tooltipDataAttrs={value => {
      // console.log(value.date)
      return {
        'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${
          value.count
        }`,
      };
    }}
    showWeekdayLabels={true}
    onClick={value => {
      alert(`Clicked on value with count: ${value.count}`)
    }}
  />
  <ReactTooltip /></div>
  )
}

export default Form