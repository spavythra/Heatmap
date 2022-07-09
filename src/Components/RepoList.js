import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RepoList =  () => {
    const [publicList, setPublicList] = useState([])
    const [privateList, setPrivateList] = useState([])
    let publicRepoName = []
    let eee = []
    

    useEffect(() =>{
        axios.get(`https://api.github.com/users/${process.env.REACT_APP_USER}/repos`)
        .then((response) => {
            setPublicList( response.data );
        
    })
    }, []);
    console.log(publicList)
    publicList.map((item) => {
        publicRepoName.push(item.name)
        eee.push(item.visibility)
    })
    // console.log(publicRepoName)

    // const headers = {
    //     "Authorization" : `Token ${process.env.TOKEN}`
    //   }

    // useEffect(() =>{
    //     axios.get(`https://api.github.com/search/repositories?q=repo:${process.env.REACT_APP_USER}`, {
    //         headers: {"Authorization" : `Token ${process.env.TOKEN}`}
    //     })
    //     .then((response) => {
    //         setPrivateList( response.data )
    //         .catch((error) => {
    //             console.log(error)
    //           });
        
    // })
    // }, []);
    // console.log(privateList)

// const response =  await axios.get(`https://api.github.com/users/spavythra/repos`)

// arr = response;
//  console.log(arr)

  return (
    <div>fff</div>
  )
}

export default RepoList