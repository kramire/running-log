import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import styled from 'styled-components';
import './Day.css'
import moment from 'moment';
import { DayDetails } from '../';


const DateBox = styled.div`
  background-color: ${props => props.warnAlert ? '#c4817d' : '#2E2F2F'};
  color: #CDDDDD;
  width: 100px;
  height: 100%
  box-sizing: border-box;

  &:hover {
    background-color: ${props => props.hasModal && '#4A4C4C'};
  }
`;

const BoxHeader = styled.div`
  text-align: center;
  font-size: ${props => (props.longHeader ? '12px' : '14px')};
`;

const Kpi = styled.div`
  font-size: ${props => (props.distance ? '30px' : '26px')};
  font-weight: ${props => (props.distance ? 'bold' : 'normal')};
  font-style: ${props => (props.percentage ? 'italic' : 'normal')};
  padding: ${props => (props.distance ? '0 5px' : '5px 5px 0px 5px')};
  text-align: right;
`;

const Unit = styled.div`
  display: inline;
  font-size: ${props => (props.distance ? '18px' : '16px')};
  font-weight: normal;
  margin-left: 5px
`;


function CalBox ({ calHeader, distance, percentage, runArr, key, unit, userId, deleteRun, ...props }) {

  const [isDayModalActive, setDayModal] = useState(false);

  const generateKpi = function () {
    if (distance >= 0) {
      return (
        <Kpi distance>{distance}
          <Unit distance>{`${unit}`}</Unit>
        </Kpi>
      );
    }
    else if (typeof percentage === 'number') {
      return (
        <Kpi percentage>{percentage}
          <Unit>{`${unit}`}</Unit>
        </Kpi>
      );
    }
    else return;
  }

  const generateModal = function () {
    if (runArr && runArr.length > 0) {
      return (
        <DayDetails isDayModalActive={isDayModalActive} handleClick={() => setDayModal(false)}
        deleteRun={deleteRun} date={key} unit={unit} runArr={runArr} userId={userId}></DayDetails>
      )
    }
  }

  return (
    <div className="column">
      <DateBox className='column' key={calHeader} {...props} onClick={() => setDayModal(true)} >
        <BoxHeader{...props}>{calHeader}</BoxHeader>
        {generateKpi()}
      </DateBox>
      {generateModal()}
    </div>
  )

}

export default CalBox;
