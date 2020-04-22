import Colors from './Colors';
import styled from 'styled-components';

export const fontSize = {
  tiny : '.6em',
  small: '.8em',
  base: '16px',
  normal: '1em',
  great: '1.2em',
  big: '1.4em',
  huge: '2em'
};

export const textSize = {
  h1Size: fontSize.big,
  h2Size: fontSize.great,
  h3Size: fontSize.normal,
  pSize: fontSize.normal,
  caption: fontSize.small,
}


export const Title = styled.h1`
  font-size: ${textSize.h2Size};
  color: ${Colors.green_dark};
`;