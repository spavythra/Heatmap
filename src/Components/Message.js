/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react'

function Message ({ day, repoCommit, user }) {
  const commit_messages = []
  function message_obj (msg, repo) {
    this.msg = msg
    this.repo = repo
  }

  for (const property in repoCommit) {
    if (repoCommit[property].date === day) {
      const detail = new message_obj(repoCommit[property].message, repoCommit[property].repo_name)
      commit_messages.push(detail)
    }
  }
  return (
    <div className='commit-info'>
         <h2>Commit Information</h2>
         <table>
         <tr>
                <th>Repository</th>
                <th>Commit message</th>

            </tr>

        {commit_messages.map(commit => {
          return (<tr key={commit.id}><td><a href={`https://github.com/${user}/${commit.repo}`} target='blank'>{commit.repo}</a></td><td>{commit.msg}</td></tr>)
        })}

        </table>
    </div>
  )
}

export default Message
