import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import 'chartjs-plugin-annotation';
import styled from 'styled-components';
import { Title } from '../../assests/globalStyledComponents';

const Container = styled.div`
  margin: 25px 0 10px 0;
  width: 500px;
  color: var(--primary-color);
`;

function LineChart({runData, unitOfMeasure }) {

  const uom = unitOfMeasure === 'mi' ? 'Miles' : unitOfMeasure === 'km' ? 'Kilometers' : '';
  const dates = runData.map(el => moment(new Date(el.week)).format('MMM DD'));
  const mileage = runData.map(el => new Date(el.total));

  const data = {
    labels: dates,
    datasets: [{
      label: uom,
      fill: false,
      lineTension: 0.3,
      backgroundColor: 'transparent',
      borderColor: '#c6bad6',
      pointBackgroundColor: '#c6bad6',
      data: mileage
    }]
  };

  const options = {
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          show: true,
          labelString: 'Week'
        },
        ticks: {
          minRotation: 45,
          fontColor: '#CDDDDD',
          fontSize: 14
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          show: true,
          labelString: 'Mileage'
        },
        ticks: {
          fontColor: '#CDDDDD',
          fontSize: 14,
          beginAtZero: true,
          lineHeight: 1.5
        }
      }]
    },
    legend: {
      display: false
    }
  }

  return (
    <Container>
       <Title>Weekly Mileage</Title>
        <Line data={data} options={options} />
    </Container>
  );
};

export default LineChart;