export default function usersReducer(state = {
  user_info: [],
  public_user : [],
  loading: false
}, action){
let newState;
  switch (action.type) {
    case 'SIGN_UP':
      newState = Object.assign({}, state, {user: action.payload, loading: false})
      console.log(newState);
      return newState;
    case 'LOGIN':
      newState = Object.assign({}, state, {user_info: {user_id: action.payload.user_id}} );
      localStorage.setItem("what_you_looking_at", action.payload.what_you_looking_at);
      console.log(newState);
      return newState;
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
    default:
      return state;
  }
};
