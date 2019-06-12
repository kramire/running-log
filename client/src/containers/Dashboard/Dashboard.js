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
  font-size: 28px;
  margin-bottom: 10px;
  color: #CDDDDD;
`;


function Dashboard({ serverUrl, user, runData, setModal, deleteRun }) {

  return (
    <Container>
      <Kpi user={user} runData={runData} setModal={setModal}></Kpi>
      <Visuals>
        <H2>Calendar</H2>
        <Calendar deleteRun={deleteRun} user={user} runData={runData}></Calendar>
        <LineChart runData={runData} unitOfMeasure={user.unitOfMeasure} H2={H2}></LineChart>
      </Visuals>
    </Container>
  )

}

export default Dashboard;