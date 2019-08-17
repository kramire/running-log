const serverUrl = process.env.REACT_APP_WS_URL;

// ------------------------------------------------------
// GET RUNS
// ------------------------------------------------------
export const REQUEST_GET_RUNS = 'REQUEST_GET_RUNS';
export const RECEIVE_GET_RUNS = 'RECEIVE_GET_RUNS';

export const requestRuns = userId => {
  return {
    type: REQUEST_GET_RUNS,
    userId
  }
};

export const receiveRuns = data => ({
  type: RECEIVE_GET_RUNS,
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

// ------------------------------------------------------
// POST RUN
// ------------------------------------------------------
export const REQUEST_POST_RUN = 'REQUEST_POST_RUN';
export const RECEIVE_POST_RUN = 'RECEIVE_POST_RUN';

export const requestPostRun = () => ({
  type: REQUEST_POST_RUN
});

export const receivePostResponse = () => ({
  type: RECEIVE_POST_RUN
});

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

// ------------------------------------------------------
// DELETE RUN
// ------------------------------------------------------
export const REQUEST_DELETE_RUN = 'REQUEST_DELETE_RUN';
export const RECEIVE_DELETE_RUN = 'RECEIVE_DELETE_RUN';

export const requestDeleteRun = () => ({
  type: REQUEST_DELETE_RUN
});

export const receiveDeleteResponse = () => ({
  type: RECEIVE_DELETE_RUN,
});

// ------------------------------------------------------
// APP UI
// ------------------------------------------------------
export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';
export const TOGGLE_ADDRUN_MODAL = 'TOGGLE_ADDRUN_MODAL';
export const TOGGLE_DAY_MODAL = 'TOGGLE_DAY_MODAL';
export const SET_DAY_MODAL_DETAILS = 'SET_DAY_MODAL_DETAILS';

export const setStartDate = date => ({
  type: SET_START_DATE,
  data: date
});

export const setEndDate = date => ({
  type: SET_END_DATE,
  data: date
});

export const toggleAddRunModal = () => ({
  type: TOGGLE_ADDRUN_MODAL
});

export const toggleDayModal = () => ({
  type: TOGGLE_DAY_MODAL
});

export const setDayModalDetails = (date, runs, unit) => ({
  type: SET_DAY_MODAL_DETAILS,
  date,
  runs,
  unit
});

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
      .then(() => dispatch(toggleDayModal()))
      .then(() => dispatch(fetchRuns(userId)))
  }
};

// ------------------------------------------------------
// BROWSER COORDINATES
// ------------------------------------------------------

export const REQUEST_BROWSER_COORDS = 'REQUEST_BROWSER_COORDS';
export const RECEIVE_BROWSER_COORDS = 'RECEIVE_BROWSER_COORDS';
export const SET_BROWSER_COORDS = 'SET_BROWSER_COORDS';
export const SET_BROWSER_LOCATION = 'SET_BROWSER_LOCATION';

export const requestBrowserCoords = () => ({
  type: REQUEST_BROWSER_COORDS
});

export const receiveBrowserCoords = () => ({
  type: RECEIVE_BROWSER_COORDS
});

export const setBrowserCoords = coordinates => ({
  type: SET_BROWSER_COORDS,
  data: coordinates
});

export const setBrowserLocation = data => ({
  type: SET_BROWSER_LOCATION,
  data
});

export const getBrowserCoords = () => {
  const coords = {latitude: null, longitude: null};
  return dispatch => {
    dispatch(requestBrowserCoords())
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }),
        (err) => '', {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    })
    .then(res => {
      coords.latitude = res.latitude 
      coords.longitude = res.longitude
    })
    .then(() => dispatch(receiveBrowserCoords()))
    .then(() => dispatch(setBrowserCoords(coords)))
    .then(() => dispatch(getLocationDetails(coords)))
  }
}

// ------------------------------------------------------
// LOCATION DEATILS
// ------------------------------------------------------

export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

export const requestLocation = () => ({
  type: REQUEST_LOCATION
});

export const receiveLocation = () => ({
  type: RECEIVE_LOCATION
});

export const getLocationDetails = coords => {
  return dispatch => {
    dispatch(requestLocation())
    return fetch(`${serverUrl}/location`, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        lat: coords.latitude,
        long: coords.longitude
      }
    })
    .then(res => res.json())
    .then(data => dispatch(setBrowserLocation(data)))
  }
}

// ------------------------------------------------------
// WEATHER DEATILS
// ------------------------------------------------------

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const STORE_WEATHER = 'STORE_WEATHER';

export const requestWeather = () => ({
  type: REQUEST_WEATHER
});

export const receiveWeather = () => ({
  type: RECEIVE_WEATHER
});

export const storeWeather = (lat, long, date, data) => ({
  type: STORE_WEATHER,
  lat,
  long,
  date,
  data
});

export const getWeather = (lat, long, date) => {
  if (lat !== undefined && long !== undefined && date !== undefined) {
    return dispatch => {
      dispatch(requestWeather())
      return fetch(`${serverUrl}/weather`, {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'lat': lat,
          'long': long,
          'run_date': date
        }
      })
      .then(res => res.json())
      .then(data => dispatch(storeWeather(lat, long, date, data)))
      .then(() => dispatch(receiveWeather()))
    }
  }
};