import React, {useState, useCallback} from 'react';
import styled, {css} from 'styled-components'
import Profile from '../molecules/Profile';
import Reaction from '../atoms/Reaction';
import Input from '../atoms/Input';
import Color from '../utils/Colors';
import {DownArrow} from '../utils/svg';
import { textSize } from '../utils/Fonts';

import { submitReview } from '../../actions/api';

const MAX_LENGTH = 280;
const MIN_LENGTH = 8;

const Container = styled.div``;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${Color.gray6};
  padding: 20px;
`;

const BottomContainer = styled.form`
  background-color: ${Color.gray5};
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ToggleIcon = styled.div`
  padding: 4px;
  outline: none;
  margin: auto 10px auto auto;
  &:hover{
    cursor: pointer;
  }
  svg{
    height: 20px;
    width: auto;
    ${props => props.isOpen ? css`
    transform: rotate(180deg);
  `: null}
  }

`;

const ReactionPicker = styled(Reaction)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  margin-right: 5px;
  svg{
    height: 25px;
    width: 25px;
  }
  &:hover{
    background-color: ${Color.gray2};
    cursor: pointer;
    border-radius: 50%;
  }
  ${props => props.isSelected ? css`
    background-color: ${Color.gray2};
    cursor: pointer;
    border-radius: 50%;
  `: null};
`;

const ReactionList = styled.div`
  display: flex;
  flex-direction: row;

`;

const Info = styled.div`
  text-align: right;
  font-size: ${textSize.caption};
  color: ${Color.gray2};
`;

const Comment =  styled.div`
  padding: 10px 0;
  width: 310px;
  margin: auto;
  textarea{
    padding: 2px 0;
  }
`;

const SendButton = styled(Input)`
  width: 100px;
`;

const ReactionSection = styled.div`
  display: flex;
  align-content: center;
  flex-direction: row;
  justify-content: space-between;
`;


const ReviewEditor = ({ className, receiver, reviewId, reactionList, updateData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [reaction, setReaction] = useState();

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleComment = event => {
    setComment(event.target.value);
  };

  const handleReactionPick = (reactionId) => {
    setReaction(reactionId);
    console.log( reaction,'click');
  }

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await submitReview(reviewId, comment, reaction);
      updateData();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Container className={className}>
      <TopContainer>
        <Profile name={receiver.name} photo_url={receiver.avatar_url} title={receiver.title} />
        <ToggleIcon isOpen={isOpen} onClick={() => handleToggle()}><DownArrow/></ToggleIcon>
      </TopContainer>
      { !isOpen ? null : <BottomContainer onSubmit={handleSubmit}>
        <Comment>
          <textarea rows="4" cols="50" maxLength={MAX_LENGTH} onChange={handleComment}></textarea>
          <Info>{MAX_LENGTH + 'max'}</Info>
        </Comment>
        <ReactionSection>
          <ReactionList>
            {reactionList.map(({id,name}, index) => {
              return <ReactionPicker key={'editorReac' + index} iconName={name} isSelected={reaction===id} onClick={() => handleReactionPick(id)}/>
            })
            }
          </ReactionList>
          <SendButton type="submit">SEND</SendButton>
        </ReactionSection>
      </BottomContainer>}
    </Container>
  );
}

export default ReviewEditor;