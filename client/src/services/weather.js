const serverUrl = process.env.REACT_APP_WS_URL;

export const getRunWeather = function (lat, long, runDate) {
  return fetch(`${serverUrl}/weather`, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'lat': lat,
        'long': long,
        'run_date': runDate
      }
    })
    .then(res => res.json());
}