import React, { useState } from 'react';
// import moment from '../../../../moment';
// need to build event to handle form submission
// vx


function AddRun(props) {

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
    <div>
      <h1>Log New Run</h1>
      <form>
        <label>
        Distance 
          <input type='text' value={distance} required
          onChange={(e) => setDistance(e.target.value)}></input>
        Miles
        </label>
        <label>
        Date 
          <input type='date' value={date} required
          onChange={(e) => setDate(e.target.value)}></input>
        </label>
        <label>
        Location 
          <input type='text' value={location}
          onChange={(e) => setLocation(e.target.value)}></input>
        </label>
        <label>
        Notes 
          <textarea value={note}
          onChange={(e) => setNote(e.target.value)}/>
        </label>
        <label>
        Type of Run 
          <input type='button' value='Speed'
          onClick={(e) => runTypeEvent(e)}/>
          <input type='button' value='Distance'
          onClick={(e) => runTypeEvent(e)}/>
          <input type='button' value='Tempo'
          onClick={(e) => runTypeEvent(e)}/>
          <input type='button' value='Easy'
          onClick={(e) => runTypeEvent(e)}/>
          <input type='button' value='Intervals'
          onClick={(e) => runTypeEvent(e)}/>
          <input type='button' value='Hills'
          onClick={(e) => runTypeEvent(e)}/>
          <input type='button' value='Recovery'
          onClick={(e) => runTypeEvent(e)}/>
          <input type='button' value='Fartlek'
          onClick={(e) => runTypeEvent(e)}/>
          <input type='button' value='Progression'
          onClick={(e) => runTypeEvent(e)}/>
        </label>
        <label>
          <input type='submit' value='Save Run'
          onSubmit={(e) => saveForm(e)}></input>
        </label>
      </form>
    </div>
  )
}

export default AddRun;