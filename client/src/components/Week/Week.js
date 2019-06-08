import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';
import styled from 'styled-components';


function Week({ runData, unit, DateBox, H3, weekDayNums }) {

  const Distance = styled.div`
    font-size: 2em;
    font-weight: bold;
    text-align: right;
  `
  const Unit = styled.div`
    display: inline;
    font-size: .75em;
    font-weight: normal;
  `

  const maxThreshold = 30;
  const longestPrct = Math.round(runData.longestRun  / runData.total * 100);

  return (
    <div className="columns is-mobile">
      {
        weekDayNums.map(day => {
          const calendarDate = moment(new Date(runData.week)).add(day, 'days')
          return (
            <DateBox className="column" key={calendarDate}>
              <H3>{ `${calendarDate.format("MMM DD")}` }</H3>
              <Distance>
                {runData.runs.filter(run => moment(new Date(run.date)).isSame(calendarDate, 'day'))
                  .map(run => run.distance)
                  .reduce((accum, cur) => accum + cur, 0)
                }
                <Unit>{` ${unit}`}</Unit>
              </Distance>
            </DateBox>
          )
        })
      }
      <DateBox className="column">
         <H3>Week</H3>
         <Distance>
           {`${runData.total}`} 
           <Unit>{` ${unit}`}</Unit>
         </Distance>
      </DateBox>

      <DateBox className={`column ${longestPrct > maxThreshold && 'has-background-danger'}`}>
        <H3>Longest %</H3>
        {`${longestPrct}% ${unit}`}
      </DateBox>
    </div>
  )
}

export default Week;