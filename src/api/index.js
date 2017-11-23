const URL = 'http://localhost:3000/api/v1/'

export default class IndexApi {

  static getAllUsers(){
    return fetch(URL + "users")
    .then(resp => resp.json())
  };




};
