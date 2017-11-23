import React from 'react';
import {NavLink} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

const link = {
  width: '150px',
  padding: '10px',
  margin: '0 6px 6px',
  textAlign: 'center',
  background: '#f17f1a',
  display: 'inline-block',
  fontSize: '13px',
  textDecoration: 'none',
  color: 'white',
  borderRadius: '.28571429rem'
}

const NavBar = (props) => {
// console.log(props);
  if (localStorage.what_you_looking_at) {
    return (
      <div className='nav-in'>
        <Button onClick={props.logout}>Logout</Button>
      </div>
    )
  } else {
    return (
      <div className='nav-in'>
        <NavLink
        to = '/signup'
        exact
        style={link}
        activeStyle={{
        background: '#868079'}}
        >Sign Up</NavLink>
        <NavLink
        to = '/login'
        exact
        style={link}
        activeStyle={{
        background: '#868079'}}
        >Login</NavLink>
      </div>
    )
  }
};

export default NavBar
