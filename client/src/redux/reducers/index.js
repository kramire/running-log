import runData from './runs';
import browserLocation from './location';
import appUI from './appUI';
import weather from './weather';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  runData,
  browserLocation,
  appUI,
  weather
});

export default rootReducer;