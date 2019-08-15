import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import runningLogReducers from './redux/reducers';
import thunkMiddleware from 'redux-thunk';

const store = createStore(
  runningLogReducers, 
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>
, document.getElementById('root'));
