import UsersApi from '../api/usersApi'

export function signUp(payload) {
  return dispatch => {
    dispatch({type: 'LOADING'})
      return UsersApi.signUp(payload).then(resp => {
      dispatch({
      type: 'SIGN_UP',
      payload: resp
      })
    })
  }
};

export function login(payload) {
  return dispatch => {
    return UsersApi.login(payload).then(resp => {
      dispatch({
        type: 'LOGIN',
        payload: resp
      })
    })
  }
};

export function logout() {
  return dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
};
