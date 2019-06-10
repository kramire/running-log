import React from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';
import styled from 'styled-components';
import './Week.css'

import { Day } from '../';

const Distance = styled.div`
  font-size: 2em;
  font-weight: bold;
  text-align: right;
`
const Unit = styled.div`
  display: inline;
  font-size: .5em;
  font-weight: normal;
`
const Percentage = styled.div`
  font-size: 2em;
  font-style: italic;
  text-align: right;
`

function Week({ runData, unit, DateBox, H3, weekDayNums, FirstBoxKpi }) {


  const maxThreshold = 30;
  const longestPrct = Math.round(runData.longestRun  / runData.total * 100);

  function filterRunsByDate(runArr, date) {
    return runArr.filter(run => moment(new Date(run.date)).isSame(date, 'day'));
  }

  return (
    <div className="columns is-mobile">
      {
        weekDayNums.map(day => {
          const calendarDate = moment(new Date(runData.week)).add(day, 'days');
          const runArr = filterRunsByDate(runData.runs, calendarDate);
          return (
            <Day key={calendarDate} DateBox={DateBox} H3={H3} Distance={Distance} Unit={unit} runArr={runArr} 
            calendarDate={calendarDate} unit={unit}></Day>
          )
        })
      }
      <FirstBoxKpi className="column">
         <H3>Week</H3>
         <Distance>
           {`${runData.total}`} 
           <Unit>{`${unit}`}</Unit>
         </Distance>
      </FirstBoxKpi>

      <DateBox className={`column ${longestPrct > maxThreshold && 'has-background-danger'}`}>
        <H3>Longest %</H3>
        <Percentage>{`${longestPrct}%`}</Percentage>
      </DateBox>

      <DateBox className='column'>
        <H3>WoW</H3>
        <Percentage>{`${Math.round(runData.prctChange*100)}%`}</Percentage>
      </DateBox>

    </div>
  )
}

export default Week;