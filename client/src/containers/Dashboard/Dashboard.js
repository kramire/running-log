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


function Dashboard({ serverUrl, user, runData, setModal }) {

  return (
    <Container>
      <Kpi user={user} runData={runData} setModal={setModal}></Kpi>
      <Visuals>
        <H2>Calendar</H2>
        <Calendar user={user} runData={runData}></Calendar>
        <LineChart runData={runData} unitOfMeasure={user.unitOfMeasure}></LineChart>
      </Visuals>
    </Container>
  )

}

export default Dashboard;