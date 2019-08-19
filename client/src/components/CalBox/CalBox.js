import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setDayModalDetails, toggleDayModal } from '../../redux/actions';

const DateBox = styled.div`
  background-color: ${props => props.warnAlert ? '#c4817d' : 'var(--secondary-bg-color)'};
  color: var(--primary-color);
  box-sizing: border-box;
  margin: 1.5px 1px;
  min-width: 10.75vw;

  @media (min-width: 600px) {
    margin: 3px 2px;
    flex-basis: 10%;
    min-width: auto;
  }

  &:hover {
    background-color: ${props => props.hasModal && 'var(--tertiary-bg-color)'};
  }
`;

const BoxHeader = styled.div`
  text-align: center;
  padding: 2.5px 0;
  font-size: 6px;

  @media (min-width: 600px) {
    font-size: 8px;
  }

  @media (min-width: 800px) {
    font-size: 10px;
  }

  @media (min-width: 800px) {
    font-size: 12px;
  }
`;

const Kpi = styled.div`
  padding: 2.5px 0;
  font-weight: ${props => (props.distance ? 'bold' : 'normal')};
  font-style: ${props => (props.percentage ? 'italic' : 'normal')};
  padding: ${props => (props.distance ? '0 5px' : '5px 5px 0px 5px')};
  text-align: right;
  
  font-size: ${props => (props.distance ? '10px' : '14px')};
  font-size: ${props => (props.percentage ? '10px' : '14px')};

  @media (min-width: 600px) {
    font-size: ${props => (props.distance ? '14px' : '16px')};
    font-size: ${props => (props.percentage ? '14px' : '16px')};
  }


  @media (min-width: 800px) {
    font-size: ${props => (props.distance ? '18px' : '22px')};
    font-size: ${props => (props.percentage ? '18px' : '22px')};
  }

  @media (min-width: 1000px) {
    font-size: ${props => (props.distance ? '22px' : '28px')};
    font-size: ${props => (props.percentage ? '22px' : '28px')};
  }
`;

const Unit = styled.div`
  display: inline;
  font-weight: normal;
  margin-left: 5px
  font-size: 8px;

  @media (min-width: 800px) {
    font-size: 10px;
  }

  @media (min-width: 800px) {
    font-size: 14px;
  }

  @media (min-width: 1000px) {
    font-size: 16px;
  }
`;


function CalBox({ calHeader, distance, percentage, runArr, unit, toggleDayModal, setDayDetails, ...props }) {

  const generateKpi = () => {
    if (distance >= 0) {
      return (
        <Kpi distance>{distance === undefined ? 0 : distance}
          <Unit distance>{`${unit}`}</Unit>
        </Kpi>
      );
    }
    else if (typeof percentage === 'number') {
      return (
        <Kpi percentage>{percentage}
          <Unit>{`${unit}`}</Unit>
        </Kpi>
      );
    }
    else return;
  }

  const handleClick = (runs, unit) => {
    if (runs === undefined || runs.length === 0) return;
    else {
      toggleDayModal();
      setDayDetails(runs[0].date, runs, unit);
    }
  };

  return (
      <DateBox key={calHeader} hasModal {...props} onClick={() => handleClick(runArr, unit)} >
        <BoxHeader{...props}>{calHeader}</BoxHeader>
        {generateKpi()}
      </DateBox>
  )
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    toggleDayModal: () => dispatch(toggleDayModal()),
    setDayDetails: (date, runs, unit) => dispatch(setDayModalDetails(date, runs, unit))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalBox);
