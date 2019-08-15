import React, { useState, useEffect } from 'react';
import { AddRun, Loading } from './components';
import { Dashboard } from './containers';
import './App.css';
import '../node_modules/bulma/css/bulma.css';
import styled from 'styled-components';
import userData from './assests/userData.json';
import { connect } from 'react-redux';
import { toggleAddRunModal } from './redux/actions';

const Container = styled.div`
  width: 90vw;
  height: 100vh;
  margin: 0 auto;
  padding-top: 20px;
`;

function App({ isModalActive, onModalClick }) {
  const [runData, setRunData] = useState([]);
  // const [isModalActive, setModal] = useState(false);
  const [madeChange, setMadeChange] = useState(false);
  const [user, setUser] = useState(userData);
  
  const serverUrl = process.env.REACT_APP_WS_URL;

  // Get user's running data
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
  }, [isModalActive, madeChange]);

  // Define delete run function
  const deleteRun = async function (userId, runId) {
    await fetch(serverUrl, {
        'method': 'DELETE',
        'headers': {
          'Content-Type': 'application/json',
          'user_id': userId,
          'run_id': runId
        }
      })
      .then(res => setMadeChange(!madeChange))
  }

  // Show a Loading Page while awaiting data
  return (
    <Container>
      {
        runData.length === 0 ? <Loading /> :
        <>
          <Dashboard user={user} runData={runData} deleteRun={deleteRun} handleClick={onModalClick} />
          <AddRun serverUrl={serverUrl} user={user} isModalActive={isModalActive} handleClick={onModalClick} />
        </>
      }
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    isModalActive: state.isAddRunModalActive
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onModalClick: () => dispatch(toggleAddRunModal())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);