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
  flex-direction: column;
  justify-content: center;
  overflow-x: scroll;

  @media (min-width: 1000px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Visuals = styled.div`
  flex-basis: 75%;
  
  @media (min-width: 1000px) {
    margin-left: 50px;
  }
`;


function Dashboard({ user, runData, showAddRun }) {
  return (
    <Container>
      <Kpi user={user} runData={runData} />
      <Visuals>
        <Calendar user={user} runData={runData} />
        <LineChart runData={runData} unitOfMeasure={user.unitOfMeasure} />
      </Visuals>
      <AddRun handleClick={showAddRun} />
      <DayDetails />
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.appUI.user,
    runData: state.runData.weeklyData
  };
}

const mapDispatchToProps = dispatch => {
  return {
    showAddRun: () => dispatch(toggleAddRunModal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);