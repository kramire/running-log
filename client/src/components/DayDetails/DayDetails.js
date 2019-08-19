import React from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';
import './DayDetails.css';
import styled from 'styled-components';
import { Modal, CenteredTitle } from '../../assests/globalStyledComponents';
import { connect } from 'react-redux';
import { deleteRun, toggleDayModal } from '../../redux/actions';

const Span = styled.span`
  color: #CDDDDD;
  font-size: 12px;

  @media (min-width: 600px) {
    font-size: 16px;
  }
  @media (min-width: 1000px) {
    font-size: 20px;
  }
`;

const Label = styled.label`
  color: #ACBDBA;
  font-weight: bold;
  margin-right: 10px;
  text-transform: capitalize;
  font-size: 12px;

  @media (min-width: 600px) {
    font-size: 16px;
  }
  @media (min-width: 1000px) {
    font-size: 20px;
  }
`;

const Ul = styled.ul`
  list-style: none;
  background-color: #2E2F2F;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Unit = styled.div`
  display: inline;
  color: #CDDDDD;
  font-weight: normal;
  font-style: italic;
  font-size: 10px;

  @media (min-width: 600px) {
    font-size: 12px;
  }
  @media (min-width: 1000px) {
    font-size: 16px;
  }
`;


function DayDetails({ showDayModal, toggleDayModal, runData, date, unit, userId, deleteRun }) {
  
  const handleArray = data => (Array.isArray(data) && data.length > 0) ? data.map(el => `${el}  `) : data;
  
  const handleDelete = function (e, runId, userId) {
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete this run?");
    confirmDelete && deleteRun(userId, runId);
  }

  return (
    <div className={`modal ${showDayModal ? 'is-active' : ''}`}>
      <div className='modal-background'></div>
      <Modal className='modal-content'>
        <button className='delete is-large' onClick={toggleDayModal}></button>
        <CenteredTitle>{`${moment(date).format('MMM Do YYYY')}`}</CenteredTitle>
        <ul>
          {runData.map(run => {
            const { distance, runType, note, location } = run;
            return (
              <li key={run['_id']}>
                <button className='delete deleteInner is-medium' onClick={(e) => handleDelete(e, run['_id'], userId)} />
                <Ul>
                  <li><Label>Distance</Label><Span>{distance}<Unit>{unit}</Unit></Span></li>
                  <li><Label>Run Type</Label><Span>{handleArray(runType)}</Span></li>
                  <li><Label>Notes</Label><Span>{note}</Span></li>
                  <li><Label>Location</Label><Span>{location}</Span></li>
                </Ul>
              </li>
            )
          })}
        </ul>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    showDayModal: state.appUI.isDayModalActive,
    date: state.appUI.dayModalDetails.date,
    runData: state.appUI.dayModalDetails.runs,
    unit: state.appUI.dayModalDetails.unit,
    userId: state.appUI.user['_id']
  }
};

const mapDispatchToProps = dispatch => {
  return {
    deleteRun: (userId, runId) => dispatch(deleteRun(userId, runId)),
    toggleDayModal: () => dispatch(toggleDayModal()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DayDetails);