import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';

import styled from 'styled-components';

import { DayDetails } from '../';


function Day({ DateBox, H3, Distance, Unit, runArr, calendarDate, unit }) {

  const [isDayModalActive, setDayModal] = useState(false);

  return (
    <div>
      <DateBox className="column" key={calendarDate} hasModal runArr={runArr}
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