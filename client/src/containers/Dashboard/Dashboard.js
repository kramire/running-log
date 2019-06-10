import React, { useState, useEffect } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import styled from 'styled-components';
import './Dashboard.css';

import { Calendar, Kpi, LineChart } from '../../components';

// think about how we want to render the dates.
// will need to update the calendar component depending
// maybe the get request too

const Container = styled.div`
  display: flex;
  box-sizing: border-box;

  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
  }
`;


const Visuals = styled.div`
  flex-basis: 75%;
  margin-left: 50px;
`;

const H2 = styled.h2`
  font-size: 40px;
  color: #CDDDDD;
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

function Dashboard({ serverUrl, user, setModal }) {


  const width = 500;
  const height = 500;

  const [runData, setRunData] = useState([]);

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

  if (runData.length === 0) 
    return (
      <div className='center'>
        <Title>RUNNING LOG</Title>
        <progress className="progress is-primary is-small" max="100">15%</progress>
      </div>
    )


  return (
    <Container>
      <Kpi user={user} runData={runData} setModal={setModal}></Kpi>
      <Visuals>
        <H2>Calendar</H2>
        <Calendar user={user} runData={runData}></Calendar>
        <LineChart runData={runData} unitOfMeasure={user.unitOfMeasure} width={width} height={height}></LineChart>
      </Visuals>
    </Container>
  )

}

export default Dashboard;