import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';


// start with sunday start. focus on monday start after
function Calendar({ user, runData, history }) {  

  const currentWeek = moment().startOf('week');
  const calendarStart = currentWeek.subtract(history, 'd').startOf('week').toDate();
  console.log(calendarStart);

  const weekUpdate = [];
  for (let i=0; i<=Math.floor(history/7); i++) {
    weekUpdate.push(i*7);
  }  
  const dateUpdate = Array.of(0, 1, 2, 3, 4, 5, 6);

  return (
    <div>
      <h2> Here is the Calendar </h2>
      {weekUpdate.map(el => {
        let weekStart = moment(calendarStart).add(el, 'd')
        return (
          <div className="columns">
          {
            dateUpdate.map(el => {
              let buildDate = moment(weekStart).add(el, 'd');
              return (
                <div className="column">
                  { `${moment(buildDate).format("MMM DD")}` }
                  <p className="">
                    { 
                      runData.filter(run => moment(run.date).isSame(buildDate, 'day'))
                        .map(run => run.distance)
                        .reduce((acc, cur) => acc + cur, 0)
                    }
                    {` ${user.unitOfMeasure}`}
                  </p>
                </div>
              )
            })
          }  
          </div>
        )
      })}
    </div>
  )

}

export default Calendar;