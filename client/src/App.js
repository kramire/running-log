import React, { useState, useEffect } from 'react';
import './App.css';
import '../node_modules/bulma/css/bulma.css';

import { AddRun } from './components';
import { Dashboard } from './containers';

import styled from 'styled-components';

const Container = styled.div`
  width: 90vw;
  height: 100vh;
  margin: 0 auto;
  padding-top: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  color: #CDDDDD;
  text-align: center;
  margin-bottom: 15px;

  @media (max-width: 800px) {
    font-size: .8em;
  }
`;

function App() {
  
  const serverUrl = 'http://localhost:3001';

  const [runData, setRunData] = useState([]);
  const [isModalActive, setModal] = useState(false);
  const [browserLocation, setBrowserLocation] = useState({});
  const [madeChange, setMadeChange] = useState(false);

  const [user, setUser] = useState({
    '_id': '5cf8c113155f6c20cc13d56a',
    username: 'kate11',
    firstName: 'Katie',
    unitOfMeasure: 'mi',
    weekStart: 'Sun',
    trainingFor: 'half marathon',
    optInAlerts: true,
  });

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
  }, [isModalActive, browserLocation, madeChange]);


  async function deleteRun (userId, runId) {
    await fetch(serverUrl, {
      'method': 'DELETE',
      'headers': {
        'Content-Type': 'application/json',
        'user_id': userId,
        'run_id': runId
      }
    })
      .then(res => setMadeChange(true))
  }

  async function getBrowserLocation(options) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({
            latitude: pos.coords.latitude, 
            longitude: pos.coords.longitude
          }),
        (err) => '',
        {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
      )})
  }

  useEffect(() => { 
    getBrowserLocation()
      .then(res => {
        return fetch(`${serverUrl}/location`, {
          'method': 'GET',
          'headers': {
            'Content-Type': 'application/json',
            'lat': res.latitude,
            'long': res.longitude
            }
          })
      })
      .then(res => res.json())
      .then(data => setBrowserLocation(data));
  }, []);


  if (runData.length === 0) 
  return (
    <div className='center'>
      <Title>RUNNING LOG</Title>
      <progress className="progress is-primary is-small" max="100">15%</progress>
    </div>
  )

  return (
    <Container className="App">
      <Dashboard user={user} runData={runData} setModal={setModal} deleteRun={deleteRun}></Dashboard>
      <AddRun serverUrl={serverUrl} user={user} browserLocation={browserLocation}
        isModalActive={isModalActive} handleClick={() => setModal(false)}></AddRun>
    </Container>
  );
}

export default App;