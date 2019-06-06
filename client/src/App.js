import React, { useState } from 'react';
import './App.css';

import '../node_modules/bulma/css/bulma.css';

import { AddRun } from './components';
import { Dashboard } from './containers';


function App() {

  const [isModalActive, setModal] = useState(false);
  const serverUrl = 'http://localhost:3001';

  const [user, setUser] = useState({
    '_id': '5cf8c113155f6c20cc13d56a',
    username: 'kate11',
    firstName: 'Katie',
    unitOfMeasure: 'mi',
    weekStart: 'Sun',
    trainingFor: 'half marathon',
    optInAlerts: true,
  });

  return (
    <div className="App">
      <Dashboard serverUrl={serverUrl} user={user}></Dashboard>
      <button onClick={() => setModal(true)}>Add Run +</button>
      <AddRun serverUrl={serverUrl} user={user} isModalActive={isModalActive} handleClick={() => setModal('')}></AddRun>
    </div>
  );
}

export default App;