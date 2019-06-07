import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';

import styled from 'styled-components';

import { Week } from '../';

// start with sunday start. focus on monday start after
function Calendar({ user, runData, history }) {  

  const CalContainer = styled.div`
    height: 45vh;
    overflow: scroll;
  `;

  const DateBox = styled.div`
    background-color: #2E2F2F;
    margin: 2px;
    color: #CDDDDD;
  `;

  const H3 = styled.div`
    text-align: center;
  `;

  const currentWeek = moment().startOf('week');
  const calendarStart = currentWeek.subtract(history, 'd').startOf('week').toDate();

  const weekUpdate = [];
  for (let i=0; i<=Math.floor(history/7); i++) {
    weekUpdate.push(i*7);
  }

  const dateUpdate = Array.of(0, 1, 2, 3, 4, 5, 6);  

  return (
    <div>
      <div className="columns">
        {
          dateUpdate.map(el => {
            return (
              <DateBox className="column" key={el}>
                <H3>{`${moment.weekdays(el)}`}</H3>
              </DateBox>
            )
          })
        }
        <DateBox className="column">
          <H3>Total</H3>
        </DateBox>
        <DateBox className="column">
          <H3>% of Total</H3>
        </DateBox>
      </div>
      <CalContainer>
        {
          weekUpdate.map(el => {
            let weekStart = moment(calendarStart).add(el, 'd')
            let weekData = runData.filter(run => moment(run.date).isSame(weekStart, 'week'));

            return (
              <Week DateBox={DateBox} H3={H3} key={weekStart} runData={weekData} dateUpdate={dateUpdate}
                weekStart={weekStart} unit={user.unitOfMeasure}>
              }
              </Week>
              )
            }
          )
        }
      </CalContainer>
    </div>
  )

}

export default Calendar;