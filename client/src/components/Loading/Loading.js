import React from 'react';
import styled from 'styled-components';
import './Loading.css';
import '../../../node_modules/bulma/css/bulma.css';

const Logo = styled.h1`
  font-size: 2em;
  color: var(--primary-color);
  text-align: center;
  
  margin-bottom: .5em;

  @media (max-width: 800px) {
    font-size: 1em;
  }
`;

const Centered = styled.div`
  background-color: var(--primary-bg-color);
  width: 35%;

  position: fixed;
  top: 50%;
  left: 50%;

  margin-left: -17.5%;
  margin-top: -2.5em;

  @media (max-width: 800px) {
    margin-top: -1.5em;
  }
`;

function Loading() {
  return (
    <Centered>
      <Logo>RUNNING LOG</Logo>
      <progress className="progress is-primary is-small" max="100">15%</progress>
    </Centered>
  )
}

export default Loading;