import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {usersFriends, updateFriendRequestBatch} from '../actions/usersActions';
import UsersApi from '../api/usersApi';
import { Button, Card, Image } from 'semantic-ui-react'


class FriendRequest extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      usersData: [],
      requests: {}
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
          .then(resp => {resolve(this.singleCard(req, resp.user))
          })
        })
      )
    }
    Promise.all(usersData).then(el => {
      this.setState({
        usersData: el
      })
    })
  };

  componentWillUnmount(){
    this.props.updateFriendRequestBatch(this.state.requests);
  };

  addRequests = (e) => {
    e.preventDefault();
    // change inner text for button that is clicked on.
    let TargetButton = e.target.innerText;

    if (TargetButton == 'Accept') {
      TargetButton = 'Accepted';
      e.target.parentElement.children[1].innerText = 'Decline';
    } else if (TargetButton == 'Decline'){
      TargetButton = 'Declined';
      e.target.parentElement.children[0].innerText = 'Accept';
    } else if (TargetButton == 'Accepted') {
      TargetButton = 'Accept';
    } else if (TargetButton == 'Declined') {
      TargetButton = 'Decline';
    }

    e.target.innerText = TargetButton;


    const reqId = e.target.parentElement.parentElement.parentElement.id;
    const accepted = e.target.value;
    const req = {
      id: reqId,
      accepted: accepted
    };

    if (!Object.keys(this.state.requests).length) {
      this.setState({
      requests: {[req.id]: req}
      })
    } else {
      if (this.state.requests[req.id]) {
        this.state.requests[req.id].accepted = req.accepted
      } else {
        let temp = this.state.requests
        temp[req.id] = req
        this.setState({
          requests: temp
        })
      }
    }
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
            <Button active basic color='green' value={true} onClick={this.addRequests}>Accept</Button>
            <Button active basic color='red' value={false} onClick={this.addRequests}>Decline</Button>
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
    updateFriendRequestBatch: updateFriendRequestBatch,
    publicUser: UsersApi
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest);
