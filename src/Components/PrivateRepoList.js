import React, { useEffect } from 'react';
import RepoList from './RepoList';

const PrivateRepoList =  () => {
    let privateRepoName = []
    let visibility = []
    var private_repo_data = {}

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
            // console.log(result)

            result.map((item) => {
                // console.log(item.visibility)
                privateRepoName.push(item.name)
                visibility.push(item.visibility)
            })

            // privateRepoName.map((item) => console.log("g"))
            // console.log(privateRepoName)
            // console.log(visibility)

            for (let i = 0; i < privateRepoName.length; i++){
                private_repo_data[privateRepoName[i]] = visibility[i];
            }

            
        
            // console.log(private_repo_data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    // console.log(private_repo_data)

    // const full_list = Object.assign(private_repo_data, props.public_list.public_repo_data)
    //             console.log(full_list)

  return (
    // <div>lll</div>
    <div><RepoList private_repo_list ={{private_repo_data}}/></div>
  )
}

export default PrivateRepoList