export default function indexReducer(state = {
  all_users: [],
  loading: false
}, action){
  var newState;
  switch (action.type) {
    case 'LOADING':
      newState = Object.assign({}, state, {loading: true})
      return newState;
    case 'ALL_USERS':
      newState = Object.assign({}, state, {all_users: action.payload})
      console.log(newState);
      return newState;
    default:
    return state;
  }
};
