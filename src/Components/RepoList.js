import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrivateRepoList from './PrivateRepoList';
import CommitList from './CommitList';

const RepoList =  (props) => {
    const [publicList, setPublicList] = useState([])
    const [privateList, setPrivateList] = useState([])
    const [commitList, setCommitList] = useState([])
    let publicRepoName = []
    let visibility = []
    var public_repo_data = {}
    let total_list = []

    let private_repos = props.private_list.private_repo_data;

    function commit_message(date, msg){
        this.date = date;
        this.message = msg;
    }

    useEffect(() =>{
        axios.get(`https://api.github.com/users/${process.env.REACT_APP_USER}/repos`)
        .then((response) => {
            console.log("aaaaa")
            setPublicList( response.data );
        
    })
    }, []);
    publicList.map((item) => {
        publicRepoName.push(item.name)
        visibility.push(item.visibility)
    })

    for (let i = 0; i < publicRepoName.length; i++){
        public_repo_data[publicRepoName[i]] = visibility[i];
    }

    const full_list = Object.assign(private_repos, public_repo_data)

    var key_id = 0;

    useEffect(() =>{
        loadData();
        setCommitList(total_list)
        }, []);

    const loadData = async () => {
        for( let [key,value] of Object.entries(full_list))
        {
            if(full_list.hasOwnProperty(key)){

                if(value==="public")
            {
                   await fetch(`https://api.github.com/repos/${process.env.REACT_APP_USER}/${key}/commits`)
                    
                    .then((response) => (response.json()))
                    .then((data) =>{
                        
                        data.map((item) => {
                            // console.log(`repo name is: ${key} and date:${item.commit.author.date}`)
                            const exact_date = (item.commit.author.date.split("T",1)).toString();
                            
                            var commit_messages = new commit_message(exact_date, item.commit.message)
                            total_list.push(commit_messages)
                            
                        })
                    })
                    .then(() => key_id++ )
                
            } else {

                let response = await fetch(`https://api.github.com/repos/${process.env.REACT_APP_USER}/${key}/commits`,{
                method: 'get',
                headers: {
                    "Authorization" : `Token ${process.env.REACT_APP_TOKEN}`
                }
            })
            let data = await response.json()
            setPrivateList(data)
            
            data.map((item) => {
                
                const exact_date = (item.commit.author.date.split("T",1)).toString();
                var commit_messages = new commit_message(exact_date, item.commit.message)
                total_list.push(commit_messages)
                // key_id = key_id++;
                
            })
  
            }
            }
            
        }
    }

  return (
    
        <div><CommitList public_private_list={{commitList}}/></div>

  )
}

export default RepoList