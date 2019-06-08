import React from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';

import styled from 'styled-components';
import './Calendar.css'

import { Week } from '../';

// start with sunday start. focus on monday start after
function Calendar({ user, runData }) {  

  // something with the fact that there are two divs of columns
  const CalContainer = styled.div`
    height: 45vh;
    overflow: scroll;
  `;

  const DateBox = styled.div`
    background-color: #2E2F2F;
    margin: 2px;
    color: #CDDDDD;

    &:hover {
      background-color: ${props => props.hasModal && '#4A4C4C'};
    }
  `;

  const FirstBoxKpi = styled.div`
    background-color: #2E2F2F;
    margin: 2px;
    margin-left: 10px;
    color: #CDDDDD;
  `;

  const H3 = styled.div`
    text-align: center;
  `;

  const weekDayNums = Array.of(0, 1, 2, 3, 4, 5, 6);  

  return (
    <div>
      <div className="columns is-mobile">
        {
          weekDayNums.map(el => {
            return (
              <DateBox className="column" key={el}>
                <H3>{`${moment.weekdays(el)}`}</H3>
              </DateBox>
            )
          })
        }
        <FirstBoxKpi className="column">
          <H3>Total</H3>
        </FirstBoxKpi>
        <DateBox className="column">
          <H3>% of Total</H3>
        </DateBox>
        <DateBox className="column">
          <H3>WoW</H3>
        </DateBox>
      </div>
      <CalContainer>
        {
          runData.map(weekData => {
            return (
              <Week key={weekData['_id']} weekDate={weekData.week} runData={weekData} 
              unit={user.unitOfMeasure} weekDayNums={weekDayNums}
              DateBox={DateBox} H3={H3} FirstBoxKpi={FirstBoxKpi}></Week>
              )
            }
          )
        }
      </CalContainer>
    </div>
  )

}

export default Calendar;