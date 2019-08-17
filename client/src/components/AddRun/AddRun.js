import React, { useState, useEffect } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import './AddRun.css';
import styled from 'styled-components';
import { Modal } from '../../assests/globalStyledComponents';
import { postNewRun } from '../../redux/actions';
import { connect } from 'react-redux';

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

function AddRun({ browserLocation, user, isModalActive, handleClick, saveRun }) {

  const [distance, setDistance] = useState(0);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [runType, setRunType] = useState([]);
  const [showDefaultLoc, setDefaultLoc] = useState(false);

  // If enough location data, flag that there is a default
  const checkDefaultLocation = function () {
    (browserLocation.city && (browserLocation.state || browserLocation.country)) && setDefaultLoc(true)
  };

  const formatLoc = function (loc) {
    if (loc.state) return `${loc.city}, ${loc.state}`;
    else return `${loc.city}, ${loc.country}`;
  };

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
      latitude: browserLocation.latitude,
      longitude: browserLocation.longitude
    };
    console.log(browserLocation);
    saveRun(user['_id'], runData);
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
  const generateInput = function (fieldName, inputDiv, distance=false, buttons=false) {
    return (
      <div className='field is-horizontal'>
        <Label className='label field-label'>{fieldName}</Label>
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
            generateInput('Distance',
              <input className='input distance' type='number' min='0' step="0.01" value={distance} required
              onChange={(e) => setDistance(e.target.value)}></input>
              , true)
          }
          {
            generateInput('Date',
              <input className='input' type='date' value={date} onChange={(e) => setDate(e.target.value)}></input>)
          }
          {
            generateInput('Location', toggleLocationInput())
          }
          {
            generateInput('Notes',
              <textarea className='textarea' value={note} placeholder="Anything to note?" 
              onChange={(e) => setNote(e.target.value)}/>)
          }
          {
            generateInput('Run Type', types.map(type => {
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

const mapStateToProps = state => {
  return {
    isModalActive: state.isAddRunModalActive,
    user: state.user,
    browserLocation: state.browserLocation
  };
}

const mapDispatchToProps = dispatch => {
  return {
    saveRun: (userId, runData) => dispatch(postNewRun(userId, runData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRun);