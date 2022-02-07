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
  width: 1.5em;
  height: 1.5em;

  &:hover {
    background-color: rgb(75,75,75);
  }
`