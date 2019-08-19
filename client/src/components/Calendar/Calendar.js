import React  from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Week, CalBox } from '../';
import { Title } from '../../assests/globalStyledComponents';
import { toggleAddRunModal } from '../../redux/actions';
import { connect } from 'react-redux';


const WeekdayHeaders = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-x: scroll;
`;

const CalContainer = styled.div`
  overflow-y: scroll;
  height: 28vh;

  @media (min-width: 600px) {
    height: 30vh;
  }

  @media (min-width: 800px) {
    height: 35vh;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 10px 0;
  `;
  
const Button = styled.button`
  color: #CDDDDD;
  background-color: #978CA5;
  font-size: 10px;
  border: none;
  padding: 5px;
  transition: all .1s ease;
  height: 100%
  border-radius: 20px;
  
  :hover {
    transform: scale(1.15);
    background-color: #CDDDDD;
    color: #978CA5;
    font-weight: bold;
  }

  @media (min-width: 800px) {
    font-size: 16px;
    padding: 10px;
  }  
`;

function Calendar({ user, runData, showAddRun }) {  
  const weekDayNums = Array.of(0, 1, 2, 3, 4, 5, 6);  
  const weekDayHeaders = weekDayNums.map(el => <CalBox key={el} calHeader={moment.weekdaysShort(el)} />);
  
  return (
    <div>
      <Header>
        <Title>Calendar</Title>
        <Button onClick={showAddRun}>Add Run +</Button>
      </Header>
      <WeekdayHeaders>
        {weekDayHeaders}
        <CalBox className='firstWeekKpi' calHeader={'Total'} />
        <CalBox calHeader={'% of Total'} longHeader />
        <CalBox calHeader={'Weekly Δ'} longHeader />
      </WeekdayHeaders>
      <CalContainer>
        {runData.map(weekData => 
            <Week key={weekData['_id']} runData={weekData} unit={user.unitOfMeasure} weekDayNums={weekDayNums} />
        )}
      </CalContainer>
    </div>
  )
}

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    showAddRun: () => dispatch(toggleAddRunModal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);