/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable new-cap */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import './App.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Heatmap from './Components/Heatmap'
import search from './img/search.png'

function App () {
  const [user, setUser] = useState('')
  // const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState([])
  const [privateRepos, setPrivateRepos] = useState([])
  const [commits, setCommits] = useState([])
  const [count, setCount] = useState([])
  const [repoCommit, setRepoCommit] = useState([])
  const [showRepoInfo, setShowRepoInfo] = useState(false)
  // eslint-disable-next-line camelcase
  let total_commitList = []
  let total_repoInfo = []
  let public_repo_name = []
  // eslint-disable-next-line prefer-const
  let private_repo_name = []
  const firstTimeRender = useRef(true)

  function handleSubmit (e) {
    e.preventDefault()
    e.persist()
    searchRepos()
  }

  function commit_message (date, msg) {
    this.date = date
    this.message = msg
  }

  function repo_info (date, msg, repo_name) {
    this.date = date
    this.message = msg
    this.repo_name = repo_name
  }

  // count the number of occurrences of the same date
  function date_occurrences (arr, key) {
    const tempArray = []

    arr.forEach((x) => {
      // Checking if there is any object in tempArray
      // which contains the key value
      if (tempArray.some((val) => { return val[key] === x[key] })) {
        // If yes! then increase the occurrence by 1
        tempArray.forEach((k) => {
          if (k[key] === x[key]) {
            k.count++
          }
        })
      } else {
        // If not! Then create a new object initialize
        // it with the present iteration key's value and
        // set the occurrence to 1
        const a = {}
        a[key] = x[key]
        a.count = 1
        tempArray.push(a)
      }
    })
    return tempArray
  }
  // -----end of function---------

  function searchRepos () {
    axios.get(`https://api.github.com/search/repositories?q=user:${user}+is:public`).then((res) => {
      res.data.items.map((item) => {
        public_repo_name.push(item.name)
      })
      setRepos(public_repo_name)
      searchPrivateRepos(public_repo_name)
    })
  }

  function searchPrivateRepos (public_data) {
    if (!process.env.REACT_APP_TOKEN) {
      setPrivateRepos(public_data)
      renderCommits(public_data)
    } else {
      axios.get(`https://api.github.com/search/repositories?q=user:${user}+is:private`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      }).then((res) => {
        res.data.items.map((item) => {
          private_repo_name.push(item.name)
        })

        setPrivateRepos(private_repo_name)
        const total_commits = public_data.concat(private_repo_name)
        renderCommits(total_commits)
      })
    }
  }

  function renderCommits (repo) {
    if (!process.env.REACT_APP_TOKEN) {
      for (let i = 0; i < repo.length; i++) {
        axios.get(`https://api.github.com/repos/${user}/${repo[i]}/commits`
        ).then(res => {
          res.data.map((item) => {
            const exact_date = (item.commit.author.date.split('T', 1)).toString()
            const commit_messages = new commit_message(exact_date, item.commit.message)
            const repo_msg = new repo_info(exact_date, item.commit.message, repo[i])
            total_commitList.push(commit_messages)
            total_repoInfo.push(repo_msg)
          })
          if (i === (repo.length - 1)) {
            setCommits(total_commitList)
            setRepoCommit(total_repoInfo)
            countCommit(total_commitList)
          }
        })
      }
    } else {
      for (let i = 0; i < repo.length; i++) {
        axios.get(`https://api.github.com/repos/${user}/${repo[i]}/commits`, {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_TOKEN}`
          }
        }).then(res => {
          res.data.map((item) => {
            const exact_date = (item.commit.author.date.split('T', 1)).toString()
            const commit_messages = new commit_message(exact_date, item.commit.message)
            const repo_msg = new repo_info(exact_date, item.commit.message, repo[i])
            total_commitList.push(commit_messages)
            total_repoInfo.push(repo_msg)
          })
          if (i === (repo.length - 1)) {
            setCommits(total_commitList)
            setRepoCommit(total_repoInfo)
            countCommit(total_commitList)
          }
        })
      }
    }
  }

  function countCommit (commit) {
    const commit_values = date_occurrences(commit, 'date')
    setCount(commit_values)
    setShowRepoInfo(true)
  }

  useEffect(() => {
    if (!firstTimeRender.current) { searchRepos() }
  }, [showRepoInfo])

  useEffect(() => {
    firstTimeRender.current = false
  }, [])

  return (
    <div className="header">
      <h1>Oma-Git Heatmap</h1>
        <div className='input-container'>
        <div className='search-bar'>
        <input
        className='input'
        value={user}
        placeholder="Enter a git username"
        onChange={e => setUser(e.target.value)}/>
        <button className='button' onClick={handleSubmit}><img src={search}/></button>
      </div>
     </div>
     { showRepoInfo && <Heatmap commits={commits} count={count} repoCommit={repoCommit}/>}
    </div>
  )
}

export default App
