import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommitList(props) {
    const [commitList, setCommitList] = useState([])
    console.log(props.public_list.public_repo_data)
    console.log(Object.values(props.public_list.public_repo_data))

    useEffect(() =>{
    for( let [key,value] of Object.entries(props.public_list.public_repo_data)){
        if(value==="public"){
            console.log("commitList")
                axios.get(`https://api.github.com/repos/${process.env.REACT_APP_USER}/${key}/commits`)
                .then((response) => {
                    setCommitList( response.data);
                
            })
            
            
        }
    }}, []);

    console.log(commitList)
    commitList.map((item) =>{
        console.log("j")
    })
  return (
    <div>list</div>
  )
}

export default CommitList