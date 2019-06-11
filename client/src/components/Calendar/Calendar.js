import React, { useEffect, useRef }  from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';
import styled from 'styled-components';
import './Calendar.css'

import { Week, CalBox } from '../';


const CalContainer = styled.div`
  height: 40vh;
  overflow: scroll;
`;

  
function Calendar({ user, runData, deleteRun }) {  

  const weekDayNums = Array.of(0, 1, 2, 3, 4, 5, 6);  
  
  // const calEndRef = useRef();
  
  // const scrollToBottom = () => {
  //   calEndRef.current && calEndRef.current.scrollIntoView({ behavior: "smooth" })
  // }

  // useEffect(scrollToBottom, [runData]);

  return (
    <div>
      <div className="columns is-mobile">
        {
          weekDayNums.map(el => {
            return (
              <CalBox className="column is-narrow" key={el} calHeader={moment.weekdaysShort(el)}></CalBox>
            )
          })
        }
        <CalBox className="column is-narrow firstWeekKpi" calHeader={'Total'}></CalBox>
        <CalBox className="column is-narrow" calHeader={'% of Total'} longHeader></CalBox>
        <CalBox className="column is-narrow" calHeader={'Weekly Δ'} longHeader></CalBox>
      </div>
      <CalContainer>
        {
          runData.map(weekData => {
            return (
              <Week key={weekData['_id']} runData={weekData} unit={user.unitOfMeasure} weekDayNums={weekDayNums} 
              userId={user['_id']} deleteRun={deleteRun}>
              </Week>
            )
          })
        }
      </CalContainer>
    </div>
  )

}

export default Calendar;