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

export function login(payload, props) {
  return dispatch => {
    return UsersApi.login(payload).then(resp => {
      if (!resp.message) {
        dispatch({
          type: 'LOGIN',
          payload: resp
        });
        props.history.push('/userpage');
      } else {
        console.log(resp);
      }
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


export function publicUserInfo(id){
  return dispatch => {
    return UsersApi.showUser(id).then(resp => {
      dispatch({
        type: 'PUBLIC_USER',
        payload: resp
      })
    })
  }
};

export function CurrentUserInfo(){
  return dispatch => {
    return UsersApi.showCurrentUser().then(resp => {
      dispatch({
        type: 'CURRENT_USER',
        payload: resp
      })
    })
  }
};

export function usersFriends(){
  return dispatch => {
    return UsersApi.friends()
    .then(resp => {
      dispatch({
        type: 'FRIENDS',
        payload: resp
      })
    })
  }
};
