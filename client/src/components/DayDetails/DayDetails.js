import React from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';

import styled from 'styled-components';


function DayDetails({ isDayModalActive, handleClick, runArr, date }) {

  const H2 = styled.h2`
    font-size: 40px;
    color: #CDDDDD;
  `;

  const Li = styled.li`
    font-size: 20px;
    color: #CDDDDD;
  `;

  return (
     <div className={`modal ${isDayModalActive ? 'is-active' : ''}`}>
      <div className='modal-background'></div>
      <div className='modal-content'>
        <button className='delete is-large' onClick={handleClick}></button>
        <H2 className=''>Runs Details for {`${date}`}</H2>
        <ul>
          {
            runArr.map(run => {
              return (
                <ul>
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