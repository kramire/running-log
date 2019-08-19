import styled from 'styled-components';

export const Title = styled.h2 `
  font-size: 20px;
  color: var(--primary-color);

  @media (min-width: 800px) {
    font-size: 22px;
  }
  @media (min-width: 1000px) {
    font-size: 26px;
  }
`;

export const CenteredTitle = styled(Title)`
  text-align: center;
`;

export const Modal = styled.div `
  background-color: #0f0f0f;
  border-radius: 15px;
  padding: 50px;
`;

export const Logo = styled.h1`
  font-size: 2em;
  color: var(--primary-color);
  text-align: center;
  
  margin-bottom: .5em;

  @media (max-width: 800px) {
    font-size: 1em;
  }
`;

export const LogoSmall = styled.h1`
  font-size: 16px;
  letter-spacing: 1.5px;
  color: var(--primary-color);
  text-align: center;
  height: 5vh;

  @media (min-width: 800px) {
    font-size: 20px;
  }

  @media (min-width: 1000px) {
    height: auto;
  }
`;
