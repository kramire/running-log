import React, { useState, useEffect } from 'react';
// import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { curveNatural } from '@vx/curve';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { timeParse, timeFormat } from 'd3-time-format';

import styled from 'styled-components';

// accessors
const x = d => d.week;
const y = d => d.total;

const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%b %d');
const formatDate = date => format(parseDate(date));

const Container = styled.div`
  height: 35vh;
  margin: 25px 0 10px 0;
  overflow: hidden;
`;


function LineChart({runData, unitOfMeasure }) {

  const [elWidth, setElWidth] = useState(0);
  const [elHeight, setElHeight] = useState(0);

  useEffect(() => { 
    setElWidth(document.body.clientWidth * .3);
    setElHeight(document.body.clientHeight * .35);
    // setElWidth(500);
    // setElHeight(500);
  }, [])

  console.log(elWidth);
  console.log(elHeight);


  const uom = unitOfMeasure === 'mi' ? 'Miles' : unitOfMeasure === 'km' ? 'Kilometers' : '';
  
  // bounds
  const xMax = elWidth;
  const yMax = elHeight;

  const wkData = runData.map(el => ({
    'total': el.total,
    'week': new Date(el.week)
  }))
  // scales
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(wkData, x)
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(wkData, y)*1.1]
  });

  return (
    <Container>
      <svg width={elWidth} height={elHeight}>
          <AxisLeft
            left={65}
            scale={yScale}
            hideZero
            numTicks={10}
            label={`Weekly ${uom}`}
            labelProps={{
              fill: '#CDDDDD',
              textAnchor: 'middle',
              fontSize: 14,
              letterSpacing: 1,
              fontFamily: 'Arial'
            }}
            stroke="#ffffff"
            tickStroke="#ffffff"
            tickLabelProps={(value, index) => ({
              fill: '#CDDDDD',
              textAnchor: 'end',
              fontSize: 14,
              fontFamily: 'Helvetica',
              dx: '-0.25em',
              dy: '0.25em'
            })}
            tickComponent={({ formattedValue, ...tickProps }) => (
              <text {...tickProps}>{formattedValue}</text>
            )}
          />
          <AxisBottom
            top={elHeight-30}
            left={65}
            scale={xScale}
            hideTicks
            stroke="#ffffff"
            numTicks={6}
            tickFormat={formatDate}
            tickLabelProps={(value, index) => ({
              fill: '#CDDDDD',
              textAnchor: 'end',
              fontSize: 12,
              fontFamily: 'Helvetica',
              dx: '-0.25em',
              dy: '0.25em'
            })}
          />
          <LinePath
            data={wkData}
            x={d => xScale(x(d))}
            y={d => yScale(y(d))}
            stroke={'#A599B5'}
            strokeWidth={3}
            curve={curveNatural}
          />
      </svg>
    </Container>
  );
};


export default LineChart;