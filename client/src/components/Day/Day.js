import React, { useState } from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';

import './Day.css'

import styled from 'styled-components';

import { DayDetails } from '../';

const weatherUrl = 'https://api.darksky.net/forecast/';
const weatherKey = 'ad4ee0794febea8b1b0dae363130d36e';

const formatDate = function (date) {
  const formatted = moment(date).format('YYYY-MM-DD');
  console.log(formatted);
}

async function getWeather(lat, long, date) {
  //   await fetch(`${weatherUrl}/${weatherKey}/${lat},${long}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       locObj.city = data.address.city;
  //       locObj.state = data.address.state && data.address.city !== data.address.state;
  //       locObj.country = data.address.country;
  //     })
  // } catch (error) {
  //   return null;
  // }
  if (lat) console.log(lat);
  if (long) console.log(long);
  formatDate(date);
}


function Day({ DateBox, H3, Distance, runArr, calendarDate, unit }) {

  const Unit = styled.div`
    display: inline;
    font-size: .5em;
    font-weight: normal;
  `
  function getWeather(lat, long) {
    if (lat && long) {

    }
  }

  // No column in classname here, thats why theres still margin;
  // getWeather(calendarDate)

  const [isDayModalActive, setDayModal] = useState(false);

  return (
    <div className="column">
      <DateBox className = 'column reAddMargin' key={calendarDate} hasModal runArr={runArr}
        onClick={() => setDayModal(true)}>
        <H3>{ `${calendarDate.format("MMM DD")}` }</H3>
        <Distance>
          {runArr.map(run => run.distance)
            .reduce((accum, cur) => accum + cur, 0)
          }
          <Unit>{`${unit}`}</Unit>
        </Distance>
      </DateBox>
      <DayDetails isDayModalActive={isDayModalActive} handleClick={() => setDayModal(false)}
        date={calendarDate} unit={unit} runArr={runArr}></DayDetails>
    </div>
  )

}

export default Day;