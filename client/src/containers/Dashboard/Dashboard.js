import React, { useState, useEffect } from 'react';
import '../../../node_modules/bulma/css/bulma.css';

import { Calendar, Kpi, LineChart } from '../../components';

// think about how we want to render the dates.
// for now just hard coding 28
// will need to update the calendar component depending
// maybe the get request too

function Dashboard({ serverUrl, user }) {

  const [runData, setRunData] = useState([]);
  const [history, setHistory] = useState(35);
  const [acrData, setAcrData] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => { 
      fetch(serverUrl, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        '_id': user['_id'],
        history
      }
    })
      .then(res => res.json())
      .then(data => setRunData(data));
  }, []);

  useEffect(() => { 
      fetch(`${serverUrl}/acr`, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        '_id': user['_id'],
      }
    })
      .then(res => res.json())
      .then(data => setAcrData(data));
  }, []);

  useEffect(() => { 
      fetch(`${serverUrl}/weekly`, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        '_id': user['_id'],
      }
    })
      .then(res => res.json())
      .then(data => setWeeklyData(data));
  }, []);

  return (
    <div>
      <Kpi user={user} runData={runData} acrData={acrData}></Kpi>
      <Calendar user={user} runData={runData} history={history}></Calendar>
      <LineChart weeklyData={weeklyData} unitOfMeasure={user.unitOfMeasure} width={500} height={500}></LineChart>
    </div>
  )

}

export default Dashboard;