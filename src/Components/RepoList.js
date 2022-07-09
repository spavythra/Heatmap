import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RepoList =  () => {
    const [publicList, setPublicList] = useState([])
    let publicRepoName = []
    let eee = []
    

    useEffect(() =>{
        axios.get('https://api.github.com/users/spavythra/repos')
        .then((response) => {
            setPublicList( response.data );
        
    })
    }, []);
    console.log(publicList)
    publicList.map((item) => {
        publicRepoName.push(item.name)
        eee.push(item.visibility)
    })
    console.log(publicRepoName)

    

// const response =  await axios.get(`https://api.github.com/users/spavythra/repos`)

// arr = response;
//  console.log(arr)

  return (
    <div>fff</div>
  )
}

export default RepoList