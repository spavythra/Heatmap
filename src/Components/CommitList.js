import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import "../App.css"

const today = new Date().toISOString().split("T")[0];

function CommitList(props) 
{
    let final_commit_count = [];

    console.log(props.public_list.commitList)
    let commit_values = props.public_list.commitList;
    console.log(commit_values)

    function commit_count(date, count){
        this.date = date;
        this.count = count;
        // this.message = [];
    }
    // for (var i=0; i<commit_values.length; i++){
    //     console.log(commit_values[i].date)
    // }

    function findOcc(arr, key){
      let arr2 = [];
        
      arr.forEach((x)=>{
           
        // Checking if there is any object in arr2
        // which contains the key value
         if(arr2.some((val)=>{ return val[key] == x[key] })){
             
           // If yes! then increase the occurrence by 1
           arr2.forEach((k)=>{
             if(k[key] === x[key]){ 
               k["count"]++
             }
          })
             
         }else{
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
      final_commit_count = findOcc(commit_values, key)
      console.log(final_commit_count)

      const randomValues = getRange(365).map(index => {
        return {
          date: shiftDate(today, -index),
          count: getRandomInt(shiftDate(today, -index)),
        };
      });

      function shiftDate(date, numDays) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + numDays);
        return newDate;
      }
      
      function getRange(count) {
        return Array.from({ length: count }, (_, i) => i);
      }
      
      function getRandomInt(date) {
        var format_date = date.toISOString().slice(0, 10);
        // console.log("qqqqq")
        // console.log(commit_values.length)
        // console.log(final_commit_count.length)
        for(var i=0; i<commit_values.length; i++){
          for (var j=0; j<final_commit_count.length; j++){
            if(final_commit_count[j].date == date.toISOString().slice(0, 10) ){
              return final_commit_count[j].count ;
            } else{
              continue
            }
          }
          return 0;
          // console.log(commit_values[i].date)
          // console.log(date.toISOString().slice(0, 10))
          // console.log("oooo")
          // if(final_commit_count[i].date == date.toISOString().slice(0, 10) ){
          //   console.log(commit_values[i].count)
          //   console.log(`${final_commit_count[i].date} - count is ${final_commit_count[i].count}`)
          //   return final_commit_count[i].count ;
          // } else if(i==(final_commit_count.length-1)){
          //   return 0;
          // }
      }
      
    }
    
  return (
    <div> <h1>react-calendar-heatmap demos</h1>
    
    <CalendarHeatmap
      startDate={shiftDate(today, -365)}
      endDate={today}
      values={randomValues}
      classForValue={value => {
        
        if (value.count==0) {
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
      onClick={value => alert(`Clicked on value with count: ${value.count}`)}
    />
    <ReactTooltip /></div>
  )
}

export default CommitList