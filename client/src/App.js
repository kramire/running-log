import React, { useState } from 'react';
import './App.css';

import '../node_modules/bulma/css/bulma.css';

import { AddRun } from './components';
import { Dashboard } from './containers';

import styled from 'styled-components';

const Container = styled.div`
  width: 90vw;
  height: 100vh;
  margin: 0 auto;
`

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

  console.log('app loaded');

  return (
    <Container className="App">
      <Dashboard serverUrl={serverUrl} user={user} setModal={setModal}></Dashboard>
      <AddRun serverUrl={serverUrl} user={user} isModalActive={isModalActive} handleClick={() => setModal(false)}></AddRun>
    </Container>
  );
}

export default App;