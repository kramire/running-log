import React from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';

import styled from 'styled-components';

const Modal = styled.div`
  background-color: #0f0f0f;
  border-radius: 15px;
  padding: 50px;
`;

const H1 = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #CDDDDD;
  margin-bottom: 40px;
`;

const Span = styled.span`
  font-size: 20px;
  color: #CDDDDD;
`;

const Label = styled.label`
  color: #ACBDBA;
  font-size: 1.3em;
  font-weight: bold;
  margin-right: 10px;
`;

const Ul = styled.ul`
  list-style: none;
  background-color: #2E2F2F;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`

function DayDetails({ isDayModalActive, handleClick, runArr, date }) {

  return (
     <div className={`modal ${isDayModalActive ? 'is-active' : ''}`}>
      <div className='modal-background'></div>
      <Modal className='modal-content'>
        <button className='delete is-large' onClick={handleClick}></button>
        <H1 className=''>{`${moment(date).format('MMM Do YYYY')}`}</H1>
        <ul key={date}>
          {
            runArr.map(run => {
              return (
                <Ul key={run['_id']}>
                  <li>
                    <Label>Distance</Label>
                    <Span>{run.distance}</Span>
                  </li>
                  <li>
                    <Label>Location</Label>
                    <Span>{run.location}</Span>
                  </li>
                  <li>
                    <Label>Notes</Label>
                    <Span>{run.note}</Span>
                  </li>
                </Ul>
              )
            })
          }
        </ul>
      </Modal>
    </div>

  )

}

export default DayDetails;