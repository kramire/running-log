import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';

import './Day.css'

import styled from 'styled-components';

import { DayDetails } from '../';


function Day({ DateBox, H3, Distance, runArr, calendarDate, unit }) {

  const Unit = styled.div`
    display: inline;
    font-size: .5em;
    font-weight: normal;
  `

  // No column in classname here, thats why theres still margin;

  const [isDayModalActive, setDayModal] = useState(false);

  return (
    <div className="column">
      <DateBox key={calendarDate} hasModal runArr={runArr}
        onClick={() => setDayModal(true)}>
        <H3>{ `${calendarDate.format("MMM DD")}` }</H3>
        <Distance>
          {runArr.map(run => run.distance)
            .reduce((accum, cur) => accum + cur, 0)
          }
          <Unit>{`${unit}`}</Unit>
        </Distance>
      </DateBox>
      <DayDetails isDayModalActive={isDayModalActive} handleClick={() => setDayModal(false)}
        date={calendarDate} runArr={runArr}></DayDetails>
    </div>
  )

}

export default Day;