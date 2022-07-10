import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommitList(props) {
    const [commitList, setCommitList] = useState([])
    console.log(props.public_list.commitList)
    let commit_values = props.public_list.commitList;

    function commit_count(date, count){
        this.date = date;
        this.count = count;
        // this.message = [];
    }
    for (var i=0; i<commit_values.length; i++){
        console.log(commit_values[i].date)
    }

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
      console.log(findOcc(commit_values, key))
    
  return (
    <div>list</div>
  )
}

export default CommitList