import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import './AddRun.css';

import styled from 'styled-components';

const Modal = styled.div`
  background-color: #0f0f0f;
  border-radius: 15px;
  padding: 50px;
`;

const H1 = styled.h1`
  font-size: 40px;
  text-align: center;
  color: #CDDDDD;
  margin-bottom: 40px;
`;

const Label = styled.label`
  color: #ACBDBA;
  font-size: 20px;
`;

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// const locationIqUrl = 'https://eu1.locationiq.com/v1/reverse.php?key=236b8b5b6932ec'

function AddRun({ serverUrl, user, isModalActive, handleClick, browserLocation }) {
  

  const [distance, setDistance] = useState(0);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [note, setNote] = useState('');
  const [runType, setRunType] = useState([]);
  const [showDefault, setDefault] = useState(false);
 
  const types = ['Speed', 'Distance', 'Tempo', 'Easy', 'Intervals', 'Hills', 
  'Recovery', 'Farlek', 'Progression'];

  const runTypeEvent = function (e) {
    const desc = e.target.value;
    if (!runType.includes(desc)) {
      return setRunType([...runType, e.target.value]);
    }
    else {
      setRunType(runType.filter(el => el !== desc));
    }
  }

  const saveForm = function (e) {
    e.preventDefault();
    const runData = {distance, date, location, note, runType, latitude, longitude};

    fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'_id': user['_id'], run: runData})
    })
    .then(res => res.json())
    handleClose();
  }

  const handleClose = () => {
    setDistance('');
    setDate('');
    setLocation('');
    setNote('');
    setRunType([]);
    checkDefaultLocation();
    handleClick();
  }

  const handleAgree = function (e) {
    e.preventDefault();
    setLocation(formatLoc(browserLocation));
    setLatitude(browserLocation.latitude);
    setlongitude(browserLocation.longitude);
    setDefault(false);
  }

  const handleDeny = function (e) {
    e.preventDefault();
    setDefault(false);
  }

  const checkDefaultLocation = function (e) {
    if (browserLocation.city && (browserLocation.state || browserLocation.country)) {
      setDefault(true);
    }
  }

  const formatLoc = function (loc) {
      if (loc.state) return `${loc.city}, ${loc.state}`;
      else return `${loc.city}, ${loc.country}`;
  }

  const toggleLocationInput = function () {
    if (showDefault) {
      return (
        <div className='makeFlex'>
          <Label>{formatLoc(browserLocation)}</Label>
          <div>
            <span>Use this location?</span>
            <button className='locAgree locButton' onClick={(e) => handleAgree(e)}>Yes</button>
            <button className='locDeny locButton' onClick={(e) => handleDeny(e)}>No</button>
          </div>
        </div>
      )
    }
    else {
      return (
        <input className='input' type='text' value={location} placeholder='e.g. "New York, NY" or "10021"'
            onChange={(e) => setLocation(e.target.value)}>
        </input>
      )
    }
  }

  return (
    <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
    <div className='modal-background'></div>
      <Modal className='modal-content'>
        <div>
          <button className='delete is-large' onClick={handleClose}></button>
          <H1 className=''>Log New Run</H1>
        </div>
        <form className='' onSubmit={(e) => saveForm(e)}>
          <div className='field is-horizontal'>
            <Label className='label field-label'>Distance</Label>
              <div className='control field-body'>
                <input className='input' type='number' min='0' step="0.01" value={distance} required
                  onChange={(e) => setDistance(e.target.value)}></input>
                <Label>Miles</Label>
              </div>
          </div>
          <div className='field is-horizontal'>
            <Label className='label field-label'>Date</Label>
              <div className='control field-body'>
                <input className='input' type='date' value={date}
                  onChange={(e) => setDate(e.target.value)}></input>
              </div>
          </div>
          <div className='field is-horizontal'>
            <Label className='label field-label'>Location</Label>
              <div className='control field-body'>
                {toggleLocationInput()}
              </div>
          </div>
          <div className='field is-horizontal'>
            <Label className='label field-label'>Notes</Label>
              <div className='control field-body'>
                <textarea className='textarea' value={note} placeholder="Anything to note?"
                  onChange={(e) => setNote(e.target.value)}/>
              </div>
          </div>
          <div className='field is-horizontal'>
            <Label className='label field-label'>Type of Run</Label>
              <div className='control field-body buttons is-centered'>
                {types.map(type => {
                  return <input key={type} className={`button ${runType.includes(type) && 'selected'}`} 
                  type='button' value={type} onClick={(e) => runTypeEvent(e)}/>
                })}
              </div>
          </div>
          <div className='field'>
            <div className='control has-text-centered'>
                <input className='button success' type='submit' value='Save Run'></input>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddRun;