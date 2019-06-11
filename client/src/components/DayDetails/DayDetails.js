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
  `


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


function DayDetails({ isDayModalActive, handleClick, runArr, date, unit, userId, deleteRun }) {

  const serverUrl = 'http://localhost:3001';

  const getRunWeather = function (lat, long, runDate) {
    if (lat && long && date && isDayModalActive) {
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
                    {(getRunWeather(run.latitude, run.longitude, run.date))}
                    {showElement('distance', run, unit)}
                    {showElement('location', run)}
                    {showElement('runType', run)}
                    {showElement('note', run)}
                    <Weather>
                      {showElement('summary', weather)}
                      {showElement('tempHigh', weather)}
                      {showElement('tempLow', weather)}
                    </Weather>
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