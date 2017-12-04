import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CurrentUserInfo} from '../actions/usersActions';


class UserPage extends React.Component{
  constructor(props){
    super(props)
  };

  componentDidMount(){
    this.props.seedCurrentUser(this.props.user.user_id);
  }


  render(){
    return(
      null
    )
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user_info
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({
    seedCurrentUser: CurrentUserInfo
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
