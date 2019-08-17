// a reducer is a pure function that accepts to arguments
// the current state, and the action type
// it returns a new version of the state

// pure functions only
// no side effects, no api calls, no mutations

import userData from '../assests/userData.json';
import moment from 'moment';
import { SET_START_DATE, SET_END_DATE, SET_DAY_MODAL_DETAILS } from './actions';
import { SET_BROWSER_COORDS, SET_BROWSER_LOCATION } from './actions';
import { TOGGLE_ADDRUN_MODAL, TOGGLE_DAY_MODAL } from './actions';
import { REQUEST_RUNS, RECEIVE_RUNS } from './actions';
import { REQUEST_POST_RUN, RECEIVE_POST_RUN} from './actions';
import { REQUEST_DELETE_RUN, RECEIVE_DELETE_RUN } from './actions';
import { REQUEST_BROWSER_COORDS, RECEIVE_BROWSER_COORDS } from './actions';
import { REQUEST_WEATHER, RECEIVE_WEATHER, STORE_WEATHER } from './actions';

const initialState = {
  user: userData,
  browserLocation: {
    isFetching: true,
    latitude: null, 
    longitude: null,
    city: null,
    state: null,
    country: null
  },
  data: {
    startDate: moment().subtract(12, 'weeks').day(0),
    endDate: moment().day(6),
    isFetching: true,
    isPosting: false,
    isDeleting: false,
    lastUpdated: null,
    weeklyData: []
  },
  weather: {
    isFetching: false,
    data: null
  },
  isAddRunModalActive: false,
  isDayModalActive: false,
  dayDetails: {
    date: null,
    runs: [],
    unit: null
  }
};

function runningLogReducers(state = initialState, action) {
  
  console.log(action);
  console.log(state);

  switch (action.type) {
    case SET_START_DATE: 
      return {
        ...state,
        data: {
          ...state.data,
          startDate: action.data
        }
      }
    case SET_END_DATE:
      return {
        ...state,
        data: {
          ...state.data,
          endDate: action.data
        }
      }
    case SET_BROWSER_COORDS:
      return {
        ...state,
        browserLocation: {
          ...state.browserLocation,
          latitude: action.data.latitude,
          longitude: action.data.longitude
        }
      }
    case SET_BROWSER_LOCATION:
      return {
        ...state,
        browserLocation: {
          ...state.browserLocation,
          city: action.data.city,
          state: action.data.state,
          country: action.data.country
        }
      }
    case TOGGLE_ADDRUN_MODAL:
      return {
        ...state,
        isAddRunModalActive: !state.isAddRunModalActive
      }
    case TOGGLE_DAY_MODAL:
      return {
        ...state,
        isDayModalActive: !state.isDayModalActive
      }
    case SET_DAY_MODAL_DETAILS:
      return {
        ...state,
        dayDetails: {
          ...state,
          date: action.date,
          runs: action.runs,
          unit: action.unit
        }
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
    case REQUEST_BROWSER_COORDS:
      return {
        ...state,
        browserLocation: {
          ...state.browserLocation,
          isFetching: true
        }
      }
    case RECEIVE_BROWSER_COORDS:
      return {
        ...state,
        browserLocation: {
          ...state.browserLocation,
          isFetching: false
        }
      }
    case REQUEST_WEATHER:
      return {
        ...state,
        weather: {
          ...state.weather,
          isFetching: true
        }
      }
    case RECEIVE_WEATHER:
      return {
        ...state,
        weather: {
          ...state.weather,
          isFetching: false
        }
      }
    case STORE_WEATHER:
      return {
        ...state,
        weather: {
          ...state.weather,
          data: {
            ...state.weather.data,
            lat: action.lat,
            long: action.long,
            date: action.date,
            weather: action.data
          }
        }
      }
    default:
      return state
  }
}

export default runningLogReducers;