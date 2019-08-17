import { 
  SET_BROWSER_COORDS, 
  SET_BROWSER_LOCATION,
  REQUEST_BROWSER_COORDS, 
  RECEIVE_BROWSER_COORDS
} from '../actions';

const initialState = {
  isFetching: true,
  latitude: null,
  longitude: null,
  city: null,
  state: null,
  country: null
};

function browserLocation (state = initialState, action) {
  switch(action.type) {
    case SET_BROWSER_COORDS:
      return {
        ...state,
        latitude: action.data.latitude,
        longitude: action.data.longitude
      }
    case SET_BROWSER_LOCATION:
      return {
        ...state,
        city: action.data.city,
        state: action.data.state,
        country: action.data.country
    }
    case REQUEST_BROWSER_COORDS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_BROWSER_COORDS:
      return {
        ...state,
        isFetching: false
      }
    default:
      return {...state}
  }
}

export default browserLocation;