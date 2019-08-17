import userData from '../../assests/userData.json';
import { 
  TOGGLE_ADDRUN_MODAL, 
  TOGGLE_DAY_MODAL,
  SET_DAY_MODAL_DETAILS

} from '../actions';

const initialState = {
  user: userData,
  isAddRunModalActive: false,
  isDayModalActive: false,
  dayModalDetails: {
    date: null,
    runs: [],
    unit: null
  }
}

function appUI(state = initialState, action) {
  switch(action.type) {
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
        dayModalDetails: {
          ...state,
          date: action.date,
          runs: action.runs,
          unit: action.unit
        }
      }
    default:
      return {...state}
  }
}

export default appUI;