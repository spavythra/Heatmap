import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommitList(props) {
    const [commitList, setCommitList] = useState([])
    console.log(props.public_list.commitList)

    function commit_count(date, count){
        this.date = date;
        this.count = count;
        // this.message = [];
    }
    
    
  return (
    <div>list</div>
  )
}

export default CommitList