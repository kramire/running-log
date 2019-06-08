import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
// import moment from '../../../../moment';

import styled from 'styled-components';


function AddRun({ serverUrl, user, isModalActive, handleClick }) {

  const CloseButton = styled.button`
    background-color: transparent;
    font-size: 2em;
    border: none;
    color: #CDDDDD;
  `

  const H1 = styled.h1`
    font-size: 40px;
    text-align: center;
    color: #CDDDDD;
    margin-bottom: 20px;
  `;

  const Label = styled.label`
    color: #ACBDBA;
    font-size: 20px;
  `;

  const [distance, setDistance] = useState('');
  const [date, setDate] = useState(Date.now());
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [runType, setRunType] = useState([]);

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
    .then(data => console.log(data));
    handleClick();
  }


  return (
    <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
    <div className='modal-background'></div>
      <div className='modal-content'>
        <div>
          <button className='delete is-large' onClick={handleClick}></button>
          <H1 className=''>Log New Run</H1>
        </div>
        <form className='' onSubmit={(e) => saveForm(e)}>
          <div className='field is-horizontal'>
            <Label className='label field-label'>Distance</Label>
              <div className='control field-body'>
                <input className='input' type='text' value={distance} required
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
              <div className='control field-body buttons'>
                <input className='button' type='button' value='Speed'
                  onClick={(e) => runTypeEvent(e)}/>
                <input className='button' type='button' value='Distance'
                  onClick={(e) => runTypeEvent(e)}/>
                <input className='button' type='button' value='Tempo'
                  onClick={(e) => runTypeEvent(e)}/>
                <input className='button' type='button' value='Easy'
                  onClick={(e) => runTypeEvent(e)}/>
                <input className='button' type='button' value='Intervals'
                  onClick={(e) => runTypeEvent(e)}/>
                <input className='button' type='button' value='Hills'
                  onClick={(e) => runTypeEvent(e)}/>
                <input className='button' type='button' value='Recovery'
                  onClick={(e) => runTypeEvent(e)}/>
                <input className='button' type='button' value='Fartlek'
                  onClick={(e) => runTypeEvent(e)}/>
                <input className='button' type='button' value='Progression'
                  onClick={(e) => runTypeEvent(e)}/>
              </div>
          </div>
          <div className='field'>
            <div className='control has-text-centered'>
                <input className='button is-success' type='submit' value='Save Run'></input>
            </div>
          </div>
        </form>
      </div>
   
    </div>
  )
}

export default AddRun;