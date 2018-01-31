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
    return UsersApi.showPublicUser(id).then(resp => {
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

export function sendFriendRequest(to_user_id){
  return dispatch => {
    return UsersApi.sendFriendRequest(to_user_id)
    .then(resp => resp)
  };
};

export function updateFriendRequestBatch(payload) {
  return dispatch => {
    UsersApi.updateFriendRequest(payload)
  };
};

export function updateFriendRequest(request) {
    return UsersApi.updateFriendRequest(request)
    .then(resp => {console.log(resp);})
};

function inviteFriendsToParty(partyId ,payload) {
  if (Object.keys(payload.invites).length > 1) {
    const idsArr = [];
    for (var name in payload.invites) {
      idsArr.push(payload.invites[name].id);
    }
    return UsersApi.massInviteToParty({party_id: partyId, users_arr: idsArr});
  } else {
    return UsersApi.inviteToParty({party_id: partyId, user_id: payload.invites[Object.keys(payload.invites)].id})
  }

}

export function createParty(payload, props){
  return dispatch => {
    return UsersApi.createParty(payload)
    .then(resp => {
      if (typeof resp.party.id == "number") {
        return inviteFriendsToParty(resp.party.id, payload)
        .then(resp => {
          // NOTE: add a check for error here
          console.log(resp);
          props.history.push('/userpage');
        })
      }
    });
  }
};
