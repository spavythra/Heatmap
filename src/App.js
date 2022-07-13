import './App.css';
import PrivateRepoList from './Components/PrivateRepoList';
import RepoList from './Components/RepoList';
import { PersistGate } from 'redux-persist/integration/react'
import store  from "./store";
import {Provider} from "react-redux";
import { persistStore} from 'redux-persist';

function App() 
{
  let persistor = persistStore(store)
  
  return (
    <div className="App">
      <h1>Individual heatmap</h1>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {/* {<RepoList/>} */}
      <PrivateRepoList/>
      </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
