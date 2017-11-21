const URL = 'http://localhost:3000/api/v1/users'

export default class UsersApi {

  static signUp(payload){
    const data = {user: {
      firstname: payload.firstname,
      lastname: payload.lastname,
      username: payload.username,
      password: payload.password,
      avatar: payload.avatar
      }
    };
    return fetch(URL, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
  }

  static login(payload){
    var url = 'http://localhost:3000/api/v1/login'
    return fetch(url, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(resp => resp.json())
  }



} // end of class
