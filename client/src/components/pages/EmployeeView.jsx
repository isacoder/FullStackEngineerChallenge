import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import Tabs, {TAB_COLORS} from '../molecules/Tabs';

const Container = styled.div`
  @media (min-width:1025px) { /* big landscape tablets, laptops, and desktops */ 
    max-width: 800px;
    margin: 20px auto;
  }
`;

const TabContainer = styled.div`
  border: 1px solid ${TAB_COLORS.base};
`;

const EmployeeView = ({ userId, props}) => {
  const [activeTab,setActiveTab] = useState('mine');

  const handleTabs= useCallback((tabKey) => {
    setActiveTab(tabKey);
  },[]);

  return (
    <Container>
      <Tabs activeKey={activeTab} handleTabClick={handleTabs} tabsList={[{text: 'My Reviews', tabKey: 'mine'}, {text: 'Team Reviews', tabKey:'yours'}]}  />
      <TabContainer>
        {activeTab === 'mine' ?<div className="PersonalReviews" >
          <div className='Profile'>My Profile</div>
          <div className='ReactionTabs'>My Reactions </div>
          <div className='CommentsList'> Lots of comments!</div>
        </div> :
        <div className='TeamReviews'>
          <div className='WaitingStats'>@$# Everyones waiting</div>
          <div className='ReviewsList'>Lots of reviews!</div>
        </div>
      }
      </TabContainer>

     


    </Container>
  );
}

export default EmployeeView;