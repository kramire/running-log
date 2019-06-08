import React  from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';
import styled from 'styled-components';
import './Kpi.css';


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

  const Button = styled.button`
    color: #CDDDDD;
    background-color: #978CA5;
    font-size: 20px;
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
        <Button className='button is-rounded' onClick={() => setModal(true)}>Add Run +</Button>
      </SubContainer>
      <SubContainer>
        <H2>Acute Chronic Ratio</H2>
        <KPI className={` has-text-${acrAlertClass}`}>
          <p className="tooltips" href="#">{`${acrData.acr}`}
          <span>
            {"The Acute-to-Chronic Ratio compares last week's mileage "+
            "against your average mileage for the past four weeks.\n"+
            "Healthy: Less Than 1.2\n"+
            "At Risk for Injury: 1.2 - 1.5\n"+
            "Dangerous: Greater Than 1.5"}
            </span>
          </p>
        </KPI>
        <div>{`${startDate} - ${endDate}`}</div>
      </SubContainer>
    </Container>
  )
}

export default Kpi;