import styled from 'styled-components';

export const Title = styled.h2 `
  font-size: 28px;
  margin-bottom: 10px;
  color: var(--primary-color);
`;

export const CenteredTitle = styled(Title)`
  text-align: center;
`;

export const Modal = styled.div `
  background-color: #0f0f0f;
  border-radius: 15px;
  padding: 50px;
`;