import styled, {css} from 'styled-components';

export const MainContainer = css`
  padding: 0 24px;

  @media (min-width:1025px) { /* big landscape tablets, laptops, and desktops */ 
    max-width: 1200px;
    margin: auto;
  }
`;