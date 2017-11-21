import React from 'react';
import {Form, Input, Button} from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {signUp} from '../actions/usersActions';

class SignUp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      avatar: "",
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
    this.props.signUp(this.state)
  }

  form = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Field control={Input} label='First name' placeholder='First name' name="firstname" onChange={this.handleChange} />
          <Form.Field control={Input} label='Last name' placeholder='Last name' name="lastname" onChange={this.handleChange}/>
          <Form.Field control={Input} label='Avatar' placeholder='Avatar' name="avatar" onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group widths='equal'>
        <Form.Field control={Input} label='Username' placeholder='Username' name="username" onChange={this.handleChange}/>
        <Form.Field control={Input} label='Password' placeholder='Password' type='password' name="password" onChange={this.handleChange}/>
        </Form.Group>
        <Form.Field control={Button}>Create Your Account</Form.Field>
      </Form>
    )
  }

  render(){
    return(
      <div>
      {this.form()}
      </div>
    )
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    signUp: signUp
  }, dispatch)
};

export default connect(null, mapDispatchToProps)(SignUp);
