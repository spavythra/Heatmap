import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RepoList =  (Private_repos) => {
    const [publicList, setPublicList] = useState([])
    let publicRepoName = []
    let visibility = []
    var public_repo_data = {}
    console.log(Private_repos)
    

    useEffect(() =>{
        axios.get(`https://api.github.com/users/${process.env.REACT_APP_USER}/repos`)
        .then((response) => {
            setPublicList( response.data );
        
    })
    }, []);
    console.log(publicList)
    publicList.map((item) => {
        publicRepoName.push(item.name)
        visibility.push(item.visibility)
    })

    for (let i = 0; i < publicRepoName.length; i++){
        public_repo_data[publicRepoName[i]] = visibility[i];
    }

    console.log(public_repo_data)
    

  return (
    <div>fff</div>
  )
}

export default RepoList