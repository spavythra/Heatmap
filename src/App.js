import './App.css';
import {useState} from "react";
import axios from "axios";
import Form from "./Components/Form"
import search from './img/search.png'

function App() {
const [user, setUser] = useState("")
// const [loading, setLoading] = useState(false)
const [repos, setRepos] = useState([])
const [privateRepos, setPrivateRepos] = useState([])
const [commits, setCommits] = useState([])
const [count, setCount] = useState([])
const [showDetails, setShowDetail] = useState(false)
let total_list = [];
let public_repo_name =[]
let private_repo_name =[]

function handleSubmit(e) {
  e.preventDefault();
  searchRepos();
}

function commit_message(date, msg,repo_name){
  this.date = date;
  this.message = msg;
  // this.repo_name = repo_name;
}

// function to count the number of
    //occurance of the same date
    function findOcc(arr, key)
    {
      // console.log(arr)
      let arr2 = [];
        
      arr.forEach((x)=>{
           
        // Checking if there is any object in arr2
        // which contains the key value
         if(arr2.some((val)=>{ return val[key] === x[key] }))
         {
           // If yes! then increase the occurrence by 1
           arr2.forEach((k)=>{
             if(k[key] === x[key]){ 
               k["count"]++
             }
          })  
         }
         else
         {
           // If not! Then create a new object initialize 
           // it with the present iteration key's value and 
           // set the occurrence to 1
           let a = {}
           a[key] = x[key]
           a["count"] = 1
           arr2.push(a);
         }
      }) 
      return arr2
    }
    
      // -----end of function---------

function searchRepos() {
  axios.get(`https://api.github.com/search/repositories?q=user:${user}+is:public`).then((res) =>{
              res.data.items.map((item) =>{
                public_repo_name.push(item.name)
              })
            setRepos(public_repo_name)
            searchPrivateRepos(public_repo_name)
  })
}

function searchPrivateRepos(public_data) {
  if(!process.env.REACT_APP_TOKEN){
    setPrivateRepos(public_data)
    renderRepo(public_data)
  } else {
    axios.get(`https://api.github.com/search/repositories?q=user:${user}+is:private`,{
                headers: {
                    "Authorization" : `Bearer ${process.env.REACT_APP_TOKEN}`
                }
            }).then((res) =>{
              res.data.items.map((item) =>{
                private_repo_name.push(item.name)
              })

    setPrivateRepos(private_repo_name)
    let total_commits = public_data.concat(private_repo_name)
    renderRepo(total_commits)
    // console.log(total_commits)
  })
  }
  
}

function renderRepo(repo){
  // console.log(repo)

  if(!process.env.REACT_APP_TOKEN){
    for(let i= 0; i< repo.length;i++){

      axios.get(`https://api.github.com/repos/${user}/${repo[i]}/commits`
              ).then(res =>{
        res.data.map((item) =>{
          const exact_date = (item.commit.author.date.split("T",1)).toString();
                      var commit_messages = new commit_message(exact_date, item.commit.message)
                      total_list.push(commit_messages)
      })
      if(i===(repo.length-1)){
        setCommits(total_list)
        countCommit(total_list)
        
      }
      })
    }
    // console.log(total_list)
  }else {
    for(let i= 0; i< repo.length;i++){

      axios.get(`https://api.github.com/repos/${user}/${repo[i]}/commits`,{
                  headers: {
                      "Authorization" : `Token ${process.env.REACT_APP_TOKEN}`
                  }
              }).then(res =>{
        res.data.map((item) =>{
          const exact_date = (item.commit.author.date.split("T",1)).toString();
                      var commit_messages = new commit_message(exact_date, item.commit.message)
                      total_list.push(commit_messages)
      })
      if(i===(repo.length-1)){
        setCommits(total_list)
        countCommit(total_list)
        
      }
      })
    }
    // console.log(total_list)
  }

  
  
}

function countCommit(commit){
  // console.log(commit)
  let commit_values = findOcc(commit, "date")
  // console.log(commit_values)
  setCount(commit_values)
  setShowDetail(true)
 
}

  return (
    <div className="header">
      <h1>Git User Heatmap</h1>
      {/* <p>Enter your Github username</p> */}
      <div className='input-container'>
      <div className='search-bar'>
     <input 
     className='input'
     value={user}
     placeholder="Enter your git username"
     onChange={e => setUser(e.target.value)}/>
     <button className='button' onClick={handleSubmit}><img src={search}/></button>
     </div>
     </div>
     { showDetails && <Form commits={commits} count={count}/>}
    </div>
  );
}

export default App;
