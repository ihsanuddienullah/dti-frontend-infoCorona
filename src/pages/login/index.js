import React, { useState } from 'react';
import { Form, Col, InputGroup, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { setCookie } from '../../utils/cookie';
import { authService } from '../../services';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoginLoading, setLoginLoading] = useState(false);

  const onSubmitLogin = () => {
    setLoginLoading(true);
    authService
      .login(username, password)
      .then((res) => {
        const cookieToken = res.data.token;
        const cookieUser = res.data.user;
        setCookie('userData', JSON.stringify(cookieUser), 10000);
        setCookie('token', JSON.stringify(cookieToken), 10000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  return (
    <div className="loginPage">
      <h2>Login Page</h2>
      <Form
        className="login_form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitLogin();
        }}
      >
        <Form.Row className="justify-content-center">
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup" srOnly>
              Username
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="inlineFormInputGroup"
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Form.Label
              htmlFor="inlineFormInputGroup"
              srOnly
              className="text-center"
            >
              Password
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faKey} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Button
              type="submit"
              className="mb-2"
              value="Submit"
              disabled={isLoginLoading}
            >
              Submit
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
};

export default Login;

// Login

// form => post ke server => waiting for response (loading state) =>
// receive response from server => success -> success statement to user
//                              => error -> error statement to user  -> next ngapain user?

// if success - get token from be - save Token to cookie -> redirect ??

// Loading state treatment
// race condition -> unstable connection

// Action A -> Response A  ->  Action B ->  Response B -> success
