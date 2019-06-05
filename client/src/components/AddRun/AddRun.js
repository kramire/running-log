import React, { useState, useContext } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
// import moment from '../../../../moment';
// need to build event to handle form submission
import { AppContext } from '../../App';


function AddRun() {

  const { isModalActive, toggleAddRun } = useContext(AppContext);
  console.log(isModalActive);
  console.log(toggleAddRun);

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
    // not working lol
    console.log('Clicked save on form');
    e.preventDefault();
  }

  return (
    <div className={`modal has-background-white-ter ${isModalActive}`}>
    <div className='modal-background'></div>
      <div className='modal-card'>
        <h1 className='modal-card-head has-text-centered modal-card-title'>Log New Run</h1>
        <form className='modal-card-body'>
        <div className='field is-horizontal'>
            <label className='label field-label'>Distance</label>
              <div className='control field-body'>
                <input className='input' type='text' value={distance} required
                onChange={(e) => setDistance(e.target.value)}></input>
                <span>Miles</span>
              </div>
          </div>
          <div className='field is-horizontal'>
            <label className='label field-label'>Date</label>
              <div className='control field-body'>
                <input className='input' type='date' value={date} required
                onChange={(e) => setDate(e.target.value)}></input>
              </div>
          </div>
          <div className='field is-horizontal'>
            <label className='label field-label'>Location</label>
              <div className='control field-body'>
                <input className='input' type='text' value={location} placeholder='e.g. "New York, NY" or "10021"'
                onChange={(e) => setLocation(e.target.value)}></input>
              </div>
          </div>
          <div className='field is-horizontal'>
            <label className='label field-label'>Notes</label>
              <div className='control field-body'>
                <textarea className='textarea' value={note} placeholder="Anything to note?"
                onChange={(e) => setNote(e.target.value)}/>
              </div>
          </div>
          <div className='field is-horizontal'>
            <label className='label field-label'>Type of Run</label>
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
                <input className='button is-success' type='submit' value='Save Run'
                onSubmit={(e) => saveForm(e)}></input>
            </div>
          </div>
        </form>
      </div>
    <button className="modal-close is-large" aria-label="close"
    onClick={toggleAddRun}></button>
    </div>
  )
}

export default AddRun;