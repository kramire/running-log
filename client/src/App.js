import React, { useState, useEffect } from 'react';
import { Loading } from './components';
import { Dashboard } from './containers';
import './App.css';
import '../node_modules/bulma/css/bulma.css';
import styled from 'styled-components';
import userData from './assests/userData.json';
import { fetchRuns } from './redux/actions';
import { connect } from 'react-redux';


const Container = styled.div`
  width: 90vw;
  height: 100vh;
  margin: 0 auto;
  padding-top: 20px;
`;

function App({ user, dispatch, fetchingData }) {
  const [madeChange, setMadeChange] = useState(false);
  
  const serverUrl = process.env.REACT_APP_WS_URL;

  // Get user's running data
  useEffect(() => dispatch(fetchRuns(user['_id'])),[]);

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
        fetchingData ? 
        <Loading /> :
        <Dashboard deleteRun={deleteRun} />
      }
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    fetchingData: state.runData.isFetching
  }
}

export default connect(mapStateToProps)(App);