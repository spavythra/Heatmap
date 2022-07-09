import React, { useState, useEffect } from 'react';

const PrivateRepoList =  () => {
    const [privateList, setPrivateList] = useState([])

    useEffect (() => {
        async function fetchData(){
            try {
                let response = await fetch(`https://api.github.com/search/repositories?q=user:${process.env.REACT_APP_USER}+is:private`,{
                method: 'get',
                headers: {
                    "Authorization" : `Token ${process.env.REACT_APP_TOKEN}`
                }
            })
            let data = await response.json()
            let result = data.items
            setPrivateList(result)
            console.log(result)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    
  return (
    <div>PrivateRepoList</div>
  )
}

export default PrivateRepoList