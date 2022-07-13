import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import "../App.css";
import {connect} from "react-redux";
import { commitSelector } from '../store/commitStore/commitSelectors';


//getting today's date using Date 
//coverting date to yyyy/mm/dd format
const today = new Date().toISOString().split("T")[0];

function CommitList(props) 
{
  const {commits} = props; 
  console.log(commits)
  // let commit_values = commits
  // console.log(commits)

    let final_commit_count = [];
    //total commit list from RepoList component
    let commit_values = props.public_private_list.commitList;
    // console.log(commit_values)

    // function to count the number of
    //occurance of the same date
    function findOcc(arr, key)
    {
      let arr2 = [];
        
      arr.forEach((x)=>{
           
        // Checking if there is any object in arr2
        // which contains the key value
         if(arr2.some((val)=>{ return val[key] === x[key] }))
         {
           // If yes! then increase the occurrence by 1
           arr2.forEach((k)=>{
             if(k[key] === x[key]){ 
               k["count"]++
             }
          })  
         }
         else
         {
           // If not! Then create a new object initialize 
           // it with the present iteration key's value and 
           // set the occurrence to 1
           let a = {}
           a[key] = x[key]
           a["count"] = 1
           arr2.push(a);
         }
      }) 
      return arr2
    }

      let key = "date"
        // console.log(findOcc(commit_values, key))

      final_commit_count = findOcc(commits, key)
      // -----end of function---------

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
          for (var j=0; j<final_commit_count.length; j++)
          {
            if(final_commit_count[j].date === date.toISOString().slice(0, 10))
            {
              return final_commit_count[j].count ;
            } 
            else
            {
              continue
            }
          }
          return 0;
        }
          
      }
    // -----end of function---------

      function count_print(value)
      {
        return(<div>the value is {value}</div>)
      }
    
    return (
    <div> 
    
    <CalendarHeatmap
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
    <ReactTooltip />
    {/* {count_print(empty)} */}
    </div>
  )
}

// export default CommitList

export default connect(
  (state) => ({
    commits: commitSelector(state),
  }),
  (dispatch) => ({
    
  })
)(CommitList)