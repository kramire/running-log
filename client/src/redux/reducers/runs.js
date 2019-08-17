import { 
  SET_START_DATE, 
  SET_END_DATE, 
  REQUEST_GET_RUNS, 
  RECEIVE_GET_RUNS,
  REQUEST_POST_RUN, 
  RECEIVE_POST_RUN,
  REQUEST_DELETE_RUN, 
  RECEIVE_DELETE_RUN 
} from '../actions';
import moment from 'moment';

const initialState = {
  startDate: moment().subtract(12, 'weeks').day(0),
  endDate: moment().day(6),
  isFetching: true,
  isPosting: false,
  isDeleting: false,
  lastUpdated: null,
  weeklyData: []
}

function runData(state = initialState, action) {
  switch(action.type) {
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
    case REQUEST_GET_RUNS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_GET_RUNS:
      return {
        ...state,
        isFetching: false,
        isPosing: false,
        weeklyData: action.runs,
        lastUpdate: action.receivedAt
      }
    case REQUEST_POST_RUN:
      return {
        ...state,
        isPosting: true
      }
    case RECEIVE_POST_RUN:
      return {
        ...state,
        isPosting: false
      }
    case REQUEST_DELETE_RUN:
      return {
        ...state,
        isDeleting: true
      }
    case RECEIVE_DELETE_RUN:
      return {
        ...state,
        isDeleting: false,
      }
    default: 
      return {...state}
  }
}

export default runData;