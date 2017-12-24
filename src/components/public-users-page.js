import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {publicUserInfo} from '../actions/usersActions';
import { Grid, Image, Card, Icon, Menu, Label, Sidebar, Segment, Header, Button, Loader} from 'semantic-ui-react';


class PublicUserPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      activeItem: ""
    };
  };


  componentDidMount(){
    const id = Number(this.props.match.params.id);
    this.props.seedPublicUser(id)
  }

  toggleVisibility = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  setActiveItem = () => {

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
      </Grid>
    )
  };

  shouldRender = () => {
    if (this.props.user.user) {
      return this.jsx()
    } else {
      return (
        <Loader active inline='centered' />
      )
    }
  }


  render(){
    console.log("public show", this.props);
    return(
      <div>
      {this.shouldRender()}
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user.public_user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({
    seedPublicUser: publicUserInfo,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicUserPage);
