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


function Kpi({ user, runData, setModal }) {
  const { firstName, unitOfMeasure, trainingFor } = user;

  const thisWeek = moment().startOf('week');
  const thisWeekData = runData.filter(run => moment(run.week).isSame(thisWeek, 'week'))[0];
  const { total = 0, acr = 0 } = thisWeekData || {};

  const acrStart = moment().subtract(4, 'weeks').day('Sunday').format('MMM Do');
  const acrEnd = moment().subtract(1, 'weeks').day('Saturday').format('MMM Do');
  const acrStatus = acr ? (acr => (acr > 1.5) ? 'danger' : (acr > 1.2) ? 'warning' : 'success') : 'success';

  return(
    <Container>
      <SubContainer>
        <H3>Welcome Back</H3>
        <User>{firstName}!</User>
      </SubContainer>
      <SubContainer>
        <H3>Weekly Mileage</H3>
        <KPI>{`${total} ${unitOfMeasure}`}</KPI>
        <Button className='button is-rounded' onClick={() => setModal(true)}>Add Run +</Button>
      </SubContainer>
      <SubContainer>
        <H3>Acute Chronic Ratio</H3>
        <KPI className={` has-text-${acrStatus}`}>{acr}</KPI>
        <P>{`${acrStart} - ${acrEnd}`}</P>
      </SubContainer>
      <SubContainer>
        <H3>Training For</H3>
        <H4>{trainingFor}</H4>
      </SubContainer>
    </Container>
  )
}

export default Kpi;