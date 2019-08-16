// a reducer is a pure function that accepts to arguments
// the current state, and the action type
// it returns a new version of the state

// pure functions only
// no side effects, no api calls, no mutations

import userData from '../assests/userData.json';
import moment from 'moment';
import { SET_START_DATE, SET_END_DATE } from './actions';
import { SET_BROWSER_LOCATION } from './actions';
import { TOGGLE_ADDRUN_MODAL } from './actions';
import { REQUEST_RUNS, RECEIVE_RUNS } from './actions';
import { REQUEST_POST_RUN, RECEIVE_POST_RUN} from './actions';
import { REQUEST_DELETE_RUN, RECEIVE_DELETE_RUN } from './actions';

const initialState = {
  user: userData,
  startDate: moment().subtract(12, 'weeks').day(0),
  endDate: moment().day(6),
  browserLocation: {latitude: null, longitude: null},
  data: {
    isFetching: true,
    isPosting: false,
    isDeleting: false,
    lastUpdated: null,
    weeklyData: []
  },
  isAddRunModalActive: false,
  isDayModalActive: false
};

function runningLogReducers(state = initialState, action) {
  console.log(action);
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
    case REQUEST_RUNS:
      return {
        ...state,
        data: {
          ...state.data,
          isFetching: true
        }
      }
    case RECEIVE_RUNS:
      return {
        ...state,
        data: {
          ...state.data,
          isFetching: false,
          isPosing: false,
          weeklyData: action.runs,
          lastUpdate: action.receivedAt
        }
      }
    case REQUEST_POST_RUN: 
      return {
        ...state,
        data: {
          ...state.data,
          isPosting: true
        }
      }
    case RECEIVE_POST_RUN:
      return {
        ...state,
        data: {
          ...state.data,
          isPosting: false
        }
      }
    case REQUEST_DELETE_RUN:
      return {
        ...state,
        data: {
          ...state.data,
          isDeleting: true
        }
      }
    case RECEIVE_DELETE_RUN:
      return {
        ...state,
        data: {
          ...state.data,
          isDeleting: false,
        }
      }
    default:
      return state
  }
}

export default runningLogReducers;