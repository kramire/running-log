import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';

import { Week } from '../';

// start with sunday start. focus on monday start after
function Calendar({ user, runData, history }) {  

  const currentWeek = moment().startOf('week');
  const calendarStart = currentWeek.subtract(history, 'd').startOf('week').toDate();

  const weekUpdate = [];
  for (let i=0; i<=Math.floor(history/7); i++) {
    weekUpdate.push(i*7);
  }  

  return (
    <div>
      <h2>Calendar</h2>
      {
        weekUpdate.map(el => {
          let weekStart = moment(calendarStart).add(el, 'd')
          let weekData = runData.filter(run => moment(run.date).isSame(weekStart, 'week'));

          return (
            <Week key={weekStart} runData={weekData} 
              weekStart={weekStart} unit={user.unitOfMeasure}>
            </Week>
            )
          }
        )
      }
    </div>
  )

}

export default Calendar;