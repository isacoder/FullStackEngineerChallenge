import React from 'react';
import styled from 'styled-components'
import Colors from '../utils/Colors';
export const TAB_COLORS = {base: Colors.gray4, active: Colors.white};

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Tab = styled.div`
  text-align: center;
  padding: 20px 10px;
  background-color: ${TAB_COLORS.base};
  cursor: pointer;
  width: 100%;
  ${props => props.active ? `
    background-color: ${TAB_COLORS.active};
  `: null};

  @media (min-width:1025px) { /* big landscape tablets, laptops, and desktops */ 
    width: auto;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-top: 1px solid ${TAB_COLORS.base};
    border-left: 1px solid ${TAB_COLORS.base};
    border-right: 1px solid ${TAB_COLORS.base};
  }
`;

const Tabs = ({ activeKey, tabsList, handleTabClick}) => {
  return(
    <Container>
      {
        tabsList.map(({tabKey,text}, index) => {
        return <Tab key={'tab-' + tabKey} onClick={() => handleTabClick(tabKey)} active={tabKey === activeKey? true : false} >{text}</Tab>
        })
      }
    </Container>
  );
}

export default Tabs;
