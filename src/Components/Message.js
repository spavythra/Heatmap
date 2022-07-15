import React from 'react'

function Message({day, repoCommit}) {
    let commit_messages = [];
    function message_obj( msg,repo){
        this.msg = msg;
        this.repo = repo;
        // this.repo_name = repo_name;
      }

    for (const property in repoCommit){
        if(repoCommit[property].date ===day){
            var detail = new message_obj(repoCommit[property].message, repoCommit[property].repo_name)
            commit_messages.push(detail)
        }
    }
    // console.log(commit_messages)
  return (
    <div className='commit-info'>
         <h2>Commit Information</h2>
         <table>
         <tr>
                <th>Repository</th>
                <th>Commit message</th>
                
            </tr>
            
        {commit_messages.map(commit =>{
            return(<tr><td>{commit.repo}</td><td>{commit.msg}</td></tr>)
        })}
        
        </table>
    </div>
  )
}

export default Message