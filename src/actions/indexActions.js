import IndexApi from '../api/index';

export function getAllUsers() {
  return dispatch => {
    dispatch({
      type: 'LOADING'
    })
    return IndexApi.getAllUsers()
    .then(resp => {
      dispatch({
        type: 'ALL_USERS',
        payload: resp
      })
    })
  }
};
