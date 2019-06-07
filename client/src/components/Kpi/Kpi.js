import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';


function Kpi({ user, runData, acrData }) {

  const currentWeek = moment().startOf('week');
  const weekData = runData.filter(run => moment(run.date).isSame(currentWeek, 'week'));
  const distances = weekData.map(run => run.distance);
  const total = distances.reduce((acc, cur) => acc + cur, 0);

  const startDate = moment(acrData.startDate).format('MMM Do');
  const endDate = moment(acrData.endDate).format('MMM Do');
  const acrAlertClass = 
    acrData.acr > 1.5 ? 'danger' : 
    acrData.acr > 1.2 ? 'warning' : 
    'success';

  return(
    <div>
      <h1>Welcome Back {user.firstName}!</h1>
      <div>
        <h2>Week's Total Distance</h2>
        <div>{`${total} ${user.unitOfMeasure}`}</div>
        <h2>Acute Chronic Ratio</h2>
        <div className={`has-text-${acrAlertClass}`}>{`${acrData.acr}`}</div>
        <div>{`${startDate} - ${endDate}`}</div>
      </div>
    </div>
  )
}

export default Kpi;