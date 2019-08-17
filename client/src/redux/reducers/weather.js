import { 
  REQUEST_WEATHER, 
  RECEIVE_WEATHER, 
  STORE_WEATHER 
} from '../actions';

const initialState = {
  isFetching: false,
  data: null
}

function weather(state = initialState, action) {
  switch (action.type) {
        case REQUEST_WEATHER:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_WEATHER:
      return {
        ...state,
        isFetching: false
      }
    case STORE_WEATHER:
      return {
        ...state,
        data: {
          ...state.weather.data,
          lat: action.lat,
          long: action.long,
          date: action.date,
          weather: action.data
        }
      }
    default:
      return state
  }
}

export default weather;