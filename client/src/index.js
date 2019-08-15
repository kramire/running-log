import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import runningLogReducers from './redux/reducers';

const store = createStore(runningLogReducers);


ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>
, document.getElementById('root'));
