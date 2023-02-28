import * as types from '../types';
import axios from '../../../services/axios';

const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
};

// estado atual está sendo copiado para o new state com a spread operator
// e depois trocando o estado (se for true vira false e visse verssa)

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoading = false;
      return state;
    }

    case types.LOGIN_FAILURE: {
      delete axios.defaults.headers.Authorization;
      const newState = { ...initialState };
      return newState;
    }

    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    case types.REGISTER_UPDATED_SUCESS: {
      const newState = { ...state };
      newState.nome = action.payload.nome;
      newState.email = action.payload.email;
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_CREATED_SUCESS: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }
    case types.REGISTER_FAILURE: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }
    default: {
      return state;
    }
  }
}
