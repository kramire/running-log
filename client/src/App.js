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
`

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
  const locationIqUrl = 'https://eu1.locationiq.com/v1/reverse.php?key=236b8b5b6932ec';

  const [runData, setRunData] = useState([]);
  const [isModalActive, setModal] = useState(false);
  const [browserLocation, setBrowserLocation] = useState({});

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
  }, []);

  
  const locObj = {
    latitude: '',
    longitude: '',
    city: '',
    state: '',
    country: '',
  }

async function getBrowserLocation(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(
        locObj.latitude = pos.coords.latitude, 
        locObj.longitude = pos.coords.longitude
        ),
      (err) => '',
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
    )})
}

async function getLocationDetails() {
  try {
    await getBrowserLocation(); 
    const url = (`${locationIqUrl}&lat=${locObj.latitude}&lon=${locObj.longitude}&format=json`);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        locObj.city = data.address.city;
        locObj.state = data.address.state && data.address.city !== data.address.state;
        locObj.country = data.address.country;
      })
  } catch (error) {
    return null;
  }
}

useEffect(() => { 
  getLocationDetails()
    .then(setBrowserLocation(locObj));
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
      <Dashboard user={user} runData={runData} setModal={setModal}></Dashboard>
      <AddRun serverUrl={serverUrl} user={user} browserLocation={browserLocation}
        isModalActive={isModalActive} handleClick={() => setModal(false)}></AddRun>
      }
    </Container>
  );
}

export default App;