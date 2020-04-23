import React from 'react';
import styled from 'styled-components'
import Colors from '../utils/Colors';
import {Name, JobTitle} from '../utils/Fonts';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Photo = styled.div`
  img{
    border: 1px solid ${Colors.gray4};
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }
`;

const Data = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
`;


const Profile = ({className, photo_url, name, title}) => {
  return(
    <Container className={className}>
      <Photo><img src={photo_url}></img></Photo>
      <Data>
        <Name>{name}</Name>
        <JobTitle>{title}</JobTitle>
      </Data>
    </Container>
  );
}

export default Profile;