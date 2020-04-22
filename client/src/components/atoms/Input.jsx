import React from 'react';
import styled, {css} from 'styled-components';
import Colors from '../utils/Colors';
import {ButtonCss} from './Button';

const CustomInput = styled.input`
  height: 40px;
  width: 100%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 2px;
  box-sizing: border-box;
  outline: none;
  ::placeholder {
    color: ${Colors.gray4};
  }

  ${props => props.type === 'submit' ? css`
  ${ButtonCss};
  `: null};
`;

const Input = ({className, type, id, name, value, placeholder, onChange, ...props}) => {
  return(
    <CustomInput 
    className={className}
    id={name}
    name={name}
    value={value}
    type={type} 
    placeholder={placeholder} 
    onChange={onChange}
    props={props}/>
  );
}

export default Input;