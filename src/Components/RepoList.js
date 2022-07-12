import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrivateRepoList from './PrivateRepoList';
import CommitList from './CommitList';
import { connect } from 'react-redux';
import { commitSelector } from '../store/commitStore/commitSelectors';
import { setCommitAction } from '../store/commitStore/commitActions';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';

const RepoList =  (props) => {
    const [publicList, setPublicList] = useState([])
    const [publicCommitList, setPublicCommitList] = useState([])
    const [privateList, setPrivateList] = useState([])
    const [commitList, setCommitList] = useState([])
    const [publicRepo, setPublicRepo] = useState()
    let publicRepoName = []
    let visibility = []
    var public_data = {}
    let public_repo_data = {}
    let total_list = []

    
    let private_repos = props.private_repo_list.private_repo_data;

    function commit_message(date, msg){
        this.date = date;
        this.message = msg;
    }

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
            setPublicList(result)

            result.map((item) => {
                // console.log(item.visibility)
                publicRepoName.push(item.name)
                visibility.push(item.visibility)
            })

            // privateRepoName.map((item) => console.log("g"))
            // console.log(privateRepoName)
            // console.log(visibility)

            for (let i = 0; i < publicRepoName.length; i++){
					public_data[publicRepoName[i]] = visibility[i];
				}

            
                // console.log(public_data)
                
                
            // console.log(private_repo_data)
            
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    
    

    var key_id = 0;

    useEffect(() =>{
        setPublicRepo(public_data)
        loadData();
        setCommitList(total_list)
        setCommitAction(commitList)
        console.log(commitList)
        }, []);

        const full_list = Object.assign(private_repos, publicRepo)
            // console.log(full_list)

    const loadData = async () => {
        for( let [key,value] of Object.entries(full_list))
        {
            if(full_list.hasOwnProperty(key)){

                if(value==="public")
            {
                // console.log("kksksksksk")
                   let response =  await fetch(`https://api.github.com/repos/${process.env.REACT_APP_USER}/${key}/commits`,{
                    method: 'get',
                    headers: {
                        "Authorization" : `Token ${process.env.REACT_APP_TOKEN}`
                    }
                })
                let data = await response.json()
                setPublicCommitList(data)
                data.map((item) => {
                    
                    const exact_date = (item.commit.author.date.split("T",1)).toString();
                    var commit_messages = new commit_message(exact_date, item.commit.message)
                    total_list.push(commit_messages)
                    // key_id = key_id++;
                    
                })
                
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

// export default RepoList
export default connect(
    (state) => (
        {
        commits: commitSelector(state)
    }),
    (dispatch) => ({
        setCommitAction : payload => dispatch(setCommitAction(payload)),
    })
)(RepoList)