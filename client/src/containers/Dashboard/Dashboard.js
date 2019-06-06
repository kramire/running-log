import React, { useState, useEffect } from 'react';
import '../../../node_modules/bulma/css/bulma.css';

import { Calendar } from '../../components';

function Dashboard({ serverUrl, user }) {

  const [runData, setRunData] = useState([]);

  useEffect(() => { 
      fetch(serverUrl, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        '_id': user['_id']
      }
    })
      .then(res => res.json())
      .then(data => setRunData(data));
  }, [])

  console.log(runData);

  return (
    <div>
      <h2> Here is the dashboard </h2>
      <Calendar runData={runData}></Calendar>
    </div>
  )

}

export default Dashboard;