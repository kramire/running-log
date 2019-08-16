import React, { useEffect } from 'react';
import { Loading } from './components';
import { Dashboard } from './containers';
import { connect } from 'react-redux';
import { fetchRuns, getBrowserCoords } from './redux/actions';
import styled from 'styled-components';
import './App.css';


const Container = styled.div`
  width: 90vw;
  height: 100vh;
  margin: 0 auto;
  padding-top: 20px;
`;

function App({ user, fetchingData, getRunData, getBrowserLocation }) {

  // Fetch user's run data, and browser location.
  useEffect(() => {
    getRunData(user['_id'])
    getBrowserLocation()
  },[]);

  // Show a Loading Page while awaiting data
  return (
    <Container>
      {
        fetchingData ? 
        <Loading /> :
        <Dashboard />
      }
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    fetchingData: state.data.isFetching
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getRunData: userId => dispatch(fetchRuns(userId)),
    getBrowserLocation: () => dispatch(getBrowserCoords())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);