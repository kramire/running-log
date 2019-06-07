import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';
import styled from 'styled-components';


function Week({ runData, weekStart, unit, dateUpdate, DateBox, H3 }) {

  const Distance = styled.div`
    font-size: 32px;
    font-weight: bold;
    text-align: right;
  `
  const Unit = styled.div`
    display: inline;
    font-size: 24px;
    font-weight: normal;
  `

  const distances = runData.map(run => run.distance);

  const total = distances.reduce((acc, cur) => acc + cur, 0);
  const max = distances.reduce((acc, cur) => Math.max(acc, cur), 0);
  const maxPrct = Math.round(max/total*100);
  const maxThreshold = 30;

  return (
    <div className="columns">
      {
        dateUpdate.map(el => {
          let buildDate = moment(weekStart).add(el, 'd');
          return (
            <DateBox className="column" key={buildDate}>
              <H3>{ `${moment(buildDate).format("MMM DD")}` }</H3>
              <Distance>
                { 
                  runData.filter(run => moment(run.date).isSame(buildDate, 'day'))
                    .map(run => run.distance)
                    .reduce((acc, cur) => acc + cur, 0)
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
           {`${total}`} 
           <Unit>{` ${unit}`}</Unit>
         </Distance>
      </DateBox>

      <DateBox className={`column ${maxPrct > maxThreshold && 'has-background-danger'}`}>
        <H3>Longest %</H3>
        {`${maxPrct}% ${unit}`}
      </DateBox>
    </div>
  )
}

export default Week;