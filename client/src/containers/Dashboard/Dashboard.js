import React from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import styled from 'styled-components';
import './Dashboard.css';
import { Calendar, Kpi, LineChart } from '../../components';
import { Title } from '../../assests/globalStyledComponents';

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

function Dashboard({ user, runData, handleClick, deleteRun }) {
  return (
    <Container>
      <Kpi user={user} runData={runData} handleClick={handleClick}></Kpi>
      <Visuals>
        <Title>Calendar</Title>
        <Calendar deleteRun={deleteRun} user={user} runData={runData}></Calendar>
        <LineChart runData={runData} unitOfMeasure={user.unitOfMeasure}></LineChart>
      </Visuals>
    </Container>
  )
}

export default Dashboard;