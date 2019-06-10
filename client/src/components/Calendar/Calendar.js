import React from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';

import styled from 'styled-components';
import './Calendar.css'

import { Week } from '../';

// start with sunday start. focus on monday start after
// something with the fact that there are two divs of columns
const CalContainer = styled.div`
  height: 40vh;
  overflow: scroll;
`;

const DateBox = styled.div`
  background-color: #2E2F2F;
  color: #CDDDDD;

  &:hover {
    background-color: ${props => props.hasModal && '#4A4C4C'};
  }
`;

const H3 = styled.div`
  text-align: center;
  font-size: .9em;
`;
  
function Calendar({ user, runData }) {  


  const weekDayNums = Array.of(0, 1, 2, 3, 4, 5, 6);  

  return (
    <div>
      <div className="columns is-mobile calendar">
        {
          weekDayNums.map(el => {
            return (
              <DateBox className="column reAddMargin" key={el}>
                <H3>{`${moment.weekdays(el)}`}</H3>
              </DateBox>
            )
          })
        }
        <DateBox className="column reAddMargin firstKpi">
          <H3>Total</H3>
        </DateBox>
        <DateBox className="column reAddMargin">
          <H3>% of Total</H3>
        </DateBox>
        <DateBox className="column reAddMargin">
          <H3>WoW</H3>
        </DateBox>
      </div>
      <CalContainer>
        {
          runData.map(weekData => {
            return (
              <Week key={weekData['_id']} weekDate={weekData.week} runData={weekData} 
              unit={user.unitOfMeasure} weekDayNums={weekDayNums}
              DateBox={DateBox} H3={H3}></Week>
              )
            }
          )
        }
      </CalContainer>
    </div>
  )

}

export default Calendar;