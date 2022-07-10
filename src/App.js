import './App.css';
import PrivateRepoList from './Components/PrivateRepoList';
import RepoList from './Components/RepoList';

function App() {
  return (
    <div className="App">
      <h1>Individual heatmap</h1>
      <RepoList/>
      {/* <PrivateRepoList/> */}
    </div>
  );
}

export default App;
