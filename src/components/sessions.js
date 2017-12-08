import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login} from '../actions/usersActions';
import {Form, Input, Button} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';


class Sessions extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state, this.props)
  };

  signUpForm = () => {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Field control={Input} label='Username' placeholder='Username' name="username" onChange={this.handleChange} />
          <Form.Field control={Input} label='Password' placeholder='Password' name="password" type='password' onChange={this.handleChange} />
        </Form.Group>
        <Form.Group>
        <Form.Field control={Button}>Login </Form.Field>
        </Form.Group>
      </Form>
    )
  };

  render(){
    return(
      this.signUpForm()
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: login
  }, dispatch)
};

export default withRouter(connect(null, mapDispatchToProps)(Sessions));
