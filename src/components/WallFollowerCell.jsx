import React from 'react';
import styled from 'styled-components';

const WallFollowerCell = (props) => {
  return (
    <Div className={props.classString}></Div>
  )
}

export default WallFollowerCell;


const Div = styled.div`
  color: white;
  background-color: white;
  outline: 1px solid black;
  width: 1.5em;
  height: 1.5em;

  &:hover {
    background-color: rgb(190,190,190);
  }

  &.north {
    box-shadow: inset 0px 6px 3px 0px blue;
  }

  &.northeast {
    box-shadow: inset 0px 6px 3px 0px blue, inset -6px 0px 3px 0px blue;
  }

  &.northsouth {
    box-shadow: inset 0px 6px 3px 0px blue, inset 0px -6px 3px 0px blue;
  }

  &.northwest {
    box-shadow: inset 0px 6px 3px 0px blue, inset 6px 0px 3px 0px blue;
  }

  &.northeastsouth {
    box-shadow: inset 0px 6px 3px 0px blue, inset -6px 0px 3px 0px blue, inset 0px -6px 3px 0px blue;
  }

  &.northeastwest {
    box-shadow: inset 0px 6px 3px 0px blue, inset -6px 0px 3px 0px blue, inset 6px 0px 3px 0px blue;
  }

  &.northsouthwest {
    box-shadow: inset 0px 6px 3px 0px blue, inset 0px -6px 3px 0px blue, inset 6px 0px 3px 0px blue;
  }

  &.northeastsouthwest {
    box-shadow: inset 0px 6px 3px 0px blue, inset -6px 0px 3px 0px blue, inset 0px -6px 3px 0px blue, inset 6px 0px 3px 0px blue;
  }

  &.east {
    box-shadow: inset -6px 0px 3px 0px blue;
  }

  &.eastsouth {
    box-shadow: inset -6px 0px 3px 0px blue, inset 0px -6px 3px 0px blue;
  }

  &.eastwest {
    box-shadow: inset -6px 0px 3px 0px blue, inset 6px 0px 3px 0px blue;
  }

  &.eastsouthwest {
    box-shadow: inset -6px 0px 3px 0px blue, inset 0px -6px 3px 0px blue, inset 6px 0px 3px 0px blue;
  }

  &.south {
    box-shadow: inset 0px -6px 3px 0px blue;
  }

  &.southwest {
    box-shadow: inset 0px -6px 3px 0px blue, inset 6px 0px 3px 0px blue;
  }

  &.west {
    box-shadow: inset 6px 0px 3px 0px blue;
  }
`
