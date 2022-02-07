import React from 'react';
import styled from 'styled-components';

const Wall = () => {
  return (
    <Div></Div>
  )
}

export default Wall;

const Div = styled.div`
  color: black;
  background-color: black;
  outline: 1px solid black;
  width: 2em;
  height: 2em;

  &:hover {
    background-color: rgb(205,205,205);
  }
`