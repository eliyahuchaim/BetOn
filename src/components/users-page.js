import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CurrentUserInfo, usersFriends} from '../actions/usersActions';
import { Grid, Image, Card, Icon, Menu, Label, Sidebar, Segment, Header, Button, Loader} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';


class UserPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      activeItem: ""
    };
  };


  componentDidMount(){
    this.props.seedCurrentUser();
    this.props.usersFriends();
  }

  toggleVisibility = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  setActiveItem = () => {

  };

  goToRequests = () => {
    this.props.history.push('/requests');
  }

  jsx = () => {
    return (
      <Grid>
        <Grid.Column width={4}>
          <Card>
            <Image src={this.props.user.user.avatar}/>
          </Card>
        </Grid.Column>
        <Grid.Column width={9}>
          <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='push' direction='bottom' visible={this.state.visible} inverted>
              <Menu.Item name='parties'>
                <Icon name='users' />
                Parties
              </Menu.Item>
              <Menu.Item name='bets'>
                <Icon name='hand victory' />
                Bets
              </Menu.Item>
              <Menu.Item name='wagers'>
                <Icon name='dollar' />
                Wagers
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <Header as='h3'>Application Content</Header>
                <Image src='/assets/images/wireframe/paragraph.png' />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
        <Grid.Column width={3}>
           <Menu vertical>
            <Menu.Item name='friends' onClick={""}>
             <Label color='teal'>{this.props.friends.friends.length}</Label>
             Friends
            </Menu.Item>
            <Menu.Item name='requests' onClick={this.goToRequests}>
             <Label color='teal'>{this.props.friends.requests.length}</Label>
             Friend Requests
            </Menu.Item>
           </Menu>
        </Grid.Column>
      </Grid>
    )
  };

  shouldRender = () => {
    if (this.props.user.user && this.props.friends) {
      return this.jsx()
    } else {
      return (
        <Loader active inline='centered' />
      )
    }
  }


  render(){
    return(
      <div>
      {this.shouldRender()}
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user_info,
    friends: state.user.friends
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({
    seedCurrentUser: CurrentUserInfo,
    usersFriends: usersFriends
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage));
