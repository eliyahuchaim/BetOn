export default function usersReducer(state = {
  user_info: [],
  public_user : [],
  loading: false,
  friends: {friends: {}, requests: {}}
}, action){
let newState;
  switch (action.type) {
    case 'SIGN_UP':
      newState = Object.assign({}, state, {user: action.payload, loading: false})
      console.log(newState);
      return newState;
    case 'LOGIN':
      localStorage.setItem("what_you_looking_at", action.payload.what_you_looking_at);
      return state;
    case 'LOADING':
      newState = Object.assign({}, state, {loading: true})
      return newState;
    case 'LOGOUT':
      newState = Object.assign({}, state, {user_info: []});
      localStorage.removeItem('what_you_looking_at');
      console.log("User was logged out");
      return newState;
    case 'PUBLIC_USER':
      newState = Object.assign({}, state, {public_user: action.payload})
      return newState;
    case 'CURRENT_USER':
      newState = Object.assign({}, state, {user_info: action.payload})
      return newState;
    case 'FRIENDS':
      newState = Object.assign({}, state, {friends: action.payload})
      return newState;
    default:
      return state;
  }
};
