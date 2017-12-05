import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CurrentUserInfo, usersFriends} from '../actions/usersActions';
import { Grid, Image, Card, Icon } from 'semantic-ui-react';


class UserPage extends React.Component{
  constructor(props){
    super(props)
  };

  componentDidMount(){
    this.props.seedCurrentUser(this.props.user.user_id);
    this.props.usersFriends();
  }

  jsx = () => {
    return (
      <Grid>
        <Grid.Column width={4}>
          <Card>
            <Image src={this.props.user.user.avatar}/>
          </Card>
        </Grid.Column>
      </Grid>
    )
  };

  shouldRender = () => {
    if (this.props.user.user) {
      return this.jsx()
    } else {
      return null
    }
  }


  render(){
    // debugger
    return(
      <div>
      {this.shouldRender()}
      </div>
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
    seedCurrentUser: CurrentUserInfo,
    usersFriends: usersFriends
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
