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
const locationIqUrl = ''
const locObj = {
  latitude: '',
  longitude: '',
  city: '',
  state: '',
  country: '',
}

async function getBrowserLocation(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(
        locObj.latitude = pos.coords.latitude, 
        locObj.longitude = pos.coords.longitude
        ),
      (err) => '',
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
    )})
}

async function getLocationDetails() {
  try {
    await getBrowserLocation(); 
    const url = (`${locationIqUrl}&lat=${locObj.latitude}&lon=${locObj.longitude}&format=json`);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        locObj.city = data.address.city;
        locObj.state = data.address.state && data.address.city !== data.address.state;
        locObj.country = data.address.country;
        console.log(locObj);
      })
  } catch (error) {
    return null;
  }
}


function AddRun({ serverUrl, user, isModalActive, handleClick }) {

  getLocationDetails();


  const [distance, setDistance] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [runType, setRunType] = useState([]);


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
    const runData = {distance, date, location, note, runType};

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
    handleClick();
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
                <input className='input' type='number' min='0' value={distance} required
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
                {/*<Label>{`${locObj.city}, ${locObj.state}, ${locObj.country}`}</Label>*/}
                <input className='input' type='text' value={location} placeholder='e.g. "New York, NY" or "10021"'
                  onChange={(e) => setLocation(e.target.value)}></input>
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