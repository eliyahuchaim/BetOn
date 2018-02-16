import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CurrentUserInfo, usersFriends} from '../actions/usersActions';
import Parties from '../containers/parties';
import { Grid, Image, Card, Icon, Menu, Label, Sidebar, Segment, Header, Button, Loader} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';


class UserPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      activeItem: "",
      whatToShow : {
        parties: true,
        bets: false,
        wagers: false
      }
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

  whatToShow = () => {
    for (let key in this.state.whatToShow){
      if (this.state.whatToShow[key]){
        if (key === 'parties'){
          return (
            <div>
              <Parties />
            </div>
          )
        } else if (key === 'wagers') {
          return null;
        } else if (key === 'bets') {
          return null;
        }
      }
    }
  }

  toggleWhatToShow = (e) => {
    let tempState = {...this.state.whatToShow};
    for (let key in tempState) {
      if (tempState[key]){
        tempState[key] = false,
        tempState[e.target.id] = true
        break;
      }
    }
    this.setState({
      whatToShow: tempState
    });
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
          <Sidebar as={Menu} animation='push' direction='top' visible={this.state.visible} inverted>
            <Menu.Item name='parties' id='parties' onClick={this.toggleWhatToShow}>
              <Icon name='users' id='parties'/>
              Parties
            </Menu.Item>
            <Menu.Item name='bets' id='bets' onClick={this.toggleWhatToShow}>
              <Icon name='hand victory' id='bets'/>
              Bets
            </Menu.Item>
            <Menu.Item name='wagers' id='wagers' onClick={this.toggleWhatToShow}>
              <Icon name='dollar' id='wagers'/>
              Wagers
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pushable as={Segment}>
            <Sidebar.Pusher>
              <Segment basic>
                <Header as='h3'>Application Content</Header>
                {this.whatToShow()}
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
