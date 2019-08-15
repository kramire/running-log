import React  from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';
import styled from 'styled-components';
import './Kpi.css';

const Container = styled.div`
  color: #CDDDDD;
  margin: 0 auto;
  text-align: center;

    @media (max-width: 800px) {
      display: flex;
      justify-content: center;
      margin-right: 0px;
    }
`;

const SubContainer = styled.div`
  margin: 0px 0px 40px 0px;

  @media (max-width: 800px) {
    margin: 0 auto;
  }
`;

const User = styled.div`
  color: #c6bad6;
  font-size: 3em;

  @media (max-width: 800px) {
    font-size: 1.5em;
  }
`;

const H3 = styled.h3`
  font-size: 1.4em;

  @media (max-width: 800px) {
    font-size: .8em;
  }
`;

const H4 = styled.h4`
  font-size: 1.8em;
  font-weight: bold;
  color: #c6bad6;
  text-transform: capitalize;

  @media (max-width: 800px) {
    font-size: .7em;
  }
`;

const P = styled.p`
  font-size: 1.1em;

  @media (max-width: 800px) {
    font-size: .5em;
  }
`;

const KPI = styled.div`
  color: #CDDDDD;
  font-weight: bold;
  font-size: 3em;

  @media (max-width: 800px) {
    font-size: 1.5em;
  }
`;

const Button = styled.button`
  color: #CDDDDD;
  background-color: #978CA5;
  font-size: 1em;
  margin: 20px 0;
  border: none;
  padding: 5px 15px;
  transition: all .1s ease;
  
  :hover {
    transform: scale(1.15);
    background-color: #CDDDDD;
    color: #978CA5;
    font-weight: bold;
  }

  @media (max-width: 800px) {
    font-size:.5em;
    margin: 10px 0;
    padding: 2.5px 8px;
  }  
`;
const currentWeek = moment().startOf('week');
const acrStartDate = moment().subtract(4, 'weeks').day('Sunday').format('MMM Do');
const acrEndDate = moment().subtract(1, 'weeks').day('Saturday').format('MMM Do');

const getAcrAlert = function (acr) {
  return acr > 1.5 ? 'danger' : acr > 1.2 ? 'warning' : 'success';
};


function Kpi({ user, runData, handleClick }) {
  
  const weekData = runData.filter(run => moment(run.week).isSame(currentWeek, 'week'))[0];
  const acrAlertType = weekData ? getAcrAlert(weekData.acr) : 'success';

  return(
    <Container>
      <SubContainer>
        <H3>Welcome Back</H3>
        <User>{user.firstName}!</User>
      </SubContainer>
      <SubContainer>
        <H3>Weekly Mileage</H3>
        <KPI>{`${weekData ? weekData.total : 0} ${user.unitOfMeasure}`}</KPI>
        <Button className='button is-rounded' onClick={handleClick}>Add Run +</Button>
      </SubContainer>
      <SubContainer>
        <H3>Acute Chronic Ratio</H3>
        <KPI className={` has-text-${acrAlertType}`}>{weekData ? weekData.acr : 0}</KPI>
        <P>{`${acrStartDate} - ${acrEndDate}`}</P>
      </SubContainer>
      <SubContainer>
        <H3>Training For</H3>
        <H4>{user.trainingFor}</H4>
      </SubContainer>
    </Container>
  )
}

export default Kpi;