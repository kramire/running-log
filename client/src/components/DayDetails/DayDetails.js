import React from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';

import styled from 'styled-components';

const H2 = styled.h2`
  font-size: 40px;
  color: #CDDDDD;
`;

const Li = styled.li`
  font-size: 20px;
  color: #CDDDDD;
`;

function DayDetails({ isDayModalActive, handleClick, runArr, date }) {

  return (
     <div className={`modal ${isDayModalActive ? 'is-active' : ''}`}>
      <div className='modal-background'></div>
      <div className='modal-content'>
        <button className='delete is-large' onClick={handleClick}></button>
        <H2 className=''>Runs Details for {`${moment(date).format('MMM Do YYYY')}`}</H2>
        <ul key={date}>
          {
            runArr.map(run => {
              return (
                <ul key={run['_id']}>
                  <Li>{run.distance}</Li>
                  <Li>{run.location}</Li>
                  <Li>{run.note}</Li>
                </ul>
              )
            })
          }
        </ul>
      </div>
    </div>

  )

}

export default DayDetails;