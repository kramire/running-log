import React, { useState, useEffect } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import './AddRun.css';
import styled from 'styled-components';
import { Modal } from '../../assests/globalStyledComponents';

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

function AddRun({ serverUrl, user, isModalActive, handleClick }) {

  const [browserLocation, setBrowserLocation] = useState({});
  const [distance, setDistance] = useState(0);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState({});
  const [note, setNote] = useState('');
  const [runType, setRunType] = useState([]);
  const [showDefaultLoc, setDefaultLoc] = useState(false);
  
  // Get, set, and check browser location
  const getBrowserLocation = async function () {
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
  };

  // If enough location data, flag that there is a default
  const checkDefaultLocation = function () {
    (browserLocation.city && (browserLocation.state || browserLocation.country)) && setDefaultLoc(true)
  };

  const formatLoc = function (loc) {
    if (loc.state) return `${loc.city}, ${loc.state}`;
    else return `${loc.city}, ${loc.country}`;
  };

  useEffect(() => {
    getBrowserLocation()
      .then(res => {
        return fetch(`${serverUrl}/location`, {
          'method': 'GET',
          'headers': {
            'Content-Type': 'application/json',
            'lat': res.latitude,
            'long': res.longitude
          }
        })
      })
      .then(res => res.json())
      .then(data => {
        setBrowserLocation(data)
        setDefaultLoc(true);
      });
  }, []);

  useEffect(() => {
    checkDefaultLocation();
  }, [browserLocation]);

  // Handle form actions
  const saveForm = function (e) {
    e.preventDefault();
    const runData = {
      distance,
      date,
      location,
      note,
      runType,
      latitude: coords.latitude,
      longitude: coords.longitude
    };

    fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          '_id': user['_id'],
          run: runData
        })
      })
      .then(res => res.json())
    handleClose();
  };

  const handleClose = () => {
    setDistance('');
    setDate('');
    setLocation('');
    setNote('');
    setRunType([]);
    checkDefaultLocation();
    handleClick();
  };

  const handleAgree = function (e) {
    e.preventDefault();
    setLocation(formatLoc(browserLocation));
    setCoords({
      'latitude': browserLocation.latitude,
      'longitude': browserLocation.longitude
    });
    setDefaultLoc(false);
  };

  const handleDeny = function (e) {
    e.preventDefault();
    setDefaultLoc(false);
  };

  const toggleLocationInput = function () {
    if (showDefaultLoc) {
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
  };

  const types = ['Speed', 'Distance', 'Tempo', 'Easy', 'Intervals', 'Hills',
    'Recovery', 'Farlek', 'Progression'
  ];

  const runTypeEvent = function (e) {
    if (!runType.includes(e.target.value)) {
      return setRunType([...runType, e.target.value]);
    } else {
      setRunType(runType.filter(el => el !== e.target.value));
    }
  }

  // Generate formatting for input fields.
  const generateInput = function (inputDiv, distance=false, buttons=false) {
    return (
      <div className='field is-horizontal'>
        <Label className='label field-label'>Distance</Label>
          <div className={`control field-body ${buttons && 'buttons is-centered'}`}>
            {inputDiv}
            {distance && <Label>Miles</Label>}
          </div>
      </div>
    )
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
          {
            generateInput(
              <input className='input distance' type='number' min='0' step="0.01" value={distance} required
              onChange={(e) => setDistance(e.target.value)}></input>
              , true)
          }
          {
            generateInput(
              <input className='input' type='date' value={date} onChange={(e) => setDate(e.target.value)}></input>)
          }
          {
            generateInput(toggleLocationInput())
          }
          {
            generateInput(
              <textarea className='textarea' value={note} placeholder="Anything to note?" 
              onChange={(e) => setNote(e.target.value)}/>)
          }
          {
            generateInput(types.map(type => {
              return <input key={type} className={`button ${runType.includes(type) && 'selected'}`} 
              type='button' value={type} onClick={(e) => runTypeEvent(e)}/>
            }), false, true)
          }
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