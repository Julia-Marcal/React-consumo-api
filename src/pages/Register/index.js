/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!id) return;
    setNome(nomeStored);
    setEmail(emailStored);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Campo nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Campo deve ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;
    dispatch(actions.registerRequest({ nome, email, password, id }));
  }

  return (
    <Container>
      <h1>{id ? 'Editar dados' : 'Crie sua conta'}</h1>
      <Loading isLoading={isLoading} />
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        <button type="submit">{id ? 'Salvar' : 'Criar conta'}</button>
      </Form>
    </Container>
  );
}
