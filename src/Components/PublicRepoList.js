import React, {useState, useEffect } from 'react';
import RepoList from './RepoList';

const PublicRepoList =  (props) => {
    const [publicList, setPublicList] = useState({})
    let publicRepoName = []
    let public_repo_data = {}
    let visibility = []
    var full_list = {}
    // const [publicRepo, setPublicRepo] = useState({})

    // const {setCommitAction, private_repo_list} = props; 

    let private_repos = props.private_repo_list.private_repo_data;
    // console.log(private_repos)

    useEffect (() => {
        async function fetchData(){
            try {
                let response = await fetch(`https://api.github.com/search/repositories?q=user:${process.env.REACT_APP_USER}+is:public`,{
                method: 'get',
                headers: {
                    "Authorization" : `Token ${process.env.REACT_APP_TOKEN}`
                }
            })
            let data = await response.json()
            let result = data.items
            // console.log(result)

            result.map((item) => {
                publicRepoName.push(item.name)
                visibility.push(item.visibility)
            })

            for (let i = 0; i < publicRepoName.length; i++){
                public_repo_data[publicRepoName[i]] = visibility[i];
            }
            // console.log(public_repo_data)
            // setPublicList(public_repo_data)

            full_list = Object.assign(private_repos, public_repo_data)
            setPublicList(full_list)

            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        // this will run after the 'users' has been changed
        console.log(publicList)
    }, [publicList]);
    

  return (
    // <div>lll</div>
    <div><RepoList total_repo_list ={{publicList}}/></div>
  )
}

export default PublicRepoList