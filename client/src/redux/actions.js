// action types

export const DELETE_RUN = 'DELETE_RUN';
export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';
export const SET_BROWSER_LOCATION = 'SET_BROWSER_LOCATION'; 
export const TOGGLE_ADDRUN_MODAL = 'TOGGLE_ADDRUN_MODAL';
export const TOGGLE_DATE_MODAL = 'TOGGLE_DATE_MODAL';

// export const GET_RUNS_REQUEST = 'GET_RUNS_REQUEST';
// export const GET_RUNS_SUCCESS = 'GET_RUNS_SUCCESS';
// export const GET_RUNS_FAILURE = 'GET_RUNS_FAILURE';
export const REQUEST_RUNS = 'REQUEST_RUNS';
export const RECEIVE_RUNS = 'RECEIVE_RUNS';
export const REQUEST_POST_RUN = 'REQUEST_POST_RUN';
export const RECEIVE_POST_RUN = 'RECEIVE_POST_RUN';
export const REQUEST_DELETE_RUN = 'REQUEST_DELETE_RUN';
export const RECEIVE_DELETE_RUN = 'RECEIVE_DELETE_RUN';

const serverUrl = process.env.REACT_APP_WS_URL;

// action creators

export const requestPostRun = () => ({
  type: REQUEST_POST_RUN
});

export const receivePostResponse = () => ({
  type: RECEIVE_POST_RUN
});

export const requestDeleteRun = () => {
  return {type: REQUEST_DELETE_RUN}
};

export const receiveDeleteResponse = () => ({
  type: RECEIVE_DELETE_RUN,
});

export const setStartDate = date => ({
  type: SET_START_DATE,
  data: date
});

export const setEndDate = date => ({
  type: SET_END_DATE,
  data: date
});

export const setBrowserLocation = coordinates => ({
  type: SET_BROWSER_LOCATION,
  data: coordinates
});

export const toggleAddRunModal = () => ({
  type: TOGGLE_ADDRUN_MODAL,
});

export const toggleDateModal = (flag, date) => ({
  type: TOGGLE_ADDRUN_MODAL,
  flag,
  date
});

export const requestRuns = userId => {
  return {
  type: REQUEST_RUNS,
  userId
}};

export const receiveRuns = data => ({
  type: RECEIVE_RUNS,
  runs: data,
  receivedAt: Date.now()
});

export const fetchRuns = userId => {
  return dispatch => {
    dispatch(requestRuns(userId))
    return fetch(serverUrl, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        '_id': userId,
      }
    })
      .then(res => res.json())
      .then(data => dispatch(receiveRuns(data)))
  }
};

export const postNewRun = (userId, runData) => {
  return dispatch => {
    dispatch(requestPostRun());
    return fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        '_id': userId,
        run: runData
      })
    })
    .then(res => res.json())
    .then(() => dispatch(receivePostResponse()))
    .then(() => dispatch(fetchRuns(userId)))
  }
};

export const deleteRun = (userId, runId) => {
  return dispatch => {
    dispatch(requestDeleteRun());
    return fetch(serverUrl, {
      'method': 'DELETE',
      'headers': {
        'Content-Type': 'application/json',
        'user_id': userId,
        'run_id': runId
      }
    })
    .then(() => dispatch(receiveDeleteResponse()))
    .then(() => dispatch(fetchRuns(userId)))
  }
};