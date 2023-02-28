/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import * as actions from '../../store/modules/auth/actions';

import { Form } from './styled';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';

export default function Login(props) {
  const dispacth = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const isLoading = useSelector((state) => state.auth.isLoading);

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (password.legnth < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha inválida');
    }

    if (formErrors) return;

    dispacth(actions.loginRequest({ email, password, prevPath }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
        />
        <button type="submit">Acessar</button>
      </Form>
    </Container>
  );
}
