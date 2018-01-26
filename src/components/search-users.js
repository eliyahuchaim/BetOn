import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, Sidebar, Segment, Button, Menu, Icon, Header, Image, Card} from 'semantic-ui-react';
import {getAllUsers} from '../actions/indexActions';
import {CurrentUserInfo, usersFriends, sendFriendRequest} from '../actions/usersActions';
import {withRouter} from 'react-router-dom';

class SearchUser extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      users_arr: [],
      search_input: "",
      friends_table: {}
    }
  };

  createFriendsTable = () => {
    try {
      if (this.props.friends && !Object.keys(this.state.friends_table).length) {
        let friends_obj = new Object;
        let friends = this.props.friends.friends;
        for (let i = 0; i < friends.length; i++) {
          friends_obj[friends[i].username] = friends[i];
        };
        return friends_obj;
      } else {
        throw 'props are empty for friends table'
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  componentDidMount(){
    this.props.getAllUsers();
    this.props.seedCurrentUser();
    this.props.usersFriends();
  };

  filterUsers = (search) => {
    const friends = this.createFriendsTable()

    let results = this.props.all_users.filter(user => {
      return user.username.includes(search) && user.username[0] == search[0] && user.username != this.props.user.user.username
    });
    if (friends) {
      this.setState({
        users_arr: results,
        friends_table: friends
      });
    } else {
      this.setState({
        users_arr: results
      });
    };
  };

  handleChange = (e) => {
    if (!e.target.value.trim().length) {
      this.setState({
        search_input: "",
        users_arr: []
      })
    } else {
      this.filterUsers(e.target.value.trim())
    };
  };

  goToUserPage = (e) => {
    const id = Number(e.target.id);
    this.props.history.push(`/user/${id}`);
  };

  sendFriendRequest = (e) => {
    if (e.target.innerText == "Send Friend Request") {
      e.target.innerText = "Request Sent";
    }
    const id = Number(e.target.id);
    this.props.sendFriendRequest(id);

  }

  userCard = (payload) => {
    let button;
    if (this.state.friends_table[payload.username]) {
      button = <Button basic color='green'>Already Friends</Button>
    } else {
      button = <Button onClick={this.sendFriendRequest} id={payload.id} basic color='green'>Send Friend Request</Button>
    }

    return (
      <Card key={payload.id}>
        <Card.Content>
          <Image floated='right' size='mini' src={payload.avatar} />
          <Card.Header>
            {payload.username}
          </Card.Header>
          <Card.Meta>
            Friends of Elliot
          </Card.Meta>
          <Card.Description>
            Steve wants to add you to the group <strong>best friends</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            {button}
            <Button basic color='blue' id={payload.id} onClick={this.goToUserPage}>View Profile</Button>
          </div>
        </Card.Content>
      </Card>
    )
  }

  createUserCards = () => {
    this.createFriendsTable()
    return this.state.users_arr.map(user => {
      return this.userCard(user)
    })
  };



  render(){
    console.log("this is props",this.props);
    console.log("this is filtered arr:", this.state.users_arr);
    if (this.state.users_arr.length) {
      return (
        <div>
          <Form size={'huge'} key={'huge'}>
            <Form.Field onChange={this.handleChange}>
              <label>Search By Username </label>
              <input />
            </Form.Field>
          </Form>
          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='push' direction='bottom' inverted>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <Header as='h3'>Found Users</Header>
                <Card.Group>
                  {this.createUserCards()}
                </Card.Group>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      )
    } else {
      return(
        <div>
          <Form size={'huge'} key={'huge'}>
            <Form.Field onChange={this.handleChange}>
              <label>Search By Username </label>
              <input />
            </Form.Field>
          </Form>
        </div>
      )
    }
  }
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAllUsers: getAllUsers,
    seedCurrentUser: CurrentUserInfo,
    usersFriends: usersFriends,
    sendFriendRequest: sendFriendRequest
  }, dispatch)
};

const mapStateToProps = (state) => {
  return {
    all_users: state.index.all_users,
    user: state.user.user_info,
    friends: state.user.friends
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchUser));
