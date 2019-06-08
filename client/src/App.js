import React, { useState } from 'react';
import './App.css';

import '../node_modules/bulma/css/bulma.css';

import { AddRun } from './components';
import { Dashboard } from './containers';

import styled from 'styled-components';


function App() {

  const Container = styled.div`
    width: 90vw;
    height: 100vh;
    margin: 0 auto;
  `;

  const H2 = styled.h2`
    font-size: 40px;
    color: #CDDDDD;
  `;


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
    <Container className="App">
      <Dashboard H2={H2} serverUrl={serverUrl} user={user} setModal={setModal}></Dashboard>
      <AddRun serverUrl={serverUrl} user={user} isModalActive={isModalActive} handleClick={() => setModal(false)}></AddRun>
      }
    </Container>
  );
}

export default App;