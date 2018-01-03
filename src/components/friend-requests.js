import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {usersFriends, updateFriendRequest} from '../actions/usersActions';
import UsersApi from '../api/usersApi';
import { Button, Card, Image } from 'semantic-ui-react'


class FriendRequest extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      usersData:[]
    };
  };

  componentDidMount(){
    this.props.usersFriends();
  };

  showPublicUser = (userID) => {
    return fetch('http://localhost:3000/api/v1/publicShow' + `/${userID}`).then(resp => resp.json());
  };

  cards = () => {
    const usersData = [];
    const results = [];

    for (var i = 0; i < this.props.requests.length; i++) {
      let req = this.props.requests[i];
      usersData.push(new Promise(
        (resolve, reject) => {
          this.showPublicUser(req.from_user_id)
          .then(resp => {resolve(this.singleCard(req, resp.user))})
        }
        )
      )
    }
    Promise.all(usersData).then(el => {
      this.setState({
        usersData: el
      })
    })
  };


  singleCard = (request, user) => {
    return (
      <Card id={request.id} key={request.id}>
        <Card.Content>
          <Image floated='right' size='mini' src={user.avatar} />
          <Card.Header>
            {user.username}
          </Card.Header>
          <Card.Description>
            {user.username} wants to be friends with you.
          </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>Accept</Button>
            <Button basic color='red'>Decline</Button>
          </div>
          <Button basic color='yellow'>View Profile</Button>
        </Card.Content>
      </Card>
    )
  };


  jsx = () => {
    try {
      if (!this.props.requests.length) {
        throw "waiting for props to come in"
      } else {
        if (this.state.usersData.length !== this.props.requests.length) {
          this.cards()
        } else {
          console.log("in here boy");
          return (
            <Card.Group>
              {this.state.usersData}
            </Card.Group>
          )
        }
      }
    } catch (e) {
      console.error(e);
      return (
        <div>
          No Requests
        </div>
      )
    };
  };

  render(){
    console.log("this is state for requests:", this.state);
    return (
      <div>
      {this.jsx()}
      </div>
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
    usersFriends: usersFriends,
    updateFriendRequest: updateFriendRequest,
    publicUser: UsersApi
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest);
