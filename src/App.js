import './App.css';
import {useState} from "react";
import axios from "axios";
import Form from "./Components/Form"

function App() {
const [user, setUser] = useState("")
// const [loading, setLoading] = useState(false)
const [repos, setRepos] = useState([])
const [privateRepos, setPrivateRepos] = useState([])
const [commits, setCommits] = useState([])
const [count, setCount] = useState([])
const [showDetails, setShowDetail] = useState(false)
let total_list = []

//getting today's date using Date 
    //coverting date to yyyy/mm/dd format
    const today = new Date().toISOString().split("T")[0];

function handleSubmit(e) {
  e.preventDefault();
  searchRepos();
  // console.log(commits)
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
      console.log(arr)
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
  // setLoading(true)
  axios.get(`https://api.github.com/search/repositories?q=user:${user}+is:public`,{
                headers: {
                    "Authorization" : `Bearer ${process.env.REACT_APP_TOKEN}`
                }
            }).then(res =>{
    // setLoading(false)
    setRepos(res.data.items)
    searchPrivateRepos(res.data.items)
  })
}

function searchPrivateRepos(public_data) {
  // setLoading(true)
  axios.get(`https://api.github.com/search/repositories?q=user:${user}+is:private`,{
                headers: {
                    "Authorization" : `Bearer ${process.env.REACT_APP_TOKEN}`
                }
            }).then(res =>{
    // setLoading(false)
    setPrivateRepos(res.data.items)
    let total_commits = Object.assign(public_data,res.data.items)
    renderRepo(total_commits)
  })
}

function renderRepo(repo){
  console.log(repo)
  // setLoading(true)
  for(let i= 0; i< repo.length;i++){
    axios.get(`https://api.github.com/repos/${process.env.REACT_APP_USER}/${repo[i].name}/commits`,{
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
  // setLoading(false)
  
  // console.log(total_list)
  // countCommit(commits)



  // return(
  //   <div>
  //     <button onClick={() => countCommit(commits)}>view your contribution</button>
  //   </div>
  // )
  
}

function countCommit(commit){
  
  let commit_values = findOcc(commit, "date")
  console.log(commit_values)
  setCount(commit_values)
  setShowDetail(true)
  return(
    <div >
      {/* <Form total_list={total_list} count={count}/> */}
    </div>
  )
}

  return (
    <div className="App">
     <input 
     className='input'
     value={user}
     placeholder="enter"
     onChange={e => setUser(e.target.value)}/>
     <button className='button' onClick={handleSubmit}>click</button>
     { showDetails && <Form commits={commits} count={count}/>}
     {/* {countCommit(commits)} */}
    </div>
  );
}

export default App;
