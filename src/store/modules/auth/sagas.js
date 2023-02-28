import { call, put, all, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import * as actions from './actions';
import * as types from '../types';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSucess({ ...response.data }));

    toast.success('Você fez login');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push('/');
  } catch (e) {
    toast.error('Email ou senha inválidos');

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });
      toast.success('Conta alterada com sucesso');
      yield put(actions.registerUpdatedSucess({ nome, email, password }));
    } else {
      yield call(axios.post, '/users', {
        email,
        nome,
        password,
      });
      toast.success('Conta criada com sucesso');
      yield put(actions.registerCreatedSucess());
      history.push('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa fazer login novamente');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('ERRO');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
// takeLatest é ouvir apenas o último clique dado
// o primeiro item do array é oq o Saga vai ouvir
// o segundo oq ele vai executar
