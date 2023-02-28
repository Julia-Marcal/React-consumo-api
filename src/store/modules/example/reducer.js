import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

// estado atual está sendo copiado para o new state com a spread operator
// e depois trocando o estado (se for true vira false e visse verssa)

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCESS: {
      console.log('sucess');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      console.log('ERROR');
      return state;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      console.log('requesting');
      return state;
    }

    default: {
      return state;
    }
  }
}
