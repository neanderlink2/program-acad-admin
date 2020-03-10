import styled, { keyframes } from 'styled-components';

const placeholderAnimate = keyframes`
  0% {
    background-position: -650px 0;
  }

  100% {
    background-position: 650px 0;
  }
`;


export const PlaceholderLoading = styled.div`
  height: 20px;
  margin: 5px;
  flex: 1;
  overflow: hidden;
  background: #000;
  position: relative;
  animation-duration: 1.7s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: ${placeholderAnimate};
  background: #f6f7f8;
  background: linear-gradient(to right, #424242 2%, #646464 18%, #424242 33%);
  background-size: 1300px;
  border-radius: 5px;
`;

export const PlaceholderContent = styled.div` 
  width: 100%;
  position: absolute;
  background: transparent;
  z-index: 2;

  &:after,
  &:before {
    width: 10px;
    height: 10px;
    content: '';
    position: absolute;
  }
`;