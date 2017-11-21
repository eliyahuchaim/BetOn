export default function usersReducer(state = {
  user: {},
  loading: false
}, action){
let newState;
  switch (action.type) {
    case 'SIGN_UP':
      newState = Object.assign({}, state, {user: action.payload, loading: false})
      console.log(newState);
      return newState;
    case 'LOGIN':
      debugger
      break;
    case 'LOADING':
      newState = Object.assign({}, state, {loading: true})
      return newState;
    default:
      return state;
  };
}
