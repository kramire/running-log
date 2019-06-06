import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';

function Calendar({ runData }) {

  return (
    <div>
      <h2> Here is the Calendar </h2>
      {runData.map(run => <p key={run['_id']}>run</p>)}
    </div>
  )

}

export default Calendar;