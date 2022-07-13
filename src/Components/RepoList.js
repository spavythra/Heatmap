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
    const [commitList, setCommitList] = useState([])
   
    
    let total_list = []

    // const {setCommitAction, total_repo_list} = props; 

    let all_repos = props.total_repo_list.publicList;
    // console.log(total_repo_list.publicList)
    // console.log(Object.keys(all_repos).length)

    let repo_length = Object.keys(all_repos).length

    function commit_message(date, msg){
        this.date = date;
        this.message = msg;
    }

    function loadCommits(key){
        return new Promise((resolve) => {
           
                // console.log("Hi")
                fetch(`https://api.github.com/repos/${process.env.REACT_APP_USER}/${key}/commits`,{
                        method: 'get',
                        headers: {
                            "Authorization" : `Token ${process.env.REACT_APP_TOKEN}`
                            }
                        })
                        .then((response) =>{
                            resolve(response.json())
                        })  
            
        })
    }
    

    useEffect (() => {
        
        async function fetchData(){
        for( let [key,value] of Object.entries(all_repos))
        {
            try {
            const result = await loadCommits(key);
            result.map((item) => {
                    const exact_date = (item.commit.author.date.split("T",1)).toString();
                                var commit_messages = new commit_message(exact_date, item.commit.message)
                                total_list.push(commit_messages)
            })
            console.log(total_list)
            
            
        } 
        catch(err) {
            console.log(err)
        }
        }
        setCommitList(total_list)   
            setCommitAction(commitList) 
    
        
    }
    fetchData()
    }, [])

    // useEffect(() => {
    //         console.log(total_list)
    //         // console.log("llllll")
            
    //         setCommitAction(commitList) 
    //     // this will run after the 'users' has been changed
    // }, [commitList]);

    
  return (<div>
    
    <div>
        <CommitList public_private_list={{commitList}}/></div>     
    </div>
  )
}

// export default RepoList
export default connect(
    (state) => (
        {
        commits: commitSelector(state),
    }),
    (dispatch) => ({
        setCommitAction : payload => dispatch(setCommitAction(payload)),
    })
)(RepoList)