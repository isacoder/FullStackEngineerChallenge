import React from 'react';
import styled from 'styled-components'
import {Mvp, Training, NiceJob, NoClue} from '../utils/svg';

const Container = styled.div`
`;

const renderReaction = (icon) => {
  switch(icon) {
    case 'mvp' :
      return <Mvp/>

    case 'training' :
      return <Training/>
    
    case "nice_job" :
      return <NiceJob/>
    
    default :
      return <NoClue/>
  }
}

const Reaction = ({className, iconName, onClick}) => {
  return(
    <Container className={className} onClick={onClick}>
      {renderReaction(iconName)}
    </Container>
  );
}

export default Reaction;