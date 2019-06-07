import React from 'react';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { curveNatural } from '@vx/curve';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import { AxisLeft, AxisBottom } from '@vx/axis';

// accessors
const x = d => d.week;
const y = d => d.total;

const LineChart = ({ width, height, weeklyData, unitOfMeasure }) => {
  
  const uom = unitOfMeasure === 'mi' ? 'Miles' : unitOfMeasure === 'km' ? 'Kilometers' : '';
  
  // bounds
  const xMax = width;
  const yMax = height;

  const wkData = weeklyData.map(el => ({
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
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill="#242424" rx={14} />
        <AxisLeft
          left={65}
          scale={yScale}
          hideZero
          numTicks={10}
          label={`Weekly ${uom}`}
          labelProps={{
            fill: '#ffffff',
            textAnchor: 'middle',
            fontSize: 14,
            letterSpacing: 1,
            fontFamily: 'Arial'
          }}
          stroke="#ffffff"
          tickStroke="#ffffff"
          tickLabelProps={(value, index) => ({
            fill: '#ffffff',
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
          top={height-30}
          left={65}
          scale={xScale}
          hideTicks
          stroke="#ffffff"
          numTicks={10}
          tickLabelProps={(value, index) => ({
            fill: '#ffffff',
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
          stroke={'#ffffff'}
          strokeWidth={1}
          curve={curveNatural}
        />
    </svg>
  );
};


export default LineChart;