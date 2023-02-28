import * as types from '../types';

export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}

export function loginSucess(payload) {
  return {
    type: types.LOGIN_SUCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
}

export function registerRequest(payload) {
  return {
    type: types.REGISTER_REQUEST,
    payload,
  };
}

export function registerUpdatedSucess(payload) {
  return {
    type: types.REGISTER_UPDATED_SUCESS,
    payload,
  };
}

export function registerCreatedSucess(payload) {
  return {
    type: types.REGISTER_CREATED_SUCESS,
    payload,
  };
}
export function registerFailure(payload) {
  return {
    type: types.REGISTER_FAILURE,
    payload,
  };
}
