import React from 'react';
import styled from 'styled-components'
import Reaction from '../atoms/Reaction';
import Colors from '../utils/Colors';
import {textSize} from '../utils/Fonts';

const Container = styled.div`
  padding: 10px;
  background-color: ${Colors.gray6};
`;

const Comment = styled.div`
  margin: 10px 0 15px 15px;
  font-size: ${textSize.pSize};
  text-align: left;
`;

const ReviewGrade = styled.div`
  display: flex;
  align-items: center;
  svg{
    height: 30px;
    width: 30px;
  }
`;

const Data = styled.div`
  font-size: ${textSize.caption};
  font-weight: 800;
`;

const ReviewData = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DoneReview = ({className, reviewIcon, comment, date, reviewer}) => {
  return(
    <Container className={className}>
      <ReviewGrade>
        <Reaction iconName={reviewIcon}/>
        <Comment>{comment}</Comment>
      </ReviewGrade>
      <ReviewData>
        <Data>{date}</Data>
        <Data>{reviewer}</Data>
      </ReviewData>
    </Container>
  );
}

export default DoneReview;