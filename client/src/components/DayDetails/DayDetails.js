import React from 'react';
import '../../../node_modules/bulma/css/bulma.css';
import moment from 'moment';
import './DayDetails.css';
import styled from 'styled-components';
import { Modal, CenteredTitle } from '../../assests/globalStyledComponents';
import { connect } from 'react-redux';
import { deleteRun, toggleDayModal } from '../../redux/actions';

const Span = styled.span`
  font-size: 20px;
  color: #CDDDDD;
`;

const Label = styled.label`
  color: #ACBDBA;
  font-size: 1.3em;
  font-weight: bold;
  margin-right: 10px;
  text-transform: capitalize;
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
  font-size: 1em;
  color: #CDDDDD;
  font-weight: normal;
  font-style: italic;
`;


function DayDetails({ showDayModal, toggleDayModal, runArr, date, unit, userId, deleteRun }) {
  
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
        <ul key={date}>
          {runArr.map(run => {
            const { distance, runType, note, location } = run;
            return (
              <div key={run['_id']}>
                <button className='delete deleteInner is-medium'
                  onClick={(e) => handleDelete(e, run['_id'], userId)} />
                <Ul>
                  <li><Label>Distance</Label><Span>{distance}<Unit>{unit}</Unit></Span></li>
                  <li><Label>Run Type</Label><Span>{handleArray(runType)}</Span></li>
                  <li><Label>Notes</Label><Span>{note}</Span></li>
                  <li><Label>Location</Label><Span>{location}</Span></li>
                </Ul>
              </div>
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
    runArr: state.appUI.dayModalDetails.runs,
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