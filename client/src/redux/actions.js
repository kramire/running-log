// action types

export const ADD_RUN = 'ADD_RUN';
export const DELETE_RUN = 'DELETE_RUN';
export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';
export const SET_BROWSER_LOCATION = 'SET_BROWSER_LOCATION'; 
export const TOGGLE_ADDRUN_MODAL = 'TOGGLE_ADDRUN_MODAL';
export const TOGGLE_DATE_MODAL = 'TOGGLE_DATE_MODAL';


// action creators

export const addRun = (run, userId) => ({
  type: ADD_RUN,
  data: run,
  userId
});

export const deleteRun = (run, userId) => ({
  type: DELETE_RUN,
  data: run,
  userId
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