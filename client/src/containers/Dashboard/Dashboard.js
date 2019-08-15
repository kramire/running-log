import React from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import styled from 'styled-components';
import './Dashboard.css';
import { AddRun, Calendar, Kpi, LineChart } from '../../components';
import { toggleAddRunModal } from '../../redux/actions';
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

const serverUrl = process.env.REACT_APP_WS_URL;

function Dashboard({ user, runData, handleClick, deleteRun, isModalActive, onModalClick }) {
  return (
    <Container>
      <Kpi user={user} runData={runData} handleClick={handleClick}></Kpi>
      <Visuals>
        <Calendar deleteRun={deleteRun} user={user} runData={runData}></Calendar>
        <Button className='button is-rounded' onClick={onModalClick}>Add Run +</Button>
        <AddRun serverUrl={serverUrl} user={user} isModalActive={isModalActive} handleClick={onModalClick} />
        <LineChart runData={runData} unitOfMeasure={user.unitOfMeasure}></LineChart>
      </Visuals>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    isModalActive: state.isAddRunModalActive,
    user: state.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onModalClick: () => dispatch(toggleAddRunModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);