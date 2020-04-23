import React from 'react';
import styled from 'styled-components'
import Reaction from '../atoms/Reaction';
import Colors from '../utils/Colors';
import {textSize} from '../utils/Fonts';

const Container = styled.div`
  position: relative;
  padding 10px 10px 0  0;

  svg{
    height: 40px;
    width: 40px;
  }
`;

const Alert = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: ${textSize.caption};
  background-color: ${Colors.gray2};
  color: ${Colors.white};
  position: absolute;
  top: 0;
  right: 0;

`;

const ReactionAlert = ({className, reactionName, alerts }) => {
  return(
    <Container className={className}>
      <Alert>{alerts}</Alert>
      <Reaction iconName={reactionName}/>
    </Container>
  );
}

export default ReactionAlert;