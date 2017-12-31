import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {usersFriends} from '../actions/usersActions';


class FriendRequest extends React.Component{
  constructor(props){
    super(props)
  };

  componentDidMount(){
    this.props.usersFriends();
  };

  render(){
    console.log("this is state for requests:", this.props.requests);
    return (
      <div> null </div>
    )
  };

};

const mapStateToProps = (state) => {
  return {
    requests: state.user.friends.requests
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    usersFriends: usersFriends
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest);
