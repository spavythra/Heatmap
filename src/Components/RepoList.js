import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrivateRepoList from './PrivateRepoList';
import CommitList from './CommitList';

const RepoList =  () => {
    const [publicList, setPublicList] = useState([])
    const [commitList, setCommitList] = useState([])
    let publicRepoName = []
    let visibility = []
    var public_repo_data = {}
    let commit_date = []
   
    

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

    // for (let i = 0; i < props.private_list.length; i++){
    //     public_repo_data[props.private_list[i]] = "private";
    // }

    console.log(public_repo_data)

    useEffect(() =>{
        for( let [key,value] of Object.entries(public_repo_data)){
            if(value==="public"){
                console.log("commitList")
                    axios.get(`https://api.github.com/repos/${process.env.REACT_APP_USER}/${key}/commits`)
                    .then((response) => {
                        console.log( response.data);
                        console.log( "gjkk");
                        setCommitList( response.data);
                        // total_list = Object.assign(total_list, response.data)
                        commitList.map((item) => {
                            // console.log(item.commit.author.date)
                            commit_date.push(item.commit.author.date)
                        })
                    
                })
                .then(() => console.log(commit_date))
                
                
            }
        }}, []);
    
        
    

  return (
    <div>llll</div>
    // <div><CommitList public_list={{public_repo_data}}/></div>
  )
}

export default RepoList