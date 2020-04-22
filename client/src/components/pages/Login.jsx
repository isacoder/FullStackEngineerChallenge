import React, { useState, useCallback, Fragment } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Colors from '../utils/Colors';

const Container = styled.div`
  max-width: 200px;
  margin: auto;
  padding: 24px;
  font-size: 16px;
  text-align: left;
  button{
    display: block;
    margin: 20px auto;
    width: 100%;
  }
  input{
    display: block;
    margin: 4px 0;
  }
  input[type='submit']{
    margin-top: 40px;
  }
`;

const Title = styled.div`
  font-size: 2rem;
  margin: 20px 0;
`;

const Logo = styled.div`
  height: 100px;
  width: 300px;
`;

const Field = styled.div`
  margin-top: 20px;
`;

const Caption = styled.div`
  font-size: .8rem;
  color: ${Colors.gray2};
`;

const Login = ({ props }) => {
  const [loginType, setLoginType] = useState('');
  const [isLogged, setIslogged] = useState(false);
  const handleSubmit = useCallback(() => {
    setIslogged([prevState => !prevState])
  }, []);

  const handleLoginType = useCallback((type) => {
    console.log('got type', type);
    setLoginType(type);
  }, []);

  return (
    <Container>
      <Title>Appraisal</Title>
      {loginType === '' ? <Fragment>
        <Button onClick={() => handleLoginType('employee')}>Employee</Button>
        <Button onClick={() => handleLoginType('admin')}>Admin</Button>
      </Fragment> :
        <Fragment>
          <form>
            <Field>
              <label>
                Name:
              <Input placeholder='Name...' type='text' />
              </label>
            </Field>
            <Field>
              <label>
                Password:
              <Input type='password' />
              </label>
            </Field>
            <Caption>Forgot password?</Caption>
            <Input type='submit' value='Submit' onSubmit={() => handleSubmit()} />
          </form>
        </Fragment>}
    </Container>
  );
}

export default Login;