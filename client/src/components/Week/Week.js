import React from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';
import './Week.css'
import { CalBox } from '../';

const filterRunsByDate = function (runArr, date) {
  return runArr.filter(run => moment(new Date(run.date)).isSame(date, 'day'));
}

function Week({ runData, unit, weekDayNums, userId, deleteRun }) {
  const longestPrct = Math.round(runData.longestRun  / runData.total * 100);
  const prctChange = Math.round(runData.prctChange*100);
  const warnProp = longestPrct > 30 ? {'warnAlert': 'warnAlert'} : {};

  return (
    <div className='columns is-mobile'>
      {
        weekDayNums.map(day => {
          
          const calendarDate = moment(new Date(runData.week)).add(day, 'days');
          const runArr = filterRunsByDate(runData.runs, calendarDate);
          const distance = runArr.map(run => run.distance).reduce((accum, cur) => accum + cur, 0);

          return (
            <CalBox key={calendarDate} calHeader={calendarDate.format('MMM DD')} distance={distance} hasModal
            userId={userId} unit={unit} runArr={runArr} deleteRun={deleteRun}></CalBox>
          )

        })
      }
      <CalBox className='firstWeekKpi' calHeader={'Week'} distance={runData.total} unit={unit}></CalBox>
      <CalBox className='header' calHeader={'Longest %'} percentage={longestPrct} unit={'%'} longHeader {...warnProp}></CalBox>   
      <CalBox calHeader={'% Change'} percentage={prctChange} unit={'%'} longHeader></CalBox>
    </div>
  )
}

export default Week;