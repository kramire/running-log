import React  from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';
import styled from 'styled-components';
import './Calendar.css'
import { Week, CalBox } from '../';
import { Title } from '../../assests/globalStyledComponents';

const CalContainer = styled.div`
  height: 40vh;
  overflow: scroll;
`;
  
function Calendar({ user, runData }) {  
  const weekDayNums = Array.of(0, 1, 2, 3, 4, 5, 6);  
  
  return (
    <div>
      <Title>Calendar</Title>
      <div className="columns is-mobile">
        {weekDayNums.map(el => 
            <CalBox className="column is-narrow" key={el} calHeader={moment.weekdaysShort(el)}></CalBox>
        )}
        <CalBox className="column is-narrow firstWeekKpi" calHeader={'Total'}></CalBox>
        <CalBox className="column is-narrow" calHeader={'% of Total'} longHeader></CalBox>
        <CalBox className="column is-narrow" calHeader={'Weekly Δ'} longHeader></CalBox>
      </div>
      <CalContainer>
        {runData.map(weekData => 
            <Week key={weekData['_id']} runData={weekData} unit={user.unitOfMeasure} weekDayNums={weekDayNums} 
              userId={user['_id']}></Week>
        )}
      </CalContainer>
    </div>
  )
}

export default Calendar;