import React, { useState, useEffect } from 'react';
import '../../../node_modules/bulma/css/bulma.css';

import styled from 'styled-components';

import { Calendar, Kpi, LineChart } from '../../components';

// think about how we want to render the dates.
// for now just hard coding 28
// will need to update the calendar component depending
// maybe the get request too

function Dashboard({ serverUrl, user, setModal }) {

  const H2 = styled.h2`
    font-size: 40px;
    color: #CDDDDD;
  `;

  const width = 500;
  const height = 500;

  const [runData, setRunData] = useState([]);
  const [acrData, setAcrData] = useState(0);
  // const [weeklyData, setWeeklyData] = useState([]);

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

  // useEffect(() => { 
  //     fetch(`${serverUrl}/weekly`, {
  //     'method': 'GET',
  //     'headers': {
  //       'Content-Type': 'application/json',
  //       '_id': user['_id'],
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => setWeeklyData(data));
  // }, []);

  return (
    <div className='tile is-ancestor'>
      <div className='tile is-parent is-3'>
        <div className='tile'>
          <Kpi user={user} runData={runData} acrData={acrData} setModal={setModal}></Kpi>
        </div>
      </div>
      <div className='tile is-parent is-vertical'>
        <div className='tile is-parent is-vertical'>
          <H2 className='tile is-child'>Calendar</H2>
          <Calendar className='tile is-child' user={user} runData={runData}></Calendar>
        </div>
        {/*<LineChart className='tile is-child' weeklyData={weeklyData} unitOfMeasure={user.unitOfMeasure} width={width} height={height}></LineChart>*/}
      </div>
    </div>
  )

}

export default Dashboard;