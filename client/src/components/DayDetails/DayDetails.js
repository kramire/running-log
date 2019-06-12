import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';
import './DayDetails.css';

import styled from 'styled-components';

const Modal = styled.div`
  background-color: #0f0f0f;
  border-radius: 15px;
  padding: 50px;
`;

const H1 = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #CDDDDD;
  margin-bottom: 40px;
`;

const Span = styled.span`
  font-size: 20px;
  color: #CDDDDD;
`;

const Label = styled.label`
  color: #ACBDBA;
  font-size: 1.3em;
  font-weight: bold;
  margin-right: 10px;
  text-transform: capitalize;
`;

const Ul = styled.ul`
  list-style: none;
  background-color: #2E2F2F;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`

const Unit = styled.div`
    display: inline;
    font-size: 1em;
    color: #CDDDDD;
    font-weight: normal;
    font-style: italic;
  `
const Weather = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
  `

const WeatherHeader = styled.div`
    font-size: 16px;
    text-align: center;
    color: #ACBDBA;
    text-transform: capitalize;
  `

const WeatherText = styled.div`
    font-size: 18px;
    text-align-center;
    color: #ACBDBA;
  `;

const weatherIconObj = {
  'clear-day': 'fa-sun',
  'clear-night': 'fa-sun',
  'rain': 'fa-cloud-rain',
  'snow': 'fa-snowflake',
  'sleet': 'fa-cloud-showers-heavy',
  'wind': 'fa-wind',
  'fog': 'fa-smog',
  'cloudy': 'fa-cloud',
  'partly-cloudy-day': 'fa-cloud-sun',
  'partly-cloudy-night': 'fa-cloud-sun' //time stamp
}

const showElement = function (property, obj, unit) {
  if ((Array.isArray(obj[property]) && obj[property].length > 0)) {
    return (
      <li>
        <Label>{property === 'runType' ? 'Type of Run' : property}</Label>
        <Span>{(obj[property]).map(el => `${el}  `)}</Span>
      </li>
    )
  }
  else if (!Array.isArray(obj[property]) && obj[property]) {
    return (
      <li>
        <Label>{property}</Label>
        <Span>{obj[property]}</Span>
        {property==='distance' && <Unit>{unit == 'mi' ? 'miles' : 'kilometers'}</Unit>}
      </li>
    )
  }
}

const genWeatherEl = function (property, obj, text, format) {
  if (obj[property]) {  
    if (property === 'icon') {
      return <li><i className={`fas ${weatherIconObj[obj[property]]}`}></i></li>
    }
    else {
      return (
        <li>
          <WeatherHeader>{text}</WeatherHeader>
          <WeatherText>{format(obj[property])}</WeatherText>
        </li>
      )
    }
  }
}


function DayDetails({ isDayModalActive, handleClick, runArr, date, unit, userId, deleteRun }) {

  const serverUrl = 'http://localhost:3001';

  const getRunWeather = function (lat, long, runDate) {
    if (lat && long && date && isDayModalActive) {
      console.log('calling');
      fetch(`${serverUrl}/weather`, {
            'method': 'GET',
            'headers': {
              'Content-Type': 'application/json',
              'lat': lat,
              'long': long,
              'run_date': runDate
              }
          })
        .then(res => res.json())
        .then(data => setWeather(data))
    }
  }

  const [runArrTemp, setRunArrTemp] = useState([...runArr]);
  const [weather, setWeather] = useState({});

  const handleDelete = function (e, runId, userId) {
    e.preventDefault();
    const r = window.confirm("Are you sure you want to delete this run?");
    r && deleteRun(userId, runId) && setRunArrTemp(runArrTemp.filter(run => run['_id'] !== runId));
  }

  return (
     <div className={`modal ${isDayModalActive ? 'is-active' : ''}`}>
      <div className='modal-background'></div>
      <Modal className='modal-content'>
        <button className='delete is-large' onClick={handleClick}></button>
        <H1 className=''>{`${moment(date).format('MMM Do YYYY')}`}</H1>
        <ul key={date}>
          {
            runArrTemp.map(run => {
              return (
                <div key={run['_id']}>
                  <button className='delete deleteInner is-medium'
                    onClick={(e) => handleDelete(e, run['_id'], userId)}></button>
                  <Ul>
                    {showElement('distance', run, unit)}
                    {showElement('runType', run)}
                    {showElement('note', run)}
                    {showElement('location', run)}
                    {run.location !== '' && run.latitude && run.longitude &&
                      <Weather>
                      { Object.keys(weather).length === 0 &&
                        run.latitude && 
                        run.longitude && 
                        isDayModalActive===true && 
                        getRunWeather(run.latitude, run.longitude, run.date)}
                      {genWeatherEl('icon', weather)}
                      {genWeatherEl('tempHigh', weather, 'High', (el)=>`${Math.round(el)} F`)}
                      {genWeatherEl('tempLow', weather, 'Low', (el)=>`${Math.round(el)} F`)}
                      {genWeatherEl('precipProbability', weather, 'Precip', (el)=>`${Math.round(el*100)}%`)}
                      {genWeatherEl('windSpeed', weather, 'Wind', (el)=>`${Math.round(el)}mph`)}
                      {genWeatherEl('humidity', weather, 'Humidity', (el)=>`${Math.round(el*100)}%`)}
                    </Weather>}
                  </Ul>
                </div>
              )
            })
          }
        </ul>
      </Modal>
    </div>

  )

}

export default DayDetails;