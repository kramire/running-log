import React  from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';
import styled from 'styled-components';


function Kpi({ user, runData, acrData, setModal }) {

  const Container = styled.div`
    color: #CDDDDD;
    margin: 0 auto;
    text-align: center;
  `;

  const SubContainer = styled.div`
    margin: 40px 0px;
  `;

  const User = styled.div`
    color: #A599B5;
    font-size: 48px;
  `

  const H2 = styled.div`
    font-size: 30px;

  `
  const H3 = styled.div`
    font-size: 24px;
  `

  const KPI = styled.div`
    color: #CDDDDD;
    font-weight: bold;
    font-size: 40px;
  `


  const currentWeek = moment().startOf('week');
  const weekData = runData.filter(run => moment(run.week).isSame(currentWeek, 'week'))[0];

  const startDate = moment(acrData.startDate).format('MMM Do');
  const endDate = moment(acrData.endDate).format('MMM Do');
  const acrAlertClass = 
    acrData.acr > 1.5 ? 'danger' : 
    acrData.acr > 1.2 ? 'warning' : 
    'success';

  return(
    <Container>
      <SubContainer>
        <H3>Welcome Back</H3>
        <User>{user.firstName}!</User>
      </SubContainer>
      <SubContainer>
        <H3>Weekly Mileage</H3>
        <KPI>{`${weekData && weekData.total} ${user.unitOfMeasure}`}</KPI>
        <button onClick={() => setModal(true)}>Add Run +</button>
      </SubContainer>
      <SubContainer>
        <H2>Acute Chronic Ratio</H2>
        <KPI className={`has-text-${acrAlertClass}`}>{`${acrData.acr}`}</KPI>
        <div>{`${startDate} - ${endDate}`}</div>
      </SubContainer>
    </Container>
  )
}

export default Kpi;