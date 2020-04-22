import React from 'react';
import styled, {css} from 'styled-components';
import Colors from '../utils/Colors';

export const ButtonCss = css`
  border-radius: 20px;
  border: none;
  padding: 10px 16px;
  margin: 0;
  text-decoration: none;
  background: ${Colors.blue};
  color: ${Colors.white};
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
`;

const CustomButton = styled.button`
  ${ButtonCss};
`;


const Button = ({children, onClick, props}) => {
    return (
    <CustomButton onClick={onClick} props={props}>{children}</CustomButton>
    )
}

export default Button;