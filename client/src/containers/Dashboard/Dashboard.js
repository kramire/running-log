import React, { useState, useEffect } from 'react';
import '../../../node_modules/bulma/css/bulma.css';

import { Calendar, Kpi } from '../../components';

// think about how we want to render the dates.
// for now just hard coding 28
// will need to update the calendar component depending
// maybe the get request too

function Dashboard({ serverUrl, user }) {

  const [runData, setRunData] = useState([]);
  const [history, setHistory] = useState(28);
  const [acr, setAcr] = useState(0);

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
      .then(data => setAcr(data.acr));
  }, []);

  return (
    <div>
      <Kpi user={user} runData={runData} acr={acr}></Kpi>
      <Calendar user={user} runData={runData} history={history}></Calendar>
    </div>
  )

}

export default Dashboard;