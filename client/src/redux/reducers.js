// State outline

// const state = {
//   user = {null},
//   startDate = Date (default to sunday of 12 weeks ago),
//   endDate = Date (default to saturday of this week),
//   browserLocation = {lat: null, long: null},
//   runData = {}
// }


// a reducer is a pure function that accepts to arguments
// the current state, and the action type
// it returns a new version of the state

// pure functions only
// no side effects, no api calls, no mutations

import userData from '../assests/userData.json';
import moment from 'moment';
import { ADD_RUN, DELETE_RUN} from './actions';
import { SET_START_DATE, SET_END_DATE } from './actions';
import { SET_BROWSER_LOCATION } from './actions';
import { TOGGLE_ADDRUN_MODAL } from './actions';

const initialState = {
  user: userData,
  startDate: moment().subtract(12, 'weeks').day(0),
  endDate: moment().day(6),
  browserLocation: {latitude: null, longitude: null},
  runData: null,
  isAddRunModalActive: false,
  isDayModalActive: false
};

function runningLogReducers(state = initialState, action) {
  switch (action.type) {
    case SET_START_DATE: 
      return {
        ...state,
        startDate: action.data
      }
    case SET_END_DATE:
      return {
        ...state,
        endDate: action.data
      }
    case SET_BROWSER_LOCATION:
      return {
        ...state,
        browserLocation: {
          ...state.browserLocation,
          latitude: action.data.latitude,
          longitude: action.data.longitude
        }
      }
    case TOGGLE_ADDRUN_MODAL:
      return {
        ...state,
        isAddRunModalActive: !state.isAddRunModalActive
      }
    default:
      return state
  }
}

export default runningLogReducers;