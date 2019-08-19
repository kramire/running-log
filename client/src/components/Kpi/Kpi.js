import React  from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-height: 15vh;
  text-align: center;
  color: var(--primary-color);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  margin: 15px 0 10px 0;

  > div {
    flex-basis: 30%;
  }
  
  @media (min-width: 1000px) {
    max-height: inherit;
    flex-direction: column;
    align-items: center;
  }
`;

const H3 = styled.h3`
  font-size: 14px;
  letter-spacing: 1.5px;

  @media (min-width: 800px) {
    font-size: 16px;
  }
  @media (min-width: 1000px) {
    font-size: 18px;
  }
`;

const P = styled.p`
  font-style: italic;
  font-size: 10px;
  
  @media (min-width: 800px) {
    font-size: 12px;
  }
  @media (min-width: 1000px) {
    font-size: 14px;
  }
`;

const KPI = styled.div`
  color: var(--secondary-color);
  font-weight: bold;
  text-transform: uppercase;
  margin: 5px 0 2px 0;
  overflow: wrap;

  @media (max-width: 600px) {
    font-size: ${props => (props.small ? '12px' : '25px')};
  }

  @media (min-width: 600px) {
    font-size: ${props => (props.small ? '16px' : '30px')};
  }

  @media (min-width: 800px) {
    font-size: ${props => (props.small ? '20px' : '35px')};
  }

  @media (min-width: 1000px) {
    font-size: ${props => (props.small ? '20px' : '40px')};
  }
`;


function Kpi({ user, runData }) {
  const currentWeek = moment().startOf('week');
  const weekData = runData.filter(run => moment(run.week).isSame(currentWeek, 'week'))[0];

  const acrStart = moment().subtract(4, 'weeks').day('Sunday').format('MMM Do');
  const acrEnd = moment().subtract(1, 'weeks').day('Saturday').format('MMM Do');
  const getAcrAlert = acr => acr > 1.5 ? 'danger' : acr > 1.2 ? 'warning' : 'success';

  const { unitOfMeasure, trainingFor } = user;
  const { total, acr } = weekData === undefined ? {} : weekData;
  const acrStatus = weekData ? getAcrAlert(acr) : 'success';

  return(
    <Wrapper>
      <div>
        <H3>This Week</H3>
        <KPI>{`${weekData ? total : 0} ${unitOfMeasure}`}</KPI>
      </div>
      <div>
        <H3>ACR</H3>
        <KPI className={` has-text-${acrStatus}`}>{weekData ? acr : 0}</KPI>
        <P>{`${acrStart} - ${acrEnd}`}</P>
      </div>
      <div>
        <H3>Training For</H3>
        <KPI small>{trainingFor}</KPI>
      </div>
    </Wrapper>
  )
}

export default Kpi;