import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';


function Kpi({ user, runData, acr }) {

  const currentWeek = moment().startOf('week');
  const weekData = runData.filter(run => moment(run.date).isSame(currentWeek, 'week'));
  const distances = weekData.map(run => run.distance);
  const total = distances.reduce((acc, cur) => acc + cur, 0);

  return(
    <div>
      <h1>Welcome Back {user.firstName}!</h1>
      <div>
        <h2>Week's Total Distance</h2>
        <div>{`${total} ${user.unitOfMeasure}`}</div>
        <h2>Acute Chronic Ratio</h2>
        <div>{`${acr}`}</div>
      </div>
    </div>
  )
}

export default Kpi;