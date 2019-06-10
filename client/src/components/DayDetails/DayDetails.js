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
  text-transform: capitalize;
`;

const Ul = styled.ul`
  list-style: none;
  background-color: #2E2F2F;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`

const Unit = styled.div`
    display: inline;
    font-size: 1em;
    color: #CDDDDD;
    font-weight: normal;
    font-style: italic;
  `


const showElement = function (property, obj, unit) {
  if (obj[property]) {
    return (
      <li>
        <Label>{property}</Label>
        <Span>{obj[property]}</Span>
        {property==='distance' && <Unit>{unit}</Unit>}
      </li>
    )
  }
}

function DayDetails({ isDayModalActive, handleClick, runArr, date, unit }) {

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
                  {showElement('distance', run, unit)}
                  {showElement('location', run)}
                  {showElement('note', run)}
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