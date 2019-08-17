import React, { useEffect } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import styled from 'styled-components';
import './Dashboard.css';
import { AddRun, Calendar, Kpi, LineChart, DayDetails } from '../../components';
import { toggleAddRunModal, toggleDayModal } from '../../redux/actions';
import { connect } from 'react-redux';

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

const Button = styled.button`
  color: #CDDDDD;
  background-color: #978CA5;
  font-size: 1em;
  margin: 20px 0;
  border: none;
  padding: 5px 15px;
  transition: all .1s ease;
  
  :hover {
    transform: scale(1.15);
    background-color: #CDDDDD;
    color: #978CA5;
    font-weight: bold;
  }

  @media (max-width: 800px) {
    font-size:.5em;
    margin: 10px 0;
    padding: 2.5px 8px;
  }  
`;


function Dashboard({ user, runData, showAddRun, toggleDayModal }) {
  return (
    <Container>
      <Kpi user={user} runData={runData} />
      <Visuals>
        <Calendar user={user} runData={runData} />
        <Button className='button is-rounded' onClick={showAddRun}>Add Run +</Button>
        <LineChart runData={runData} unitOfMeasure={user.unitOfMeasure} />
      </Visuals>
      <AddRun handleClick={showAddRun} />
      <DayDetails />
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    runData: state.data.weeklyData
  };
}

const mapDispatchToProps = dispatch => {
  return {
    showAddRun: () => dispatch(toggleAddRunModal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);