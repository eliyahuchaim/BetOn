import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {usersFriends, createParty} from '../actions/usersActions';
import { Form, Input, Grid, Image, Card, Icon, Menu, Label, Sidebar, Segment, Header, Button, Loader} from 'semantic-ui-react';


class CreateParty extends React.Component{
  constructor(props){
    super(props)
    this.addFriendToInvite = this.addFriendToInvite.bind(this);
    this.state = {
      partyTitle: "",
      showPartyForm: true,
      friendsToInvite: {},
      search: "",
      friendsTable: {}
    }
  }

  componentDidMount(){
    if (!this.props.friends.length) {
      this.props.usersFriends();
    }
  }

  mainCreateParty = () => {
    console.log(this.state);
    // debugger;
  }

  whatToRender = () => {
    if (this.state.showPartyForm) {
      return this.renderPartyForm();
    } else {
      return this.renderFriendsList();
    }
  }

  createFriendsTable = () => {
    if (!Object.keys(this.state.friendsTable).length && this.props.friends.friends.length) {
      let friendsObj = new Object;
      let friends = this.props.friends.friends;

      for (var i = 0; i < friends.length; i++) {
        friendsObj[friends[i].username] = friends[i];
      }
      this.setState({
        friendsTable: friendsObj,
        showPartyForm: !this.state.showPartyForm
      })
    } else {
      this.toggleVisibility();
    }
  }

  handleFormChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  addFriendToInvite = (e) => {
    const ID = e.target.id;
    const FriendOBJ = this.state.friendsTable[ID];
    const newState = Object.assign({}, this.state.friendsToInvite, {[ID]: FriendOBJ})
    this.setState({
      friendsToInvite: newState
    });
  }

  removeFromInvite = (e) => {
    const ID = e.target.id;
    const FriendOBJ = this.state.friendsTable[ID];
    const newState = Object.assign({}, this.state.friendsToInvite, {[ID]: FriendOBJ})
    delete newState[ID];
    this.setState({
      friendsToInvite: newState
    });
  }

  friendCard = (payload) => {
    let button;
    if (this.state.friendsToInvite[payload.username]) {
      button = <Button basic color='green' onClick={this.removeFromInvite} id={payload.username}> Already Invited. Click to Cancel Invite</Button>
    } else {
      button = <Button onClick={this.addFriendToInvite} id={payload.username} basic color='green'>Invite to Party</Button>
    }

    return (
      <Card key={payload.id}>
        <Card.Content>
          <Image floated='right' size='mini' src={payload.avatar} />
          <Card.Header>
            {payload.username}
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            {button}
          </div>
        </Card.Content>
      </Card>
    )
  }

  filterFriends = () => {
    return this.props.friends.friends.filter(friend => {
      return friend.username.includes(this.state.search) && friend.username[0] == this.state.search[0]
    })
  }

  createFriendsCards = () => {
    if (!this.state.search) {
      return this.props.friends.friends.map(friend => {
        return this.friendCard(friend);
      });
    } else {
      const filteredFriends = this.filterFriends();
      return filteredFriends.map(friend => {
        return this.friendCard(friend);
      });
    }
  }

  renderFriendsList = () => {
    return (
      <div>
        <Button onClick={this.toggleVisibility}> Change Party Name </Button>
        <Form size={'huge'} key={'huge'}>
          <Form.Field onChange={this.handleFormChange}>
            <label>Search For Friends </label>
            <input />
          </Form.Field>
        </Form>
        <Card.Group>
          {this.createFriendsCards()}
        </Card.Group>
      </div>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.createFriendsTable();
  }

  handleChange = (e) => {
    this.setState({
      partyTitle: e.target.value
    })
  }

  toggleVisibility = () => {
    this.setState({
      showPartyForm: !this.state.showPartyForm
    })
  }

  renderPartyForm = () => {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Field control={Input} label='Name Your Party' placeholder='title' name="title" onChange={this.handleChange} value={this.state.partyTitle} />
        </Form.Group>
        <Form.Field control={Button}> Invite Friends </Form.Field>
      </Form>
    )
  }

  render(){
    return(
      <div>
        <Button onClick={this.mainCreateParty}> Create Party </Button>
        {this.whatToRender()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.user.friends
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    usersFriends: usersFriends
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateParty));
