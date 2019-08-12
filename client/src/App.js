import React, { useState, useEffect } from 'react';
import { AddRun } from './components';
import { Dashboard } from './containers';
import './App.css';
import '../node_modules/bulma/css/bulma.css';
import styled from 'styled-components';
import userData from './assests/userData.json';

const Container = styled.div`
  width: 90vw;
  height: 100vh;
  margin: 0 auto;
  padding-top: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 15px;

  @media (max-width: 800px) {
    font-size: .8em;
  }
`;

function App() {
  const [runData, setRunData] = useState([]);
  const [isModalActive, setModal] = useState(false);
  const [madeChange, setMadeChange] = useState(false);
  const [user, setUser] = useState(userData);
  
  const serverUrl = process.env.REACT_APP_WS_URL;

  // Get user's running data
  useEffect(() => {
    fetch(serverUrl, {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          '_id': user['_id'],
        }
      })
      .then(res => res.json())
      .then(data => setRunData(data));
  }, [isModalActive, madeChange]);

  // Define delete run function
  const deleteRun = async function (userId, runId) {
    await fetch(serverUrl, {
        'method': 'DELETE',
        'headers': {
          'Content-Type': 'application/json',
          'user_id': userId,
          'run_id': runId
        }
      })
      .then(res => setMadeChange(!madeChange))
  }

  // Show a loading bar while data loads
  if (runData.length === 0) {
    return (
      <Container>
        <div className='center'>
          <Title>RUNNING LOG</Title>
          <progress className="progress is-primary is-small" max="100">15%</progress>
        </div>
      </Container>
    )
  }
  else {
    return (
      <Container className="App">
        <Dashboard user={user} runData={runData} setModal={setModal} deleteRun={deleteRun}></Dashboard>
        <AddRun serverUrl={serverUrl} user={user} isModalActive={isModalActive} 
        handleClick={() => setModal(false)}></AddRun>
      </Container>
    );
  }
}

export default App;