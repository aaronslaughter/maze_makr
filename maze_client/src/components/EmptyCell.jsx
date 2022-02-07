import React from 'react';
import styled from 'styled-components';

const EmptyCell = () => {
  return (
    <Div></Div>
  )
}

export default EmptyCell;


const Div = styled.div`
  color: white;
  background-color: white;
  outline: 1px solid black;
  width: 2em;
  height: 2em;

  &:hover {
    background-color: rgb(50,50,50);
  }
`
