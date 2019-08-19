import React from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';
import './Week.css'
import { CalBox } from '../';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const filterRunsByDate = function (runArr, date) {
  return runArr.filter(run => moment(new Date(run.date)).isSame(date, 'day'));
}

function Week({ runData, unit, weekDayNums }) {
  const longestPrct = Math.round(runData.longestRun  / runData.total * 100);
  const prctChange = Math.round(runData.prctChange*100);
  const warnProp = longestPrct > 30 ? {'warnAlert': 'warnAlert'} : {};

  return (
    <Container>
      {
        weekDayNums.map(day => {
          
          const calDate = moment(new Date(runData.week)).add(day, 'days');
          const runArr = filterRunsByDate(runData.runs, calDate);
          const distance = runArr.map(run => run.distance).reduce((accum, cur) => accum + cur, 0);

          return <CalBox key={calDate} calHeader={calDate.format('MMM DD')} distance={distance} unit={unit} runArr={runArr}></CalBox>
        })
      }
      <CalBox className='firstWeekKpi' calHeader={'Week'} distance={runData.total} unit={unit}></CalBox>
      <CalBox calHeader={'Long Run'} percentage={longestPrct} unit={'%'} longHeader {...warnProp}></CalBox>   
      <CalBox calHeader={'% Change'} percentage={prctChange} unit={'%'} longHeader></CalBox>
    </Container>
  )
}

export default Week;