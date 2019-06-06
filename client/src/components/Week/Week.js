import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';


function Week({ runData, weekStart, unit }) {

  const dateUpdate = Array.of(0, 1, 2, 3, 4, 5, 6);

  const distances = runData.map(run => run.distance);

  const total = distances.reduce((acc, cur) => acc + cur, 0);
  const max = distances.reduce((acc, cur) => Math.max(acc, cur), 0);
  const maxPrct = Math.round(max/total*100);
  const maxThreshold = 30;

  return (
    <div className="columns">
      {
        dateUpdate.map(el => {
          let buildDate = moment(weekStart).add(el, 'd');
          return (
            <div className="column" key={buildDate}>
              <h2>{ `${moment(buildDate).format("MMM DD")}` }</h2>
              <div>
                { 
                  runData.filter(run => moment(run.date).isSame(buildDate, 'day'))
                    .map(run => run.distance)
                    .reduce((acc, cur) => acc + cur, 0)
                }
                {` ${unit}`}
              </div>
            </div>
          )
        })
      }
      <div className="column">
        <h2>Week Total</h2>
        {`${total} ${unit}`}
      </div>

      <div className={`column ${maxPrct > maxThreshold && 'has-background-danger'}`}>
        <h2>Longest %</h2>
        {`${maxPrct}% ${unit}`}
      </div>

    </div>
  )
}

export default Week;