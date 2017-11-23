import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, Input, Button} from 'semantic-ui-react';
import {getAllUsers} from '../actions/indexActions';

class SearchUser extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      users_arr: [],
      search_input: ""
    }
  };

  componentDidMount(){
    this.props.getAllUsers()
  }

  render(){
    return(
      <div>
        Hi
      </div>
    )
  }
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAllUsers: getAllUsers
  }, dispatch)
};

const mapStateToProps = (state) => {
  return {
    all_users: state.index.all_users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
