import { combineReducers} from 'redux'
import storage from 'redux-persist/lib/storage' ;
import { configureStore } from '@reduxjs/toolkit';
import {commitReducer} from "./commitStore/commitReducer"
import {commentReducer} from "./commentStore/commentReducer"
import {
  persistStore,
  persistReducer,
} from 'redux-persist'
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
   
const rootreducer = combineReducers({
  commits: commitReducer,
  comments: commentReducer,
 })
 
const persistedReducer = persistReducer(persistConfig, rootreducer)


const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});
const persistor = persistStore(store)

export  {persistor}
export default store