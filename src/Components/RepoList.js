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
    let total_list = []
   
    function commit_message(date, msg){
        this.date = date;
        this.message = msg;
    }

    function commit_count(date, count){
        this.date = date;
        this.count = count;
    }

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

    var key_id = 0;

    useEffect(() =>{
        // while(key_id < Object.keys(public_repo_data))
        for( let [key,value] of Object.entries(public_repo_data))
    
        // for( let [key,value] of Object.entries(public_repo_data))
        {
            console.log(key)
            if(public_repo_data.hasOwnProperty(key)){

                if(value==="public")
            {
                console.log(key)
                   fetch(`https://api.github.com/repos/${process.env.REACT_APP_USER}/${key}/commits`)
                    
                    .then((response) => (response.json()))
                    .then((data) =>{
                        setCommitList(data);
                        console.log(data)
                        // total_list = Object.assign(total_list, response.data)
                        data.map((item) => {
                            console.log(`repo name is: ${key} and date:${item.commit.author.date}`)
                            const exact_date = item.commit.author.date.split("T",1);
                            var commit_messages = new commit_message(item.commit.author.date, item.commit.message)
                            total_list.push(commit_messages)
                            commit_date.push(exact_date)
                        })
                    })
                    .then(() => {
                        console.log(total_list)
                        key_id++;
                } )
                
                
                
            }
            }
            
        }}, []);
    
       

  return (
    <div>{commit_date}</div>
    // <div><CommitList public_list={{public_repo_data}}/></div>
  )
}

export default RepoList